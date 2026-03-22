import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, projectType, message } = body;

    // In a real application, you would use a service like Resend, SendGrid, or Nodemailer here.
    // console.log("New Contact Form Submission:", { name, email, subject, company, projectType, message });

    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
