"use client";

import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex justify-between items-center px-[5%] py-5 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-foreground transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-foreground transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-foreground transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Company Name */}
        <div className="font-serif text-xl font-bold tracking-tight text-foreground">
          yourAIguide<span className="text-primary">.CO</span>
        </div>
      </div>

      {/* Desktop Menu */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
          <ul className="flex flex-col gap-4 p-6 font-sans text-sm list-none">
            <li>
              <Link href="#why" className="text-muted-foreground hover:text-foreground transition-colors block" onClick={() => setIsOpen(false)}>
                Why Us
              </Link>
            </li>
            <li>
              <Link href="#what" className="text-muted-foreground hover:text-foreground transition-colors block" onClick={() => setIsOpen(false)}>
                What You Get
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors block" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors block" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/ai-assessment-quiz" className="text-muted-foreground hover:text-foreground transition-colors block" onClick={() => setIsOpen(false)}>
                Quiz
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="#contact"
                className="bg-primary text-primary-foreground px-5 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors inline-block"
                onClick={() => setIsOpen(false)}
              >
                Book a Session
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
