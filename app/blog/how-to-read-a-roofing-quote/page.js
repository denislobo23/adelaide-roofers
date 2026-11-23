// app/blog/how-to-read-a-roofing-quote/page.js
// Featured image: public/images/blog-how-to-read-a-quote.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "how-to-read-a-roofing-quote",
  title: "How to Read a Roofing Quote: What Should Be Included | Adelaide Roofers",
  description:
    "What every line of an Adelaide roofing quote should say, the red flags, SA deposit and contract rules, and how to compare three quotes fairly.",
  image: "/images/blog-how-to-read-a-quote.webp",
  imageAlt: "Reading and comparing itemised roofing quotes",
});

const HEADLINE = "How to Read a Roofing Quote: What Should Be Included";

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
      item: `${site.url}/blog/how-to-read-a-roofing-quote`,
    },
  ],
};

const QUOTE_LINES = [
  {
    part: "Business details",
    good: "Business name, ABN, CBS licence number, address and phone",
    flag: "No licence number, or a mobile number only",
  },
  {
    part: "Scope of work",
    good: "What comes off, what goes on, which roof sections (house, verandah, garage) and the roof area in m²",
    flag: "“Re-roof house” with no detail",
  },
  {
    part: "Roofing material",
    good: "Brand, profile and colour, e.g. Colorbond Custom Orb in Surfmist, or the tile make and profile",
    flag: "“Roofing materials” or “metal sheeting”",
  },
  {
    part: "Under the roof",
    good: "Sarking, insulation blanket, and whether battens are new or reused",
    flag: "Not mentioned at all",
  },
  {
    part: "Flashings, ridges and valleys",
    good: "New flashings, ridge capping and valleys listed, with material",
    flag: "“As required”",
  },
  {
    part: "Gutters and downpipes",
    good: "Replaced or kept, with profile and colour if new",
    flag: "Silent, so you don’t know if they’re included",
  },
  {
    part: "Access and safety",
    good: "Scaffolding or edge protection included in the price",
    flag: "Not mentioned, or “hire extra”",
  },
  {
    part: "Waste and clean-up",
    good: "Skip bin, disposal and site clean-up included",
    flag: "Not mentioned",
  },
  {
    part: "Price",
    good: "Total including GST, with any provisional sums shown separately",
    flag: "“Approx.” or “price TBC on the day”",
  },
  {
    part: "Payments",
    good: "Deposit, progress payments tied to stages, final payment on completion",
    flag: "A large payment up front",
  },
  {
    part: "Warranty",
    good: "Workmanship warranty in years, plus the manufacturer’s material warranty",
    flag: "“Fully guaranteed” with no terms",
  },
  {
    part: "Timing",
    good: "Expected start date, how long the job takes, and how long the quote is valid",
    flag: "No validity date",
  },
];

const SOURCES = [
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: Your building contract, your rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://www.lawhandbook.sa.gov.au/ch23s11s02.php",
    label: "Building work contracts",
    note: " (Law Handbook, Legal Services Commission of SA)",
  },
  {
    href: "https://www.cbs.sa.gov.au/find-a-licence-holder",
    label: "Find a licence holder",
    note: " (Consumer and Business Services SA)",
  },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function HowToReadAQuotePage() {
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
            <span className="eyebrow text-clay">Choosing a roofer</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
              {HEADLINE}
            </h1>
            <ArticleMeta slug="how-to-read-a-roofing-quote" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A good roofing quote is written, itemised and specific. It should name the exact
              materials (brand, profile and colour), spell out what&apos;s coming off and going on,
              say what&apos;s excluded, give a total price including GST, set out the payment
              stages, state the warranty in years, and show the roofer&apos;s CBS licence number.
              If all you have is one number next to &ldquo;supply and install new roof&rdquo;, ask
              for a breakdown before you sign.
            </p>
            <p className={body}>
              Below is what each part of a quote should say, the Adelaide-specific details to look
              for, your rights under South Australian law, and how to compare quotes fairly.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-how-to-read-a-quote.webp"
                alt="Reading and comparing itemised roofing quotes"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>What each part of the quote should say</h2>
                <p className={body}>
                  Use this as a checklist with the quote in front of you. Anything in the right-hand
                  column is worth a question.
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Part of the quote</th>
                        <th className={th}>A good quote says</th>
                        <th className={th}>Ask about it if you see</th>
                      </tr>
                    </thead>
                    <tbody>
                      {QUOTE_LINES.map((row, i) => (
                        <tr key={row.part} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{row.part}</td>
                          <td className={td}>{row.good}</td>
                          <td className={td}>{row.flag}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  A short quote isn&apos;t automatically a bad one, and plenty of good local roofers
                  write brief quotes. But if something above is missing, it&apos;s reasonable to ask
                  for it in writing before you sign.
                </p>
              </article>

              <article>
                <h2 className={h2}>Adelaide details to look for</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Steel grade near the coast:</strong> in suburbs
                    like Glenelg, Henley Beach, Semaphore and Brighton, the quote should say which
                    grade of steel is being used and why it suits your distance from the sea. Ask
                    if it doesn&apos;t.
                  </li>
                  <li>
                    <strong className="text-ink">Heat:</strong> for Adelaide summers, check the
                    colour and whether an insulation blanket or sarking is included. Two quotes can
                    differ a lot here.
                  </li>
                  <li>
                    <strong className="text-ink">Asbestos on older homes:</strong> on homes built
                    before 1990, any asbestos cement roofing should be a separate line, removed by
                    a SafeWork SA licensed removalist. See our{" "}
                    <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                      guide to asbestos roof removal
                    </Link>{" "}
                    for what that part of the quote should cover.
                  </li>
                  <li>
                    <strong className="text-ink">Heritage and character areas:</strong> if your
                    home needs council approval for the new roof, the quote should say who
                    arranges it and whether it&apos;s included in the price.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className={h2}>Your rights under South Australian law</h2>
                <p className={body}>
                  Most re-roofs are domestic building work, so the Building Work Contractors Act
                  applies. The key points from Consumer and Business Services (CBS):
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Deposit limit:</strong> a builder can&apos;t take
                    a deposit of more than $1,000, or 5% of the price if the contract is over
                    $20,000. Advance payments for third-party costs, such as council fees, are the
                    exception.
                  </li>
                  <li>
                    <strong className="text-ink">Progress payments:</strong> these should only be
                    for work already done, and the roofer must ask for them in writing, such as an
                    invoice.
                  </li>
                  <li>
                    <strong className="text-ink">Variations:</strong> most changes to the price or
                    scope need your written approval in advance. Items marked &ldquo;provisional
                    sum&rdquo; or &ldquo;prime cost&rdquo; can change, so ask what they&apos;re
                    based on.
                  </li>
                </ul>
                <p className={body}>
                  If the contract is over $20,000, there are extra protections:
                </p>
                <ul className={list}>
                  <li>
                    It must be in writing, set out all the terms, include the roofer&apos;s name and
                    licence number, and be signed by both of you. You should get a signed copy and
                    a CBS notice called Form 1.
                  </li>
                  <li>
                    You have a cooling-off period of 5 clear business days after signing, to cancel
                    by written notice.
                  </li>
                  <li>
                    Building indemnity insurance is required only if the job also needs development
                    approval. Most like-for-like re-roofs don&apos;t, so don&apos;t be surprised if
                    it isn&apos;t on the quote.
                  </li>
                </ul>
                <p className={body}>
                  Under $20,000, a written contract isn&apos;t legally required, but get one
                  anyway. To check a licence number, search the CBS register. If a quote came from
                  someone who knocked on your door, read{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    the common roofing scams in Adelaide
                  </Link>{" "}
                  first.
                </p>
              </article>

              <article>
                <h2 className={h2}>How to compare three quotes</h2>
                <ol className={olist}>
                  <li>
                    Put them side by side using the table above, one column per roofer.
                  </li>
                  <li>
                    Check they&apos;re quoting the same job: the same roof area, material, sarking
                    and gutters. Most big price gaps come from different scope, not different
                    margins.
                  </li>
                  <li>
                    Ask each roofer to fill any gaps in writing, so you&apos;re comparing like with
                    like.
                  </li>
                  <li>
                    Compare warranties, not just price. Our guide to{" "}
                    <Link href="/blog/roof-warranties-explained" className={inlineLink}>
                      what roof warranties actually cover
                    </Link>{" "}
                    explains workmanship versus material warranties.
                  </li>
                  <li>
                    Sense-check the total against{" "}
                    <Link href="/blog/roof-replacement-cost-adelaide" className={inlineLink}>
                      typical Adelaide re-roof prices
                    </Link>
                    . A quote far below the others usually leaves something out.
                  </li>
                </ol>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Before you sign
                </h2>
                <p className={body}>
                  Make sure everything you were promised in person is written into the quote. For
                  the questions to ask face to face, see our list below. Checking quotes, licences
                  and warranties is also part of{" "}
                  <Link href="/how-we-vet-our-roofers" className={inlineLink}>
                    how we vet the roofers we work with
                  </Link>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog/questions-to-ask-a-roofer"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See 10 questions to ask a roofer →
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
          We&apos;ll match you with a vetted local roofer who gives proper, itemised quotes.
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
