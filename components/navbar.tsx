import Link from "next/link"

export function Navbar() {
  return (
    <nav className="flex justify-between items-center px-[5%] py-5 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="font-serif text-xl font-bold tracking-tight text-foreground">
        ArtificialCompany<span className="text-primary">.AI</span>
      </div>
      <ul className="hidden md:flex gap-8 font-sans text-sm list-none">
        <li>
          <Link href="#why" className="text-muted-foreground hover:text-foreground transition-colors">
            Why Us
          </Link>
        </li>
        <li>
          <Link href="#what" className="text-muted-foreground hover:text-foreground transition-colors">
            What You Get
          </Link>
        </li>
        <li>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
        </li>
        <li>
          <Link href="/ai-assessment-quiz" className="text-muted-foreground hover:text-foreground transition-colors">
            Quiz
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Book a Session
          </Link>
        </li>
      </ul>
    </nav>
  )
}
