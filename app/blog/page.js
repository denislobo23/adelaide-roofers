// app/blog/page.js
//
// The actual browsable articles index — separate from the header's
// "Articles" dropdown (which is a quick-access menu, not a real page).
// Pulls from data/articles-data.js, same source the nav dropdown uses,
// so this page and the nav can never drift out of sync with each other.

import Link from "next/link";
import { site } from "@/data/config";
import { articles } from "@/data/articles-data";
import CallButton from "@/components/CallButton";
import RidgeDivider from "@/components/RidgeDivider";

export const metadata = {
  title: `Roofing Guides for Adelaide Homeowners | ${site.brand}`,
  description:
    "Every guide on costs, materials, choosing a roofer, and the roofing process — written for Adelaide homeowners, no sales pitch.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: `Roofing Guides for Adelaide Homeowners | ${site.brand}`,
    description: "Every guide on costs, materials, choosing a roofer, and the roofing process.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

// Fixed display order — falls back to alphabetical for any category not
// listed here, so a new category added later doesn't just vanish.
const CATEGORY_ORDER = [
  "Costs",
  "Repair vs. replace",
  "Materials",
  "Process",
  "Choosing a roofer",
];

function groupByCategory(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  const orderedKeys = [
    ...CATEGORY_ORDER.filter((c) => groups[c]),
    ...Object.keys(groups).filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];
  return orderedKeys.map((category) => ({ category, items: groups[category] }));
}

function ArticleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-clay">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export default function BlogIndexPage() {
  const grouped = groupByCategory(articles);

  return (
    <main>
      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 md:py-24">
        <nav className="mb-4 font-body text-sm text-ink/50">
          <Link href="/" className="hover:text-clay">Home</Link>
          <span className="px-1.5">/</span>
          Roofing Guides
        </nav>
        <span className="eyebrow text-clay">Roofing guides</span>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight text-ink md:text-5xl">
          Guides and answers for Adelaide homeowners
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          Costs, materials, the roofing process, and how to choose a roofer you can trust —
          written plainly, with no sales pitch attached.
        </p>
      </section>

      <RidgeDivider />

      {/* ── GROUPED ARTICLES ───────────────────────────────── */}
      <section className="border-y border-mortar bg-white">
        <div className="mx-auto max-w-wrap px-5 py-16">
          {grouped.map((group) => (
            <div key={group.category} className="mb-14 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-ink">
                {group.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="flex items-start gap-3 rounded-2xl border border-mortar bg-paper p-6 transition hover:border-clay"
                  >
                    <ArticleIcon />
                    <span className="font-display text-base font-bold leading-snug tracking-tight text-ink">
                      {a.title} <span className="text-clay">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Ready to get a number for your own roof?
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          Try the free calculator, or call and we&apos;ll connect you with a local roofer.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
          >
            Try the free calculator →
          </Link>
          <CallButton />
        </div>
      </section>
    </main>
  );
}
