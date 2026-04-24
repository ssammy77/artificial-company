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
      <div className="relative z-10 max-w-[860px] mx-auto px-[5%] pt-24 pb-20 text-center">
        <div className="inline-block font-sans text-xs font-bold tracking-widest uppercase text-primary bg-accent px-4 py-1.5 rounded-full mb-7">
          AI Tools Assessment for Small Business
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 text-foreground text-balance">
          You've heard all about AI.
          <br />
          {"Your competition is using it "}
          {"We'll help you catch up."}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-[640px] mx-auto mb-10 leading-relaxed text-pretty">
          {"You're drowning in tools and have no idea which ones solve your specific problems. We look at your calendar, your inbox, and your workflows — and say: \"This tool. This process. This is where you start.\""}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="#pricing"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-sans font-semibold hover:bg-primary/90 transition-colors"
          >
            See the Assessment →
          </Link>
          <Link
            href="#process"
            className="bg-background text-foreground px-8 py-3.5 rounded-lg font-sans font-semibold border-[1.5px] border-border hover:border-primary transition-colors"
          >
            How It Works
          </Link>
        </div>
      </div>

    </section>
  )
}