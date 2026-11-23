// app/blog/roofing-scams-adelaide/page.js
// Featured image: public/images/blog-roofing-scams.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleMeta from "@/components/ArticleMeta";
import { articleMetadata } from "@/lib/articleMetadata";

export const metadata = articleMetadata({
  slug: "roofing-scams-adelaide",
  title: "Common Roofing Scams in Adelaide (and How to Avoid Them) | Adelaide Roofers",
  description:
    "How to spot common roofing scams in Adelaide, from door-knockers and storm chasers to cash-only deposits, plus how to check a roofer's licence with CBS.",
  image: "/images/blog-roofing-scams.webp",
  imageAlt: "Homeowner checking a tradesperson's identification and licence before agreeing to work",
});

const HEADLINE = "Common Roofing Scams in Adelaide (and How to Avoid Them)";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: "Common Roofing Scams in Adelaide",
      item: `${site.url}/blog/roofing-scams-adelaide`,
    },
  ],
};

const RED_FLAGS = [
  { flag: "Turns up uninvited with an urgent problem", legit: "You contact them, or they're referred" },
  { flag: "Wants to start today", legit: "Gives a written quote and lets you think" },
  { flag: "Cash only, or most of the price upfront", legit: "Invoices properly, payments tied to stages" },
  { flag: "No licence number on the quote for licensed work", legit: "Licence number on every quote and invoice" },
  { flag: "Vague quote: “fix roof, $4,000”", legit: "Itemised scope, materials and warranty" },
  { flag: "Pressure: “price is only good today”", legit: "Price holds for a reasonable time" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const olist = "mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:font-semibold marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";

export default function RoofingScamsPage() {
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
            <ArticleMeta slug="roofing-scams-adelaide" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most roofing scams follow the same pattern: someone turns up uninvited, finds an
              &ldquo;urgent&rdquo; problem, pushes you to decide on the spot, and asks for cash or
              a big payment upfront. The best protection is simple: never agree to roof work at
              the door, always check the licence with Consumer and Business Services (CBS), and
              never pay most of the job before it&apos;s done.
            </p>
            <p className={body}>
              Below are the scams to watch for, how to check a roofer in South Australia, and what
              to do if something feels wrong.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-roofing-scams.webp"
                alt="Homeowner checking a tradesperson's identification and licence before agreeing to work"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article>
                <h2 className={h2}>The most common roofing scams</h2>
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className={h3}>1. The door-knocker who &ldquo;noticed a problem&rdquo;</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      Someone knocks and says they were working nearby and spotted loose tiles or a
                      damaged ridge on your roof. They offer to fix it today at a special price.
                      Often there was no problem, or they create one while they&apos;re up there.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>2. Storm chasers</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      After a big storm, out-of-area crews flood affected suburbs. Some do rushed,
                      poor work. Others take a deposit and disappear before the insurance assessor
                      or your own roofer ever sees the damage.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>3. The &ldquo;before and after&rdquo; photo trick</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      They go up, then show you photos of a damaged roof. The photos may not be of
                      your roof at all. If someone shows you damage, ask them to point it out from
                      the ground, or get a second opinion.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>4. Cash-only and big deposits</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      A trader who wants cash only, or a large deposit before any materials arrive,
                      is a red flag. A legitimate roofer has a business account, issues proper
                      invoices, and ties payments to stages of the job. In South Australia, the
                      law caps the deposit on domestic building work at $1,000 for contracts up to
                      $20,000, and at 5% of the contract price for contracts over $20,000, according
                      to{" "}
                      <a
                        href="https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={inlineLink}
                      >
                        CBS Form 1
                        <span className="sr-only"> (PDF, opens in a new tab)</span>
                      </a>
                      .
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>5. Too-cheap restorations</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      A &ldquo;full restoration&rdquo; for a fraction of normal prices usually means
                      watered-down coatings, no re-bedding or pointing, and a job that fails within
                      a year or two. See our{" "}
                      <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                        roof restoration cost guide
                      </Link>{" "}
                      for what a fair price looks like.
                    </p>
                  </div>
                  <div>
                    <h3 className={h3}>6. Upsells halfway through</h3>
                    <p className="mt-2 font-body leading-relaxed text-ink/70">
                      The job starts, then the trader &ldquo;discovers&rdquo; extra problems and
                      the price jumps. Some extras are genuine, but they should be explained,
                      photographed and agreed in writing before work continues.
                    </p>
                  </div>
                </div>
              </article>

              <article>
                <h2 className={h2}>How to check a roofer in South Australia</h2>
                <ol className={olist}>
                  <li>
                    Check the licence on the{" "}
                    <a
                      href="https://www.cbs.sa.gov.au/find-a-licence-holder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      Consumer and Business Services (CBS) public register
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    . Make sure the name and licence number match the quote. You can also use our{" "}
                    <Link href="/verify-a-roofer" className={inlineLink}>
                      free roofer licence check
                    </Link>
                    .
                  </li>
                  <li>
                    Check the ABN on the Australian Business Register and confirm it belongs to
                    the business you&apos;re dealing with.
                  </li>
                  <li>Ask for proof of insurance, including public liability.</li>
                  <li>
                    Get a written quote with a clear scope, materials, price, payment stages and
                    warranty. See our guide to{" "}
                    <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                      reading a roofing quote
                    </Link>
                    .
                  </li>
                  <li>Get more than one quote for anything bigger than a small repair.</li>
                </ol>
                <p className={body}>
                  Our{" "}
                  <Link href="/blog/questions-to-ask-a-roofer" className={inlineLink}>
                    questions to ask a roofer
                  </Link>{" "}
                  covers the rest.
                </p>
              </article>

              <article>
                <h2 className={h2}>Your rights if someone sells at the door</h2>
                <p className={body}>
                  Under Australian Consumer Law, a deal made with an uninvited door-to-door seller
                  is an &ldquo;unsolicited consumer agreement&rdquo;. Key protections:
                </p>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">10 business days cooling-off:</strong> you can
                    cancel without a reason.
                  </li>
                  <li>
                    <strong className="text-ink">No payment during the cooling-off period</strong>{" "}
                    for agreements over $100, and no work should start in that time.
                  </li>
                  <li>
                    <strong className="text-ink">Door-knocking hours are limited:</strong> not
                    before 9am or after 6pm on weekdays, not after 5pm on Saturdays, and not on
                    Sundays or public holidays.
                  </li>
                  <li>
                    <strong className="text-ink">They must leave</strong> if you ask them to.
                  </li>
                </ul>
                <p className={body}>
                  If a trader ignores these rules, that alone tells you who you&apos;re dealing
                  with.
                </p>
              </article>

              <article>
                <h2 className={h2}>Red flags at a glance</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Red flag</th>
                        <th className={th}>What a legitimate roofer does</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RED_FLAGS.map((row, i) => (
                        <tr key={row.flag} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm font-semibold text-ink">{row.flag}</td>
                          <td className="border-b border-mortar px-4 py-3 font-body text-sm text-ink/75">{row.legit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article>
                <h2 className={h2}>What to do if you think you&apos;ve been scammed</h2>
                <ul className={list}>
                  <li>Stop paying and keep every quote, receipt, text and photo.</li>
                  <li>
                    Contact Consumer and Business Services (CBS) for advice on your rights and to
                    lodge a complaint.
                  </li>
                  <li>Report it to Scamwatch to help warn others.</li>
                  <li>Call the police if you&apos;ve been threatened or money was taken by fraud.</li>
                  <li>
                    Get your roof checked by a licensed roofer, so you know what was actually done.
                  </li>
                </ul>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  How we help
                </h2>
                <p className={body}>
                  Every roofer we connect you with has been checked for licensing, insurance and
                  track record. You can see exactly{" "}
                  <Link href="/how-we-vet-our-roofers" className={inlineLink}>
                    how we vet our roofers
                  </Link>
                  , and get a free quote with no door-knocking and no pressure.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/how-we-vet-our-roofers"
                    className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
                  >
                    See how we vet our roofers →
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-ink px-6 py-3 font-display font-bold tracking-tight text-ink transition hover:bg-ink hover:text-paper"
                  >
                    Try the free calculator →
                  </Link>
                </div>
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
          We&apos;ll match you with a properly vetted local roofer — no door-knocking, no
          pressure.
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
