"use client";
// components/Header.js
//
// Adds a two-level "Areas we cover" menu on top of the mobile hamburger
// menu from the previous pass. Desktop: hover reveals the 4 regions,
// hovering a region flies out its suburb list. Mobile: tap-to-expand
// accordion (hover doesn't exist on touch), region name itself still
// navigates to that region's hub page — a separate chevron button
// expands/collapses its suburb list, so the two actions don't conflict
// on the same tap target.
//
// URL pattern (see data/locations.js header comment): regions live at
// /{region-slug}, suburbs at /{region-slug}/{suburb-slug}. Only suburbs
// with real content (ready: true) are linked, matching how the rest of
// the site avoids linking to thin/unbuilt pages.

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { site } from "@/data/config";
import { regions, getSuburb } from "@/data/locations";

const regionList = Object.values(regions);

const otherNavLinks = [
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQs" },
  { href: "/about", label: "About" },
];

function ChevronDown({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function readySuburbsFor(region) {
  return region.suburbs.filter((slug) => getSuburb(slug)?.ready);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger

  // Desktop "Areas we cover" dropdown
  const [areasOpen, setAreasOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState(regionList[0].slug);
  const areasMenuRef = useRef(null);

  // Mobile accordion state
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [mobileActiveRegion, setMobileActiveRegion] = useState(null);

  // Close the desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (areasMenuRef.current && !areasMenuRef.current.contains(e.target)) {
        setAreasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setAreasOpen(false);
    setMobileAreasOpen(false);
    setMobileActiveRegion(null);
  };

  const activeRegionData = regions[activeRegion];

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
          {/* ── Areas we cover — desktop dropdown ── */}
          <div ref={areasMenuRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setAreasOpen((o) => !o)}
              onMouseEnter={() => setAreasOpen(true)}
              className="flex items-center gap-1 font-body text-sm font-medium text-steel transition hover:text-ink"
            >
              Areas we cover
              <ChevronDown className={`transition-transform ${areasOpen ? "rotate-180" : ""}`} />
            </button>

            {areasOpen && (
              <div
                onMouseLeave={() => setAreasOpen(false)}
                className="absolute left-0 top-full mt-2 flex overflow-hidden rounded-2xl border border-mortar bg-white shadow-2xl"
              >
                {/* Region column */}
                <div className="w-48 border-r border-mortar py-2">
                  {regionList.map((r) => (
                    <div
                      key={r.slug}
                      onMouseEnter={() => setActiveRegion(r.slug)}
                      className={`transition ${activeRegion === r.slug ? "bg-paper" : ""}`}
                    >
                      <Link
                        href={`/${r.slug}`}
                        onClick={closeAllMenus}
                        className={`block px-4 py-2.5 font-body text-sm font-semibold transition ${
                          activeRegion === r.slug ? "text-clay" : "text-ink hover:text-clay"
                        }`}
                      >
                        {r.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Suburb flyout for the active region */}
                <div className="w-56 py-2">
                  {readySuburbsFor(activeRegionData).map((slug) => {
                    const suburb = getSuburb(slug);
                    return (
                      <Link
                        key={slug}
                        href={`/${activeRegionData.slug}/${slug}`}
                        onClick={closeAllMenus}
                        className="block px-4 py-2 font-body text-sm text-ink/75 transition hover:bg-paper hover:text-clay"
                      >
                        {suburb.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {otherNavLinks.map((link) => (
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

      {/* ── Mobile slide-down panel ── */}
      {menuOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-mortar bg-paper sm:hidden">
          <nav className="mx-auto flex max-w-wrap flex-col px-5 py-3">
            {/* Areas we cover — accordion */}
            <div className="border-b border-mortar">
              <div className="flex items-center justify-between py-3.5">
                <Link href="/#regions" onClick={closeAllMenus} className="font-body text-base font-medium text-ink">
                  Areas we cover
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileAreasOpen((o) => !o)}
                  aria-label={mobileAreasOpen ? "Collapse areas" : "Expand areas"}
                  className="flex h-8 w-8 items-center justify-center text-ink/60"
                >
                  <ChevronDown className={`transition-transform ${mobileAreasOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {mobileAreasOpen && (
                <div className="pb-2 pl-1">
                  {regionList.map((r) => (
                    <div key={r.slug} className="border-t border-mortar/60 first:border-t-0">
                      <div className="flex items-center justify-between py-2.5">
                        <Link
                          href={`/${r.slug}`}
                          onClick={closeAllMenus}
                          className="font-body text-sm font-semibold text-ink"
                        >
                          {r.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileActiveRegion((cur) => (cur === r.slug ? null : r.slug))
                          }
                          aria-label={mobileActiveRegion === r.slug ? `Collapse ${r.name}` : `Expand ${r.name}`}
                          className="flex h-7 w-7 items-center justify-center text-ink/50"
                        >
                          <ChevronDown
                            className={`transition-transform ${mobileActiveRegion === r.slug ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      {mobileActiveRegion === r.slug && (
                        <div className="pb-2 pl-3">
                          {readySuburbsFor(r).map((slug) => {
                            const suburb = getSuburb(slug);
                            return (
                              <Link
                                key={slug}
                                href={`/${r.slug}/${slug}`}
                                onClick={closeAllMenus}
                                className="block py-2 font-body text-sm text-ink/65"
                              >
                                {suburb.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {otherNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAllMenus}
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
