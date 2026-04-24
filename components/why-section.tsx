export function WhySection() {
  const comparisons = [
    {
      who: "AI Courses & Newsletters",
      text: "Teach general concepts. None of it is about your business, your workflows, or your specific time drains.",
      highlight: false,
    },
    {
      who: "Software Vendors",
      text: "Know their product deeply. Incentivized to sell it to everyone, whether it fits your situation or not.",
      highlight: false,
    },
    {
      who: "Developers & Agencies",
      text: "Great at building. Incentivized to scope larger, more complex projects than you probably need.",
      highlight: false,
    },
    {
      who: "ArtificialCompany.AI ✦",
      text: "We look at your calendar, your inbox, and your workflows — and tell you exactly which tools to use and where to start. Specific. Actionable. Guaranteed.",
      highlight: true,
    },
  ]

  return (
    <section id="why" className="bg-ink text-white px-[5%] py-20">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-sans text-xs font-bold tracking-widest uppercase text-blue-300 mb-3">
            Why It Matters
          </div>
          <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5 text-white">
            {"You don't need a developer."}
            <br />
            {"You need "}
            <em className="not-italic text-blue-300">clarity.</em>
          </h2>
          <p className="text-lg text-slate-400 max-w-[640px] mb-6 leading-relaxed">
            {"Business owners aren't stuck because AI doesn't work. They're stuck because nobody has looked at their specific situation and said: \"Here's your problem. Here's the tool. Here's where you start.\""}
          </p>
          <p className="text-base text-slate-400 max-w-[640px] leading-relaxed">
            {"That's all we do. No courses. No newsletters. No developer hours. We spend 45 minutes learning how your business actually works — then hand you a clear, actionable report with exactly what to change and what to use."}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl px-6 py-5 border ${
                item.highlight
                  ? "bg-primary border-primary"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div
                className={`font-sans text-xs font-bold tracking-wider uppercase mb-1.5 ${
                  item.highlight ? "text-blue-200" : "text-slate-400"
                }`}
              >
                {item.who}
              </div>
              <p className="text-[15px] text-slate-200 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
