// app/blog/solar-panels-and-your-roof/page.js
// Featured image: public/images/service-colorbond-roofing.webp (existing library image, no generation needed — solar mounting is discussed alongside metal roofing in tile-to-metal-roofing article too)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "solar-panels-and-your-roof",
  title: "Solar Panels and Your Roof: What to Check First | Adelaide Roofers",
  description:
    "Before solar goes on your Adelaide roof: check its age, material and structure, whether SA rules need approval, and why roof work should come first.",
  image: "/images/service-colorbond-roofing.webp",
  imageAlt: "Solar panel installation considerations on an Adelaide roof",
});

const HEADLINE = "Solar Panels and Your Roof: What to Check First";

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
      item: `${site.url}/blog/solar-panels-and-your-roof`,
    },
  ],
};

const CHECKS = [
  {
    check: "Roof age and condition",
    why: "Panels are expected to last 20 to 30 years. Taking them off and refitting them for roof work later costs extra.",
    action: "If the roof will need replacing or restoring well before then, do it first.",
  },
  {
    check: "Roof material",
    why: "Metal, tile and asbestos cement all need a different approach.",
    action: "See the roof-type section below.",
  },
  {
    check: "Structure",
    why: "Panels add weight, and older frames may have water damage or sagging.",
    action: "Have the frame checked, especially on older homes.",
  },
  {
    check: "Approval",
    why: "Most rooftop systems are exempt, but heritage places can need approval.",
    action: "Check the rules below if your home is heritage-listed.",
  },
  {
    check: "Orientation and shade",
    why: "North-facing panels produce the most energy across the year.",
    action: "Ask the installer how trees or neighbouring buildings shade the roof.",
  },
  {
    check: "Who goes on the roof",
    why: "Working at height and on fragile roofs is high-risk work.",
    action: "Use an accredited installer with proper fall protection.",
  },
];

const SOURCES = [
  {
    href: "https://www.legislation.sa.gov.au/__legislation/lz/c/r/planning%20development%20and%20infrastructure%20(general)%20regulations%202017/current/2017.24.auth.pdf",
    label: "Planning, Development and Infrastructure (General) Regulations 2017, Schedule 4 clause 16",
    note: " (SA Government, PDF)",
  },
  {
    href: "https://www.yourhome.gov.au/energy/rooftop-solar",
    label: "Rooftop solar",
    note: " (YourHome, Australian Government)",
  },
  {
    href: "https://www.energy.gov.au/solar/use-your-solar-system/replace-and-recycle-your-solar-system",
    label: "Replace and recycle your solar system",
    note: " (energy.gov.au, Australian Government)",
  },
  {
    href: "https://www.energymining.sa.gov.au/industry/hydrogen-and-renewable-energy/solar-batteries-and-smarter-homes/regulatory-changes-for-smarter-homes/information-for-customers-and-owners",
    label: "Smarter homes: information for customers and owners",
    note: " (Department for Energy and Mining SA)",
  },
  {
    href: "https://www.sapowernetworks.com.au/your-power/your-solar/",
    label: "Your solar: fixed and flexible exports",
    note: " (SA Power Networks)",
  },
  {
    href: "https://safework.sa.gov.au/workplaces/work-tasks-and-projects/managing-risk-of-falls-for-solar-panel-installations",
    label: "Managing risk of falls for solar panel installations",
    note: " (SafeWork SA)",
  },
  {
    href: "https://colorbond.com/faq",
    label: "Colorbond steel FAQs: swarf",
    note: " (Colorbond, BlueScope)",
  },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

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
              {HEADLINE}
            </h1>
            <ArticleMeta slug="solar-panels-and-your-roof" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Before solar goes on, check four things: how long your roof has left, what
              it&apos;s made of, whether the frame is sound, and whether you need approval. Panels
              are expected to last 20 to 30 years, so if your roof will need replacing or restoring
              well before then, do the roof work first. Metal roofs are the simplest to mount on,
              tile is fine with the right hooks, and an asbestos cement roof should be replaced
              before anyone drills into it. Most Adelaide homes don&apos;t need council approval for
              rooftop solar, but heritage places can.
            </p>
            <p className={body}>
              Below is a quick checklist, what to watch for on each roof type, the South
              Australian rules, and the right order to do the work in.
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
                <h2 className={h2}>The roof checklist before solar</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Check</th>
                        <th className={th}>Why it matters</th>
                        <th className={th}>What to do</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHECKS.map((row, i) => (
                        <tr key={row.check} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{row.check}</td>
                          <td className={td}>{row.why}</td>
                          <td className={td}>{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article>
                <h2 className={h2}>Roof age: match it to the life of the panels</h2>
                <p className={body}>
                  Solar panels typically last 20 to 30 years, and most come with a performance
                  guarantee that they&apos;ll still produce 80 to 90% of their original output after
                  25 years. If your roof won&apos;t last that long, the panels will have to come off
                  and go back on when the roof is redone, which adds cost and needs a licensed
                  electrician as well as a roofer.
                </p>
                <p className={body}>
                  A good rule: if your roof is already showing its age, get it assessed before you
                  sign a solar contract. Our{" "}
                  <Link href="/blog/repair-vs-replace" className={inlineLink}>
                    repair, restore or replace guide
                  </Link>{" "}
                  helps you work out which one it needs.
                </p>
              </article>

              <article>
                <h2 className={h2}>What to watch for on each roof type</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className={h3}>Colorbond and other metal roofs</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      The easiest to mount on: brackets fix to the sheets or the battens below. The
                      main thing to watch is swarf, the metal shavings from drilling and cutting.
                      Left on the roof, they rust quickly and stain the surface, and Colorbond says
                      cleaning them up is the responsibility of the installer and any trade that
                      follows, including the solar installer. Ask for the roof to be swept or
                      blown clean when they finish.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>Concrete and terracotta tiles</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      Panels mount on hooks that sit under the tiles and fix to the roof frame. Older
                      tiles can crack when walked on, so ask the installer to replace any they
                      break and to photograph the roof before and after. If your tiles are porous
                      or the ridge capping is loose, fix that first, because it&apos;s much harder
                      once panels are in the way.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>Asbestos cement (fibro) roofs</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      Common on homes built before 1990. Don&apos;t let anyone drill or fix into it.
                      SafeWork SA treats asbestos roofing sheets as fragile, meaning they may not
                      take a person&apos;s weight, and work that disturbs asbestos is high-risk
                      construction work. Plan for{" "}
                      <Link href="/services/asbestos-roof-removal" className={inlineLink}>
                        licensed asbestos roof removal
                      </Link>{" "}
                      and a new roof before solar.
                    </p>
                  </div>
                </div>
                <p className={body}>
                  Thinking of replacing a tile roof anyway? Metal makes solar mounting simpler, so
                  it&apos;s worth reading{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    what changes when you switch from tile to metal
                  </Link>{" "}
                  before you decide.
                </p>
              </article>

              <article>
                <h2 className={h2}>Do you need approval for solar in South Australia?</h2>
                <p className={body}>
                  Usually not. Under South Australia&apos;s planning regulations, installing solar
                  panels on a roof isn&apos;t treated as development if either:
                </p>
                <ul className={list}>
                  <li>the panels weigh 100&nbsp;kg or less in total, or</li>
                  <li>
                    they weigh more, but no single attachment point carries more than 100&nbsp;kg,
                    nothing overhangs the roof, the panels sit parallel to the roof no more than
                    100&nbsp;mm above it, and they&apos;re installed by an accredited installer.
                  </li>
                </ul>
                <p className={body}>The exemption doesn&apos;t apply:</p>
                <ul className={list}>
                  <li>to State heritage places, which need approval, or</li>
                  <li>
                    to local heritage places where the panels can be seen from the street at ground
                    level.
                  </li>
                </ul>
                <p className={body}>
                  If your home is heritage-listed, or you&apos;re also replacing the roof, see{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    when a re-roof needs council approval
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className={h2}>Connecting to the grid in SA</h2>
                <p className={body}>
                  Your solar installer handles this, but it helps to know what to expect:
                </p>
                <ul className={list}>
                  <li>
                    Since 28 September 2020, new solar systems in SA must be able to be remotely
                    disconnected and reconnected in a power system emergency, with a nominated
                    agent who can do this.
                  </li>
                  <li>
                    SA Power Networks lets you choose a fixed export limit (1.5&nbsp;kW per phase, or
                    0&nbsp;kW in some areas) or Flexible Exports, which lets an internet-connected
                    inverter export up to 10&nbsp;kW per phase when the grid has room.
                  </li>
                  <li>
                    Panels face north for the most energy across the year. East- or west-facing
                    panels produce less overall but more in the morning or afternoon.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>The right order if you&apos;re doing both</h2>
                <ol className={olist}>
                  <li>
                    Get the roof inspected and fix or replace anything that won&apos;t last as long
                    as the panels.
                  </li>
                  <li>
                    If you&apos;re re-roofing, choose the material with solar in mind and tell the
                    roofer where the panels will go.
                  </li>
                  <li>
                    Book an accredited solar installer, and ask how they&apos;ll protect the roof
                    and clean up afterwards.
                  </li>
                  <li>
                    Keep the roofer&apos;s workmanship warranty and the solar paperwork together.
                    Installer workmanship warranties are typically 5 years.
                  </li>
                </ol>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get the roof sorted first
                </h2>
                <p className={body}>
                  If you&apos;re planning solar and unsure whether your roof needs attention first,
                  it&apos;s worth checking before committing to an install date. A{" "}
                  <Link href="/services/roof-inspection" className={inlineLink}>
                    roof inspection before the panels go on
                  </Link>{" "}
                  will tell you.
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
