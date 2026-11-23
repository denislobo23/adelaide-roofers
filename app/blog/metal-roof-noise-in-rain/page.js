// app/blog/metal-roof-noise-in-rain/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "metal-roof-noise-in-rain",
  title: "Is a Metal Roof Really Noisier in the Rain? | Adelaide Roofers",
  description:
    "Is a Colorbond roof noisy in the rain? Not when it's insulated properly. What really controls roof noise, where you'll notice it, and what to ask your Adelaide roofer.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: "Colorbond metal roof on an Adelaide home",
});

const HEADLINE = "Is a Metal Roof Really Noisier in the Rain?";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: HEADLINE,
      item: `${site.url}/blog/metal-roof-noise-in-rain`,
    },
  ],
};

const SOURCES = [
  {
    href: "https://lysaght.com/support-technical/support/design/rain-noise-considerations-steel-roofs",
    label: "Rain noise considerations for steel roofs",
    note: " (Lysaght, part of BlueScope)",
  },
  {
    href: "https://www.yourhome.gov.au/passive-design/passive-cooling",
    label: "Passive cooling",
    note: " (YourHome, Australian Government)",
  },
  {
    href: "https://media.bom.gov.au/social/blog/1733/explainer-how-does-hail-form/",
    label: "Explainer: how does hail form?",
    note: " (Bureau of Meteorology)",
  },
];

const h2 ="font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";

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
              {HEADLINE}
            </h1>
            <ArticleMeta slug="metal-roof-noise-in-rain" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A modern Colorbond roof, installed properly with an insulation blanket and a ceiling
              underneath, is only a little louder than tile in normal rain, and most people barely
              notice the difference inside. The loud &ldquo;tin roof&rdquo; sound comes from old
              roofs with no insulation, or from verandahs, carports and sheds with nothing under
              the sheeting. Heavy hail is the exception: you&apos;ll hear it on any metal roof.
            </p>
            <p className={body}>
              Below is what actually decides how loud a roof is, and what to ask your roofer for.
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
                <h2 className={h2}>Why old tin roofs were so loud</h2>
                <p className={body}>
                  Many older Adelaide homes had corrugated iron laid straight onto battens, with
                  little or no insulation and sometimes no sarking. Rain hit the thin sheet and the
                  sound came straight through the roof space into the house. That&apos;s where the
                  reputation comes from, not from modern steel roofing.
                </p>
              </article>

              <article>
                <h2 className={h2}>What actually controls the noise</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Insulation blanket:</strong> a foil-faced
                    insulation blanket laid directly under the sheets is the single biggest factor.
                    It dampens the drumming before it reaches the roof space.
                  </li>
                  <li>
                    <strong className="text-ink">Ceiling insulation:</strong> batts on the ceiling
                    add a second layer between the roof and your rooms.
                  </li>
                  <li>
                    <strong className="text-ink">The ceiling itself:</strong> a plasterboard
                    ceiling blocks far more sound than an open, raked or exposed ceiling.
                  </li>
                  <li>
                    <strong className="text-ink">Fixings and battens:</strong> loose fixings or
                    sheets that aren&apos;t fixed tightly rattle and amplify the sound.
                  </li>
                  <li>
                    <strong className="text-ink">Roof pitch and profile:</strong> these make a
                    small difference, but far less than insulation.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>Where you will notice it</h2>
                <ul className={list}>
                  <li>
                    Verandahs, pergolas, carports and sheds with no ceiling or insulation will
                    always be noisy in rain.
                  </li>
                  <li>
                    Raked or cathedral ceilings, where the roof sits right above the room, need
                    extra insulation to stay quiet.
                  </li>
                  <li>
                    Hail is loud on metal regardless. Adelaide gets occasional hail storms, mostly
                    in spring and early summer.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>Is tile quieter?</h2>
                <p className={body}>
                  Yes, slightly. Tiles are heavy and absorb more of the impact, so in light rain the
                  difference can be noticeable on an uninsulated roof. Once a metal roof has a
                  proper insulation blanket, the gap is small. Tile has its own trade-offs: more
                  weight, more maintenance and slower installation. See our{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile comparison
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className={h2}>A bonus: insulation also keeps the house cooler</h2>
                <p className={body}>
                  The same blanket that cuts rain noise also reduces heat coming through the roof.
                  In Adelaide summers, that matters more than the noise for many homeowners. Pair
                  it with a light roof colour for the best result.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  What to ask your roofer
                </h2>
                <ol className={olist}>
                  <li>
                    Will you install an insulation blanket directly under the sheets, and which
                    product?
                  </li>
                  <li>
                    Is the existing ceiling insulation in good condition, or should it be topped up?
                  </li>
                  <li>Are there any rooms with raked ceilings that need extra treatment?</li>
                  <li>How will the sheets be fixed to avoid rattling?</li>
                </ol>
                <p className={body}>
                  If you&apos;re switching from tile, see{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    what changes when you go tile-to-metal
                  </Link>
                  . To get a quote, see our page on{" "}
                  <Link href="/services/colorbond-roofing" className={inlineLink}>
                    Colorbond roofing in Adelaide
                  </Link>
                  .
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

              <article>
                <h2 className="font-display text-lg font-bold tracking-tight text-ink">Sources</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-ink/60 marker:text-clay">
                  {SOURCES.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {s.note}
                    </li>
                  ))}
                </ul>
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
