'use client'
import Link from "next/link"

export function WhySection() {
  return (
    <section id="why" className="bg-ink text-white px-[5%] py-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-sans text-xs font-bold tracking-widest uppercase text-blue-300 mb-3">
          Our pitch
        </div>
        <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-8 text-white">
          You don't need another AI tool.
          <br />
          You need a clear-eyed human guide.
        </h2>
        <div className="space-y-5 text-lg text-slate-400 leading-relaxed max-w-[800px]">
          <p>
            Most small business owners aren't losing to bad products or poor service — they're losing hours every week to repetitive tasks, unqualified leads, scattered data, and the constant pressure to "do something with AI" before they understand what actually fits.
          </p>
          <p>
            That's where we come in.
          </p>
          <p>
            At Your AI Guide, we don't build custom systems, manage software, or leave you with another thing to maintain. <span className="text-yellow-300 font-semibold">We give you clarity</span>.
          </p>
          <p>
            We learn how your business really works, then deliver straightforward, prioritized guidance through targeted services such as:
          </p>
          <ul className="space-y-2 text-slate-300 pl-5 list-disc">
            <li>AI tools and roadmaps</li>
            <li>What workflows you can automate with AI</li>
            <li>SEO and website health reports</li>
            <li>Social Media and content strategy</li>
            <li>AI security best-practices</li>
            <li>Monthly retainers for AI support</li>
          </ul>
          <p>
            No jargon. No six-figure overhauls. Just practical insights and simple next steps you can act on immediately — whether you implement them yourself or hand them to your team.
          </p>
          <p className="text-white">
            The result? You stop guessing, reclaim time, make smarter decisions, and finally put AI to work where it actually moves the needle for your business.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto inline-block text-lg italic text-white max-w-[720px] mb-6">
            "Ready to cut through the noise?"
          </p>
          <div>
            <Link
              href="#contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Book a free introduction call →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
