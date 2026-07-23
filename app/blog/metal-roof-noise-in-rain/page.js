// app/blog/metal-roof-noise-in-rain/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Is a Metal Roof Really Noisier in the Rain? | Adelaide Roofers",
  description:
    "Where the 'noisy tin roof' reputation actually comes from, and what modern Colorbond installations with proper insulation sound like in practice.",
  alternates: { canonical: `${site.url}/blog/metal-roof-noise-in-rain` },
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
      name: "Is a Metal Roof Really Noisier in the Rain?",
      item: `${site.url}/blog/metal-roof-noise-in-rain`,
    },
  ],
};

export default function MetalRoofNoisePage() {
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
            <span className="eyebrow text-clay">Materials</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Is a Metal Roof Really Noisier in the Rain?
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Less than the reputation suggests — the "noisy tin roof" idea mostly comes from a
              specific kind of building that isn't what's going on a modern Adelaide home.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Colorbond metal roof on an Adelaide home"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Where the reputation actually comes from
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  The "loud tin roof" perception mostly traces back to older sheds and outbuildings
                  — corrugated iron sheeting with no insulation or sarking underneath, directly
                  exposed to the underside of the roof. That's a genuinely different setup to a
                  residential Colorbond roof installed properly.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  What actually determines the noise level
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Insulation and sarking underneath the metal sheeting are the biggest factors —
                  they absorb and dampen the sound significantly. Roof pitch, the ceiling
                  structure below, and how the sheeting is fixed all play a role too.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  How it compares to tile in practice
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Tile is naturally quieter than metal, insulation or not — that's a genuine,
                  physical difference in the materials. But a properly insulated modern metal
                  roof is far closer to tile in everyday noise than the old-shed stereotype
                  suggests, and many homeowners find it a non-issue in practice.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  If noise is a genuine concern
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Ask specifically about the insulation and sarking specification when getting a
                  quote for a metal re-roof — this is the actual lever that controls noise, not
                  the roofing sheet itself.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Weighing up Colorbond vs. tile?
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Noise is just one factor among several worth comparing.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/colorbond-vs-tile"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See the full comparison →
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
          We&apos;ll match you with a vetted local roofer who can talk through material options.
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
