import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-ink text-slate-500 px-[5%] py-10 flex justify-between items-center font-sans text-sm flex-wrap gap-4">
      <div className="font-serif text-xl font-bold text-white">
        yourAIguide<span className="text-blue-500">.CO</span>
      </div>
      <span>© 2026 yourAIguide.CO. Vendor-neutral AI advisory for small business.</span>
      <Link
        href="mailto:hello@yourAIguide.co"
        className="text-slate-400 hover:text-white transition-colors"
      >
        hello@yourAIguide.co
      </Link>
    </footer>
  )
}
