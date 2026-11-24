import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/adminAuth';

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

  await connectToDatabase();
  const news = await News.find({}).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ success: true, news });
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

  await connectToDatabase();

  const finalSlug = slug || slugify(title);

  // Check slug uniqueness
  const existing = await News.findOne({ slug: finalSlug });
  if (existing) {
    return NextResponse.json(
      { success: false, message: `Slug "${finalSlug}" already exists. Please choose a unique title or edit slug.` },
      { status: 400 }
    );
  }

  const parsedYear = year || parseInt(date.split('-')[0]) || new Date().getFullYear();

  const article = await News.create({
    slug: finalSlug,
    title,
    date,
    year: parsedYear,
    category,
    summary,
    coverImage,
    contentHtml,
    bodyParagraphs,
    images,
    bulletPoints,
    author,
    readTime,
    featured,
    order,
  });

  return NextResponse.json({ success: true, article }, { status: 201 });
}
