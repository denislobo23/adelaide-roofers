// app/blog/roof-ventilation-whirlybirds-guide/page.js
// Featured image: public/images/service-roof-ventilation.webp (existing library image)

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
  "Silver whirlybird roof ventilator on a terracotta tile roof, with Adelaide's suburbs and city skyline behind";

export const metadata = articleMetadata({
  slug: "roof-ventilation-whirlybirds-guide",
  title: "Whirlybirds: Do You Need Roof Ventilation in Adelaide? | Adelaide Roofers",
  description:
    "Do whirlybirds work? They help clear heat and moisture from the roof space, but only with air coming in at the eaves and good ceiling insulation.",
  image: "/images/service-roof-ventilation.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Roof Ventilation & Whirlybirds: Do You Actually Need Them?";

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
      item: `${site.url}/blog/roof-ventilation-whirlybirds-guide`,
    },
  ],
};

const OPTIONS = [
  ["Whirlybird (wind-driven turbine)", "Wind spins the turbine and draws air out", "No running cost; output drops on still days"],
  ["Low-breeze polymer turbine", "Designed to spin in lighter breezes", "Bradford says its polymer SupaVent with stainless bearings suits coastal areas"],
  ["Solar-powered vent", "A small solar panel drives a fan", "Works hardest on sunny days, when the roof is hottest"],
  ["Mains-powered roof vent", "An electric fan, often on a thermostat or humidity sensor", "Bradford rates its AiroMatic as effective as up to six natural vents; needs an electrician"],
  ["Eave or soffit vents", "Let fresh air in low down", "The intake every exhaust vent needs"],
];

function AirflowDiagram() {
  return (
    <svg
      viewBox="0 0 640 330"
      role="img"
      aria-labelledby="wb-air-title wb-air-desc"
      className="mx-auto block h-auto w-full min-w-[520px] max-w-2xl"
    >
      <title id="wb-air-title">How air moves through a ventilated roof space</title>
      <desc id="wb-air-desc">
        Cross-section of a house. Cooler air enters through vents at the eaves on both sides, warms
        and rises through the roof space, and leaves through a whirlybird near the ridge. Insulation
        on the ceiling stops the roof-space heat reaching the rooms below.
      </desc>

      {/* roof */}
      <polygon points="60,170 320,50 580,170" className="fill-clay/15 stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      {/* whirlybird */}
      <rect x="364" y="54" width="8" height="20" className="fill-ink/60" />
      <ellipse cx="368" cy="42" rx="20" ry="14" className="fill-paper stroke-ink" strokeWidth="2.5" />
      <line x1="356" y1="34" x2="380" y2="50" className="stroke-ink/60" strokeWidth="1.5" />
      <line x1="356" y1="50" x2="380" y2="34" className="stroke-ink/60" strokeWidth="1.5" />
      {/* ceiling insulation */}
      <rect x="100" y="164" width="440" height="12" className="fill-clay/40" />
      {/* walls and ceiling */}
      <line x1="100" y1="176" x2="540" y2="176" className="stroke-ink" strokeWidth="3" />
      <line x1="100" y1="176" x2="100" y2="290" className="stroke-ink" strokeWidth="3" />
      <line x1="540" y1="176" x2="540" y2="290" className="stroke-ink" strokeWidth="3" />
      <line x1="40" y1="290" x2="600" y2="290" className="stroke-ink/40" strokeWidth="2" />

      {/* intake arrows */}
      <g className="stroke-ink" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M30,196 L88,168" markerEnd="url(#wb-arrow-cool)" />
        <path d="M610,196 L552,168" markerEnd="url(#wb-arrow-cool)" />
      </g>
      {/* rising arrows */}
      <g className="stroke-clay" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M150,150 C220,140 300,110 360,82" markerEnd="url(#wb-arrow-warm)" />
        <path d="M490,150 C440,140 400,112 374,84" markerEnd="url(#wb-arrow-warm)" />
        <path d="M368,26 L368,8" markerEnd="url(#wb-arrow-warm)" />
      </g>
      <defs>
        <marker id="wb-arrow-cool" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-ink" />
        </marker>
        <marker id="wb-arrow-warm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-clay" />
        </marker>
      </defs>

      {/* labels */}
      <text x="394" y="34" className="fill-ink font-body" fontSize="13" fontWeight="700">Whirlybird: hot, moist air out</text>
      <text x="320" y="152" textAnchor="middle" className="fill-ink/80 font-body" fontSize="12">warm air rises</text>
      <text x="16" y="222" className="fill-ink font-body" fontSize="12" fontWeight="700">Eave vent:</text>
      <text x="16" y="238" className="fill-ink font-body" fontSize="12">cooler air in</text>
      <text x="548" y="222" className="fill-ink font-body" fontSize="12" fontWeight="700">Eave vent:</text>
      <text x="548" y="238" className="fill-ink font-body" fontSize="12">cooler air in</text>
      <text x="320" y="200" textAnchor="middle" className="fill-ink font-body" fontSize="12" fontWeight="700">Ceiling insulation</text>
      <text x="320" y="216" textAnchor="middle" className="fill-ink/70 font-body" fontSize="12">keeps roof-space heat out of the rooms</text>
      <text x="320" y="260" textAnchor="middle" className="fill-ink/70 font-body" fontSize="12">Living space</text>
    </svg>
  );
}

const FAQS = [
  {
    q: "Do whirlybirds work without wind?",
    a: "Less well. They rely mainly on wind, helped a little by warm air rising. On still, hot days a solar or mains-powered roof vent moves more air, and some turbines are designed to spin in lighter breezes.",
  },
  {
    q: "How many whirlybirds do I need?",
    a: "It depends on the size of the roof space and how much air can get in at the eaves. One unit on a large roof rarely does much. Ask a roofer to size the number and placement for your roof, including the intake.",
  },
  {
    q: "Do whirlybirds work in winter?",
    a: "Yes. They keep drawing moist air out of the roof space, which helps reduce condensation. That's why the building code requires roof-space ventilation in new homes in cooler climate zones.",
  },
  {
    q: "Are whirlybirds better than more insulation?",
    a: "They do different jobs. Ceiling insulation is what stops heat reaching your rooms; ventilation lowers the temperature and moisture in the roof space above it. If your ceiling insulation is thin or patchy, fix that first.",
  },
];

const SOURCES = [
  {
    href: "https://www.yourhome.gov.au/passive-design/design-climate",
    label: "Design for climate",
    note: " (YourHome, Australian Government)",
  },
  {
    href: "https://www.yourhome.gov.au/getting-started/australian-climate-zones",
    label: "Australian climate zones",
    note: " (YourHome, Australian Government)",
  },
  {
    href: "https://ncc.abcb.gov.au/news/2022/improved-condensation-management-ncc-2022",
    label: "Improved condensation management in NCC 2022",
    note: " (Australian Building Codes Board)",
  },
  {
    href: "https://www.csrbradford.com.au/expertise-and-advice/article-topics/total-home-comfort/the-ultimate-guide-to-roof-ventilation",
    label: "The ultimate guide to roof ventilation",
    note: " (Bradford, CSR)",
  },
];

const KEY_POINTS = [
  "Whirlybirds draw hot, moist air out of the roof space; they don't cool rooms on their own.",
  "They need air coming in low down, usually through eave vents, to work properly.",
  "Ceiling insulation does the heavy lifting; fix thin insulation first.",
  "On still days, solar or mains-powered vents move more air than a turbine.",
];

const JUMP_LINKS = [
  { href: "#do-they-work", label: "Do they work?" },
  { href: "#options", label: "Your options" },
  { href: "#adelaide", label: "Adelaide homes" },
  { href: "#signs", label: "Signs you'd benefit" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay underline-offset-2 hover:underline";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function WhirlybirdsPage() {
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
            <span className="eyebrow text-clay">Maintenance</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="roof-ventilation-whirlybirds-guide" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Whirlybirds help, but they&apos;re not a cooling system on their own. They draw hot,
              moist air out of the roof space, which takes some heat load off the ceiling in
              summer and helps keep condensation down in winter. They only work well with air
              coming in low down, usually through eave vents, and they don&apos;t replace ceiling
              insulation, which is what actually stops heat reaching your rooms. If upstairs rooms
              bake or the roof space smells musty, ventilation is worth a look.
            </p>
            <p className={body}>
              Below: how roof ventilation works, whirlybirds vs powered vents, what applies to
              Adelaide homes, and the signs yours would benefit.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-ventilation.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="do-they-work" className="scroll-mt-24">
                <h2 className={h2}>Do whirlybirds work?</h2>
                <p className={body}>
                  Yes, at the job they&apos;re designed for: moving air out of the roof space. A
                  closed-up roof space traps summer heat that soaks down into the ceiling, and in
                  winter it can trap moisture that condenses on cold timber and sarking. YourHome,
                  the Australian Government&apos;s guide to sustainable homes, lists ventilating
                  roof spaces with fans or whirlybirds among passive cooling measures for hot
                  climates.
                </p>
                <p className={body}>
                  What they can&apos;t do is cool your rooms directly. The air they pull out has to
                  be replaced from somewhere, ideally eave vents, and the ceiling insulation is
                  what stands between the roof space and you.
                </p>
              </article>

              <ArticleFigure
                heading="How a ventilated roof space works"
                caption="Exhaust vents near the ridge only work with intake low down. Insulation on the ceiling does the main job of keeping heat out of the rooms."
              >
                <AirflowDiagram />
              </ArticleFigure>

              <article id="options" className="scroll-mt-24">
                <h2 className={h2}>Whirlybirds and the alternatives</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Type</th>
                        <th className={th}>How it works</th>
                        <th className={th}>Worth knowing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OPTIONS.map(([type, how, note], i) => (
                        <tr key={type} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{type}</td>
                          <td className={td}>{how}</td>
                          <td className={td}>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Product claims are the manufacturer&apos;s. Ask your roofer which type suits your
                  roof and how many, rather than adding a single token unit.
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>What applies to Adelaide homes</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">The building code:</strong> NCC 2022 requires
                    roof-space ventilation openings in new homes in climate zones 6, 7 and 8, to
                    manage condensation. YourHome places Adelaide&apos;s coastal areas in zone 5,
                    so it isn&apos;t required there, but some hinterland areas near Adelaide are in
                    zone 6. It applies to new building work; ask your roofer whether it affects
                    yours.
                  </li>
                  <li>
                    <strong className="text-ink">Bathroom exhaust fans:</strong> NCC 2022 also says
                    many exhaust systems must discharge outside rather than into the roof space. A
                    fan venting into the roof adds moisture that a whirlybird then has to remove.
                  </li>
                  <li>
                    <strong className="text-ink">Older tile roofs:</strong> a tile roof without
                    sarking already breathes through the gaps between tiles. Ventilation tends to
                    matter more under metal roofs and sarked tile roofs.
                  </li>
                  <li>
                    <strong className="text-ink">Near the coast:</strong> choose a unit made for
                    salt air. Bradford says its polymer SupaVent, with stainless steel bearings,
                    suits coastal areas.
                  </li>
                </ul>
                <p className={body}>
                  Re-roofing anyway? It&apos;s the cheapest time to add vents. See{" "}
                  <Link href="/blog/metal-roof-noise-in-rain" className={inlineLink}>
                    how an insulation blanket works under a metal roof
                  </Link>{" "}
                  and{" "}
                  <Link href="/blog/colorbond-vs-tile" className={inlineLink}>
                    Colorbond vs tile
                  </Link>
                  .
                </p>
              </article>

              <article id="signs" className="scroll-mt-24">
                <h2 className={h2}>Signs your home would benefit</h2>
                <ul className={list}>
                  <li>Upstairs or top-floor rooms much hotter than the rest of the house.</li>
                  <li>A roof space that&apos;s stifling when you open the manhole in summer.</li>
                  <li>A musty smell, mould spots or condensation in the roof space in winter.</li>
                  <li>Bathroom or kitchen fans that vent into the roof space.</li>
                </ul>
                <p className={body}>
                  Before adding vents, check the ceiling insulation from the manhole. Thin or
                  patchy insulation is usually the bigger problem. And if a whirlybird has started
                  squeaking or leaking, that&apos;s worth fixing early; here&apos;s{" "}
                  <Link href="/blog/how-often-inspect-your-roof" className={inlineLink}>
                    how often to have the roof checked
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  A small job with a real effect
                </h2>
                <p className={body}>
                  Compared with restoration or replacement, ventilation is a modest job, worth
                  doing on its own or alongside other roof work.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/roof-ventilation"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See roof ventilation →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Whirlybirds: common questions" faqs={FAQS} />

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
