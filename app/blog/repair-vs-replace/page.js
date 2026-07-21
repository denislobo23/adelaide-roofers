// app/blog/repair-vs-replace/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import RepairVsReplaceQuiz from "@/components/RepairVsReplaceQuiz";

export const metadata = {
  title: "Repair vs. Replace: Which Does Your Roof Need? | Adelaide Roofers",
  description:
    "A simple framework for telling whether your roof needs a repair, a restoration, or a full replacement — and why the real comparison isn't the price of one job.",
  alternates: { canonical: `${site.url}/blog/repair-vs-replace` },
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
      name: "Repair vs. Replace: Which Does Your Roof Need?",
      item: `${site.url}/blog/repair-vs-replace`,
    },
  ],
};

const DECISION_TABLE = [
  {
    situation: "A handful of cracked tiles or a single leak, roof otherwise sound",
    path: "Repair",
  },
  {
    situation: "Roof is structurally sound but faded, chalky, or has moss/lichen build-up",
    path: "Restoration",
  },
  {
    situation: "Repeated leaks in different spots, or repairs needed more than once a year",
    path: "Getting close to replacement",
  },
  {
    situation: "Roof is asbestos and showing any cracking or deterioration",
    path: "Replacement (safety, not just cosmetics)",
  },
  {
    situation: "Roof is 40+ years old with widespread wear, or you're planning solar",
    path: "Replacement usually pays off over patch-repairing",
  },
];

export default function RepairVsReplacePage() {
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
            <span className="eyebrow text-clay">Repair vs. replace</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Repair vs. Replace: Which Does Your Roof Need?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A few cracked tiles is a different problem to a roof that&apos;s leaking every
              winter — but it&apos;s not always obvious which side of that line your roof is
              actually on. Here&apos;s a simple framework for working it out, and why the real
              comparison isn&apos;t &ldquo;repair price vs. replacement price.&rdquo;
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Roof repair vs replacement in Adelaide — roofer assessing tile condition before recommending next steps"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The quick decision table
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This isn&apos;t exhaustive, but it covers most situations homeowners actually
                  face:
                </p>
                <div className="mt-5 overflow-hidden rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">
                          Situation
                        </th>
                        <th className="border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink">
                          Likely path
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {DECISION_TABLE.map((row, i) => (
                        <tr key={row.situation} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">
                            {row.situation}
                          </td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm font-semibold text-ink">
                            {row.path}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Or get a straight answer for your specific situation
                </h2>
                <div className="mt-5">
                  <RepairVsReplaceQuiz />
                </div>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Signs it&apos;s just a repair
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A repair makes sense when the problem is isolated and the rest of the roof is
                  sound: one or two cracked or slipped tiles, a single active leak with an
                  identifiable source, or damage confined to a small, specific area — often
                  after a storm. The rest of the roof holding up fine is the key signal here.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Signs it&apos;s a restoration
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Restoration — cleaning, sealing, and repainting, plus re-bedding and
                  re-pointing ridge capping — fits when the roof is structurally fine but showing
                  its age cosmetically: faded or chalky coating, moss or lichen build-up, or
                  ridge capping that&apos;s started to crumble. Nothing&apos;s actively failing
                  yet, but it&apos;s heading that way without attention.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Signs it&apos;s time to replace
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Replacement is worth considering seriously once repairs start becoming a
                  pattern rather than a one-off — multiple leaks in different spots, or call-outs
                  more than once a year. It&apos;s also the right call regardless of pattern if
                  the roof is asbestos and showing any cracking or deterioration, since that&apos;s
                  a safety question, not just a cosmetic one. And a roof that&apos;s 40+ years
                  old with widespread wear, or a home planning to add solar, often makes more
                  sense to replace outright than to keep patching.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  The real comparison isn&apos;t one job&apos;s price
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  The comparison that actually matters isn&apos;t &ldquo;repair price vs.
                  replacement price&rdquo; — it&apos;s repeated repair cost over the next five
                  years vs. one replacement now. A roof needing several call-outs a year often
                  costs more over time than a single replacement, without ever actually solving
                  the underlying problem. If repairs are becoming routine rather than occasional,
                  that pattern itself is the signal worth paying attention to.
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
          We&apos;ll match you with a vetted local roofer for an obligation-free assessment.
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
