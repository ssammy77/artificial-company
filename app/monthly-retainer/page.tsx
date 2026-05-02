import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Monthly Guidance Retainer | Your AI Guide",
  description: "Ongoing strategic AI guidance — a dedicated advisor available each month to review tools, answer questions, and keep you moving forward.",
}

export default function MonthlyRetainerPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-[900px] mx-auto px-[5%] py-20">
        <Link href="/#pricing" className="text-primary hover:underline text-sm font-semibold">
          ← Back to services
        </Link>
        <div className="mt-8 mb-6">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">Retainer</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Monthly Guidance Retainer
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          $499 / month
        </p>
        <div className="text-lg text-muted-foreground mb-12 leading-relaxed">
          <p>One session doesn't solve everything. AI evolves, your business changes, and the questions you have in month three are different from the ones you had in month one.</p>
          <p className="mt-4">This retainer gives you a dedicated AI advisor on call each month — to answer questions, review new tools, course-correct your strategy, and keep you from making expensive mistakes.</p>
        </div>
        <div className="bg-accent text-accent-foreground rounded-xl px-8 py-8 mb-12">
          <h2 className="text-xl font-semibold mb-4">What's included</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> 60-minute video call each month with your dedicated AI advisor
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Asynchronous check-ins — voice memo or text questions between calls
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Tool and vendor review on request — before you sign anything
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Priority access to new service offerings and early insights
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Monthly summary of relevant AI developments that affect your business
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span> Cancel anytime — no long-term contract
            </li>
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl px-8 py-8 mb-12 border-2 border-primary">
          <h2 className="text-xl font-semibold mb-4">How You Recover Your Investment</h2>
          <p className="text-base leading-relaxed">
            The most expensive AI decisions small businesses make aren't the tools they buy — it's the months they spend on the wrong ones. This retainer gives you a knowledgeable voice in your corner before you commit time, money, or staff to something that doesn't fit. One avoided bad software decision, one workflow improvement, or one well-timed opportunity spotted typically covers the monthly investment many times over — without the guesswork of navigating it alone.
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
