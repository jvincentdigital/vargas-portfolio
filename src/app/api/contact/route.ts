import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'christianvv13@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  // Honeypot — bots fill this, humans don't see it
  company?: unknown;
}

function bad(status: number, code: string) {
  return NextResponse.json({ error: code }, { status });
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return bad(400, 'invalid_json');
  }

  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    // Honeypot tripped — pretend success so bots don't adapt
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (
    name.length < 1 ||
    name.length > 100 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return bad(400, 'invalid_input');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.error('Contact form: RESEND_API_KEY or RESEND_FROM missing');
    return bad(500, 'misconfigured');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error('Resend error:', error);
    return bad(500, 'send_failed');
  }

  return NextResponse.json({ ok: true });
}
