import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { WhySection } from "@/components/why-section"
import { Pricing } from "@/components/pricing-options"
import ContactForm from "@/components/ContactForm"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <hr className="border-t border-border mx-[5%]" />
      <TrustBar />
      <WhySection />
      <Pricing />
      <section id="contact" className="bg-black px-[5%] py-20">
        <div className="max-w-[1100px] mx-auto">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
