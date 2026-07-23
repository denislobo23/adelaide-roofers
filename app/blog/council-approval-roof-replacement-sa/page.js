// app/blog/council-approval-roof-replacement-sa/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Do I Need Council Approval to Replace My Roof in SA? | Adelaide Roofers",
  description:
    "When roof replacement in South Australia is treated as routine maintenance, and when heritage or character overlays mean you need council sign-off first.",
  alternates: { canonical: `${site.url}/blog/council-approval-roof-replacement-sa` },
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
      name: "Do I Need Council Approval to Replace My Roof in SA?",
      item: `${site.url}/blog/council-approval-roof-replacement-sa`,
    },
  ],
};

export default function CouncilApprovalPage() {
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
              Do I Need Council Approval to Replace My Roof in SA?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              For most Adelaide homes, no — but there's a genuine exception worth checking
              before you commit to a quote, not after.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt="Roof replacement work on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The general rule: like-for-like is maintenance
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Replacing a roof with the same or a very similar material — tile for tile,
                  metal for metal — is typically treated as routine maintenance under South
                  Australian planning rules, not development requiring approval.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  The exception: heritage and character overlays
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Homes in a heritage-listed area or within a historic or character overlay are
                  different — changes affecting the roof's appearance, including material
                  changes, can require council approval before work starts. Tile roofing is
                  often specifically protected in these zones.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Material conversions get more scrutiny
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Even outside heritage areas, converting between visibly different material
                  types — tile to Colorbond, for instance — is more likely to draw questions than
                  a like-for-like replacement, particularly in older or more established
                  neighbourhoods.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Check before you quote, not after
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If your home is older or sits in what feels like a heritage-flavoured area, a
                  quick check with your local council before committing to a quote avoids an
                  unwelcome surprise partway through the process.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Considering tile to Colorbond specifically?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  This exact question comes up most often around tile-to-metal conversions.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/tile-to-metal-roofing"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    Read what changes tile-to-metal →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
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
