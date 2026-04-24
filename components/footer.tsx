import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-ink text-slate-500 px-[5%] py-10 flex justify-between items-center font-sans text-sm flex-wrap gap-4">
      <div className="font-serif text-xl font-bold text-white">
        ArtificialCompany<span className="text-blue-500">.AI</span>
      </div>
      <span>© 2026 ArtificialCompany.AI. Vendor-neutral AI advisory for small business.</span>
      <Link
        href="mailto:hello@artificialcompany.ai"
        className="text-slate-400 hover:text-white transition-colors"
      >
        hello@artificialcompany.ai
      </Link>
    </footer>
  )
}
