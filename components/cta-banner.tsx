import Link from "next/link"

export function CTABanner() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-blue-900 to-primary px-[5%] py-20 text-center text-white"
    >
      <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-4 text-white">
        5+ hours back per week.
        <br />
        Guaranteed.
      </h2>
      <p className="text-blue-200 text-lg max-w-[540px] mx-auto mb-10 leading-relaxed">
        {"If your AI Tools Assessment doesn't identify at least 5 hours of recoverable time per week, you get a full refund. No questions asked. Book a free 15-minute intro call to get started."}
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="mailto:hello@artificialcompany.ai"
          className="bg-white text-primary px-8 py-3.5 rounded-lg font-sans font-semibold hover:bg-white/90 transition-colors"
        >
          Book a Free Intro Call
        </Link>
        <Link
          href="mailto:hello@artificialcompany.ai"
          className="bg-transparent text-white px-8 py-3.5 rounded-lg font-sans font-semibold border-[1.5px] border-white/30 hover:border-white/50 transition-colors"
        >
          Send Us a Message
        </Link>
      </div>
    </section>
  )
}
