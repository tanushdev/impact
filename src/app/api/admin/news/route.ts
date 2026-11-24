import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { initialNews } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

// GET all news items for admin
export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) return unauthorized();

  try {
    await connectToDatabase();
    let news = await News.find({}).sort({ order: 1, createdAt: -1 }).lean();

    // Auto-seed if empty
    if (!news || news.length === 0) {
      if (initialNews.length > 0) {
        try {
          await News.insertMany(initialNews);
          news = await News.find({}).sort({ order: 1, createdAt: -1 }).lean();
        } catch (seedErr) {
          console.warn('Auto-seed in admin/news warning:', seedErr);
        }
      }
    }

    return NextResponse.json({ success: true, news: news || [] });
  } catch (err: any) {
    return NextResponse.json({ success: true, news: initialNews.map((n: any, i) => ({ ...n, _id: 'seed-' + i })) });
  }
}

// POST create new article
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) return unauthorized();

  const body = await req.json();

  const {
    title,
    slug,
    date,
    year,
    category = 'Press Release',
    summary,
    coverImage = '',
    contentHtml = '',
    bodyParagraphs = [],
    images = [],
    bulletPoints = [],
    author = 'Impact Energies Corporate',
    readTime = '3 min read',
    featured = false,
    order = 0,
  } = body;

  if (!title || !date || !summary) {
    return NextResponse.json(
      { success: false, message: 'Title, date and summary are required' },
      { status: 400 }
    );
  }

  const finalSlug = slug ? slugify(slug) : slugify(title);

  await connectToDatabase();

  // Check slug uniqueness
  const existing = await News.findOne({ slug: finalSlug });
  const uniqueSlug = existing ? `${finalSlug}-${Date.now().toString().slice(-4)}` : finalSlug;

  const article = await News.create({
    title,
    slug: uniqueSlug,
    date,
    year: year || parseInt(date.split('-')[0]) || new Date().getFullYear(),
    category,
    summary,
    coverImage,
    contentHtml,
    bodyParagraphs: bodyParagraphs.length > 0 ? bodyParagraphs : [summary],
    images,
    bulletPoints,
    author,
    readTime,
    featured: Boolean(featured),
    order: Number(order) || 0,
  });

  return NextResponse.json({ success: true, article }, { status: 201 });
}
