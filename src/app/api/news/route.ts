import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { initialNews } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');

    const conn = await connectToDatabase();
    if (conn) {
      const query: any = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (year && year !== 'All') {
        query.year = parseInt(year);
      }

      const newsList = await News.find(query).sort({ order: 1 });
      if (newsList && newsList.length > 0) {
        return NextResponse.json({ success: true, news: newsList });
      }
    }
  } catch (err: any) {
    console.warn('MongoDB query warning in /api/news:', err.message);
  }

  // Fallback to initialNews seed data
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const year = searchParams.get('year');

  let filtered = [...initialNews];
  if (category && category !== 'All') {
    filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
  }
  if (year && year !== 'All') {
    filtered = filtered.filter((n) => n.year === parseInt(year));
  }

  return NextResponse.json({
    success: true,
    news: filtered.map((n, i) => ({ ...n, _id: `seed-news-${i + 1}` })),
  });
}
