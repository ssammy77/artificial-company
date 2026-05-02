import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Website & SEO Health Report | Your AI Guide",
  description: "Comprehensive audit of your site's technical health, visibility, and opportunities with prioritized fixes.",
}

export default function WebsiteSEOPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-[900px] mx-auto px-[5%] py-20">
        <Link href="/#pricing" className="text-primary hover:underline text-sm font-semibold">
          ← Back to services
        </Link>
        <div className="mt-8 mb-6">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">Website & SEO</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Website & SEO Health Report
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          $499
        </p>
        <div className="text-lg text-muted-foreground mb-12 leading-relaxed">
          <p>You have a website — but you don't know if it's actually working. Is it slow? Are you missing technical SEO basics? Are people finding you on Google, or are you invisible?</p>
          <p className="mt-4">This AI-deep dive report answers those questions with a plain-English audit that tells you exactly what's broken, what's working, and what to fix first.</p>
        </div>
        <div className="bg-accent text-accent-foreground rounded-xl px-8 py-8 mb-12">
          <h2 className="text-xl font-semibold mb-4">What's included</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Technical audit — page speed, mobile usability, crawl errors
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> On-page SEO review — titles, meta descriptions, headings, image alt text
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Backlink and domain authority assessment
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Visibility analysis — where you're ranking, where you're not
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Prioritized fix list ranked by impact and effort
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Delivered within 24 hours, human-reviewed for accuracy
            </li>
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl px-8 py-8 mb-12 border-2 border-primary">
          <h2 className="text-xl font-semibold mb-4">How You Recover Your Investment</h2>
          <p className="text-base leading-relaxed">
            Fixing even one critical SEO gap — a slow page, a missing title tag, a duplicate listing — can meaningfully improve your visibility within months. For most small businesses, that translates directly to more calls, more clicks, and more customers.

True ROI depends on how optimized your web presence is at the start of this analysis. Not optimized=high potential return vs already optimized=lower potential return.
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
