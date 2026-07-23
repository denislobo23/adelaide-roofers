"use client";
// components/Header.js
//
// Adds a mobile hamburger menu — previously every nav link (Areas we
// cover, Services, FAQs, About) was `hidden sm:block`, meaning mobile
// visitors had zero navigation beyond the logo and phone number. This
// keeps the exact same desktop layout untouched, and adds a toggleable
// slide-down panel for small screens with the same links plus the phone
// number, so mobile visitors can actually reach every page type.

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/config";

const navLinks = [
  { href: "/#regions", label: "Areas we cover" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQs" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mortar bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.brand} home`}>
          {/* Roofline mark — two pitches forming an A, the brand's house */}
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 4 4 16h4v10h6v-6h4v6h6V16h4L16 4Z" fill="#BC5B3A" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            {site.brand}
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden font-body text-sm font-medium text-steel transition hover:text-ink sm:block"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="font-display text-sm font-semibold tracking-tight text-clay transition hover:text-clay-deep"
          >
            {site.phoneDisplay}
          </a>

          {/* Hamburger toggle — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-mortar/40 sm:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile slide-down panel */}
      {menuOpen && (
        <div className="border-t border-mortar bg-paper sm:hidden">
          <nav className="mx-auto flex max-w-wrap flex-col px-5 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-mortar py-3.5 font-body text-base font-medium text-ink last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
