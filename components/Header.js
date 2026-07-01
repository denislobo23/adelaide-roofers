// components/Header.js
import Link from "next/link";
import { site } from "@/data/config";

export default function Header() {
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
          <Link
            href="/#regions"
            className="hidden font-body text-sm font-medium text-steel transition hover:text-ink sm:block"
          >
            Areas we cover
          </Link>
          <Link
            href="/services"
            className="hidden font-body text-sm font-medium text-steel transition hover:text-ink sm:block"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="hidden font-body text-sm font-medium text-steel transition hover:text-ink sm:block"
          >
            About
          </Link>
          <a
            href={site.phoneHref}
            className="font-display text-sm font-semibold tracking-tight text-clay transition hover:text-clay-deep"
          >
            {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
