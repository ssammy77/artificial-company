import Link from "next/link"

export function Pricing() {
  const services = [
    {
      name: "Personal Interview & AI Opportunities Roadmap",
      description: "We talk to you and learn about your business. Then we help find how AI fits in.",
      price: "$999",
      href: "/ai-readiness-roadmap",
      featured: true,
    },
    {
      name: "Website & SEO Health Report",
      description: "Technical health + prioritized fixes.",
      price: "$499",
      href: "/website-seo-health",
    },
    {
      name: "Social Media & Content Strategy Audit",
      description: "90-day content improvement plan.",
      price: "$499",
      href: "/social-media-content",
    },
    {
      name: "Monthly Guidance Retainer",
      description: "Ongoing strategic AI guidance.",
      price: "$499/mo",
      href: "/monthly-retainer",
    },
  ]

  return (
    <section id="pricing" className="bg-secondary px-[5%] py-20">
      <div className="max-w-[1100px] mx-auto">
        <div className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3">
          Services
        </div>
        <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5">
          All services, all prices.
        </h2>
        <p className="text-lg text-muted-foreground max-w-[640px] mb-12 leading-relaxed">
          Pick the service that fits where you are right now.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-background border rounded-xl px-6 py-7 flex flex-col hover:border-primary transition-colors ${
                service.featured
                  ? "border-primary shadow-[0_0_0_4px_var(--accent)] border-2"
                  : "border-border"
              }`}
            >
              {service.featured && (
                <div className="font-sans text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-primary text-primary-foreground w-fit mb-3">
                  Start Here
                </div>
              )}
              <h3 className="text-base font-semibold mb-2 leading-tight">{service.name}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">{service.price}</span>
                <Link
                  href={service.href}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
