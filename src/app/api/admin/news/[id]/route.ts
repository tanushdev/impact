import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import News from '@/models/News';
import { isAdminAuthenticated } from '@/lib/adminAuth';

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
  const article = await News.findById(params.id).lean();
  if (!article) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, article });
}

// PATCH update article
export async function PATCH(req: NextRequest, { params }: Context) {
  if (!isAdminAuthenticated(req)) return unauthorized();
  await connectToDatabase();

  const body = await req.json();
  const article = await News.findByIdAndUpdate(params.id, body, { new: true });
  if (!article) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

  return NextResponse.json({ success: true, article });
}

// DELETE article
export async function DELETE(req: NextRequest, { params }: Context) {
  if (!isAdminAuthenticated(req)) return unauthorized();
  await connectToDatabase();
  const result = await News.findByIdAndDelete(params.id);
  if (!result) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, message: 'Deleted' });
}
