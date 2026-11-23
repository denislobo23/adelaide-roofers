// app/blog/financing-a-new-roof/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image)

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

const IMAGE_ALT =
  "Charcoal tile roof on a single-storey brick home with a roofer at work, the kind of job homeowners finance a new roof or restoration for";

export const metadata = articleMetadata({
  slug: "financing-a-new-roof",
  title: "How to Finance a New Roof: Options in Adelaide | Adelaide Roofers",
  description:
    "Ways to finance a new roof in Adelaide: savings, personal loans, a mortgage top-up or buy now pay later, what each really costs, and SA rules on deposits.",
  image: "/images/service-roof-restoration.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Can I Finance a New Roof? Options for Adelaide Homeowners";

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
      item: `${site.url}/blog/financing-a-new-roof`,
    },
  ],
};

const OPTIONS = [
  {
    option: "Savings",
    good: "No interest or fees",
    watch: "Keep a buffer for anything found under the old roof",
  },
  {
    option: "Personal loan",
    good: "Fixed term, usually 1 to 7 years; unsecured loans don't use your home as security",
    watch: "Unsecured rates are usually higher; check the comparison rate and early repayment fees",
  },
  {
    option: "Mortgage top-up or redraw",
    good: "Usually the lowest interest rate",
    watch: "Spread over the life of the mortgage, you can pay far more interest in total",
  },
  {
    option: "Buy now pay later or roofer-arranged finance",
    good: "Instalments, often advertised as interest-free",
    watch: "Fees can add up, and applications and late payments can show on your credit report",
  },
  {
    option: "No Interest Loan",
    good: "No interest or fees; generally up to $2,000 for essentials, or $3,000 for recovery from a natural disaster",
    watch: "Income limits apply (under $70,000 single, $100,000 with a partner or dependants); suits a small repair, not a new roof",
  },
];

// Monthly repayment on an amortising loan. Example rates only, not offers.
function monthly(principal, ratePa, years) {
  const r = ratePa / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}
const LOAN = 20000;
const SCENARIOS = [
  { label: "Personal loan", rate: 0.1, years: 5 },
  { label: "Mortgage top-up, repaid over 5 years", rate: 0.06, years: 5 },
  { label: "Mortgage top-up, left for 25 years", rate: 0.06, years: 25 },
].map((s) => {
  const m = monthly(LOAN, s.rate, s.years);
  return { ...s, monthly: m, interest: m * s.years * 12 - LOAN };
});
const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");

const FAQS = [
  {
    q: "Can you get a loan for a new roof?",
    a: "Yes. Common options are a personal loan, a top-up or redraw on your mortgage, or a home improvement finance plan. Compare the comparison rate and total cost, not just the monthly repayment.",
  },
  {
    q: "Is it better to use a personal loan or my mortgage for a new roof?",
    a: "A mortgage top-up usually has a lower interest rate, but if you leave it to run for the rest of the mortgage, you can pay much more interest in total. If you use the mortgage, plan to pay that amount off over a few years.",
  },
  {
    q: "Is buy now pay later a good way to pay for a roof?",
    a: "It can spread the cost, but Moneysmart warns that fees can add up and that applications and late payments can appear on your credit report. Check every fee and compare the total with a personal loan.",
  },
  {
    q: "How much deposit should I pay a roofer?",
    a: "In South Australia, a deposit on domestic building work is capped at $1,000, or 5% if the contract is over $20,000. After that, you pay progress payments for work already done.",
  },
];

const SOURCES = [
  {
    href: "https://moneysmart.gov.au/loans/personal-loans",
    label: "Personal loans",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://moneysmart.gov.au/other-ways-to-borrow/buy-now-pay-later-services",
    label: "Buy now pay later services",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://moneysmart.gov.au/loans/no-interest-loans",
    label: "No interest loans",
    note: " (Moneysmart, ASIC)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: your building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://whatsthedamage.com.au/roofing-cost-adelaide/",
    label: "Roofing costs in Adelaide",
    note: " (What’s The Damage, independent price guide)",
  },
];

const KEY_POINTS = [
  "Know the real cost first: a typical single-storey re-roof in Adelaide is about $12,900 to $27,600.",
  "Compare loans by comparison rate and total cost, not the monthly repayment.",
  "A mortgage top-up is cheap per year but expensive if left for decades.",
  "In SA, a roofer's deposit is capped at $1,000, or 5% over $20,000.",
];

const JUMP_LINKS = [
  { href: "#options", label: "Your options" },
  { href: "#repayments", label: "Repayment examples" },
  { href: "#sa-rules", label: "SA payment rules" },
  { href: "#borrow-less", label: "Borrow less" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function FinancingPage() {
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
            <ArticleMeta slug="financing-a-new-roof" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Yes. The usual ways to finance a new roof are a personal loan, a top-up or redraw on
              your mortgage, or a buy now pay later or home improvement plan, often alongside
              some savings. The cheapest option is the one with the lowest total cost, not the
              lowest monthly repayment: a mortgage top-up has a low rate but can cost the most
              interest if you leave it for decades. In South Australia, a roofer can only ask for
              a deposit of up to $1,000, or 5% if the contract is over $20,000, so you never need
              to borrow the whole amount upfront.
            </p>
            <p className={body}>
              Below: each option side by side, worked repayment examples, SA&apos;s payment rules,
              and ways to borrow less.
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
              <article id="options" className="scroll-mt-24">
                <h2 className={h2}>Ways to finance a new roof, side by side</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Option</th>
                        <th className={th}>Good for</th>
                        <th className={th}>Watch out for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OPTIONS.map((o, i) => (
                        <tr key={o.option} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{o.option}</td>
                          <td className={td}>{o.good}</td>
                          <td className={td}>{o.watch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Moneysmart&apos;s advice for any loan: compare the{" "}
                  <strong className="text-ink">comparison rate</strong>, which includes interest
                  and most fees, check whether you could still afford a variable loan if rates
                  rose by 2 or 3%, and look for application, ongoing and early repayment fees.
                  Comparison websites are businesses too, and may not show every option.
                </p>
                <p className={body}>
                  If a roofer offers finance, ask who the lender is, then compare that offer with
                  a loan from your own bank before you sign.
                </p>
              </article>

              <article id="repayments" className="scroll-mt-24">
                <h2 className={h2}>What borrowing $20,000 can cost</h2>
                <p className={body}>
                  Worked examples for a {money(LOAN)} roof, using example interest rates (not
                  offers). Real rates depend on the lender and your finances:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Option</th>
                        <th className={th}>Example rate</th>
                        <th className={th}>Term</th>
                        <th className={th}>Monthly repayment</th>
                        <th className={th}>Total interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SCENARIOS.map((s, i) => (
                        <tr key={s.label} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{s.label}</td>
                          <td className={td}>{Math.round(s.rate * 100)}%</td>
                          <td className={td}>{s.years} years</td>
                          <td className={td}>{money(s.monthly)}</td>
                          <td className={td}>{money(s.interest)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  The lowest monthly repayment is the most expensive overall. If you use your
                  mortgage, set up extra repayments to clear the roof amount in a few years.
                  Moneysmart&apos;s personal loan calculator lets you run your own numbers.
                </p>
              </article>

              <article id="sa-rules" className="scroll-mt-24">
                <h2 className={h2}>SA payment rules that help your budget</h2>
                <p className={body}>
                  A roof replacement is domestic building work, so CBS Form 1 applies:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Deposit:</strong> no more than $1,000, or 5% of the
                    contract price if it&apos;s over $20,000 (plus money paid to third parties, such
                    as council fees).
                  </li>
                  <li>
                    <strong className="text-ink">Progress payments:</strong> only for work already
                    done, and only after a written demand. That lets you line up loan drawdowns
                    with the job.
                  </li>
                  <li>
                    <strong className="text-ink">Cooling off:</strong> you can cancel in writing
                    within 5 clear business days of signing.
                  </li>
                </ul>
                <p className={body}>
                  A roofer pushing for a large upfront payment or cash only is a red flag. See{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    common roofing scams in Adelaide
                  </Link>
                  .
                </p>
              </article>

              <article id="borrow-less" className="scroll-mt-24">
                <h2 className={h2}>Ways to borrow less</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Check insurance first:</strong> if a storm caused
                    the damage, see{" "}
                    <Link href="/blog/insurance-roof-replacement-sa" className={inlineLink}>
                      whether home insurance covers roof replacement
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Consider a restoration:</strong> if the roof is
                    still sound, a{" "}
                    <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                      restoration
                    </Link>{" "}
                    typically costs a fraction of a new roof.
                  </li>
                  <li>
                    <strong className="text-ink">Get three itemised quotes:</strong> our guide to{" "}
                    <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                      reading a roofing quote
                    </Link>{" "}
                    shows where prices differ.
                  </li>
                  <li>
                    <strong className="text-ink">Fix urgent problems first:</strong> a small,
                    essential repair may be enough to buy time while you save. If you&apos;re eligible,
                    a No Interest Loan can cover up to $3,000 for recovery after a natural disaster.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Know the number before you look at finance
                </h2>
                <p className={body}>
                  Our{" "}
                  <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                    roof replacement cost guide
                  </Link>{" "}
                  covers typical Adelaide prices, or use the calculator below for a no-obligation
                  figure. Ready for a quote? Start on{" "}
                  <Link href="/services/roof-replacement" className={inlineLink}>
                    our roof replacement page
                  </Link>
                  .
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

              <ArticleFaq id="faq" heading="Financing a new roof: common questions" faqs={FAQS} />

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
