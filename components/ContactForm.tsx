'use client';

import { useState } from 'react';
import Script from 'next/script';

// ─── Types ────────────────────────────────────────────────────────────────────

type HelpOption = 'Get SEO report on my site' | 'Book an assessment call' | 'Book an in-person event' | 'Something else';

const HELP_OPTIONS: HelpOption[] = [
  'Get SEO report on my site', 
  'Book an assessment call',
  'Book an in-person event',
  'Something else',
];

type Stage = 'form' | 'success';

// ─── Turnstile widget ─────────────────────────────────────────────────────────
// Renders Cloudflare's invisible/smart bot check.
// The widget calls window.onTurnstileSuccess when verified.

declare global {
  interface Window {
    turnstile: {
      render: (el: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileSuccess: (token: string) => void;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContactForm() {
  const [stage, setStage] = useState<Stage>('form');

  // Field state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [website, setWebsite]     = useState('');
  const [helpWith, setHelpWith]   = useState<HelpOption[]>([]);
  const [message, setMessage]     = useState('');

  // UI state
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  // Expose callback for Turnstile to call after verification
  if (typeof window !== 'undefined') {
    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token);
  }

  const toggleHelp = (opt: HelpOption) => {
    setHelpWith(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = 'First name is required.';
    if (!lastName.trim())  e.lastName  = 'Last name is required.';
    if (!email.trim() || !email.includes('@')) e.email = 'A valid email is required.';
    if (helpWith.length === 0) e.helpWith = 'Please select at least one option.';
    if (!turnstileToken) e.turnstile = 'Please complete the security check.';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, website,
          helpWith, message, turnstileToken,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data?.error === 'bot') {
          setErrors({ turnstile: 'Security check failed. Please refresh and try again.' });
          return;
        }
        throw new Error('Server error');
      }

      setStage('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Load Turnstile script once */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => setTurnstileReady(true)}
      />

      <style>{CSS}</style>

      <div className="cf-shell">

        {/* ══ FORM ══ */}
        {stage === 'form' && (
          <div className="cf-form-wrap">

            <div className="cf-header">
              <div className="cf-eyebrow">Let's Talk</div>
              <h2 className="cf-heading">Tell us what's<br />wasting your time.</h2>
              <p className="cf-sub">Use this form to share your biggest challenges and we'll talk about your business.</p>
            </div>

            {/* Name row */}
            <div className="cf-row-2">
              <div className="cf-field">
                <label className="cf-label">First name <span className="cf-req">*</span></label>
                <input
                  className={`cf-input ${errors.firstName ? 'error' : ''}`}
                  type="text"
                  placeholder="Jane"
                  value={firstName}
                  autoComplete="given-name"
                  onChange={e => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: '' })); }}
                />
                {errors.firstName && <span className="cf-error">{errors.firstName}</span>}
              </div>
              <div className="cf-field">
                <label className="cf-label">Last name <span className="cf-req">*</span></label>
                <input
                  className={`cf-input ${errors.lastName ? 'error' : ''}`}
                  type="text"
                  placeholder="Smith"
                  value={lastName}
                  autoComplete="family-name"
                  onChange={e => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: '' })); }}
                />
                {errors.lastName && <span className="cf-error">{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="cf-field">
              <label className="cf-label">Email <span className="cf-req">*</span></label>
              <input
                className={`cf-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="jane@yourcompany.com"
                value={email}
                autoComplete="email"
                onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
              />
              {errors.email && <span className="cf-error">{errors.email}</span>}
            </div>

            {/* Website (optional) */}
            <div className="cf-field">
              <label className="cf-label">
                Website <span className="cf-optional">optional, but required for an SEO audit</span>
              </label>
              <input
                className="cf-input"
                type="url"
                placeholder="https://yourcompany.com"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>

            {/* How can we help — multi-checkbox */}
            <div className="cf-field">
              <label className="cf-label">
                How can we help you? <span className="cf-req">*</span>
              </label>
              <p className="cf-field-hint">Select all that apply.</p>
              <div className="cf-check-list">
                {HELP_OPTIONS.map(opt => {
                  const checked = helpWith.includes(opt);
                  return (
                    <button
                      key={opt}
                      className={`cf-check-btn ${checked ? 'checked' : ''}`}
                      onClick={() => { toggleHelp(opt); setErrors(prev => ({ ...prev, helpWith: '' })); }}
                      type="button"
                    >
                      <span className="cf-checkbox">
                        {checked && (
                          <svg viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="cf-check-label">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {errors.helpWith && <span className="cf-error">{errors.helpWith}</span>}
            </div>

            {/* Message (optional) */}
            <div className="cf-field">
              <label className="cf-label">
                Anything else you'd like us to know? <span className="cf-optional">optional</span>
              </label>
              <textarea
                className="cf-textarea"
                placeholder="Tell us a bit about your business or what's on your mind…"
                value={message}
                rows={4}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            {/* Turnstile bot check */}
            <div className="cf-field">
              <div
                className="cf-turnstile"
                id="cf-turnstile-widget"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'}
                data-callback="onTurnstileSuccess"
                data-theme="light"
                ref={el => {
                  // Auto-render when script is ready and element mounts
                  if (el && turnstileReady && !el.children.length && window.turnstile) {
                    window.turnstile.render(el, {
                      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
                      callback: (token: string) => setTurnstileToken(token),
                      theme: 'light',
                    });
                  }
                }}
              />
              {errors.turnstile && <span className="cf-error">{errors.turnstile}</span>}
            </div>

            {errors.submit && (
              <div className="cf-submit-error">{errors.submit}</div>
            )}

            <button
              className="cf-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send message →'}
            </button>

            <p className="cf-fine">We respect your privacy and will never share your information.</p>
          </div>
        )}

        {/* ══ SUCCESS ══ */}
        {stage === 'success' && (
          <div className="cf-success-wrap">
            <div className="cf-success-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 20l6 6 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="cf-success-heading">Message received!</h2>
            <p className="cf-success-sub">
              Thanks, <strong>{firstName}</strong>. We've got your information and will reach out within one business day with personalized insights for your business.
            </p>
            {helpWith.includes('Book an assessment call') && (
              <div className="cf-success-note">
                <span className="cf-success-note-icon">📋</span>
                <span>You're interested in an assessment call — we'll include available times in our response.</span>
              </div>
            )}
            {helpWith.includes('Book an in-person event') && (
              <div className="cf-success-note">
                <span className="cf-success-note-icon">🎯</span>
                <span>You mentioned an in-person event — we'll follow up with dates and details.</span>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────
// Prefixed "cf-" to avoid conflicts. Matches the design system of the front page & AiQuiz.

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .cf-shell {
    font-family: 'DM Sans', sans-serif;
    background: rgba(26,26,24,0.03); color: inherit;
    font-size: 16px; line-height: 1.6;
    max-width: 600px; margin: 0 auto; padding: 64px 40px;
    border-radius: 16px;
  }

  @keyframes cfFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Header */
  .cf-form-wrap { animation: cfFadeUp 0.35s ease both; }
  .cf-header { padding-bottom: 40px; margin-bottom: 40px; }
  .cf-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #2563eb; margin-bottom: 14px; display: inline-block; }
  .cf-heading { font-family: 'Instrument Serif', serif; font-size: clamp(28px, 5vw, 42px); line-height: 1.15; margin-bottom: 16px; font-weight: 600; letter-spacing: -0.01em; }
  .cf-sub { font-size: 16px; color: var(--ink-mid, #4a4a45); line-height: 1.65; max-width: 480px; }

  /* Fields */
  .cf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .cf-field { margin-bottom: 24px; }
  .cf-label { display: block; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mid, #4a4a45); margin-bottom: 10px; }
  .cf-req { color: var(--accent, #c8471a); }
  .cf-optional { font-size: 12px; font-weight: 400; letter-spacing: 0; text-transform: none; color: var(--ink-light, #9a9a92); margin-left: 6px; }
  .cf-field-hint { font-size: 13px; color: var(--ink-light, #9a9a92); margin-bottom: 12px; margin-top: -4px; }

  .cf-input {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,0.5); border: 1.5px solid rgba(0,0,0,0.08);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; color: var(--ink, #1a1a18); outline: none;
    transition: border-color 0.15s, background 0.15s; box-sizing: border-box;
  }
  .cf-input:focus { border-color: var(--accent, #c8471a); background: white; }
  .cf-input::placeholder { color: var(--ink-light, #9a9a92); }
  .cf-input.error { border-color: var(--accent, #c8471a); background: rgba(200,71,26,0.08); }

  .cf-textarea {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,0.5); border: 1.5px solid rgba(0,0,0,0.08);
    border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; color: var(--ink, #1a1a18); outline: none;
    transition: border-color 0.15s, background 0.15s; resize: vertical;
    box-sizing: border-box; line-height: 1.6;
  }
  .cf-textarea:focus { border-color: var(--accent, #c8471a); background: white; }
  .cf-textarea::placeholder { color: var(--ink-light, #9a9a92); }

  .cf-error { display: block; font-size: 13px; color: var(--accent, #c8471a); margin-top: 6px; font-weight: 500; }

  /* Checkboxes */
  .cf-check-list { display: flex; flex-direction: column; gap: 12px; }
  .cf-check-btn {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 18px; background: rgba(255,255,255,0.5);
    border: 1.5px solid rgba(0,0,0,0.08); border-radius: 10px;
    cursor: pointer; text-align: left; width: 100%;
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
  }
  .cf-check-btn:hover { border-color: rgba(200,71,26,0.3); background: rgba(200,71,26,0.05); transform: translateX(2px); }
  .cf-check-btn.checked { border-color: var(--accent, #c8471a); background: rgba(200,71,26,0.1); }

  .cf-checkbox {
    width: 20px; height: 20px; border-radius: 6px;
    border: 1.5px solid rgba(0,0,0,0.25); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .cf-check-btn.checked .cf-checkbox { background: #1a1a18 !important; border-color: #1a1a18 !important; }
  .cf-checkbox svg { width: 12px; height: 12px; }
  .cf-check-label { font-size: 15px; color: var(--ink, #1a1a18); font-weight: 500; }

  /* Turnstile */
  .cf-turnstile { margin-top: 6px; min-height: 65px; }

  /* Submit error */
  .cf-submit-error {
    padding: 14px 16px; background: rgba(200,71,26,0.08);
    border: 1px solid rgba(200,71,26,0.2); border-radius: 10px;
    font-size: 14px; color: var(--accent, #c8471a); margin-bottom: 20px;
    font-weight: 500;
  }

  /* Submit button */
  .cf-submit-btn {
    padding: 14px 32px; background: #c8471a; color: white;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer;
    transition: background 0.15s, opacity 0.15s, transform 0.1s; letter-spacing: 0.01em;
    margin-top: 8px; width: 100%;
  }
  .cf-submit-btn:disabled { background: #9a9a92; color: white; cursor: not-allowed; }
  .cf-submit-btn:not(:disabled):hover { background: #a93d16; }
  .cf-submit-btn:not(:disabled):active { transform: scale(0.98); }

  .cf-fine { font-size: 13px; color: var(--ink-light, #9a9a92); margin-top: 16px; line-height: 1.6; }

  /* Success */
  .cf-success-wrap {
    animation: cfFadeUp 0.4s ease both;
    padding: 60px 0;
    text-align: center;
    max-width: 480px;
    margin: 0 auto;
  }
  .cf-success-icon { width: 56px; height: 56px; margin: 0 auto 28px; }
  .cf-success-icon svg { width: 100%; height: 100%; }
  .cf-success-heading { font-family: 'Instrument Serif', serif; font-size: clamp(28px, 5vw, 40px); margin-bottom: 14px; font-weight: 600; letter-spacing: -0.01em; }
  .cf-success-sub { font-size: 16px; color: var(--ink-mid, #4a4a45); line-height: 1.7; margin-bottom: 28px; }
  .cf-success-note {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 16px 18px; background: rgba(255,255,255,0.5);
    border: 1px solid rgba(0,0,0,0.08); border-radius: 10px;
    font-size: 15px; color: var(--ink-mid, #4a4a45); line-height: 1.6;
    text-align: left; margin-bottom: 12px;
  }
  .cf-success-note-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }

  @media (max-width: 480px) {
    .cf-row-2 { grid-template-columns: 1fr; gap: 16px; }
    .cf-submit-btn { width: 100%; }
  }
`;
