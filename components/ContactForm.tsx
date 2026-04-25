'use client';

import { useState } from 'react';
import Script from 'next/script';

// ─── Types ────────────────────────────────────────────────────────────────────

type HelpOption = 'Book an assessment call' | 'Book an in-person event' | 'Something else';

const HELP_OPTIONS: HelpOption[] = [
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
              <div className="cf-eyebrow">Get in touch</div>
              <h2 className="cf-heading">Let's talk about your business</h2>
              <p className="cf-sub">Tell us a little about yourself and what you're looking for. We'll be in touch within one business day.</p>
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
                Website <span className="cf-optional">optional</span>
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
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#2a6b4a" />
                <path d="M9 16l5 5 9-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="cf-success-heading">Message sent!</h2>
            <p className="cf-success-sub">
              Thanks, <strong>{firstName}</strong>. We've received your message and will be in touch within one business day.
            </p>
            {helpWith.includes('Book an assessment call') && (
              <div className="cf-success-note">
                <span className="cf-success-note-icon">📅</span>
                <span>You mentioned you'd like to book an assessment call — we'll include scheduling options in our reply.</span>
              </div>
            )}
            {helpWith.includes('Book an in-person event') && (
              <div className="cf-success-note">
                <span className="cf-success-note-icon">🎤</span>
                <span>You mentioned an in-person event — we'll follow up with availability and details.</span>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────
// Prefixed "cf-" to avoid conflicts. Inherits the same design tokens as AiQuiz.

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .cf-shell {
    --ink: #1a1a18; --ink-mid: #4a4a45; --ink-light: #9a9a92;
    --paper: #f5f2eb; --accent: #c8471a; --accent-light: #f0ddd6;
    --green: #2a6b4a; --border: rgba(26,26,24,0.12);
    font-family: 'DM Sans', sans-serif;
    background: var(--paper); color: var(--ink);
    font-size: 16px; line-height: 1.6;
    max-width: 580px; margin: 0 auto; padding: 0 24px 64px;
  }

  @keyframes cfFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Header */
  .cf-form-wrap { animation: cfFadeUp 0.35s ease both; }
  .cf-header { padding: 48px 0 36px; border-bottom: 1px solid var(--border); margin-bottom: 36px; }
  .cf-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .cf-heading { font-family: 'Instrument Serif', serif; font-size: clamp(26px, 5vw, 38px); line-height: 1.15; margin-bottom: 12px; }
  .cf-sub { font-size: 15px; color: var(--ink-mid); line-height: 1.65; max-width: 440px; }

  /* Fields */
  .cf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .cf-field { margin-bottom: 20px; }
  .cf-label { display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mid); margin-bottom: 8px; }
  .cf-req { color: var(--accent); }
  .cf-optional { font-size: 11px; font-weight: 400; letter-spacing: 0; text-transform: none; color: var(--ink-light); margin-left: 4px; }
  .cf-field-hint { font-size: 12px; color: var(--ink-light); margin-bottom: 10px; margin-top: -4px; }

  .cf-input {
    width: 100%; padding: 13px 16px;
    background: white; border: 1.5px solid var(--border);
    border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; color: var(--ink); outline: none;
    transition: border-color 0.15s; box-sizing: border-box;
  }
  .cf-input:focus { border-color: var(--accent); }
  .cf-input::placeholder { color: var(--ink-light); }
  .cf-input.error { border-color: var(--accent); background: #fdf5f3; }

  .cf-textarea {
    width: 100%; padding: 13px 16px;
    background: white; border: 1.5px solid var(--border);
    border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; color: var(--ink); outline: none;
    transition: border-color 0.15s; resize: vertical;
    box-sizing: border-box; line-height: 1.6;
  }
  .cf-textarea:focus { border-color: var(--accent); }
  .cf-textarea::placeholder { color: var(--ink-light); }

  .cf-error { display: block; font-size: 12px; color: var(--accent); margin-top: 6px; }

  /* Checkboxes */
  .cf-check-list { display: flex; flex-direction: column; gap: 10px; }
  .cf-check-btn {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; background: white;
    border: 1.5px solid var(--border); border-radius: 10px;
    cursor: pointer; text-align: left; width: 100%;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
  }
  .cf-check-btn:hover { border-color: rgba(200,71,26,0.3); background: #fdfaf7; transform: translateX(2px); }
  .cf-check-btn.checked { border-color: var(--accent); background: var(--accent-light); }

  .cf-checkbox {
    width: 20px; height: 20px; border-radius: 5px;
    border: 1.5px solid var(--border); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.15s, background 0.15s;
  }
  .cf-check-btn.checked .cf-checkbox { background: var(--accent); border-color: var(--accent); }
  .cf-checkbox svg { width: 12px; height: 12px; }
  .cf-check-label { font-size: 15px; color: var(--ink); }

  /* Turnstile */
  .cf-turnstile { margin-top: 4px; min-height: 65px; }

  /* Submit error */
  .cf-submit-error {
    padding: 12px 16px; background: #fdf5f3;
    border: 1px solid rgba(200,71,26,0.25); border-radius: 8px;
    font-size: 13px; color: var(--accent); margin-bottom: 16px;
  }

  /* Submit button */
  .cf-submit-btn {
    padding: 14px 32px; background: var(--ink); color: var(--paper);
    border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500; cursor: pointer;
    transition: opacity 0.15s, transform 0.1s; letter-spacing: 0.01em;
    margin-top: 8px;
  }
  .cf-submit-btn:disabled { opacity: 0.38; cursor: not-allowed; }
  .cf-submit-btn:not(:disabled):hover { opacity: 0.82; }
  .cf-submit-btn:not(:disabled):active { transform: scale(0.98); }

  .cf-fine { font-size: 12px; color: var(--ink-light); margin-top: 14px; line-height: 1.6; }

  /* Success */
  .cf-success-wrap {
    animation: cfFadeUp 0.4s ease both;
    padding: 64px 0;
    text-align: center;
    max-width: 440px;
    margin: 0 auto;
  }
  .cf-success-icon { width: 56px; height: 56px; margin: 0 auto 24px; }
  .cf-success-icon svg { width: 56px; height: 56px; }
  .cf-success-heading { font-family: 'Instrument Serif', serif; font-size: clamp(28px, 5vw, 38px); margin-bottom: 12px; }
  .cf-success-sub { font-size: 15px; color: var(--ink-mid); line-height: 1.7; margin-bottom: 24px; }
  .cf-success-note {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 18px; background: white;
    border: 1px solid var(--border); border-radius: 10px;
    font-size: 14px; color: var(--ink-mid); line-height: 1.5;
    text-align: left; margin-bottom: 10px;
  }
  .cf-success-note-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

  @media (max-width: 480px) {
    .cf-row-2 { grid-template-columns: 1fr; }
  }
`;
