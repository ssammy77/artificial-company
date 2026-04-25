export function WhatYouGet() {
  const deliverables = [
    {
      title: "Executive Summary",
      tag: "Report Section 1",
      tagType: "general",
      items: [
        "A plain-language summary of what we found",
        "Your top 3 AI opportunities ranked by impact",
        "The single best place to start",        
        "--Estimated weekly hours recovered",
      ],
    },
    {
      title: "Priority Matrix",
      tag: "Report Section 2",
      tagType: "specific",
      items: [
        "5–7 opportunities mapped by impact vs. effort",
        "Quick wins vs. longer-term plays — clearly separated",
        "Specific tool recommendation for each opportunity",
        "Why each tool fits your situation specifically",
      ],
    },
    {
      title: "SEO Assessment",
      tag: "Report Section 3",
      tagType: "general",
      items: [
        "Is your current SEO strategy effective?",
        "Non-jargon summary of the good and bad for your brand",
        "Peace of mind that you are doing SEO right...",
        "— or specific, actionable recommendations if you're not",
      ],
    },
    {
      title: "Beyond the Assessment",
      tag: "Report Section 4",
      tagType: "specific",
      items: [
        "How to find a vendor or agency if you need help implementing",
        "The questions to ask",
        "An estimate of what implementation would cost",
        "Finally, does AI make sense for your business?",
      ],
    },
  ]

  return (
    <section id="what" className="max-w-[1100px] mx-auto px-[5%] py-20">
      <div className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3">
        What You Get
      </div>
      <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5">
        A report built around
        <br />
        your business. Not a template.
      </h2>
      <p className="text-lg text-muted-foreground max-w-[640px] mb-12 leading-relaxed">
        Every AI Tools Assessment ends with a custom written report tailored directly to your operation. It covers your specific situation, the exact tools that can help you, and the best bang for your buck to start on your AI journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-xl px-7 py-6 bg-background transition-transform duration-300 ease-out hover:scale-110 will-change-transform"
          >
            <h3 className="text-base font-semibold mb-1 flex items-center gap-2 flex-wrap">
              {item.title}
              <span
                className={`font-sans text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  item.tagType === "general"
                    ? "bg-green-50 text-green-800"
                    : "bg-yellow-50 text-yellow-800"
                }`}
              >
                {item.tag}
              </span>
            </h3>
            <ul className="mt-3 pl-5 text-[15px] text-muted-foreground leading-loose list-disc">
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
