// app/blog/does-colorbond-rust/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleFigure from "@/components/ArticleFigure";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";

const IMAGE_ALT =
  "Modern two-storey home with a dark Colorbond steel roof, gutters and fascia, the parts to keep clean so Colorbond doesn't rust";

export const metadata = articleMetadata({
  slug: "does-colorbond-rust",
  title: "Does Colorbond Rust? What Adelaide Homeowners Should Know | Adelaide Roofers",
  description:
    "Does Colorbond rust? Rarely, if it suits your location and is kept clean. Where rust starts, which grade suits Adelaide's coast, and upkeep.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Does Colorbond Rust? What Adelaide Homeowners Should Know";

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
      item: `${site.url}/blog/does-colorbond-rust`,
    },
  ],
};

const RUST_STARTS = [
  {
    title: "Swarf left on the roof",
    text: "Metal shavings from cutting and drilling corrode quickly and leave rust-coloured spots. BlueScope says cleaning them up is the job of the installer and any trade that follows, such as a solar installer.",
  },
  {
    title: "Unwashed areas",
    text: "Places rain doesn't rinse, such as under eaves, the underside of eave gutters, garage doors and patios, collect dust and salt that hold moisture against the steel.",
  },
  {
    title: "Water ponding after hail",
    text: "BlueScope says hail dents don't usually shorten a Colorbond roof's life, but on low-pitched roofs deep dents can let water and dirt pond, which may promote corrosion.",
  },
  {
    title: "The wrong product for the location",
    text: "Near breaking surf, standard Colorbond isn't the recommended product. Closer in, BlueScope recommends Colorbond Ultra or stainless steel.",
  },
];

const ADELAIDE_TABLE = [
  {
    where: "Adelaide's metro coastline north of Carrickalinga Point (e.g. Port Noarlunga, West Beach, Glenelg, Semaphore)",
    type: "Exposed marine",
    product: "Colorbond in a Classic or Matt finish at any distance. Zincalume and Metallic finishes: more than 100 m away.",
  },
  {
    where: "Port River (Port Adelaide), West Lakes waterways",
    type: "Calm marine",
    product: "Colorbond in a Classic or Matt finish at any distance. Zincalume and Metallic finishes: more than 100 m away.",
  },
  {
    where: "Surf beaches (e.g. Middleton, Port Elliot, Cape Jervis, Robe)",
    type: "Surf marine",
    product: "Colorbond more than 200 m from breaking surf; Colorbond Ultra from 100 to 200 m; stainless steel closer than that.",
  },
];

// Horizontal guide: distance from breaking surf (high-water mark) -> recommended product.
function SurfDistanceDiagram() {
  const x0 = 40;
  const x100 = 220;
  const x200 = 400;
  const xEnd = 600;
  return (
    <svg
      viewBox="0 0 640 230"
      role="img"
      aria-labelledby="cb-surf-title cb-surf-desc"
      className="mx-auto block h-auto w-full min-w-[520px] max-w-2xl"
    >
      <title id="cb-surf-title">Which roofing steel BlueScope recommends by distance from the sea</title>
      <desc id="cb-surf-desc">
        Two bars. Near breaking surf: stainless steel within 100 metres of the high-water mark,
        Colorbond Ultra from 100 to 200 metres, and standard Colorbond beyond 200 metres. Near
        exposed or calm water, such as Adelaide&apos;s metro beaches, the Port River and West
        Lakes: standard Colorbond in a Classic or Matt finish at any distance.
      </desc>

      <text x={x0} y="22" className="fill-ink font-display" fontSize="14" fontWeight="700">
        Near breaking surf (e.g. Middleton, Port Elliot)
      </text>
      <rect x={x0} y="34" width={x100 - x0} height="34" className="fill-ink" />
      <rect x={x100} y="34" width={x200 - x100} height="34" className="fill-clay" />
      <rect x={x200} y="34" width={xEnd - x200} height="34" className="fill-clay/25" />
      <text x={(x0 + x100) / 2} y="56" textAnchor="middle" className="fill-paper font-body" fontSize="13" fontWeight="700">Stainless steel</text>
      <text x={(x100 + x200) / 2} y="56" textAnchor="middle" className="fill-ink font-body" fontSize="13" fontWeight="700">Colorbond Ultra</text>
      <text x={(x200 + xEnd) / 2} y="56" textAnchor="middle" className="fill-ink font-body" fontSize="13" fontWeight="700">Colorbond</text>
      {[
        [x0, "0 m"],
        [x100, "100 m"],
        [x200, "200 m"],
      ].map(([x, t]) => (
        <g key={t}>
          <line x1={x} y1="68" x2={x} y2="76" className="stroke-ink/50" strokeWidth="1.5" />
          <text x={x} y="90" textAnchor="middle" className="fill-ink/70 font-body" fontSize="12">{t}</text>
        </g>
      ))}

      <text x={x0} y="132" className="fill-ink font-display" fontSize="14" fontWeight="700">
        Near exposed or calm water (Adelaide metro beaches, Port River, West Lakes)
      </text>
      <rect x={x0} y="144" width={xEnd - x0} height="34" className="fill-clay/25" />
      <text x={(x0 + xEnd) / 2} y="166" textAnchor="middle" className="fill-ink font-body" fontSize="13" fontWeight="700">
        Colorbond (Classic or Matt finish) at any distance
      </text>
      <line x1={x0} y1="178" x2={x0} y2="186" className="stroke-ink/50" strokeWidth="1.5" />
      <text x={x0} y="200" textAnchor="middle" className="fill-ink/70 font-body" fontSize="12">0 m</text>
      <text x={x0} y="222" className="fill-ink/70 font-body" fontSize="12">
        Distances from the high-water mark. Wind, shelter and unwashed areas still matter.
      </text>
    </svg>
  );
}

const FAQS = [
  {
    q: "Does Colorbond rust near the beach in Adelaide?",
    a: "Adelaide's metro coastline, from Port Noarlunga to Semaphore, is classed by BlueScope as exposed marine rather than surf, and its selection guide recommends standard Colorbond in a Classic or Matt finish there. Near-coast homes still need unwashed areas hosed down more often.",
  },
  {
    q: "What are the small rust spots on my new Colorbond roof?",
    a: "Usually swarf: steel shavings from cutting and drilling that were left on the roof. They corrode quickly and stain. BlueScope says cleaning them up is the installer's responsibility, so call the roofer back.",
  },
  {
    q: "Is Colorbond Ultra worth it?",
    a: "It's designed for severe marine environments. BlueScope recommends it between 100 and 200 m from breaking surf. For most Adelaide homes, including those near the metro beaches, standard Colorbond is the recommended product.",
  },
  {
    q: "Does painting Colorbond void the warranty?",
    a: "Yes. BlueScope says overpainting Colorbond voids any warranties it issued, so check your warranty before painting a roof that's still covered.",
  },
];

const SOURCES = [
  {
    href: "https://colorbond.com/faq",
    label: "Colorbond steel FAQs: coastal distances, maintenance, swarf and hail",
    note: " (Colorbond, BlueScope)",
  },
  {
    href: "https://cdn.dcs.bluescope.com.au/download/tb-01a",
    label: "Technical Bulletin TB-01A: steel roofing products selection guide",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://cdn.dcs.bluescope.com.au/download/tb-35",
    label: "Technical Bulletin TB-35: Australian salt marine classifications",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://cdn.dcs.bluescope.com.au/download/tb-04",
    label: "Technical Bulletin TB-04: maintenance of exterior BlueScope coated steel products",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://cdn.dcs.bluescope.com.au/download/tb-05",
    label: "Technical Bulletin TB-05: swarf staining",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://cdn.dcs.lysaght.com/download/tb-02",
    label: "Technical Bulletin TB-2: overpainting and restoration",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://www.bluescopesteel.com.au/products/colorbond-ultra-steel",
    label: "Colorbond Ultra steel",
    note: " (BlueScope)",
  },
  {
    href: "https://bluescopesteel.com.au/resources/articles/bluescope-launches-new-colorbond-steel-colour-palette",
    label: "Colorbond steel roofing warranty of up to 45 years",
    note: " (BlueScope)",
  },
];

const KEY_POINTS = [
  "Colorbond rarely rusts when it suits the location and is kept clean.",
  "Rust usually starts with swarf, unwashed areas, or water ponding in dents.",
  "BlueScope classes Adelaide's metro beaches as exposed marine, where standard Colorbond is recommended.",
  "Near breaking surf, use Colorbond Ultra (100 to 200 m) or stainless steel (closer).",
];

const JUMP_LINKS = [
  { href: "#how-it-works", label: "How it resists rust" },
  { href: "#where-rust-starts", label: "Where rust starts" },
  { href: "#coast", label: "Adelaide's coast" },
  { href: "#upkeep", label: "Upkeep" },
  { href: "#already-rusty", label: "Already rusty?" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function DoesColorbondRustPage() {
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
            <ArticleMeta slug="does-colorbond-rust" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Does Colorbond rust? It can, but rarely, if the product suits the location and the
              roof is kept clean. When it does, rust usually starts with swarf (metal shavings
              left after installation), dirt and salt in areas rain doesn&apos;t wash, or water
              ponding in hail dents on a low-pitched roof. Near the coast, the product matters:
              BlueScope classes Adelaide&apos;s metro beaches as exposed marine, where standard
              Colorbond in a Classic or Matt finish is recommended, while homes near breaking surf
              need Colorbond Ultra or stainless steel.
            </p>
            <p className={body}>
              Below: how the coating protects the steel, where rust starts, which product
              BlueScope recommends along Adelaide&apos;s coast, and the upkeep that prevents it.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-colorbond-roofing.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="how-it-works" className="scroll-mt-24">
                <h2 className={h2}>How Colorbond resists rust</h2>
                <p className={body}>
                  Colorbond is steel with a metallic alloy coating under baked-on paint. The
                  metallic coating does the corrosion-resistance work, and the paint adds colour
                  and a further barrier. As long as both stay intact and clean, the steel underneath
                  is well protected. BlueScope backs Colorbond roofing with warranties against
                  rusting through of up to 45 years, depending on how and where it&apos;s used.
                </p>
              </article>

              <article id="where-rust-starts" className="scroll-mt-24">
                <h2 className={h2}>Does Colorbond rust? Where it usually starts</h2>
                <div className="mt-6 space-y-6">
                  {RUST_STARTS.map((r) => (
                    <div key={r.title}>
                      <h3 className={h3}>{r.title}</h3>
                      <p className="mt-2 font-body leading-relaxed text-ink/70">{r.text}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article id="coast" className="scroll-mt-24">
                <h2 className={h2}>Adelaide&apos;s coast: which product where</h2>
                <p className={body}>
                  BlueScope sorts coastal areas into surf, exposed and calm marine, and lists
                  example locations for each. Here&apos;s how its guides apply around Adelaide:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Where</th>
                        <th className={th}>BlueScope classification</th>
                        <th className={th}>Recommended roofing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ADELAIDE_TABLE.map((row, i) => (
                        <tr key={row.where} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{row.where}</td>
                          <td className={td}>{row.type}</td>
                          <td className={td}>{row.product}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  BlueScope stresses these are a guide only: prevailing winds, shelter, height
                  above the water and unwashed areas all change the real exposure. Warranty cover
                  also varies with location, so ask your roofer to check the warranty for your
                  address before you choose.
                </p>
              </article>

              <ArticleFigure
                heading="Distance from the sea at a glance"
                caption="Based on BlueScope Technical Bulletins TB-01A (selection guide) and TB-35 (salt marine classifications). Distances are from the high-water mark."
              >
                <SurfDistanceDiagram />
              </ArticleFigure>

              <article id="upkeep" className="scroll-mt-24">
                <h2 className={h2}>Upkeep that stops rust starting</h2>
                <ul className={list}>
                  <li>
                    Hose down unwashed areas (under eaves, eave gutter undersides, garage doors,
                    carports and patios) at least every six months, or every three months near the
                    coast.
                  </li>
                  <li>
                    For stubborn dirt, use a mild soap or non-abrasive detergent with a soft brush,
                    then rinse. No steel wool or abrasive scourers.
                  </li>
                  <li>Keep gutters clear so water and leaves don&apos;t sit against the steel.</li>
                  <li>
                    After any trade works on the roof, such as a{" "}
                    <Link href="/blog/solar-panels-and-your-roof" className={inlineLink}>
                      solar installation
                    </Link>
                    , make sure the swarf is swept or blown off.
                  </li>
                  <li>
                    Register your warranty: BlueScope accepts applications for up to 12 months
                    after installation.
                  </li>
                </ul>
                <p className={body}>
                  A periodic roof check catches problems early. Here&apos;s{" "}
                  <Link href="/blog/how-often-inspect-your-roof" className={inlineLink}>
                    how often to have your roof inspected
                  </Link>
                  .
                </p>
              </article>

              <article id="already-rusty" className="scroll-mt-24">
                <h2 className={h2}>Already seeing rust?</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Small spots on a newer roof:</strong> most likely
                    swarf staining. Ask the installer back to clean it.
                  </li>
                  <li>
                    <strong className="text-ink">Surface rust on older sheets:</strong> a
                    restoration can clean, treat and recoat it, but BlueScope says overpainting
                    voids its warranties. See{" "}
                    <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                      what a metal roof restoration costs
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Holes or rust through the sheet:</strong> paint
                    won&apos;t fix it; those sheets need replacing, and widespread rust-through
                    usually means a new roof.
                  </li>
                </ul>
                <p className={body}>
                  Still choosing a material? Compare{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile for Adelaide homes
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get the right product for your address
                </h2>
                <p className={body}>
                  A local roofer can check your exposure and the warranty for your address rather
                  than defaulting to one product.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/colorbond-roofing"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See Colorbond roofing →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Does Colorbond rust: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
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
