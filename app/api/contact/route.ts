import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
// You can get one from: https://resend.com/
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789'); // Placeholder if key is missing

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, projectType, message } = body;

    // 1. SEND EMAIL TO YOU (ASHUTOSH)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // You can verify your own domain later on Resend
      to: 'ashutosh15798@gmail.com',
      subject: `🚀 New Project Lead: ${projectType} from ${name}`,
      html: `
        <div style="font-family: sans-serif; background: #f9f9f9; padding: 40px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #eee;">
            <h2 style="color: #c5a25d; margin-bottom: 20px;">New Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `
    });

    // 2. OPTIONAL: Send a Thank-You email to the User
    await resend.emails.send({
      from: 'Ashutosh Ahirwal <onboarding@resend.dev>',
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h3>Hi ${name},</h3>
          <p>I've received your request about <strong>${projectType}</strong>. I'll review the details and get back to you shortly.</p>
          <p>Best regards,<br/>Ashutosh Ahirwal</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
