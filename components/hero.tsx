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
      <div className="relative z-10 max-w-[860px] mx-auto px-[5%] pt-36 pb-32 text-center">
        <div className="inline-block font-sans text-xs font-bold tracking-widest uppercase text-primary bg-accent px-4 py-1.5 rounded-full mb-7">
          Personal AI Assessment for Small Business
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight mb-6 text-white flex flex-col items-center space-y-2">
          <span className="text-3xl md:text-4xl lg:text-5xl md:whitespace-nowrap">
            You don't know where to start with AI.
          </span>
          <span className="text-4xl md:text-5xl lg:text-6xl md:whitespace-nowrap">
            You just know your <span className="text-yellow-300">competitors</span> are using it.
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl md:whitespace-nowrap">
            We can help you catch up.
          </span>
        </h1>
        <div className="bg-black/40 backdrop-blur-sm rounded-xl px-6 py-5 max-w-[640px] mx-auto mb-20 mt-12">
          <p className="text-lg md:text-xl text-white/90 leading-relaxed text-pretty">
            {"You're drowning in AI sales pitches, demos, and chat boxes and have no idea which ones solve your specific problems. We look at your time sinks, your bloated workflows, and your non-billable tasks — and say: \"This tool. This process. This is where you start.\""}
          </p>
        </div>
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