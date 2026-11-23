// app/blog/rain-during-a-roofing-job/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image)

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
  "Roofer working on a charcoal tile roof on a dry day, the kind of work that waits for dry weather";

export const metadata = articleMetadata({
  slug: "rain-during-a-roofing-job",
  title: "Roof Replacement in Rain: What Happens to the Job? | Adelaide Roofers",
  description:
    "What happens with a roof replacement in rain? The roof is sealed each night, coatings wait, and the job moves back. Adelaide rain days by month.",
  image: "/images/service-roof-restoration.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "What Happens If It Rains During a Roofing Job?";

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
      item: `${site.url}/blog/rain-during-a-roofing-job`,
    },
  ],
};

// BoM Kent Town (023090): mean number of days of rain >= 1 mm, 1977-2020.
const RAIN_DAYS = [
  ["Jan", 2.9], ["Feb", 2.2], ["Mar", 3.6], ["Apr", 5.4], ["May", 9.1], ["Jun", 10.5],
  ["Jul", 12.1], ["Aug", 11.7], ["Sep", 9.2], ["Oct", 6.3], ["Nov", 4.6], ["Dec", 4.4],
];

function RainDaysChart() {
  const left = 44;
  const base = 210;
  const plotH = 168;
  const max = 14;
  const slot = 48;
  const barW = 30;
  const y = (v) => base - (v / max) * plotH;
  const labelled = new Set(["Feb", "Jul"]);
  return (
    <svg
      viewBox="0 0 640 250"
      role="img"
      aria-labelledby="rain-days-title rain-days-desc"
      className="mx-auto block h-auto w-full min-w-[520px] max-w-2xl"
    >
      <title id="rain-days-title">Average rain days per month in Adelaide (Kent Town)</title>
      <desc id="rain-days-desc">
        {"Mean days with at least 1 mm of rain: " +
          RAIN_DAYS.map(([m, v]) => `${m} ${v}`).join(", ") +
          ". Wettest in July, driest in February."}
      </desc>
      {[0, 5, 10].map((t) => (
        <g key={t}>
          <line x1={left} x2={left + slot * 12} y1={y(t)} y2={y(t)} className="stroke-ink/10" strokeWidth="1" />
          <text x={left - 8} y={y(t) + 4} textAnchor="end" className="fill-ink/55 font-body" fontSize="11">
            {t}
          </text>
        </g>
      ))}
      {RAIN_DAYS.map(([m, v], i) => {
        const x = left + i * slot + (slot - barW) / 2;
        const top = y(v);
        const winter = i >= 5 && i <= 7;
        return (
          <g key={m}>
            <title>{`${m}: ${v} rain days on average`}</title>
            <rect x={x - 6} y={base - plotH} width={barW + 12} height={plotH} fill="transparent" />
            <path
              d={`M${x},${base} V${top + 4} Q${x},${top} ${x + 4},${top} H${x + barW - 4} Q${x + barW},${top} ${x + barW},${top + 4} V${base} Z`}
              className={winter ? "fill-clay" : "fill-clay/45"}
            />
            <text x={x + barW / 2} y={base + 16} textAnchor="middle" className="fill-ink/70 font-body" fontSize="11">
              {m}
            </text>
            {labelled.has(m) && (
              <text x={x + barW / 2} y={top - 6} textAnchor="middle" className="fill-ink font-body" fontSize="12" fontWeight="700">
                {v}
              </text>
            )}
          </g>
        );
      })}
      <line x1={left} x2={left + slot * 12} y1={base} y2={base} className="stroke-ink/40" strokeWidth="1" />
      <text x={left} y="242" className="fill-ink/60 font-body" fontSize="11">
        Days with 1 mm or more of rain. Darker bars: June to August.
      </text>
    </svg>
  );
}

const STAGES = [
  ["Stripping the old roof", "Only as much is opened as can be covered again the same day", "Tarps or sarking over any open section before the crew leaves"],
  ["Laying new sheets or tiles", "Paused in rain and strong wind; wet roofs are slippery", "The crew waits rather than working on a wet roof"],
  ["Materials on site", "Kept dry and off the ground", "Wet stacked steel separated and dried, per Lysaght"],
  ["Coatings and paint", "Wait for a dry forecast", "No coating with rain expected; Dulux says to protect its membrane from rain for 48 hours"],
  ["Ridge pointing", "Usually waits for dry weather", "Fresh pointing protected until it sets"],
];

const FAQS = [
  {
    q: "Can you replace a roof in the rain?",
    a: "Not safely while it's raining. SafeWork SA's code of practice notes that rain and wind can make surfaces slippery or unstable, so crews stop, cover any open section and resume when it's dry.",
  },
  {
    q: "Will rain get into my house during a re-roof?",
    a: "It shouldn't. A well-run job only opens up what it can cover again the same day, and covers it with tarps or sarking before leaving each night or when rain arrives.",
  },
  {
    q: "Will I pay more if rain delays the job?",
    a: "Rain normally moves the finish date, not the price. Check the contract for delay terms; in SA, most changes to the price or scope need your written approval in advance.",
  },
  {
    q: "What's the best time of year for a roofing job in Adelaide?",
    a: "Summer has the fewest rain days, averaging 2 to 3 a month in January and February at Kent Town, against 10 to 12 a month from June to August. Roofers work year-round, so allow extra days in winter.",
  },
];

const SOURCES = [
  {
    href: "https://www.bom.gov.au/climate/averages/tables/cw_023090.shtml",
    label: "Climate statistics: Adelaide (Kent Town)",
    note: " (Bureau of Meteorology)",
  },
  {
    href: "https://www.safework.sa.gov.au/__data/assets/pdf_file/0004/136273/Managing-the-risk-of-falls-at-workplaces.pdf",
    label: "Code of Practice: managing the risk of falls at workplaces",
    note: " (SafeWork SA, PDF)",
  },
  {
    href: "https://cdn.dcs.lysaght.com/download/custom-orb-and-custom-blue-orb-brochure",
    label: "Custom Orb design and installation guide: storage, handling and swarf",
    note: " (Lysaght, BlueScope, PDF)",
  },
  {
    href: "https://files.duspecplus.com.au/public/pdf/datasheet/b81ff8ce-c779-445c-a8ac-502ce31c5d9b",
    label: "Acratex Membrane 105HP data sheet: application conditions",
    note: " (Dulux, PDF)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: Your building contract, your rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
];

const KEY_POINTS = [
  "Work on the roof stops in rain and strong wind; it isn't safe on a wet roof.",
  "Any open section should be covered with tarps or sarking before the crew leaves.",
  "Coatings wait for dry weather; one membrane needs 48 hours' protection from rain.",
  "Adelaide averages 10 to 12 rain days a month from June to August.",
];

const JUMP_LINKS = [
  { href: "#on-the-day", label: "On the day" },
  { href: "#stages", label: "Stage by stage" },
  { href: "#adelaide", label: "Adelaide's rain" },
  { href: "#cost", label: "Cost and timing" },
  { href: "#ask", label: "What to ask" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function RainDuringRoofingPage() {
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
            <ArticleMeta slug="rain-during-a-roofing-job" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              With a roof replacement in rain, work on the roof stops, because a wet
              roof is slippery and unsafe. Any open section should already be covered with tarps
              or sarking, since a well-run crew only strips what it can cover again the same day.
              Coatings and paint wait for a dry forecast, and the job resumes once the roof dries.
              Rain normally moves the finish date, not the price. In Adelaide, allow extra days
              for a winter job: June to August averages 10 to 12 rain days a month.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-restoration.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="on-the-day" className="scroll-mt-24">
                <h2 className={h2}>Roof replacement in rain: what happens on the day</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Work stops on the roof.</strong> SafeWork
                    SA&apos;s code of practice lists rain and wind among the conditions that make
                    surfaces slippery or unstable.
                  </li>
                  <li>
                    <strong className="text-ink">Open sections get covered.</strong> Tarps or new
                    sarking go over anything exposed, and stay secured overnight.
                  </li>
                  <li>
                    <strong className="text-ink">Materials stay dry.</strong> Lysaght says to keep
                    steel sheets dry and off the ground, and to separate and dry any stack that
                    gets wet. Swarf (metal shavings) should be swept up at the end of each day.
                  </li>
                  <li>
                    <strong className="text-ink">The crew comes back when it&apos;s dry,</strong>{" "}
                    which may be the next day or after the roof has dried out.
                  </li>
                </ul>
              </article>

              <article id="stages" className="scroll-mt-24">
                <h2 className={h2}>Stage by stage: what pauses and what you should see</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Stage</th>
                        <th className={th}>When it rains</th>
                        <th className={th}>What you should see</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STAGES.map(([stage, rain, see], i) => (
                        <tr key={stage} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{stage}</td>
                          <td className={td}>{rain}</td>
                          <td className={td}>{see}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Restorations are the most weather-sensitive, because coatings need dry surfaces
                  before and after. See{" "}
                  <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                    what a roof restoration involves
                  </Link>
                  .
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Adelaide&apos;s rain, month by month</h2>
                <p className={body}>
                  Bureau of Meteorology averages for Kent Town show a clear pattern: winter has
                  four to five times as many rain days as late summer.
                </p>
              </article>

              <ArticleFigure
                heading="Average rain days per month, Adelaide"
                caption="Mean number of days with at least 1 mm of rain at Kent Town, 1977 to 2020. Source: Bureau of Meteorology."
              >
                <RainDaysChart />
              </ArticleFigure>

              <article id="cost" className="scroll-mt-24">
                <h2 className={h2}>It moves the timeline, not the price</h2>
                <p className={body}>
                  Rain delays add days, not dollars, on a fairly priced quote. Check the contract
                  for how delays are handled: in SA, most changes to the price or scope need your
                  written approval in advance. For what a typical schedule looks like, see{" "}
                  <Link href="/blog/how-long-does-roof-replacement-take" className={inlineLink}>
                    how long a roof replacement takes
                  </Link>
                  .
                </p>
              </article>

              <article id="ask" className="scroll-mt-24">
                <h2 className={h2}>What to ask before the job starts</h2>
                <ul className={list}>
                  <li>How much of the roof will be open at once?</li>
                  <li>How will you cover it overnight and if rain arrives mid-day?</li>
                  <li>How will you tell me about weather delays?</li>
                  <li>Does the contract say anything about delays or extra costs?</li>
                </ul>
                <p className={body}>
                  Experienced roofers watch the forecast and plan around it. A proven track record
                  is one of the things we look for:{" "}
                  <Link href="/how-we-vet-our-roofers" className={inlineLink}>
                    see how we choose our roofers
                  </Link>
                  . More in{" "}
                  <Link href="/blog/questions-to-ask-a-roofer" className={inlineLink}>
                    10 questions to ask a roofer
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Booking around Adelaide&apos;s seasons
                </h2>
                <p className={body}>
                  If timing matters, summer and early autumn make scheduling more predictable,
                  though most roof work happens year-round.
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

              <ArticleFaq id="faq" heading="Roofing in the rain: common questions" faqs={FAQS} />

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
