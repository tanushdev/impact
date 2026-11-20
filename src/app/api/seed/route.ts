import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/models/Job';
import News from '@/models/News';
import { initialJobs, initialNews } from '@/lib/seedData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reset = searchParams.get('reset') === 'true';
  return handleSeed(reset);
}

export async function POST(req: NextRequest) {
  return handleSeed(true);
}

async function handleSeed(forceReset = false) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: 'MongoDB connection could not be established. Please check MONGODB_URI.' },
        { status: 500 }
      );
    }

    if (forceReset) {
      await News.deleteMany({});
      await Job.deleteMany({});
    }

    // Seed Jobs
    const existingJobsCount = await Job.countDocuments();
    let jobsCreated = 0;
    if (existingJobsCount === 0) {
      await Job.insertMany(initialJobs);
      jobsCreated = initialJobs.length;
    }

    // Seed News
    const existingNewsCount = await News.countDocuments();
    let newsCreated = 0;
    if (existingNewsCount === 0) {
      await News.insertMany(initialNews);
      newsCreated = initialNews.length;
    }

    return NextResponse.json({
      success: true,
      message: forceReset ? 'Database reset and re-seeded with updated data' : 'Database checked',
      jobs: { count: await Job.countDocuments() },
      news: { count: await News.countDocuments() },
    });
  } catch (err: any) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
