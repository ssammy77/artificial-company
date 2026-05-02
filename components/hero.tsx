import Link from "next/link"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Existing content */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-[5%] pt-36 pb-32 text-center">
        <div className="inline-block font-sans text-xs font-bold tracking-widest uppercase text-primary bg-accent px-4 py-1.5 rounded-full mb-7">
          We guide Small Business through AI
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight mb-6 text-white flex flex-col items-center space-y-2">
          <span className="text-3xl md:text-4xl lg:text-5xl md:whitespace-nowrap">
            You bring the business expertise.
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl md:whitespace-nowrap">
            We bring the <span className="text-yellow-300">AI roadmap.</span>
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl">
            Together, we find the opportunities your competitors wish they'd seen first.
          </span>
        </h1>
        <div className="bg-black/40 backdrop-blur-sm rounded-xl px-6 py-5 max-w-[640px] mx-auto mb-20 mt-12">
          <p className="text-lg md:text-xl text-white/90 leading-relaxed text-pretty">
            The AI landscape is loud, crowded, and built to confuse you. We cut through it with one clear answer: here's what fits your business, here's why, and here's your first step.
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="#pricing"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-sans font-semibold hover:bg-primary/90 transition-colors"
          >
            See our guides →
          </Link>
          <Link
            href="#contact"
            className="bg-background text-foreground px-8 py-3.5 rounded-lg font-sans font-semibold border-[1.5px] border-border hover:border-primary transition-colors"
          >
            Let's Talk
          </Link>
        </div>
      </div>

    </section>
  )
}
