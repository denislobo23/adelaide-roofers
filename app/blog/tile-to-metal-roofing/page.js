// app/blog/tile-to-metal-roofing/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "What Actually Changes When You Go Tile-to-Metal | Adelaide Roofers",
  description:
    "Weight, solar compatibility, colour, and the one thing to check with your council first — what really changes when you switch from tile to Colorbond.",
  alternates: { canonical: `${site.url}/blog/tile-to-metal-roofing` },
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
      name: "What Actually Changes When You Go Tile-to-Metal",
      item: `${site.url}/blog/tile-to-metal-roofing`,
    },
  ],
};

export default function TileToMetalPage() {
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
              What Actually Changes When You Go Tile-to-Metal
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Switching from tile to <strong>Colorbond roofing in Adelaide</strong> is one of
              the most common re-roofing decisions homeowners make — and one of the least
              understood. It&apos;s not just a colour change. Here&apos;s what genuinely
              changes, and what to check before you commit.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Tile to Colorbond roof conversion in Adelaide — new metal roofing sheets being installed"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Weight — roughly a third of tile
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Steel roofing is dramatically lighter than concrete or terracotta tile. That
                  matters for the roof structure itself — less ongoing load on the frame and
                  battens over time — and it&apos;s part of why metal roofs are a common choice
                  when a home is also adding solar panels or other roof-mounted equipment.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Fewer components, fewer failure points
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  A tile roof is made up of hundreds of individual tiles, each one a potential
                  crack or slip point over the decades. Metal roofing is laid in large sheets,
                  which means far fewer joins and components overall — generally less maintenance,
                  though it doesn&apos;t eliminate the need for it entirely.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Solar panel compatibility
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Metal roofing generally allows simpler, more secure mounting for solar panels
                  than tile does. If solar is on your radar at any point — now or in a few years —
                  it&apos;s worth factoring into the material decision now rather than re-doing
                  mounting work later.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Finish and colour
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Colorbond is a factory-baked painted finish, not a coating applied on-site — it
                  comes in a broad standard colour range and doesn&apos;t chalk or fade the way an
                  ageing painted tile coating can. The look is genuinely different from tile,
                  though — this is a visible, permanent change to your home&apos;s appearance, not
                  a subtle one.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  The one thing to check first: heritage and council requirements
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If your home sits in a heritage-listed area or has any character-overlay
                  restrictions, a material change like this can require council approval before
                  work starts — tile is often specifically protected in these zones. Check with
                  your council before you commit to a quote, not after.
                </p>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Council or heritage overlay questions aside, cost is usually the other big
                  factor in this decision.
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
          We&apos;ll match you with a vetted local roofer who can talk you through tile-to-metal
          for your specific home.
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
