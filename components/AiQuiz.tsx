'use client';

import { useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ScaleQuestion = {
  id: string;
  type: 'scale';
  num: string;
  text: string;
  hint: string;
  poles: [string, string];
  scaleLabels: [string, string, string, string, string];
};

type ChoiceOption = { main: string; sub?: string };

type ChoiceQuestion = {
  id: string;
  type: 'choice';
  num: string;
  text: string;
  hint: string;
  options: ChoiceOption[];
};

type Question = ScaleQuestion | ChoiceQuestion;

type Answers = Record<string, string | number>;

type Stage = 'quiz' | 'email' | 'results';

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 'time_on_revenue',
    type: 'scale',
    num: 'Question 1 of 6',
    text: 'How much of your workday is spent doing work that actually generates revenue?',
    hint: "1 = Almost all of it  ·  5 = Very little — I'm buried in overhead",
    poles: ['Almost all billable', 'Mostly overhead'],
    scaleLabels: ['Nearly all', 'Mostly yes', 'Half & half', 'Mostly no', 'Rarely'],
  },
  {
    id: 'biggest_time_drain',
    type: 'choice',
    num: 'Question 2 of 6',
    text: 'What eats up the most non-billable time in a typical week?',
    hint: 'Pick the one that hurts the most.',
    options: [
      { main: 'Email & messages', sub: 'Reading, sorting, writing replies that take forever' },
      { main: 'Estimates & proposals', sub: 'Building quotes, scoping work, following up on bids' },
      { main: 'Scheduling & coordination', sub: 'Back-and-forth to book jobs, meetings, or deliveries' },
      { main: 'Customer questions & support', sub: 'Answering the same questions over and over' },
      { main: 'Admin & paperwork', sub: 'Invoices, reports, data entry, filing' },
      { main: 'Marketing & content', sub: 'Social posts, newsletters, website updates' },
    ],
  },
  {
    id: 'second_drain',
    type: 'choice',
    num: 'Question 3 of 6',
    text: "What's your second biggest time drain?",
    hint: "The runner-up problem you'd love to solve.",
    options: [
      { main: 'Email & messages', sub: 'Reading, sorting, writing replies that take forever' },
      { main: 'Estimates & proposals', sub: 'Building quotes, scoping work, following up on bids' },
      { main: 'Scheduling & coordination', sub: 'Back-and-forth to book jobs, meetings, or deliveries' },
      { main: 'Customer questions & support', sub: 'Answering the same questions over and over' },
      { main: 'Admin & paperwork', sub: 'Invoices, reports, data entry, filing' },
      { main: 'Marketing & content', sub: 'Social posts, newsletters, website updates' },
    ],
  },
  {
    id: 'tech_comfort',
    type: 'scale',
    num: 'Question 4 of 6',
    text: 'How comfortable are you with trying new software or tech tools?',
    hint: "1 = I love adopting new tools  ·  5 = I'd rather not touch it",
    poles: ['Early adopter', 'Prefer familiar'],
    scaleLabels: ['Love it', 'Open to it', "If it's easy", 'Reluctant', 'Avoid it'],
  },
  {
    id: 'team_size',
    type: 'choice',
    num: 'Question 5 of 6',
    text: 'How many people are in your business, including yourself?',
    hint: '',
    options: [
      { main: 'Just me', sub: 'Solo operator' },
      { main: '2–5 people', sub: 'Small close-knit team' },
      { main: '6–15 people', sub: 'Growing team' },
      { main: '16–50 people', sub: 'Established operation' },
      { main: '50+ people', sub: 'Larger organization' },
    ],
  },
  {
    id: 'urgency',
    type: 'scale',
    num: 'Question 6 of 6',
    text: 'How urgent is fixing these time problems for you right now?',
    hint: "1 = I need a solution today  ·  5 = It's fine, no rush",
    poles: ['Need it now', 'No rush'],
    scaleLabels: ['Critical', 'High', 'Moderate', 'Low', 'Not urgent'],
  },
];

const PROMPTS: Record<string, { label: string; text: string }> = {
  'Email & messages': {
    label: 'Email & inbox management',
    text: `I run a small business and spend too much time managing email. I need you to help me build a system to handle my inbox more efficiently.

Here's what I need help with:
1. Draft a polished reply to the email I'll paste below
2. Flag whether this email needs urgent action, can wait, or can be archived
3. Suggest a one-line subject label so I can file it

My business is: [DESCRIBE YOUR BUSINESS IN 1-2 SENTENCES]
My typical email volume per day: [NUMBER] emails
My tone preference: [e.g. friendly and professional / direct and brief]

Here is the email I need help with:
[PASTE EMAIL HERE]`,
  },
  'Estimates & proposals': {
    label: 'Estimates & proposals',
    text: `I run a small business and spend hours writing estimates and proposals from scratch. I need you to help me build a reusable template and draft a proposal faster.

Job details:
- Business type: [YOUR BUSINESS TYPE]
- Client name: [CLIENT NAME]
- Scope of work: [DESCRIBE THE JOB IN 2-3 SENTENCES]
- Estimated hours or materials: [YOUR ESTIMATE]
- Your price: $[AMOUNT]

Please write a professional, friendly proposal I can send to this client. It should include a brief intro, a clear scope section, pricing, timeline, and a call to action to accept. Keep it under one page.`,
  },
  'Scheduling & coordination': {
    label: 'Scheduling & coordination',
    text: `I run a small business and waste a lot of time on back-and-forth scheduling. Please help me write a clear, professional message to coordinate [a meeting / job / delivery] with a client or vendor.

Context:
- My business: [DESCRIBE YOUR BUSINESS]
- Who I'm scheduling with: [CLIENT / VENDOR / TEAM MEMBER]
- Purpose: [WHAT IS THIS FOR]
- My available times this week: [LIST 3-4 WINDOWS]
- Any constraints or preferences: [E.G. prefer mornings, avoid Fridays]

Write a short, friendly message that makes it easy for them to pick a time and confirm. Include a clear call to action.`,
  },
  'Customer questions & support': {
    label: 'Customer questions & support',
    text: `I run a small business and spend too much time answering the same customer questions. Help me create a clear, friendly answer to the question below — and suggest how I could turn this into a reusable FAQ.

My business: [DESCRIBE YOUR BUSINESS IN 1-2 SENTENCES]
My tone: [e.g. warm and approachable / professional]

Customer question:
[PASTE THE QUESTION HERE]

Please: (1) Write a thorough, friendly answer I can send directly, (2) Suggest a shorter version for an FAQ page, (3) Note if there's a follow-up question I should anticipate.`,
  },
  'Admin & paperwork': {
    label: 'Admin & paperwork',
    text: `I run a small business and spend too much time on administrative tasks. I need help drafting a professional document or handling a piece of paperwork.

Task type: [e.g. invoice, late payment reminder, vendor agreement summary, internal policy, meeting notes]
My business: [DESCRIBE YOUR BUSINESS]
Context: [DESCRIBE THE SPECIFIC SITUATION IN 2-3 SENTENCES]
Key details to include: [LIST ANY NAMES, AMOUNTS, DATES, OR SPECIFICS]

Please draft the document in a clear, professional format I can use immediately. Flag any fields I need to fill in with [BRACKETS].`,
  },
  'Marketing & content': {
    label: 'Marketing & content',
    text: `I run a small business and struggle to find time to create consistent marketing content. Help me write a piece of content for my business.

My business: [DESCRIBE YOUR BUSINESS — what you do, who you serve]
Content type needed: [e.g. Instagram post, email newsletter, Google Business update, flyer headline]
Topic or angle: [WHAT THIS PIECE SHOULD BE ABOUT]
My tone: [e.g. friendly and local / professional / fun and casual]
Call to action: [WHAT SHOULD THE READER DO — call, book, visit, etc.]

Write 2-3 versions so I can choose. Keep each concise and authentic — no corporate jargon.`,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProfile(answers: Answers) {
  const tech = (answers.tech_comfort as number) || 3;
  const time = (answers.time_on_revenue as number) || 3;
  if (tech <= 2 && time >= 3) return { label: 'Time-Starved Builder', desc: "You're motivated to fix your time problems and open to new tools. You'll see results fast." };
  if (tech >= 4) return { label: 'Steady & Practical', desc: 'You prefer proven, simple solutions. The prompt below is designed to be copy-paste easy.' };
  if (time >= 4) return { label: 'Overhead-Heavy Operator', desc: "Too much of your day is going to non-billable work. AI can start shifting that balance immediately." };
  return { label: 'Efficiency Seeker', desc: "You're running a solid operation and looking for smart ways to do more with less." };
}

function getPainTags(answers: Answers): string[] {
  const tags: string[] = [];
  if (answers.biggest_time_drain) tags.push(answers.biggest_time_drain as string);
  if (answers.second_drain && answers.second_drain !== answers.biggest_time_drain) tags.push(answers.second_drain as string);
  if ((answers.time_on_revenue as number) >= 4) tags.push('Revenue time is limited');
  if ((answers.urgency as number) <= 2) tags.push('High urgency');
  if (answers.team_size) tags.push(`${answers.team_size} team`);
  return tags;
}

function highlightPlaceholders(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    part.startsWith('[') ? (
      <span key={i} style={{ color: '#f5c842' }}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className={`copy-btn ${className}`}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function OtherPromptsAccordion({ currentDrain }: { currentDrain: string }) {
  const [outerOpen, setOuterOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const others = Object.entries(PROMPTS).filter(([key]) => key !== currentDrain);

  return (
    <div className="other-prompts-section">
      <button
        className={`other-prompts-toggle ${outerOpen ? 'open' : ''}`}
        onClick={() => setOuterOpen(o => !o)}
      >
        <span className="other-prompts-toggle-left">
          <span className="other-prompts-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2.5" width="12" height="1.5" rx="0.75" fill="#c8471a" />
              <rect x="1" y="6" width="8" height="1.5" rx="0.75" fill="#c8471a" />
              <rect x="1" y="9.5" width="10" height="1.5" rx="0.75" fill="#c8471a" />
            </svg>
          </span>
          <span>
            <div className="other-prompts-title">Want to see the other prompts?</div>
            <div className="other-prompts-sub">5 more ready-to-use prompts — one for every common SMB time drain</div>
          </span>
        </span>
        <svg className="op-chevron" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {outerOpen && (
        <div className="other-prompts-body open">
          {others.map(([key, val]) => {
            const isOpen = openItem === key;
            return (
              <div key={key} className="op-item">
                <button
                  className={`op-header ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenItem(isOpen ? null : key)}
                >
                  <span className="op-name">{val.label}</span>
                  <svg className="op-chevron" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="op-content open">
                    <div className="op-card">
                      <div className="op-card-header">
                        <CopyButton text={val.text} />
                      </div>
                      <div className="prompt-text">{highlightPlaceholders(val.text)}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AiQuiz() {
  const [stage, setStage] = useState<Stage>('quiz');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bizName, setBizName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const q = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);
  const currentAnswer = answers[q?.id];

  const selectAnswer = useCallback((val: string | number) => {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  }, [q?.id]);

  const goNext = () => {
    if (!currentAnswer && currentAnswer !== 0) return;
    if (current + 1 >= QUESTIONS.length) {
      setStage('email');
    } else {
      setCurrent(c => c + 1);
    }
  };

  const goBack = () => setCurrent(c => c - 1);

  const submitEmail = async () => {
    if (!email || !email.includes('@')) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          bizName,
          answers,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silently continue — don't block the user from seeing results
      // if there's a network hiccup. The API route also has its own fallback.
    } finally {
      setSubmitting(false);
    }

    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const drain1 = (answers.biggest_time_drain as string) || 'Admin & paperwork';
  const promptData = PROMPTS[drain1] ?? PROMPTS['Admin & paperwork'];
  const profile = getProfile(answers);
  const painTags = getPainTags(answers);
  const isLowTech = (answers.tech_comfort as number) >= 4;

  return (
    <>
      <style>{CSS}</style>

      <div className="aq-shell">
        {/* ── Header ── */}
        <header className="aq-site-header">
          <div className="aq-logo-mark">
            <svg viewBox="0 0 18 18" fill="none">
              <path d="M9 2L14.5 5.5V12.5L9 16L3.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="9" cy="9" r="2" fill="white" />
            </svg>
          </div>
          <span className="aq-logo-text">AI Readiness Assessment</span>
        </header>

        {/* ── Hero ── */}
        <section className="aq-hero">
          <div className="aq-hero-eyebrow">Free 2-minute assessment</div>
          <h1 className="aq-hero-h1">Where is your business <em>leaking</em> time?</h1>
          <p className="aq-hero-sub">Answer 6 honest questions about your day. We'll show you exactly where AI can help — and give you a ready-to-use prompt to get started today.</p>
          <div className="aq-hero-meta">
            <span className="aq-meta-item"><span className="aq-dot" />No tech knowledge required</span>
            <span className="aq-meta-item"><span className="aq-dot" />Takes under 2 minutes</span>
            <span className="aq-meta-item"><span className="aq-dot" />Free prompt included</span>
          </div>
        </section>

        <main>
          {/* ══ QUIZ ══ */}
          {stage === 'quiz' && (
            <>
              <div className="aq-progress-wrap">
                <div className="aq-progress-header">
                  <span className="aq-progress-label">Your progress</span>
                  <span className="aq-progress-fraction">{current + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="aq-progress-track">
                  <div className="aq-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="aq-question-wrap" key={current}>
                <div className="aq-question-num">{q.num}</div>
                <div className="aq-question-text">{q.text}</div>
                {q.hint && <div className="aq-question-hint">{q.hint}</div>}

                {q.type === 'scale' ? (
                  <div className="aq-scale-wrap">
                    <div className="aq-scale-poles">
                      <span>{q.poles[0]}</span>
                      <span>{q.poles[1]}</span>
                    </div>
                    <div className="aq-scale-btns">
                      {([1, 2, 3, 4, 5] as const).map(n => (
                        <button
                          key={n}
                          className={`aq-scale-btn ${currentAnswer === n ? 'selected' : ''}`}
                          onClick={() => selectAnswer(n)}
                        >
                          <span className="aq-scale-num">{n}</span>
                          <span className="aq-scale-label">{q.scaleLabels[n - 1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="aq-options-list">
                    {q.options.map((opt, i) => (
                      <button
                        key={opt.main}
                        className={`aq-option ${currentAnswer === opt.main ? 'selected' : ''}`}
                        onClick={() => selectAnswer(opt.main)}
                      >
                        <span className="aq-option-letter">{'ABCDEF'[i]}</span>
                        <span className="aq-option-body">
                          <span className="aq-option-main">{opt.main}</span>
                          {opt.sub && <span className="aq-option-sub">{opt.sub}</span>}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="aq-btn-row">
                  {current > 0 && (
                    <button className="aq-btn-back" onClick={goBack}>← Back</button>
                  )}
                  <button
                    className="aq-btn-primary"
                    onClick={goNext}
                    disabled={currentAnswer === undefined}
                  >
                    {current === QUESTIONS.length - 1 ? 'Continue →' : 'Next →'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ══ EMAIL GATE ══ */}
          {stage === 'email' && (
            <div className="aq-email-gate">
              <h2 className="aq-email-h2">One last step — where should we send your results?</h2>
              <p className="aq-email-p">We'll show your AI prompt on screen right away. We may also follow up with additional tips specific to your situation.</p>

              <div className="aq-form-row">
                <div className="aq-form-group">
                  <label className="aq-form-label">First name</label>
                  <input className="aq-form-input" type="text" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="aq-form-group">
                  <label className="aq-form-label">Last name</label>
                  <input className="aq-form-input" type="text" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="aq-form-group">
                <label className="aq-form-label">Work email</label>
                <input
                  className={`aq-form-input ${emailError ? 'error' : ''}`}
                  type="email"
                  placeholder="jane@yourcompany.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError(false); }}
                />
                {emailError && <span className="aq-field-error">Please enter a valid email address.</span>}
              </div>
              <div className="aq-form-group">
                <label className="aq-form-label">Business name</label>
                <input className="aq-form-input" type="text" placeholder="Smith Consulting LLC" value={bizName} onChange={e => setBizName(e.target.value)} />
              </div>

              <div className="aq-btn-row" style={{ marginTop: '20px' }}>
                <button className="aq-btn-primary" onClick={submitEmail} disabled={submitting}>
                  {submitting ? 'Sending…' : 'Show my AI prompt →'}
                </button>
              </div>
              <p className="aq-form-fine">We respect your privacy. No spam — ever. Your information helps us personalize your results and follow up with resources relevant to your business.</p>
            </div>
          )}

          {/* ══ RESULTS ══ */}
          {stage === 'results' && (
            <div className="aq-results-wrap">
              <div className="aq-results-header">
                <div className="aq-results-eyebrow">
                  <span className="aq-check-circle">
                    <svg viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Assessment complete
                </div>
                <h2 className="aq-results-h2">Here's where AI can help you, {firstName || 'there'}</h2>
                <p className="aq-results-p">Based on your answers, your biggest opportunity is <strong>{drain1.toLowerCase()}</strong>. Below is a ready-to-use prompt you can paste into any AI tool in the next 5 minutes.</p>
              </div>

              <div className="aq-profile-badge">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#c8471a" strokeWidth="1.3" />
                  <path d="M7 4v4M7 9.5v.5" stroke="#c8471a" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Your profile: {profile.label} — {profile.desc}
              </div>

              <p className="aq-section-label">Your top friction points</p>
              <div className="aq-pain-tags">
                {painTags.map(t => <span key={t} className="aq-pain-tag">{t}</span>)}
              </div>

              <p className="aq-section-label" style={{ marginBottom: '16px' }}>Your ready-to-use AI prompt</p>
              <div className="aq-prompt-card">
                <div className="aq-prompt-card-header">
                  <span className="aq-prompt-card-title">Copy & paste this prompt</span>
                  <CopyButton text={promptData.text} />
                </div>
                <div className="prompt-text">{highlightPlaceholders(promptData.text)}</div>
              </div>

              <div className="aq-steps-title" style={{ marginTop: '36px' }}>How to use this prompt</div>
              <div className="aq-steps-list">
                {[
                  { heading: 'Copy the prompt above', desc: 'Click the "Copy" button. The entire prompt is now on your clipboard.' },
                  {
                    heading: 'Open a free AI chat tool',
                    desc: `Any of these work great — they're all free to start${isLowTech ? ', and none require technical knowledge' : ''}.`,
                    links: true,
                  },
                  {
                    heading: <><span>Fill in the </span><span style={{ color: '#b8860b', fontFamily: 'monospace', fontSize: '13px' }}>[BRACKETED]</span><span> fields</span></>,
                    desc: 'Replace each yellow placeholder with your own details — your business name, the email you\'re replying to, the job scope, etc.',
                  },
                  { heading: 'Hit send and see what comes back', desc: 'The AI will respond in seconds. If you want it adjusted, just ask — "make it shorter" or "use a more formal tone" works perfectly.' },
                ].map((step, i, arr) => (
                  <div key={i} className={`aq-step-item ${i < arr.length - 1 ? 'has-line' : ''}`}>
                    <div className="aq-step-num">{i + 1}</div>
                    <div className="aq-step-content">
                      <div className="aq-step-heading">{step.heading}</div>
                      <div className="aq-step-desc">{step.desc}</div>
                      {step.links && (
                        <div className="aq-ai-links">
                          {[
                            { label: 'Claude (Anthropic)', href: 'https://claude.ai' },
                            { label: 'ChatGPT (OpenAI)', href: 'https://chatgpt.com' },
                            { label: 'Grok (xAI)', href: 'https://grok.com' },
                            { label: 'Gemini (Google)', href: 'https://gemini.google.com' },
                          ].map(l => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="aq-ai-link">{l.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <OtherPromptsAccordion currentDrain={drain1} />

              <div className="aq-next-card">
                <h3 className="aq-next-card-h3">Want more help like this?</h3>
                <p className="aq-next-card-p">We work with small businesses to find the highest-value AI opportunities in their workflow — no jargon, no expensive software. We'll be in touch with more ideas tailored to your situation.</p>
              </div>
            </div>
          )}
        </main>

        <footer className="aq-footer">© 2025 AI Readiness Assessment. Built to help small businesses work smarter.</footer>
      </div>
    </>
  );
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────
// All classes are prefixed with "aq-" to avoid conflicts with your site's styles.

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .aq-shell {
    --ink: #1a1a18; --ink-mid: #4a4a45; --ink-light: #9a9a92;
    --paper: #f5f2eb; --accent: #c8471a; --accent-light: #f0ddd6;
    --green: #2a6b4a; --border: rgba(26,26,24,0.12);
    font-family: 'DM Sans', sans-serif;
    background: var(--paper); color: var(--ink);
    min-height: 100vh; font-size: 16px; line-height: 1.6;
    max-width: 680px; margin: 0 auto; padding: 0 24px;
    display: flex; flex-direction: column;
  }

  .aq-site-header { padding: 32px 0 0; display: flex; align-items: center; gap: 10px; }
  .aq-logo-mark { width: 32px; height: 32px; background: var(--ink); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aq-logo-mark svg { width: 18px; height: 18px; }
  .aq-logo-text { font-size: 13px; font-weight: 500; letter-spacing: 0.03em; color: var(--ink-mid); }

  .aq-hero { padding: 56px 0 40px; border-bottom: 1px solid var(--border); margin-bottom: 48px; }
  .aq-hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
  .aq-hero-h1 { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 6vw, 48px); line-height: 1.12; color: var(--ink); margin-bottom: 18px; }
  .aq-hero-h1 em { font-style: italic; color: var(--accent); }
  .aq-hero-sub { font-size: 16px; color: var(--ink-mid); max-width: 480px; line-height: 1.65; }
  .aq-hero-meta { margin-top: 24px; display: flex; gap: 24px; flex-wrap: wrap; }
  .aq-meta-item { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--ink-mid); }
  .aq-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; display: inline-block; }

  .aq-progress-wrap { margin-bottom: 36px; }
  .aq-progress-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .aq-progress-label { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-light); }
  .aq-progress-fraction { font-family: 'Instrument Serif', serif; font-size: 22px; color: var(--ink); }
  .aq-progress-track { height: 2px; background: var(--border); border-radius: 99px; overflow: hidden; }
  .aq-progress-fill { height: 100%; background: var(--accent); border-radius: 99px; transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }

  @keyframes aqFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .aq-question-wrap { animation: aqFadeUp 0.35s ease both; }
  .aq-question-num { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .aq-question-text { font-family: 'Instrument Serif', serif; font-size: clamp(20px,4vw,26px); line-height: 1.3; color: var(--ink); margin-bottom: 8px; }
  .aq-question-hint { font-size: 13px; color: var(--ink-light); margin-bottom: 28px; }

  .aq-options-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
  .aq-option { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; background: white; border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer; text-align: left; width: 100%; font-family: 'DM Sans', sans-serif; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
  .aq-option:hover { border-color: rgba(200,71,26,0.3); background: #fdfaf7; transform: translateX(2px); }
  .aq-option.selected { border-color: var(--accent); background: var(--accent-light); }
  .aq-option-letter { width: 24px; height: 24px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: var(--ink-light); flex-shrink: 0; margin-top: 1px; transition: border-color 0.15s, background 0.15s, color 0.15s; }
  .aq-option.selected .aq-option-letter { border-color: var(--accent); background: var(--accent); color: white; }
  .aq-option-main { font-size: 15px; color: var(--ink); line-height: 1.4; display: block; }
  .aq-option-sub { font-size: 12px; color: var(--ink-light); margin-top: 3px; display: block; }

  .aq-scale-wrap { margin-bottom: 32px; }
  .aq-scale-poles { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px; color: var(--ink-light); }
  .aq-scale-btns { display: flex; gap: 8px; }
  .aq-scale-btn { flex: 1; aspect-ratio: 1; max-width: 80px; border: 1.5px solid var(--border); border-radius: 10px; background: white; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; transition: border-color 0.15s, background 0.15s; font-family: 'DM Sans', sans-serif; }
  .aq-scale-btn:hover { border-color: rgba(200,71,26,0.35); }
  .aq-scale-btn.selected { border-color: var(--accent); background: var(--accent-light); }
  .aq-scale-num { font-family: 'Instrument Serif', serif; font-size: 22px; color: var(--ink); line-height: 1; }
  .aq-scale-btn.selected .aq-scale-num { color: var(--accent); }
  .aq-scale-label { font-size: 10px; color: var(--ink-light); font-weight: 500; }

  .aq-btn-row { display: flex; gap: 12px; align-items: center; margin-bottom: 48px; }
  .aq-btn-primary { padding: 13px 28px; background: var(--ink); color: var(--paper); border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: opacity 0.15s, transform 0.1s; letter-spacing: 0.01em; }
  .aq-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
  .aq-btn-primary:not(:disabled):hover { opacity: 0.82; }
  .aq-btn-primary:not(:disabled):active { transform: scale(0.98); }
  .aq-btn-back { padding: 13px 20px; background: transparent; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink-mid); cursor: pointer; transition: border-color 0.15s, color 0.15s; }
  .aq-btn-back:hover { border-color: var(--ink-mid); color: var(--ink); }

  .aq-email-gate { animation: aqFadeUp 0.35s ease both; }
  .aq-email-h2 { font-family: 'Instrument Serif', serif; font-size: clamp(22px,4vw,30px); margin-bottom: 10px; line-height: 1.25; }
  .aq-email-p { font-size: 14px; color: var(--ink-mid); margin-bottom: 28px; line-height: 1.65; }
  .aq-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .aq-form-group { margin-bottom: 16px; }
  .aq-form-label { display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mid); margin-bottom: 7px; }
  .aq-form-input { width: 100%; padding: 13px 16px; background: white; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--ink); outline: none; transition: border-color 0.15s; }
  .aq-form-input:focus { border-color: var(--accent); }
  .aq-form-input::placeholder { color: var(--ink-light); }
  .aq-form-input.error { border-color: var(--accent); }
  .aq-field-error { font-size: 12px; color: var(--accent); margin-top: 4px; display: block; }
  .aq-form-fine { font-size: 12px; color: var(--ink-light); margin-top: 14px; line-height: 1.6; }

  .aq-results-wrap { animation: aqFadeUp 0.4s ease both; padding-bottom: 80px; }
  .aq-results-header { padding: 32px 0 28px; border-bottom: 1px solid var(--border); margin-bottom: 36px; }
  .aq-results-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .aq-check-circle { width: 18px; height: 18px; background: var(--green); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aq-check-circle svg { width: 10px; height: 10px; }
  .aq-results-h2 { font-family: 'Instrument Serif', serif; font-size: clamp(24px,5vw,36px); line-height: 1.2; margin-bottom: 10px; }
  .aq-results-p { font-size: 14px; color: var(--ink-mid); line-height: 1.65; }

  .aq-profile-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; background: var(--accent-light); border: 1px solid rgba(200,71,26,0.2); border-radius: 8px; margin-bottom: 32px; font-size: 13px; color: var(--accent); font-weight: 500; }
  .aq-section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-light); margin-bottom: 14px; display: block; }
  .aq-pain-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
  .aq-pain-tag { padding: 6px 14px; background: white; border: 1px solid var(--border); border-radius: 99px; font-size: 13px; color: var(--ink-mid); }

  .aq-prompt-card { background: var(--ink); border-radius: 12px; overflow: hidden; margin-bottom: 28px; }
  .aq-prompt-card-header { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; }
  .aq-prompt-card-title { font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
  .copy-btn { padding: 5px 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 12px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 0.15s, color 0.15s; }
  .copy-btn:hover { background: rgba(255,255,255,0.18); color: white; }
  .prompt-text { padding: 20px; font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.85); white-space: pre-wrap; font-family: 'Courier New', monospace; }

  .aq-steps-title { font-family: 'Instrument Serif', serif; font-size: 20px; margin-bottom: 20px; }
  .aq-steps-list { display: flex; flex-direction: column; }
  .aq-step-item { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
  .aq-step-item.has-line::before { content: ''; position: absolute; left: 15px; top: 32px; bottom: 0; width: 1px; background: var(--border); }
  .aq-step-num { width: 32px; height: 32px; border-radius: 50%; background: white; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-family: 'Instrument Serif', serif; font-size: 15px; color: var(--ink); flex-shrink: 0; }
  .aq-step-heading { font-size: 15px; font-weight: 500; color: var(--ink); margin-bottom: 4px; margin-top: 5px; }
  .aq-step-desc { font-size: 13px; color: var(--ink-mid); line-height: 1.6; }
  .aq-ai-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .aq-ai-link { padding: 6px 14px; background: white; border: 1.5px solid var(--border); border-radius: 6px; font-size: 13px; color: var(--ink); text-decoration: none; transition: border-color 0.15s; font-weight: 500; }
  .aq-ai-link:hover { border-color: var(--ink-mid); }

  .other-prompts-section { margin-top: 36px; }
  .other-prompts-toggle { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; background: white; border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: border-color 0.15s, background 0.15s; text-align: left; }
  .other-prompts-toggle:hover { border-color: rgba(200,71,26,0.35); background: #fdfaf7; }
  .other-prompts-toggle.open { border-color: var(--accent); border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
  .other-prompts-toggle-left { display: flex; align-items: center; gap: 12px; }
  .other-prompts-icon { width: 28px; height: 28px; background: var(--accent-light); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .other-prompts-title { font-size: 15px; font-weight: 500; color: var(--ink); }
  .other-prompts-sub { font-size: 12px; color: var(--ink-light); margin-top: 2px; }
  .op-chevron { transition: transform 0.25s ease; flex-shrink: 0; }
  .other-prompts-toggle.open .op-chevron { transform: rotate(180deg); }
  .other-prompts-body { background: white; border: 1.5px solid var(--accent); border-top: none; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; overflow: hidden; }
  .op-item { border-bottom: 1px solid var(--border); }
  .op-item:last-child { border-bottom: none; }
  .op-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: left; transition: background 0.12s; }
  .op-header:hover, .op-header.open { background: var(--paper); }
  .op-name { font-size: 14px; font-weight: 500; color: var(--ink); }
  .op-content { padding: 0 20px 16px; }
  .op-card { background: var(--ink); border-radius: 8px; overflow: hidden; }
  .op-card-header { padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: flex-end; }

  .aq-next-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-top: 32px; }
  .aq-next-card-h3 { font-family: 'Instrument Serif', serif; font-size: 20px; margin-bottom: 8px; }
  .aq-next-card-p { font-size: 14px; color: var(--ink-mid); line-height: 1.65; }

  .aq-footer { margin-top: auto; padding: 32px 0; border-top: 1px solid var(--border); font-size: 12px; color: var(--ink-light); }

  @media (max-width: 480px) {
    .aq-form-row { grid-template-columns: 1fr; }
    .aq-scale-btns { gap: 5px; }
  }
`;
