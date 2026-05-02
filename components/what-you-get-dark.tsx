export function WhatYouGetDark() {
  const deliverables = [
    {
      title: "Your AI Guide on Speed Dial",
      tag: "On-call Consultation",
      tagType: "general",
      items: [
        "We commit time per week to your project,",
        "Available for calls, vendor meetings, and brainstorming",
        "We help you understand the right questions to ask",
        "We can help with training and implementation",
      ],
    },
    {
      title: "We stick around",
      tag: "Your AI ally",
      tagType: "specific",
      items: [
        "We ensure the right tools are selected",
        "We help you avoid vendor-dominated scopes",
        "Only buy what will actually solve your problems",
        "Push back on overhyped tools that don't fit your situation",
      ],
    },
   
  ]

  return (
    <section id="what-dark" className="bg-slate-950 text-slate-100 w-full py-20">
      <div className="max-w-[1100px] mx-auto px-[5%]">
      <div className="font-sans text-xs font-bold tracking-widest uppercase text-cyan-300 mb-3">
        ADVANCED GUIDE
      </div>
      <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5 text-white">
        We walk with you on the path
        <br />
        to AI integration.
      </h2>
      <p className="text-lg text-slate-300 max-w-[640px] mb-12 leading-relaxed">
        Our team will sit on <span className="text-yellow-300">your side of the table</span> as you meet with prospective vendors, talk about your needs, and review proposals. Small business owners don't have the budget for full AI departments, but it never hurts to have a second set of expert eyes when large projects and large budgets are on the line.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverables.map((item, index) => (
          <div
            key={index}
            className="border border-slate-800 rounded-xl px-7 py-6 bg-slate-900 transition-transform duration-300 ease-out hover:scale-110 will-change-transform"
          >
            <h3 className="text-base font-semibold mb-1 flex items-center gap-2 flex-wrap text-white">
              {item.title}
              <span
                className={`font-sans text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  item.tagType === "general"
                    ? "bg-emerald-950 text-emerald-300"
                    : "bg-amber-950 text-amber-300"
                }`}
              >
                {item.tag}
              </span>
            </h3>
            <ul className="mt-3 pl-5 text-[15px] text-slate-300 leading-loose list-disc">
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mx-auto inline-block text-lg italic text-slate-300 max-w-[720px]">
          "Sometimes AI is the WRONG solution."
        </p>
      </div>
      </div>
    </section>
  )
}
