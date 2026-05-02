import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Social Media & Content Strategy Audit | Your AI Guide",
  description: "Analysis of your content performance and a simple 90-day plan to improve engagement and reach.",
}

export default function SocialMediaContentPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-[900px] mx-auto px-[5%] py-20">
        <Link href="/#pricing" className="text-primary hover:underline text-sm font-semibold">
          ← Back to services
        </Link>
        <div className="mt-8 mb-6">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">Content Strategy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Social Media & Content Strategy Audit
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          $499
        </p>
        <div className="text-lg text-muted-foreground mb-12 leading-relaxed">
          <p>You're posting — but is it working? Most businesses churn out content without a clear strategy, burning time without seeing results.</p>
          <p className="mt-4">This audit reviews what you've been publishing, where it's performing and where it's not, and delivers a practical 90-day content plan that actually fits your schedule.</p>
        </div>
        <div className="bg-accent text-accent-foreground rounded-xl px-8 py-8 mb-12">
          <h2 className="text-xl font-semibold mb-4">What's included</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Review of your last 30–60 posts across chosen platforms
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Engagement analysis — what's working, what's flat, why
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Audience insight summary based on your content performance
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> 90-day content calendar with posting frequency recommendations
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Content themes and topic ideas specific to your audience
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> 30-minute call to walk through the plan together
            </li>
          </ul>
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl px-8 py-8 mb-12 border-2 border-primary">
          <h2 className="text-xl font-semibold mb-4">How You Recover Your Investment</h2>
          <p className="text-base leading-relaxed">
            Most small businesses post consistently but without a strategy — which means effort without traction. A focused 90-day content plan typically improves engagement clarity, attracts better-fit followers, and gives your sales conversations a warmer starting point. For a one-time investment of $499, you get a clear roadmap that replaces guesswork with intention — and stops wasting the time you're already spending on content that isn't working.
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
