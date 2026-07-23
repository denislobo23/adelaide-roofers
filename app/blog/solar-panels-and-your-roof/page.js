// app/blog/solar-panels-and-your-roof/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed — solar mounting is discussed alongside metal roofing in tile-to-metal-roofing article too)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "Solar Panels and Your Roof: What to Check First | Adelaide Roofers",
  description:
    "What to check about your roof's condition and material before installing solar, and why doing roof work first usually saves money overall.",
  alternates: { canonical: `${site.url}/blog/solar-panels-and-your-roof` },
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
      name: "Solar Panels and Your Roof: What to Check First",
      item: `${site.url}/blog/solar-panels-and-your-roof`,
    },
  ],
};

export default function SolarPanelsAndYourRoofPage() {
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
              Solar Panels and Your Roof: What to Check First
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Installing solar is fundamentally a roof decision as much as an electrical one —
              here's what's worth checking about your roof before the panels go up.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Solar panel installation considerations on an Adelaide roof"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Your roof's remaining lifespan
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Solar panels are typically expected to last 20-plus years. If your roof is
                  already ageing and likely to need restoration or replacement well before that,
                  it's worth doing that roof work first — removing and refitting panels for
                  roof work later adds real, avoidable cost.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Material affects mounting
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Metal roofing generally allows simpler, more secure panel mounting than tile
                  does. Tile installations are entirely possible, but the mounting process is
                  more involved and can mean a slightly higher install cost for the same solar
                  system.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Structural capacity
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Solar panels add real weight to a roof structure. A roofer or solar installer
                  should confirm the roof and frame can handle the additional load, particularly
                  on older homes.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-clay">
                  Asbestos roofs need a different conversation entirely
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If your roof is asbestos cement, mounting solar directly onto it isn't something
                  to attempt — any penetration risks disturbing the material. Licensed removal and
                  replacement needs to happen first, which is worth factoring into solar planning
                  timelines on an older home.{" "}
                  <Link href="/services/asbestos-roof-removal" className="font-semibold text-clay hover:text-clay-deep">
                    See asbestos roof removal
                  </Link>{" "}
                  if that applies to you.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get the roof sorted first
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  If you're planning solar and unsure whether your roof needs attention first,
                  it's worth checking before committing to an install date.
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
