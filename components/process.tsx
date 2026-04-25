import Link from "next/link"
import ContactForm from "@/components/ContactForm"

export function Process() {
  const steps = [
    {
      number: 1,
      title: "The Discovery Interview — 45 minutes",
      description:
        "We don't pitch solutions. We pull problems. You walk us through your actual day: where your time goes, what piles up, what you've tried to fix and couldn't. We record and transcribe everything. The questions we ask: Walk me through yesterday. What tasks do you dread but can't hand off? Where does work pile up waiting on you?",
      cta: {
        text: "Complete Pre-Session Form →",
        href: "#contact",
      },
    },
    {
      number: 2,
      title: "The AI Analysis",
      description:
        "We run your interview transcript through a structured AI analysis to identify 5–7 specific areas where existing tools could save you significant time. We cross-reference the output with our own tool knowledge, cut anything that feels like a stretch, and add recommendations from our own experience working with businesses like yours.",
    },
    {
      number: 3,
      title: "The Report",
      description:
        "You receive a clean, professional report — the kind a $10,000 consulting firm would produce. It includes your executive summary, a priority matrix, specific tool recommendations with implementation details, a 4-day quick-start plan, and a financial impact breakdown. Delivered before your review call.",
    },
    {
      number: 4,
      title: "The Review Call — 30 minutes",
      description:
        "We screen-share the report, walk through every recommendation, and answer your questions. Then we ask three things: Which of these feels most urgent? Do you want to implement these yourself, or would you like help? What's your realistic timeline? You leave with a clear next step — not another decision to make.",
    },
  ]

  return (
    <section id="process" className="max-w-[1100px] mx-auto px-[5%] py-20">
      <div className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3">
        How It Works
      </div>
      <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-10">
        Four steps. One week.
        <br />
        Hours back every week after that.
      </h2>

      <div className="flex flex-col relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="grid grid-cols-[56px_1fr] gap-6 pb-10 relative"
          >
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-sans text-lg font-bold flex items-center justify-center flex-shrink-0 relative z-10">
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-[27px] top-14 bottom-0 w-0.5 bg-border" />
            )}
            <div className="pt-3">
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {step.cta && (
                <Link
                  href={step.cta.href}
                  className="inline-block mt-3 font-sans text-sm font-semibold text-primary border-[1.5px] border-primary rounded-lg px-4 py-2 hover:bg-accent transition-colors"
                >
                  {step.cta.text}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contact form — anchored so the "Complete Pre-Session Form" CTA scrolls here */}
      <div id="contact" className="mt-10 scroll-mt-24">
        <ContactForm />
      </div>
    </section>
  )
}
