export function Industries() {
  const industries = [
    "🍽️ Restaurants & Hospitality",
    "🏥 Medical & Dental Practices",
    "🏠 Real Estate",
    "⚖️ Law & Professional Services",
    "🛍️ Retail & E-Commerce",
    "💇 Salons & Personal Services",
    "🏗️ Contractors & Home Services",
    "📦 Logistics & Distribution",
    "+ More",
  ]

  return (
    <section className="max-w-[1100px] mx-auto px-[5%] pb-20">
      <div className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3">
        Industries We Know Well
      </div>
      <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5">
        {"We go deep so you don't have to."}
      </h2>
      <p className="text-lg text-muted-foreground max-w-[640px] mb-6 leading-relaxed">
        We focus on industries where AI is already creating real results for small operators — and we keep our knowledge current.
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        {industries.map((industry, index) => (
          <span
            key={index}
            className="font-sans text-sm border border-border rounded-full px-4 py-2 text-muted-foreground bg-background"
          >
            {industry}
          </span>
        ))}
      </div>
    </section>
  )
}
