// app/blog/how-long-does-roof-replacement-take/page.js
// Featured image: public/images/service-roof-replacement.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";
import PrintableChecklist from "@/components/PrintableChecklist";

const IMAGE_ALT =
  "Roofers part-way through a roof replacement, with half the timber frame exposed and new Colorbond sheets laid on the rest";

export const metadata = articleMetadata({
  slug: "how-long-does-roof-replacement-take",
  title: "How Long Does a Roof Replacement Take? Day by Day | Adelaide Roofers",
  description:
    "How long does a roof replacement take? Typically 3 to 5 working days for Colorbond and 5 to 8 for tile on an average home, plus what adds time in Adelaide.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "How Long Does a Roof Replacement Actually Take?";

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
      item: `${site.url}/blog/how-long-does-roof-replacement-take`,
    },
  ],
};

const DURATIONS = [
  ["Colorbond re-roof, straightforward", "3 to 5 working days"],
  ["Concrete tile re-roof", "5 to 8 working days", "Tiles are laid one by one"],
  ["Asbestos roof removal before the new roof", "Adds about 1 to 2 days", "Plus at least 5 days' notice to SafeWork SA beforehand"],
  ["Heritage place or overlay needing approval", "Adds the approval time before work starts", "Check before you book a start date"],
];

const TIMELINE = [
  { day: "Before day 1", task: "Materials, skip bin and scaffolding or edge protection arrive. Any approval and asbestos notice must already be done." },
  { day: "Day 1", task: "The old roof comes off in sections, so only part of the house is open at once." },
  { day: "Days 1 to 2", task: "Battens and frame are checked, and anything rotten or damaged is replaced." },
  { day: "Days 2 to 4", task: "Sarking or an insulation blanket goes down, then the new sheets or tiles." },
  { day: "Final day", task: "Ridge capping, flashings and gutters are finished, then a final inspection and clean-up." },
];

const PREP_CHECKLIST = [
  "Agreed start date, and what happens if rain delays it",
  "Cars moved out of the driveway and side access cleared",
  "Fragile items in the roof space covered or moved",
  "Pictures and shelves taken off walls under the roof (vibration)",
  "Pets and kids kept away from the work area",
  "Neighbours told about the noise and the skip bin",
  "Solar panels: electrician booked to take them off and refit them",
  "Asbestos: removalist's clearance certificate before roofing starts",
  "Contact number for the site supervisor",
  "Final inspection booked, with gutters and yard checked for screws and swarf",
];

const FAQS = [
  {
    q: "How long does it take to replace a tile roof?",
    a: "An independent cost guide puts a concrete tile re-roof at about 5 to 8 working days for a 180 m² home, because tiles are laid one by one. Switching from tile to Colorbond is usually quicker to install, but stripping the tiles still takes time.",
  },
  {
    q: "Can you stay in your house during a roof replacement?",
    a: "Usually, yes. A well-run job strips and covers one section at a time, so the house is sealed every night. Expect loud noise during the day and dust in the roof space.",
  },
  {
    q: "What happens if it rains during a roof replacement?",
    a: "Roofers watch the forecast, only open as much roof as they can close the same day, and cover exposed sections with tarps. Rain usually delays the job rather than damaging the house.",
  },
  {
    q: "How much time does asbestos removal add?",
    a: "The removal itself typically takes about 1 to 2 days. In South Australia, the licensed removalist must also notify SafeWork SA at least 5 days before starting, so plan for that lead time.",
  },
];

const SOURCES = [
  {
    href: "https://goingrate.com.au/roofing/colorbond-vs-tile-roof",
    label: "Colorbond vs tile roof: install times",
    note: " (Going Rate, independent cost guide)",
  },
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide: asbestos removal",
    note: " (What’s The Damage, independent price guide)",
  },
  {
    href: "https://asbestos.sa.gov.au/in-your-home/asbestos-in-your-home/removing-asbestos",
    label: "Removing asbestos",
    note: " (asbestos.sa.gov.au, SA Government)",
  },
  {
    href: "https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval",
    label: "Find out if you need approval",
    note: " (PlanSA)",
  },
  {
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics for Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
];

const KEY_POINTS = [
  "Colorbond: about 3 to 5 working days on an average home.",
  "Concrete tile: about 5 to 8 working days.",
  "Asbestos removal, approvals and rotten battens add time.",
  "Adelaide's winter has the most rain days, so summer jobs are less likely to be delayed.",
];

const JUMP_LINKS = [
  { href: "#how-long", label: "How long" },
  { href: "#timeline", label: "Day by day" },
  { href: "#adds-time", label: "What adds time" },
  { href: "#weather", label: "Adelaide weather" },
  { href: "#prep", label: "Prep checklist" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function HowLongReplacementPage() {
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
              {HEADLINE}
            </h1>
            <ArticleMeta slug="how-long-does-roof-replacement-take" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              How long does a roof replacement take? On an average home, usually{" "}
              <strong className="text-ink">3 to 5 working days for Colorbond</strong> and 5 to 8
              working days for concrete tile, based on an independent cost guide&apos;s figures
              for a 180&nbsp;m² home. Bigger or more complex roofs, rotten battens, asbestos
              removal, council approval and wet weather can all add time. You can usually stay
              in the house throughout.
            </p>
            <p className={body}>
              Below: a day-by-day breakdown, what adds time, how Adelaide&apos;s weather affects
              scheduling, and a printable checklist for the week of your re-roof.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-replacement.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="how-long" className="scroll-mt-24">
                <h2 className={h2}>How long does a roof replacement take? Typical durations</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Job</th>
                        <th className={th}>Typical time</th>
                        <th className={th}>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DURATIONS.map(([job, time, note], i) => (
                        <tr key={job} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{job}</td>
                          <td className={td}>{time}</td>
                          <td className={td}>{note || ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  These are working days on the roof, not including the wait for a start date.
                </p>
              </article>

              <article id="timeline" className="scroll-mt-24">
                <h2 className={h2}>A typical Colorbond re-roof, day by day</h2>
                <p className={body}>
                  For a straightforward single-storey home. Larger or more complex roofs stretch
                  each stage rather than adding new ones:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Stage</th>
                        <th className={th}>What happens</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIMELINE.map((row, i) => (
                        <tr key={row.day} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} whitespace-nowrap font-semibold text-ink`}>{row.day}</td>
                          <td className={td}>{row.task}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  A properly run job leaves the house weather-sealed at the end of every day. More
                  on{" "}
                  <Link href="/blog/rain-during-a-roofing-job" className={inlineLink}>
                    what happens if it rains mid-job
                  </Link>
                  .
                </p>
              </article>

              <article id="adds-time" className="scroll-mt-24">
                <h2 className={h2}>What adds time</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Size and shape:</strong> hips, valleys,
                    skylights and two storeys all add hours.
                  </li>
                  <li>
                    <strong className="text-ink">What&apos;s under the old roof:</strong> rotten
                    battens or frame damage only show once it&apos;s off.
                  </li>
                  <li>
                    <strong className="text-ink">Switching material:</strong> going{" "}
                    <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                      from tile to metal
                    </Link>{" "}
                    means stripping heavy tiles and re-battening first.
                  </li>
                  <li>
                    <strong className="text-ink">Asbestos:</strong> in SA, a licensed removalist
                    must notify SafeWork SA at least 5 days before starting, and the area needs a
                    clearance inspection and certificate before roofing continues. See the{" "}
                    <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                      asbestos roof removal guide
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Approval:</strong> most like-for-like re-roofs
                    don&apos;t need it, but heritage places and some overlays do. Check{" "}
                    <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                      whether you need council approval to replace your roof
                    </Link>{" "}
                    before booking a start date.
                  </li>
                  <li>
                    <strong className="text-ink">Solar:</strong> panels must come off and go back
                    on, which needs an electrician&apos;s time as well.
                  </li>
                </ul>
              </article>

              <article id="weather" className="scroll-mt-24">
                <h2 className={h2}>Adelaide weather and scheduling</h2>
                <p className={body}>
                  Bureau of Meteorology figures for Kent Town show Adelaide averages 10 to 12 rainy
                  days a month from June to August, against only 2 to 3 in January and February.
                  A winter job is more likely to lose days to rain, so allow extra time if
                  you&apos;re booking then. Summer brings its own pauses, because crews may start
                  early or stop on very hot afternoons.
                </p>
              </article>

              <article id="prep" className="scroll-mt-24">
                <PrintableChecklist
                  heading="Printable checklist: the week of your re-roof"
                  intro="Tick these off before and during the job so nothing holds it up."
                  items={PREP_CHECKLIST}
                  footer="Keep the quote, contract and warranty paperwork together once the job is done."
                />
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Get a timeline specific to your roof
                </h2>
                <p className={body}>
                  A local roofer can give you an accurate timeline once they&apos;ve seen the roof.
                  To get matched with one, visit{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    our roof replacement page
                  </Link>
                  , or see{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    what a new roof typically costs
                  </Link>
                  .
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

              <ArticleFaq id="faq" heading="Roof replacement timing: common questions" faqs={FAQS} />

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
