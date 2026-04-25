import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL     = process.env.LEAD_NOTIFY_EMAIL    ?? 'brian.knight.stl@gmail.com';
const FROM_EMAIL       = process.env.RESEND_FROM_EMAIL    ?? 'onboarding@resend.dev';
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? '';

// ── Sanitize user input before putting it in HTML emails ──────────────────────
function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// ── Field length limits ───────────────────────────────────────────────────────
const LIMITS = {
  firstName: 100,
  lastName:  100,
  email:     254,
  website:   500,
  message:   2000,
};

// ── Verify Cloudflare Turnstile token ─────────────────────────────────────────
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret:   TURNSTILE_SECRET,
      response: token,
      remoteip: ip,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('cf-connecting-ip') ??
      req.headers.get('x-forwarded-for')  ??
      '0.0.0.0';

    const body = await req.json();
    const { firstName, lastName, email, website, helpWith, message, turnstileToken, timestamp } = body;

    // ── Server-side validation ────────────────────────────────────────────────
    if (!firstName || !lastName || !email || !email.includes('@')) {
      return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
    }
    if (!helpWith || !Array.isArray(helpWith) || helpWith.length === 0) {
      return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
    }

    // Enforce field length limits
    if (
      String(firstName).length        > LIMITS.firstName ||
      String(lastName).length         > LIMITS.lastName  ||
      String(email).length            > LIMITS.email     ||
      String(website ?? '').length    > LIMITS.website   ||
      String(message ?? '').length    > LIMITS.message
    ) {
      return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
    }

    // Validate helpWith against known options only
    const ALLOWED_HELP = ['Book an assessment call', 'Book an in-person event', 'Something else'];
    const helpWithClean = (helpWith as unknown[]).filter(
      h => typeof h === 'string' && ALLOWED_HELP.includes(h)
    ) as string[];
    if (helpWithClean.length === 0) {
      return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
    }

    // ── Bot check ─────────────────────────────────────────────────────────────
    if (TURNSTILE_SECRET) {
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        return NextResponse.json({ error: 'bot' }, { status: 403 });
      }
    }

    // ── Sanitize all user-supplied strings ────────────────────────────────────
    const safeFirst   = sanitize(firstName);
    const safeLast    = sanitize(lastName);
    const safeEmail   = sanitize(email);
    const safeWebsite = sanitize(website);
    const safeMessage = sanitize(message);

    const submittedAt = new Date(timestamp).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const helpList     = helpWithClean.map(h => `• ${h}`).join('<br/>');
    const helpListText = helpWithClean.join(', ');

    // ── Notification email to YOU ─────────────────────────────────────────────
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      NOTIFY_EMAIL,
      replyTo: safeEmail,
      subject: `New contact form: ${safeFirst} ${safeLast} — ${helpListText}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18;">
          <div style="background: #1a1a18; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">New contact form submission</h1>
            <p style="color: rgba(255,255,255,0.45); font-size: 13px; margin: 6px 0 0;">${submittedAt}</p>
          </div>
          <div style="background: white; border: 1px solid #e8e4da; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">
            <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 16px;">Contact details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr><td style="padding: 9px 0; color: #9a9a92; font-size: 13px; width: 130px; vertical-align: top;">Name</td><td style="padding: 9px 0; font-size: 14px;">${safeFirst} ${safeLast}</td></tr>
              <tr><td style="padding: 9px 0; color: #9a9a92; font-size: 13px; vertical-align: top;">Email</td><td style="padding: 9px 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #c8471a;">${safeEmail}</a></td></tr>
              ${safeWebsite ? `<tr><td style="padding: 9px 0; color: #9a9a92; font-size: 13px; vertical-align: top;">Website</td><td style="padding: 9px 0; font-size: 14px;"><a href="${safeWebsite}" style="color: #c8471a;">${safeWebsite}</a></td></tr>` : ''}
            </table>
            <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 12px;">How they want help</h2>
            <div style="background: #f5f2eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px; font-size: 14px; line-height: 2;">${helpList}</div>
            ${safeMessage ? `
            <h2 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 12px;">Their message</h2>
            <div style="background: #f5f2eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 28px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</div>
            ` : ''}
            <a href="mailto:${safeEmail}?subject=Re: Your inquiry" style="display: inline-block; background: #1a1a18; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${safeFirst}</a>
          </div>
        </div>
      `,
    });

    // ── Auto-reply to the person who contacted you ────────────────────────────
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      safeEmail,
      subject: `We got your message, ${safeFirst}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18;">
          <div style="background: #1a1a18; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">Thanks for reaching out, ${safeFirst}</h1>
          </div>
          <div style="background: white; border: 1px solid #e8e4da; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">We've received your message and will get back to you within one business day.</p>
            <p style="font-size: 14px; color: #9a9a92; line-height: 1.7; margin: 0 0 24px;">Here's a summary of what you sent us:</p>
            <div style="background: #f5f2eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 8px;">You're interested in</p>
              <p style="font-size: 14px; margin: 0; line-height: 1.8;">${helpListText}</p>
            </div>
            ${safeMessage ? `
            <div style="background: #f5f2eb; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 8px;">Your message</p>
              <p style="font-size: 14px; margin: 0; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            ` : ''}
            <p style="font-size: 14px; color: #9a9a92; margin: 0;">If you have anything to add, just reply to this email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
