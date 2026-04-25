import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// The email address YOU want leads delivered to
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? 'you@yourcompany.com';

// The "from" address — must be a domain you've verified in Resend
// Until you verify a domain, use: onboarding@resend.dev (Resend's sandbox address)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, bizName, answers, timestamp } = body;

    // Basic server-side validation — never trust the client
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const drain1 = answers?.biggest_time_drain ?? 'Not provided';
    const drain2 = answers?.second_drain ?? 'Not provided';
    const techScore = answers?.tech_comfort ?? '—';
    const timeScore = answers?.time_on_revenue ?? '—';
    const teamSize = answers?.team_size ?? '—';
    const urgency = answers?.urgency ?? '—';

    const submittedAt = new Date(timestamp).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // ── Email to YOU (the notification) ──────────────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New AI quiz lead: ${firstName || 'Unknown'} ${lastName || ''} — ${bizName || 'No business listed'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18;">
          <div style="background: #1a1a18; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">New quiz lead</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 6px 0 0;">${submittedAt}</p>
          </div>

          <div style="background: white; border: 1px solid #e8e4da; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">

            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 16px;">Contact</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr><td style="padding: 8px 0; color: #9a9a92; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-size: 14px;">${firstName ?? ''} ${lastName ?? ''}</td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a92; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #c8471a;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #9a9a92; font-size: 13px;">Business</td><td style="padding: 8px 0; font-size: 14px;">${bizName ?? '—'}</td></tr>
            </table>

            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9a9a92; margin: 0 0 16px;">Quiz answers</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr style="background: #f5f2eb;"><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px; width: 200px;">Biggest time drain</td><td style="padding: 10px 12px; font-size: 14px; font-weight: 500; color: #c8471a;">${drain1}</td></tr>
              <tr><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px;">Second drain</td><td style="padding: 10px 12px; font-size: 14px;">${drain2}</td></tr>
              <tr style="background: #f5f2eb;"><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px;">Revenue time score</td><td style="padding: 10px 12px; font-size: 14px;">${timeScore} / 5 ${Number(timeScore) >= 4 ? '⚠️ High overhead' : ''}</td></tr>
              <tr><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px;">Tech comfort</td><td style="padding: 10px 12px; font-size: 14px;">${techScore} / 5 ${Number(techScore) >= 4 ? '(prefers simple)' : '(open to tools)'}</td></tr>
              <tr style="background: #f5f2eb;"><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px;">Team size</td><td style="padding: 10px 12px; font-size: 14px;">${teamSize}</td></tr>
              <tr><td style="padding: 10px 12px; color: #9a9a92; font-size: 13px;">Urgency</td><td style="padding: 10px 12px; font-size: 14px;">${urgency} / 5 ${Number(urgency) <= 2 ? '🔥 High priority' : ''}</td></tr>
            </table>

            <a href="mailto:${email}?subject=Your AI readiness results — let's chat" style="display: inline-block; background: #1a1a18; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${firstName ?? 'this lead'}</a>
          </div>
        </div>
      `,
    });

    // ── Confirmation email TO THE LEAD ────────────────────────────────────────
    // Optional but recommended — confirms their submission and keeps you top of mind.
    // Comment this block out if you don't want to send a confirmation yet.
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your AI readiness results, ${firstName ?? 'there'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a18;">
          <div style="background: #1a1a18; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">You're all set, ${firstName ?? 'there'}</h1>
          </div>
          <div style="background: white; border: 1px solid #e8e4da; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 20px;">Thanks for taking the AI readiness quiz. Your biggest opportunity based on your answers is <strong>${drain1.toLowerCase()}</strong> — and the prompt on your results page is ready to use right now.</p>
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 28px;">We'll be in touch with more tailored ideas for your business. In the meantime, if you have questions, just reply to this email.</p>
            <p style="font-size: 14px; color: #9a9a92; margin: 0;">— The team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error('Lead capture error:', err);
    // Return success to the user anyway — don't block them from seeing results
    // if your email service has a hiccup.
    return NextResponse.json({ ok: true, warning: 'Email delivery issue' });
  }
}