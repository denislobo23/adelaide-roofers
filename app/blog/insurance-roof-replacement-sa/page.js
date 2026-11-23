// app/blog/insurance-roof-replacement-sa/page.js
// Featured image: public/images/service-roof-repairs.webp (existing library image)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import RoofCalculator from "@/components/RoofCalculator";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";
import ArticleFaq from "@/components/ArticleFaq";
import ArticleSources from "@/components/ArticleSources";
import ArticleKeyPoints from "@/components/ArticleKeyPoints";
import PrintableChecklist from "@/components/PrintableChecklist";

const IMAGE_ALT =
  "Roofer checking terracotta tiles near the ridge of a brick home, the kind of assessment an insurer needs for a roof claim";

export const metadata = articleMetadata({
  slug: "insurance-roof-replacement-sa",
  title: "Does Home Insurance Cover Roof Replacement in SA? | Adelaide Roofers",
  description:
    "Does home insurance cover roof replacement? Storm and hail damage usually yes, wear and tear usually no. How SA claims work, timeframes and what to do first.",
  image: "/images/service-roof-repairs.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Does Home Insurance Cover Roof Replacement in SA?";

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
      item: `${site.url}/blog/insurance-roof-replacement-sa`,
    },
  ],
};

const COVER_TABLE = [
  ["Hail, strong wind or lightning damage", "Usually covered", "Storm cover in most home policies"],
  ["Rain getting in through storm damage", "Usually covered", "Rainwater is usually part of storm cover"],
  ["A tree or branch falling on the roof", "Usually covered", "Check your policy's wording"],
  ["A roof that has simply worn out", "Usually not covered", "Policies commonly exclude wear and tear"],
  ["A slow leak that's been ignored", "Usually not covered", "Often treated as poor maintenance"],
  ["Rusted sheets or crumbling tiles", "Usually not covered", "Gradual deterioration, not an event"],
];

const CLAIM_CHECKLIST = [
  "Everyone safe; call SA SES on 132 500 if the roof is damaged or leaking badly",
  "Photos and video of the damage before anything is moved or fixed",
  "Date and time of the storm written down",
  "Insurer contacted as soon as practical, with your policy number",
  "Asked the insurer about emergency repairs, such as a tarp, before paying for them",
  "Asked about your excess, and whether you can choose your own roofer",
  "Written assessment of the cause from a licensed roofer",
  "Copies of every report the insurer relies on, if your claim is disputed",
  "Scope of works checked: what will and won't be repaired",
  "Your own quote obtained before accepting any cash settlement",
];

const FAQS = [
  {
    q: "Does home insurance cover a leaking roof?",
    a: "If the leak was caused by a storm, such as hail cracking tiles or wind lifting sheets, usually yes. If it's a slow leak from an old or poorly maintained roof, it's usually excluded as wear and tear or lack of maintenance.",
  },
  {
    q: "Will insurance pay to replace an old roof?",
    a: "Not because it's old. Insurance covers damage from an insured event, such as a storm. If a storm damages an old roof, the insurer may argue the damage was really wear and tear, so a roofer's written report on the cause matters.",
  },
  {
    q: "Should I fix storm damage before my insurer sees it?",
    a: "Talk to your insurer first. Many can arrange emergency repairs such as a roof tarp. If you must do something urgent to prevent more damage, photograph and video everything before you move or fix it.",
  },
  {
    q: "How long does an insurer have to decide a roof claim?",
    a: "Under the General Insurance Code of Practice, insurers that subscribe to it respond within 10 business days, update you at least every 20 business days, and, except in some circumstances, decide within 4 months.",
  },
  {
    q: "What can I do if my roof claim is denied?",
    a: "The insurer must tell you in writing why, and you can ask for copies of the reports it relied on. Complain to the insurer first, then to the Australian Financial Complaints Authority (AFCA), which is free.",
  },
];

const SOURCES = [
  {
    href: "https://moneysmart.gov.au/home-insurance/storm-flood-and-fire-insurance",
    label: "Storm, flood and fire insurance",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://moneysmart.gov.au/home-insurance/how-to-make-a-home-insurance-claim",
    label: "How to make a home insurance claim",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://moneysmart.gov.au/home-insurance/how-home-insurance-cash-settlements-work",
    label: "How home insurance cash settlements work",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://insurancecouncil.com.au/industry-members/code-of-practice/",
    label: "General Insurance Code of Practice",
    note: " (Insurance Council of Australia)",
  },
  {
    href: "https://www.afca.org.au/",
    label: "Australian Financial Complaints Authority",
    note: " (AFCA)",
  },
  {
    href: "https://www.ses.sa.gov.au/132500/index.html",
    label: "When to call 132 500",
    note: " (SA State Emergency Service)",
  },
  {
    href: "https://media.bom.gov.au/social/blog/1733/explainer-how-does-hail-form/",
    label: "Explainer: how does hail form?",
    note: " (Bureau of Meteorology)",
  },
];

const KEY_POINTS = [
  "Sudden damage from a storm, hail or a falling tree is usually covered.",
  "A roof that has worn out, rusted or leaked slowly usually isn't.",
  "Photograph everything and talk to your insurer before paying for repairs.",
  "If a claim is denied, you can get the reasons in writing and complain to AFCA for free.",
];

const JUMP_LINKS = [
  { href: "#covered", label: "Covered or not" },
  { href: "#adelaide", label: "Adelaide storms" },
  { href: "#steps", label: "Claim steps" },
  { href: "#checklist", label: "Claim checklist" },
  { href: "#cash", label: "Cash settlements" },
  { href: "#denied", label: "If it's denied" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function InsuranceRoofReplacementPage() {
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
            <span className="eyebrow text-clay">Costs</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="insurance-roof-replacement-sa" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Does home insurance cover roof replacement? Only when the damage comes from an
              insured event. Most home policies cover storms, including hail, strong wind and the
              rain that gets in through storm damage, so a roof wrecked by a storm is usually
              covered. A roof that has simply worn out, rusted through or leaked slowly for years
              usually isn&apos;t, because policies commonly exclude wear and tear and poor
              maintenance. Your policy&apos;s product disclosure statement (PDS) has the final
              word.
            </p>
            <p className={body}>
              Below: what&apos;s usually covered, how a claim works step by step, a printable
              claim checklist, and what to do if your insurer says no.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/service-roof-repairs.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="covered" className="scroll-mt-24">
                <h2 className={h2}>Does home insurance cover roof replacement? Usually covered vs usually not</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>What happened</th>
                        <th className={th}>Typical outcome</th>
                        <th className={th}>Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COVER_TABLE.map(([what, outcome, why], i) => (
                        <tr key={what} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{what}</td>
                          <td className={td}>{outcome}</td>
                          <td className={td}>{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  The grey area is storm damage to a roof that was already old. An insurer may
                  argue the damage was really wear and tear, so a licensed roofer&apos;s written
                  report on what caused it, with photos, makes a real difference. If your roof is
                  simply worn out, these{" "}
                  <Link href="/blog/signs-you-need-a-new-roof" className={inlineLink}>
                    signs you need a new roof rather than a repair
                  </Link>{" "}
                  will help you judge what it needs.
                </p>
              </article>

              <article id="adelaide" className="scroll-mt-24">
                <h2 className={h2}>Adelaide storms and your roof</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Hail:</strong> large hail is most common in spring
                    and early summer, according to the Bureau of Meteorology. Check the roof and
                    ceilings after any hail storm, even if nothing is leaking yet.
                  </li>
                  <li>
                    <strong className="text-ink">Emergency help:</strong> if the roof is damaged or
                    leaking, or something has fallen on the house, the SA SES asks you to call
                    132&nbsp;500. Call 000 if lives are at risk.
                  </li>
                  <li>
                    <strong className="text-ink">Maintenance matters:</strong> a roof that has been
                    inspected and kept up is easier to defend against a wear-and-tear argument.
                    Here&apos;s{" "}
                    <Link href="/blog/how-often-inspect-your-roof" className={inlineLink}>
                      how often to have your roof inspected
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article id="steps" className="scroll-mt-24">
                <h2 className={h2}>How a roof claim works, step by step</h2>
                <ol className={olist}>
                  <li>
                    <strong className="text-ink">Make it safe.</strong> Call SA SES on 132&nbsp;500
                    for a damaged or leaking roof. Don&apos;t climb onto it yourself.
                  </li>
                  <li>
                    <strong className="text-ink">Record the damage.</strong> Moneysmart advises
                    taking photos and videos before you move or fix anything.
                  </li>
                  <li>
                    <strong className="text-ink">Contact your insurer</strong> as soon as practical,
                    even before you know the full extent. Talk to them before spending money on
                    temporary repairs; many can arrange a tarp.
                  </li>
                  <li>
                    <strong className="text-ink">Get a roofer&apos;s assessment</strong> of the cause
                    in writing, with photos from the roof.
                  </li>
                  <li>
                    <strong className="text-ink">Wait for the decision.</strong> Insurers that
                    subscribe to the General Insurance Code of Practice respond within 10 business
                    days, update you at least every 20 business days and, except in some
                    circumstances, decide within 4 months.
                  </li>
                  <li>
                    <strong className="text-ink">Check the scope of works</strong>: what will be
                    repaired or replaced, what won&apos;t, and the materials.
                  </li>
                </ol>
              </article>

              <article id="checklist" className="scroll-mt-24">
                <PrintableChecklist
                  heading="Printable checklist: storm damage roof claim"
                  intro="Work through this after a storm. Tick each item as you go and keep the sheet with your claim papers."
                  items={CLAIM_CHECKLIST}
                  footer="Keep every photo, report and email in one folder until the claim is closed."
                />
              </article>

              <article id="cash" className="scroll-mt-24">
                <h2 className={h2}>If you&apos;re offered a cash settlement</h2>
                <p className={body}>
                  Instead of arranging the repair, your insurer may offer you a lump sum. Moneysmart
                  warns this can leave you out of pocket, because the figure may be based on what
                  the repair would cost the insurer, using its own preferred suppliers. Before you
                  accept:
                </p>
                <ul className={list}>
                  <li>get your own quote from a licensed roofer for the same scope of works</li>
                  <li>check every item in the scope is included, from flashings to gutters</li>
                  <li>remember you&apos;ll be managing the roofer and any approvals yourself</li>
                </ul>
                <p className={body}>
                  Our guide to{" "}
                  <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                    reading a roofing quote
                  </Link>{" "}
                  helps you compare a quote with the insurer&apos;s figure, and{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    typical Adelaide re-roof prices
                  </Link>{" "}
                  give you a reality check.
                </p>
              </article>

              <article id="denied" className="scroll-mt-24">
                <h2 className={h2}>If your claim is denied</h2>
                <p className={body}>
                  The insurer must tell you in writing which part it didn&apos;t accept and why,
                  your right to copies of the reports it relied on (sent within 10 business days
                  if you ask), and how to complain. Complain to the insurer first. If you&apos;re
                  still unhappy, the Australian Financial Complaints Authority (AFCA) offers free,
                  independent dispute resolution.
                </p>
                <p className={body}>
                  If the claim fails and the roof still needs work, compare{" "}
                  <Link href="/blog/financing-a-new-roof" className={inlineLink}>
                    ways to pay for a new roof
                  </Link>
                  , and beware of storm-chasers knocking on doors after hail; our guide to{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    roofing scams in Adelaide
                  </Link>{" "}
                  shows what to watch for.
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Whatever the cause, get an honest assessment
                </h2>
                <p className={body}>
                  Whether or not insurance covers it, know what the repair or replacement would
                  actually cost. Use the calculator below for a ballpark, or read{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    how a roof replacement works
                  </Link>{" "}
                  with a local roofer.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/free-guide"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Get the free guide →
                  </Link>
                </div>
              </article>

              <ArticleFaq id="faq" heading="Roof insurance claims: common questions" faqs={FAQS} />

              <ArticleSources sources={SOURCES} />
            </div>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </section>

      {/* ── INSTANT CALCULATOR (full-width, matches homepage/suburb pages) ── */}
      <section className="mx-auto max-w-wrap px-5 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Get your instant estimate
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
            Answer a few quick questions about your roof for a free, no-obligation ballpark
            figure.
          </p>
        </div>
        <div className="mt-10">
          <RoofCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-5 py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Tell us your suburb and what&apos;s going on with your roof
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink/65">
          We&apos;ll match you with a vetted local roofer for an obligation-free quote.
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
