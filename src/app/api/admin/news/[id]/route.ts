import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { initialNews } from '@/lib/seedData';
import { sanitizeHtml } from '@/lib/contentRenderer';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

interface Context {
  params: { id: string };
}

// GET single article
export async function GET(req: NextRequest, { params }: Context) {
  if (!isAdminAuthenticated(req)) return unauthorized();
  await connectToDatabase();

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);
  let article: any = isObjectId ? await News.findById(params.id).lean() : null;

  if (!article) {
    article = await News.findOne({ slug: params.id }).lean();
  }

  // Fallback to initialNews
  if (!article) {
    const seed = initialNews.find((n: any) => n.slug === params.id || (isObjectId && String(n._id || '') === params.id));
    if (seed) {
      article = { ...seed, _id: isObjectId ? params.id : 'seed-' + seed.slug };
    }
  }

  if (!article) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, article });
}

// PATCH update article
export async function PATCH(req: NextRequest, { params }: Context) {
  if (!isAdminAuthenticated(req)) return unauthorized();
  await connectToDatabase();

  const body = await req.json();
  if (body.contentHtml) {
    body.contentHtml = sanitizeHtml(body.contentHtml);
  }
  if (body.summary) {
    body.summary = sanitizeHtml(body.summary);
  }
  if (Array.isArray(body.bodyParagraphs)) {
    body.bodyParagraphs = body.bodyParagraphs.map((p: string) => sanitizeHtml(p));
  }
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);

  let article = null;
  if (isObjectId) {
    article = await News.findByIdAndUpdate(params.id, body, { new: true });
  } else {
    article = await News.findOneAndUpdate({ slug: params.id }, body, { new: true, upsert: true });
  }

  if (!article) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, article });
}

// DELETE article
export async function DELETE(req: NextRequest, { params }: Context) {
  if (!isAdminAuthenticated(req)) return unauthorized();
  await connectToDatabase();

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(params.id);
  let result = null;
  if (isObjectId) {
    result = await News.findByIdAndDelete(params.id);
  } else {
    result = await News.findOneAndDelete({ slug: params.id });
  }

  if (!result) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, message: 'Deleted' });
}
