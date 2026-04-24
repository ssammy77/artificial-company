import type { Metadata } from "next"
import { Barlow, Barlow_Condensed } from "next/font/google"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-barlow",
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow-condensed",
})

export const metadata: Metadata = {
  title: "Shipping Container Conversions & Builds | Atlas Construction | St. Louis, MO",
  description:
    "Atlas Construction builds custom shipping container studios, guest suites, workshops, and ADUs across the St. Louis metro. Fully permitted, fully insured, fully finished.",
}

const useCases = [
  {
    num: "01",
    title: "Backyard Studio",
    description: "Home office, art studio, or music room. Insulated, climate-controlled, and fully wired.",
  },
  {
    num: "02",
    title: "Guest Suite / ADU",
    description: "A fully plumbed, livable unit for guests or short-term rental income.",
  },
  {
    num: "03",
    title: "Workshop or Garage",
    description: "Heavy-duty floor, 200-amp service, ventilation. Built for tools, not toys.",
  },
  {
    num: "04",
    title: "Pool House",
    description: "Changing rooms, outdoor bar, equipment storage — all in one structure.",
  },
  {
    num: "05",
    title: "Container Home",
    description: "Single or multi-container residential builds. Full framing, insulation, and finish work.",
  },
  {
    num: "06",
    title: "Custom / Weird Stuff",
    description: "Panic rooms. Underground builds. Stacked units. If it's tied to real estate, we can build it.",
  },
]

const processSteps = [
  {
    num: "01",
    title: "Site Visit & Scope",
    description:
      "We visit your property, assess placement options, utility access, and local zoning requirements. You'll leave with a clear scope and a ballpark number — often the same day.",
  },
  {
    num: "02",
    title: "Permitting & Engineering",
    description:
      "Atlas handles all permit applications with St. Louis City or County. We coordinate structural engineering sign-off where required — you don't have to navigate any of it yourself.",
  },
  {
    num: "03",
    title: "Container Sourcing & Delivery",
    description:
      "We source one-trip (near-new) or CWO (cargo-worthy) containers depending on your budget and use case. Delivery and crane placement are coordinated as part of your project.",
  },
  {
    num: "04",
    title: "Structural Modifications & Finish Work",
    description:
      "Cutouts for windows and doors, welded reinforcements, spray-foam insulation, framing, electrical, plumbing, drywall, flooring — everything to take it from raw steel to finished space.",
  },
  {
    num: "05",
    title: "Final Inspection & Handoff",
    description:
      "We schedule all code inspections and walk through the completed structure with you. You get a fully permitted, inspected space with no loose ends.",
  },
]

const includedItems = [
  {
    title: "Site Prep & Foundation",
    description: "Concrete piers, gravel pads, or full slab depending on use and soil conditions.",
  },
  {
    title: "Structural Welding",
    description: "Window and door openings, header reinforcement, and stacking connections if required.",
  },
  {
    title: "Spray Foam Insulation",
    description: "Closed-cell foam on walls, ceiling, and floor — required for climate control in Missouri summers.",
  },
  {
    title: "Electrical Rough-in & Finish",
    description: "Panel, circuits, outlets, lighting — pulled and inspected to code by licensed electricians.",
  },
  {
    title: "Plumbing (if required)",
    description: "Water supply, drain, and venting for kitchenettes, bathrooms, or utility sinks.",
  },
  {
    title: "Interior Finish",
    description: "Drywall or plywood walls, LVP or concrete flooring, trim, paint — to your spec.",
  },
]

const whyStats = [
  { stat: "100%", label: "Permit handling included — we deal with the city so you don't have to" },
  { stat: "$0", label: "Liability exposure for you — all crews and subs fully insured" },
  { stat: "20+", label: "Years of contractor & subcontractor relationships in the St. Louis market" },
  { stat: "1", label: "Point of contact from site visit to final inspection — no handoff chaos" },
]

const faqs = [
  {
    question: "Do I need a permit for a shipping container in St. Louis?",
    answer:
      "In most cases, yes — especially if the structure is intended for human occupancy, has electrical or plumbing, or is permanently placed. Requirements vary between St. Louis City and St. Louis County. Atlas handles all permit research and applications as part of every project.",
  },
  {
    question: "How much does a shipping container conversion cost in St. Louis?",
    answer:
      "A basic backyard studio or workshop conversion typically starts around $25,000–$45,000 depending on size, insulation, and finish level. A fully plumbed guest suite or ADU with bathroom and kitchenette generally runs $55,000–$90,000+. We provide detailed, line-item estimates after a free site visit.",
  },
  {
    question: "How long does a container build take?",
    answer:
      "Most projects run 6–14 weeks from permit approval to final walkthrough. Permitting timelines with the city or county are the biggest variable — we account for this in every project schedule upfront.",
  },
  {
    question: "Can I put a shipping container on my residential property?",
    answer:
      "It depends on your municipality and zoning classification. Some St. Louis County municipalities are very container-friendly; others have restrictions. We assess zoning as part of our initial site visit and will tell you upfront what's possible before you commit to anything.",
  },
  {
    question: "What container sizes do you work with?",
    answer:
      "We work with standard 20-foot (160 sq ft) and 40-foot (320 sq ft) ISO containers, as well as high-cube variants that add an extra foot of ceiling height. Multi-container builds can be stacked or placed side-by-side depending on your layout goals.",
  },
  {
    question: "Do you only do container projects, or can you handle the full property build-out?",
    answer:
      "Atlas is a full-service general contractor. We can handle everything from the container structure itself to surrounding concrete work, fencing, landscaping tie-ins, and any interior remodeling on your existing home — all under one contract, one crew, one point of contact.",
  },
]

export default function ContainerPage() {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-barlow bg-[#FAFAF8] text-[#1C2B3A] text-base leading-relaxed">
        {/* NAV */}
        <nav className="bg-[#1C2B3A] px-5 md:px-8 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-barlow-condensed text-[22px] font-extrabold text-white tracking-wider uppercase no-underline"
          >
            Atlas <span className="text-[#E05A28]">Construction</span>
          </a>
          <a
            href="#contact"
            className="bg-[#C0441A] hover:bg-[#E05A28] text-white font-barlow-condensed text-[13px] font-bold tracking-widest uppercase px-5 py-2.5 no-underline transition-colors"
          >
            Get a Free Quote
          </a>
        </nav>

        {/* HERO */}
        <div className="bg-[#1C2B3A] px-6 md:px-8 py-14 md:py-20 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[45%] h-full pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.022) 18px, rgba(255,255,255,0.022) 20px)",
            }}
          />
          <div className="max-w-[900px] mx-auto relative">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E05A28] mb-2.5 block">
              Atlas Construction · St. Louis, MO
            </span>
            <h1 className="font-barlow-condensed text-[clamp(52px,8vw,84px)] font-extrabold leading-[0.93] text-white uppercase tracking-tight mb-6">
              Shipping Container
              <br />
              <span className="text-[#E05A28]">Conversions</span>
              <br />& Builds
            </h1>
            <p className="text-lg font-light text-[#F0EAE0] max-w-[560px] leading-relaxed mb-9">
              From backyard studios and detached offices to guest suites and container pools — Atlas builds custom
              shipping container structures across the St. Louis metro. Fully permitted, fully insured, fully finished.
            </p>
            <div className="flex gap-4 flex-wrap items-center">
              <a
                href="#contact"
                className="bg-[#C0441A] hover:bg-[#E05A28] text-white font-barlow-condensed text-base font-bold tracking-wider uppercase px-8 py-4 no-underline transition-colors inline-block"
              >
                Get a Free Quote
              </a>
              <a href="#uses" className="text-[#F0EAE0] text-[15px] underline underline-offset-4 cursor-pointer">
                See what we build ↓
              </a>
            </div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="bg-[#C0441A] px-6 md:px-8 py-4 flex gap-4 md:gap-9 flex-wrap items-center mb-18">
          {["Licensed & Insured", "St. Louis Metro", "Full Permit Handling", "General Contractor"].map((item) => (
            <span
              key={item}
              className="font-barlow-condensed text-[13px] font-semibold tracking-widest uppercase text-white opacity-90 before:content-['✓__']"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="max-w-[900px] mx-auto px-5 md:px-8 pb-20">
          {/* WHAT WE BUILD */}
          <section id="uses" className="mb-18 pt-18">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C0441A] mb-2.5 block">
              What We Build
            </span>
            <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-4 tracking-tight text-[#1C2B3A]">
              What Can You Do with a Shipping Container?
            </h2>
            <div className="h-[3px] bg-[#C0441A] w-12 my-4 mb-6" />
            <p className="text-[#3A4A57] mb-3.5 text-[15.5px] leading-relaxed">
              More than you might think. A standard 20- or 40-foot ISO shipping container is one of the most durable,
              customizable building blocks available — built to stack nine units high and survive ocean crossings. In
              the right hands, they become something extraordinary.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#D9D0C2] border-2 border-[#D9D0C2] mt-7">
              {useCases.map((item) => (
                <div
                  key={item.num}
                  className="bg-[#FAFAF8] hover:bg-[#F0EAE0] p-7 transition-colors"
                >
                  <div className="font-barlow-condensed text-[40px] font-extrabold text-[#D9D0C2] leading-none mb-2.5">
                    {item.num}
                  </div>
                  <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-2 text-[#1C2B3A]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#3A4A57]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS */}
          <section id="process" className="mb-18">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C0441A] mb-2.5 block">
              Our Process
            </span>
            <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-4 tracking-tight text-[#1C2B3A]">
              How a Container Build Works
            </h2>
            <div className="h-[3px] bg-[#C0441A] w-12 my-4 mb-6" />
            <div className="mt-7">
              {processSteps.map((step, index) => (
                <div
                  key={step.num}
                  className={`grid grid-cols-[60px_1fr] gap-5 items-start py-6 ${
                    index < processSteps.length - 1 ? "border-b border-[#D9D0C2]" : ""
                  }`}
                >
                  <div className="font-barlow-condensed text-4xl font-extrabold text-[#C0441A] leading-none pt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-2 text-[#1C2B3A]">
                      {step.title}
                    </h3>
                    <p className="text-[#3A4A57] text-[15.5px] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT'S INCLUDED */}
          <section id="scope" className="mb-18">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C0441A] mb-2.5 block">
              Scope of Work
            </span>
            <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-4 tracking-tight text-[#1C2B3A]">
              {"What's Included in Our Container Builds"}
            </h2>
            <div className="h-[3px] bg-[#C0441A] w-12 my-4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
              {includedItems.map((item) => (
                <div key={item.title} className="bg-[#F0EAE0] p-6 border-l-4 border-[#C0441A]">
                  <h3 className="font-barlow-condensed text-[17px] font-bold uppercase tracking-wide mb-2 text-[#1C2B3A]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#3A4A57]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY ATLAS */}
          <div className="bg-[#1C2B3A] p-9 md:p-12 mb-18">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E05A28] mb-2.5 block">
              Why Atlas
            </span>
            <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-4 tracking-tight text-white">
              Why St. Louis Homeowners Choose Atlas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              {whyStats.map((item) => (
                <div key={item.stat}>
                  <div className="font-barlow-condensed text-5xl font-extrabold text-[#E05A28] leading-none mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sm text-[#F0EAE0] leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <section id="faq" className="mb-18">
            <span className="font-barlow-condensed text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C0441A] mb-2.5 block">
              Common Questions
            </span>
            <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-4 tracking-tight text-[#1C2B3A]">
              Frequently Asked Questions
            </h2>
            <div className="h-[3px] bg-[#C0441A] w-12 my-4 mb-6" />
            <div>
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`py-6 ${index < faqs.length - 1 ? "border-b border-[#D9D0C2]" : ""}`}
                >
                  <div className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mb-2.5 text-[#1C2B3A]">
                    {faq.question}
                  </div>
                  <p className="text-[#3A4A57] text-[15.5px] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA SECTION */}
        <div id="contact" className="bg-[#C0441A] px-6 md:px-10 py-16 text-center">
          <h2 className="font-barlow-condensed text-[clamp(30px,4vw,44px)] font-extrabold uppercase leading-[1.05] mb-3.5 tracking-tight text-white">
            Ready to Build Something Remarkable?
          </h2>
          <p className="text-white/90 max-w-[520px] mx-auto mb-8 text-[17px]">
            Tell us about your project. {"We'll"} schedule a free site visit, assess your property, and give you a clear
            scope and estimate — no obligation.
          </p>
          <a
            href="tel:+1XXXXXXXXXX"
            className="bg-white hover:opacity-90 text-[#C0441A] font-barlow-condensed text-base font-bold tracking-wider uppercase px-9 py-4 no-underline inline-block transition-opacity"
          >
            Call Us to Get Started
          </a>
        </div>

        {/* SITE FOOTER */}
        <div className="bg-[#1C2B3A] p-8 text-center">
          <p className="text-[#6B7A87] text-[13px] mb-1">
            <strong className="text-[#F0EAE0]">Atlas Construction</strong> · St. Louis, MO
          </p>
          <p className="text-[#6B7A87] text-[13px] mb-1">
            Licensed General Contractor · Fully Insured · All Subcontractors Covered
          </p>
          <p className="text-[#6B7A87] text-[13px] mt-3">
            <a href="#" className="text-[#D9D0C2] no-underline hover:text-[#E05A28]">
              Home
            </a>{" "}
            &nbsp;·&nbsp;{" "}
            <a href="#" className="text-[#D9D0C2] no-underline hover:text-[#E05A28]">
              Services
            </a>{" "}
            &nbsp;·&nbsp;{" "}
            <a href="#" className="text-[#D9D0C2] no-underline hover:text-[#E05A28]">
              Portfolio
            </a>{" "}
            &nbsp;·&nbsp;{" "}
            <a href="#" className="text-[#D9D0C2] no-underline hover:text-[#E05A28]">
              Contact
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
