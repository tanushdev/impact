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
      let newsList = await News.find({}).sort({ order: 1 });

      // Auto-seed if empty
      if (!newsList || newsList.length === 0) {
        if (initialNews.length > 0) {
          try {
            await News.insertMany(initialNews);
            newsList = await News.find({}).sort({ order: 1 });
          } catch (seedErr) {
            console.warn('Auto-seed in /api/news warning:', seedErr);
          }
        }
      }

      if (newsList && newsList.length > 0) {
        let results = newsList;
        if (category && category !== 'All') {
          results = results.filter((n: any) => n.category.toLowerCase() === category.toLowerCase());
        }
        if (year && year !== 'All') {
          results = results.filter((n: any) => n.year === parseInt(year));
        }
        return NextResponse.json({ success: true, news: results });
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
    news: filtered.map((n: any, i) => ({ ...n, _id: n._id || `seed-news-${i + 1}` })),
  });
}
