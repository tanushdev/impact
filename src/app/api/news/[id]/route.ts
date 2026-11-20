import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { initialNews } from '@/lib/seedData';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const article = await News.findOne({
        $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (article) {
        return NextResponse.json({ success: true, article });
      }
    }
  } catch (err: any) {
    console.warn('MongoDB query warning in /api/news/[id]:', err.message);
  }

  // Fallback to seed data
  const fallback =
    initialNews.find((n) => n.slug === id) ||
    initialNews[0];

  return NextResponse.json({
    success: true,
    article: { ...fallback, _id: 'seed-detail-1' },
  });
}

