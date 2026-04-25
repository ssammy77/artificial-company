import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { WhySection } from "@/components/why-section"
import { WhatYouGet } from "@/components/what-you-get"
import { Pricing } from "@/components/pricing"
import { Process } from "@/components/process"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <hr className="border-t border-border mx-[5%]" />
      <TrustBar />
      <WhySection />
      <WhatYouGet />
      <Pricing />
      <Process />
      <CTABanner />
      <Footer />
    </main>
  )
}
