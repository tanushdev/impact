import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { notifyAdminContact } from '@/lib/brevo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, company, enquiryType, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide full name, email, and message.' },
        { status: 400 }
      );
    }

    // Attempt to save to MongoDB
    let savedInDb = false;
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Contact.create({
          fullName,
          email,
          company: company || '',
          enquiryType: enquiryType || 'General enquiry',
          message,
        });
        savedInDb = true;
      }
    } catch (dbErr: any) {
      console.warn('Could not save contact inquiry to MongoDB:', dbErr.message);
    }

    // Send email notification via Brevo
    const emailResult = await notifyAdminContact({
      fullName,
      email,
      company,
      enquiryType,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        savedInDb,
        emailDispatched: emailResult.success,
        emailSimulated: emailResult.simulated || false,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

