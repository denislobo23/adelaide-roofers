// app/blog/how-long-does-roof-replacement-take/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed — 3rd use, acceptable given exact topic match)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "How Long Does a Roof Replacement Actually Take? | Adelaide Roofers",
  description:
    "A realistic day-by-day breakdown of a full roof replacement in Adelaide, and the factors that can extend the timeline.",
  alternates: { canonical: `${site.url}/blog/how-long-does-roof-replacement-take` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: "How Long Does a Roof Replacement Actually Take?",
      item: `${site.url}/blog/how-long-does-roof-replacement-take`,
    },
  ],
};

const TIMELINE = [
  { day: "Day 1", task: "Old roof removal and disposal begins" },
  { day: "Day 1–2", task: "Frame and battens inspected, any damage repaired" },
  { day: "Day 2–3", task: "New roofing material installed" },
  { day: "Day 3", task: "Flashings, capping, and ridge details completed" },
  { day: "Day 3–4", task: "Final inspection and site clean-up" },
];

export default function HowLongDoesReplacementTakePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="mx-auto max-w-wrap px-5 pt-16 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_280px] md:gap-14">
          {/* ── MAIN CONTENT ─────────────────────────────── */}
          <div>
            <span className="eyebrow text-clay">Process</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              How Long Does a Roof Replacement Actually Take?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most standard residential replacements in Adelaide wrap up within a few days —
              here's a realistic breakdown of what those days actually involve.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Roof replacement in progress on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  A typical timeline
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  For a standard single-storey home, this is roughly what the process looks like
                  — larger or more complex roofs simply extend each stage rather than adding
                  entirely new ones:
                </p>
                <div className="mt-5 overflow-hidden rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">Stage</th>
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">What happens</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIMELINE.map((row, i) => (
                        <tr key={row.day} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm font-semibold text-ink">{row.day}</td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">{row.task}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What extends the timeline
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A larger or more complex roofline, significant frame or batten damage found
                  once the old roof is off, a material conversion (tile to metal) rather than
                  like-for-like, and weather all add time. None of these are unusual — they're
                  just worth knowing about upfront rather than assuming every job takes exactly
                  the same number of days.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The roof stays weather-sealed the whole time
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A properly run job keeps the home weather-sealed at the end of every single
                  day, regardless of how far through the job you are — you're never left exposed
                  to rain overnight partway through a replacement.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Can I stay in the house during the work?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Yes — for the vast majority of replacements, there's no need to move out.
                  Expect noise during the day, but the home remains liveable throughout.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get a timeline specific to your roof
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A local roofer can give you an accurate timeline once they've actually seen the
                  roof, rather than a generic estimate.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Try the free calculator →
                  </Link>
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
                  </Link>
                </div>
              </article>
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with a vetted local roofer for an obligation-free quote.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <ContactForm />
        </div>
        <p className="mt-6 font-body text-sm text-ink/50">
          Prefer to talk it through first?{" "}
          <a href={site.phoneHref} className="font-semibold text-clay underline-offset-2 hover:underline">
            Call {site.phoneDisplay}
          </a>
        </p>
      </section>
    </main>
  );
}
