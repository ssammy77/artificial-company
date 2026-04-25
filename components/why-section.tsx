'use client'
import { useEffect, useRef, useState } from "react"

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
            Our pitch
          </div>
          <h2 className="text-3xl md:text-4xl leading-tight tracking-tight mb-5 text-white">
            {"You don't need a developer."}
            <br />
            {"You need "}
            <em className="not-italic text-blue-300">clarity.</em>
          </h2>
          <p className="text-lg text-slate-400 max-w-[640px] mb-6 leading-relaxed">
            {"Most small business owners aren't losing to bad products or poor service — they're losing to the "}<span className="text-yellow-300">clock</span>{". Every hour spent on unqualified leads, repetitive follow-ups, or tasks that look the same every single time is an hour you're not billing, not growing, and not doing the work only you can do. AI doesn't replace what you're good at. It handles the mundane so you don't have to."}
          </p>
          <p className="text-lg text-slate-400 max-w-[640px] leading-relaxed">
            {"That's exactly what we help you find. No jargon, no six-figure software overhaul, no guessing. We spend time learning how your business actually operates — then hand you a clear, specific plan showing where AI fits, what tools to use, and where to start."}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl px-6 py-5 border transition-transform duration-300 ease-out hover:scale-110 will-change-transform ${
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
