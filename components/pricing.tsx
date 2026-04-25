import Link from "next/link"

export function Pricing() {
  const plans = [
    {
      title: "Free AI Prompt",
      tagline: "For anyone curious about AI",
      price: "$0",
      priceNote: "2-minute quiz · Instant result",
      features: [
        "Select your industry",
        "Tell us where your time goes",
        "Get one ready-to-use AI prompt",
        "Copy it into ChatGPT or Claude",
        "No account required",
      ],
      cta: "Take the Free Quiz →",
      ctaStyle: "secondary",
      badge: null,
    },
    {
      title: "Website SEO Analysis",
      tagline: "For owners curious if their website is pulling its weight",
      price: "$99",
      priceNote: "Human-reviewed · Delivered in 24 hrs",
      features: [
        "1 custom website report",
        "Clear, jargon-free analysis of your SEO strengths and weaknesses",
        "Human review to ensure accuracy and relevance",
        "Matched to your exact business",
        "If you don't have a website, we'll analyze your Google Business Profile or social media presence instead",
      ],
      cta: "Get My SEO Report →",
      ctaStyle: "primary",
      badge: "Most Popular",
      featured: true,
    },
    {
      title: "AI Tools Assessment",
      tagline: "For owners who want the full picture",
      price: "$999",
      priceNote: "Full engagement · Remote via video",
      features: [
        "45-min deep-dive discovery interview",
        "We walk through our day, finding time sinks, bloated workflows, and non-billable tasks",
        "5–7 specific AI tool recommendations",
        "Custom written report with priority matrix",
        "Where to start, what to do next, and how to avoid common pitfalls",
        "Optional: Free 30-min report debrief call",
        ],
      cta: "Book Your Assessment →",
      ctaStyle: "secondary",
      badge: "Full Assessment",
      badgeStyle: "gray",
    },
  ]

  const workshop = {
    title: "Group Workshop",
    tagline: "For associations, chambers & peer groups",
    price: "$0-$750",
    priceSub: "+",
    priceNote: "60–90 min · Up to 30 attendees",
    features: [
      "Custom presentation for your industry",
      "Live Q&A for all attendees",
      "Take-home AI starter guide",
      "Pricing scales with group size",
      "Free local events in St. Louis, MO — inquire for details",
    ],
    cta: "Inquire About Groups",
    ctaStyle: "secondary",
  }

  return (
    <section id="pricing" className="bg-secondary px-[5%] py-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3">
          Pricing
        </div>
        <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5">
          Start free. Scale when ready.
        </h2>
        <p className="text-lg text-muted-foreground max-w-[640px] mb-12 leading-relaxed">
          Take the free quiz and walk away with an AI prompt you can use today. Or go deeper — get a custom SEO website analysis and learn how your web presence is helping or hurting your business for $99. Our full AI Tools Assessment helps us map your entire operation, and reveals where AI can <strong>add the most value</strong> for $999.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-background border-[1.5px] rounded-2xl px-8 py-9 relative flex flex-col ${
                plan.featured
                  ? "border-primary shadow-[0_0_0_4px_var(--accent)]"
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 font-sans text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full whitespace-nowrap ${
                    plan.badgeStyle === "gray"
                      ? "bg-gray-700 text-white"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                {plan.tagline}
              </p>
              <div className="text-4xl font-bold tracking-tight text-foreground leading-none mb-1">
                {plan.price}
                {plan.priceSub && (
                  <span className="text-base font-normal text-muted-foreground">
                    {plan.priceSub}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-7">
                {plan.priceNote}
              </p>
              <ul className="font-sans text-sm text-muted-foreground flex flex-col gap-3 flex-1 mb-8 list-none">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/ai-assessment-quiz"
                className={`block text-center py-3 px-6 rounded-lg font-sans text-sm font-semibold transition-colors ${
                  plan.ctaStyle === "primary"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background text-foreground border-[1.5px] border-border hover:border-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
          <div className="bg-background border-[1.5px] rounded-2xl px-8 py-9 relative flex flex-col border-border">
            <h3 className="text-lg font-semibold mb-2">{workshop.title}</h3>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              {workshop.tagline}
            </p>
            <div className="text-4xl font-bold tracking-tight text-foreground leading-none mb-1">
              {workshop.price}
              <span className="text-base font-normal text-muted-foreground">
                {workshop.priceSub}
              </span>
            </div>
            <p className="font-sans text-xs text-muted-foreground mb-7">
              {workshop.priceNote}
            </p>
            <ul className="font-sans text-sm text-muted-foreground flex flex-col gap-3 flex-1 mb-8 list-none">
              {workshop.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className="block text-center py-3 px-6 rounded-lg font-sans text-sm font-semibold bg-background text-foreground border-[1.5px] border-border hover:border-primary transition-colors"
            >
              {workshop.cta}
            </Link>
          </div>
        </div>

        <p className="mt-8 font-sans text-sm text-muted-foreground text-center">
          Vendor-neutral. No affiliate relationships. No upsell pressure.{" "}
          Questions?{" "}
          <Link href="#contact" className="text-primary hover:underline">
            Reach out first
          </Link>{" "}
          — no charge for a 15-minute intro call.
        </p>
      </div>
    </section>
  )
}
