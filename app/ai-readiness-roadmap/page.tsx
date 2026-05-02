import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Personal Interview & AI Opportunities Roadmap | Your AI Guide",
  description: "Honest assessment of your current AI setup plus a custom 3–5 priority use cases ranked by ROI and ease.",
}

export default function AIRoadmapPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-[900px] mx-auto px-[5%] py-20">
        <Link href="/#pricing" className="text-primary hover:underline text-sm font-semibold">
          ← Back to services
        </Link>
        <div className="mt-8 mb-6">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">AI Readiness</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Personal Interview & AI Opportunities Roadmap
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          $999
        </p>
        <div className="text-lg text-muted-foreground mb-12 leading-relaxed">
          <p>Most small business owners know they <em>should</em> be using AI, but they don't know where to start — or worse, they're chasing the wrong tools entirely.</p>
          <p className="mt-4">This roadmap cuts through the noise. We spend time understanding how your business actually works, then deliver a clear, prioritized plan showing exactly where AI can add the most value for you.</p>
        </div>
        <div className="bg-accent text-accent-foreground rounded-xl px-8 py-8 mb-12">
          <h2 className="text-xl font-semibold mb-4">What's included</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> 45-minute deep-dive discovery interview — we walk through your day, your tools, and your pain points
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Written assessment of your current AI setup (what you're using, how, and how well)
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> 3–5 specific AI use cases ranked by potential ROI and ease of implementation
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Custom priority matrix showing where to start and what to do next
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Plain-English explanation of risks, pitfalls, and vendor gotchas to avoid
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Optional 30-minute debrief call to walk through the report together
            </li>
          </ul>
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl px-8 py-8 mb-12 border-2 border-primary">
          <h2 className="text-xl font-semibold mb-4">How You Recover Your Investment</h2>
          <p className="text-base leading-relaxed">
            Most small business owners spend months — sometimes years — trying tools that don't fit, paying for subscriptions they barely use, and losing hours to workflows that AI could handle in minutes. That's not a technology problem. It's a clarity problem.
          </p>
          <p className="text-base leading-relaxed mt-4">
            This roadmap solves the clarity problem first.
          </p>
          <p className="text-base leading-relaxed mt-4">
            For $999 you get a prioritized, plain-English plan built around your business — not a generic checklist. If even one recommendation helps you eliminate a part-time task, cancel a redundant tool, or avoid a costly software commitment that wasn't right for you, the roadmap pays for itself before you implement a single thing.
          </p>
          <p className="text-base leading-relaxed mt-4">
            Think of it as the cost of not guessing.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/#contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
          >
            Book This Service →
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Questions first? <Link href="/#contact" className="text-primary hover:underline">Reach out</Link> for a free 15-minute intro call.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
