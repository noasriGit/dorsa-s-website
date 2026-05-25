import { NextResponse } from 'next/server';
import { sendApplicationEmail } from '@/lib/coaching-application/email';
import {
  validateApplication,
  type CoachingApplicationInput,
} from '@/lib/coaching-application/schema';

export async function POST(request: Request) {
  let body: CoachingApplicationInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot: silent success, no email
  if (body.websiteUrl?.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const result = validateApplication(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const payload = {
    ...result.data,
    submittedAt: new Date().toISOString(),
    sourcePage: 'Website application form' as const,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Coaching Application]', JSON.stringify(payload, null, 2));
  }

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const emailResult = await sendApplicationEmail(payload);
    if (!emailResult.ok) {
      console.error('[Coaching Application] Email failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send application. Please try again.' },
        { status: 500 }
      );
    }
  } else if (
    process.env.RESEND_API_KEY &&
    process.env.COACHING_APPLICATION_EMAIL &&
    process.env.RESEND_FROM_EMAIL
  ) {
    const emailResult = await sendApplicationEmail(payload);
    if (!emailResult.ok) {
      console.warn('[Coaching Application] Dev email failed:', emailResult.error);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
