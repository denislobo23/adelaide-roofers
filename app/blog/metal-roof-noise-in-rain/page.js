// app/blog/metal-roof-noise-in-rain/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleFigure from "@/components/ArticleFigure";

export const metadata = articleMetadata({
  slug: "metal-roof-noise-in-rain",
  title: "Metal Roof Noise in the Rain: Is It Really Louder? | Adelaide Roofers",
  description:
    "Is a Colorbond roof noisy in the rain? Not if it's insulated properly. What controls metal roof noise, where you'll notice it, and what to ask your roofer.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: "Modern two-storey home with a dark Colorbond metal roof",
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
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics for Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
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

const FAQS = [
  {
    q: "How do I reduce rain noise on a metal roof?",
    a: "The biggest fix is an insulation blanket laid directly under the sheets and pulled tight against them, which damps the vibration where the rain hits. Ceiling batts, a plasterboard ceiling and tight fixings reduce it further.",
  },
  {
    q: "Is a metal roof louder than tile in the rain?",
    a: "Slightly. Tiles are heavy and absorb more of the impact, so the difference can be noticeable on an uninsulated roof. Once a metal roof has a proper insulation blanket, the gap is small.",
  },
  {
    q: "Can I add insulation under an existing metal roof?",
    a: "The blanket sits directly under the sheets, so it's usually easiest to add when the roof is installed or replaced. On an existing roof, topping up the ceiling batts is the simpler way to cut noise.",
  },
  {
    q: "Why is my verandah or carport so noisy in the rain?",
    a: "Verandahs, pergolas, carports and sheds usually have no ceiling or insulation under the sheeting, so nothing damps the sound. They will always be noisier than the main roof.",
  },
];

// Corrugated profile for the roof cross-section diagram
const WAVE = Array.from({ length: 49 }, (_, i) => {
  const x = 20 + i * 7.5;
  const y = 70 + Math.sin(i * 1.05) * 6;
  return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
}).join(" ");

// y = where the leader line touches the layer, ly = where its label sits
const LAYERS = [
  { y: 70, ly: 64, lines: ["Colorbond sheet"] },
  { y: 88, ly: 96, lines: ["Insulation blanket, pulled tight", "under the sheets: the biggest factor"] },
  { y: 107, ly: 138, lines: ["Battens, fixed tight so", "the sheets don\u2019t rattle"] },
  { y: 160, ly: 174, lines: ["Roof space"] },
  { y: 217, ly: 212, lines: ["Ceiling batts: a second layer"] },
  { y: 238, ly: 240, lines: ["Plasterboard ceiling: blocks far more", "sound than a raked or open ceiling"] },
  { y: 288, ly: 292, lines: ["Your room"] },
];

function RoofLayersDiagram() {
  return (
    <svg
      viewBox="0 0 640 340"
      role="img"
      aria-labelledby="noise-layers-title noise-layers-desc"
      className="mx-auto block h-auto w-full min-w-[520px] max-w-2xl"
    >
      <title id="noise-layers-title">What sits between the rain and your room</title>
      <desc id="noise-layers-desc">
        A cross-section of a metal roof. From the top: rain, the Colorbond sheet, an insulation
        blanket pulled tight under the sheet, battens, the roof space, ceiling batts, a
        plasterboard ceiling, and your room.
      </desc>
      {[40, 90, 140, 190, 240, 290, 340].map((x) => (
        <line key={x} x1={x} y1="12" x2={x - 8} y2="40" className="stroke-clay" strokeWidth="2" strokeLinecap="round" />
      ))}
      <path d={WAVE} fill="none" className="stroke-ink" strokeWidth="4" />
      <rect x="20" y="80" width="360" height="16" rx="3" className="fill-clay/25" />
      <line x1="20" y1="97" x2="380" y2="97" className="stroke-ink/40" strokeWidth="2" strokeDasharray="6 4" />
      {[40, 130, 220, 310].map((x) => (
        <rect key={x} x={x} y="100" width="40" height="14" className="fill-ink/70" />
      ))}
      <rect x="20" y="118" width="360" height="86" className="fill-white stroke-mortar" />
      <rect x="20" y="204" width="360" height="26" className="fill-mortar" />
      <rect x="20" y="232" width="360" height="12" className="fill-ink/60" />
      <rect x="20" y="248" width="360" height="80" className="fill-paper stroke-mortar" />

      {LAYERS.map((l) => (
        <g key={l.y}>
          <line x1="384" y1={l.y} x2="404" y2={l.ly} className="stroke-ink/40" strokeWidth="1.5" />
          {l.lines.map((t, i) => (
            <text key={t} x="410" y={l.ly + 5 + i * 16} className="fill-ink font-body" fontSize="13">{t}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

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
              notice the difference inside. Loud metal roof noise, the &ldquo;tin roof&rdquo; sound,
              comes from old roofs with no insulation, or from verandahs, carports and sheds with nothing under
              the sheeting. Heavy hail is the exception: you&apos;ll hear it on any metal roof.
            </p>
            <p className={body}>
              Below is what actually decides how loud a roof is, and what to ask your roofer for.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt="Modern two-storey home with a dark Colorbond metal roof"
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
                <h2 className={h2}>What actually controls metal roof noise</h2>
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

              <ArticleFigure
                heading="What sits between the rain and your room"
                caption="Each layer under the sheet cuts more noise. The blanket directly under the sheets does the most."
              >
                <RoofLayersDiagram />
              </ArticleFigure>

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
                <p className={body}>
                  In Adelaide, you&apos;ll mostly hear rain in winter. Bureau of Meteorology figures
                  for Kent Town show June, July and August each average around 68 to 78 mm of rain
                  across 10 to 12 rainy days, against only 2 to 3 rainy days a month in January and
                  February. That makes a winter visit the best time to listen to a friend&apos;s
                  Colorbond roof before you choose your own.
                </p>
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

              <ArticleFaq heading="Metal roof noise: common questions" faqs={FAQS} />

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
