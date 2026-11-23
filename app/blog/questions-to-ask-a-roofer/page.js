// app/blog/questions-to-ask-a-roofer/page.js
// Featured image: public/images/blog-questions-to-ask-a-roofer.webp

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
  "Roofer in hi-vis going through a written quote on a clipboard with a homeowner outside a tiled home";

export const metadata = articleMetadata({
  slug: "questions-to-ask-a-roofer",
  title: "10 Questions to Ask a Roofer Before You Sign (SA) | Adelaide Roofers",
  description:
    "10 questions to ask a roofer before you sign: licence, insurance, quote, deposit, warranty and more, with what a good answer sounds like under SA rules.",
  image: "/images/blog-questions-to-ask-a-roofer.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "10 Questions to Ask a Roofer Before You Sign";

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
      item: `${site.url}/blog/questions-to-ask-a-roofer`,
    },
  ],
};

const QUESTIONS = [
  {
    q: "What's your licence number, and does it cover this work?",
    good: "They give it straight away. On the CBS register, their licence conditions cover the job: SA has separate categories for roof tiling, roof plumbing (metal roofs, gutters and downpipes) and roof restoration.",
    flag: "No number, a number in someone else's name, or conditions that don't match the work.",
  },
  {
    q: "What insurance do you carry?",
    good: "A current public liability certificate. For work needing council approval and costing $20,000 or more, building indemnity insurance too.",
    flag: "“We're covered” with nothing on paper.",
  },
  {
    q: "Can I get an itemised written quote, and what isn't included?",
    good: "Materials, strip-off, disposal, flashings, gutters, edge protection and clean-up are listed, with any exclusions named.",
    flag: "A single lump sum, or extras that only appear on the final bill.",
  },
  {
    q: "How much deposit do you need, and when are the other payments due?",
    good: "A deposit within the legal limit ($1,000, or 5% on contracts over $20,000), then payments only for work already done, invoiced in writing.",
    flag: "Cash only, a big upfront payment, or payment in full before the job starts.",
  },
  {
    q: "Will there be a written contract?",
    good: "Yes. Over $20,000 it's required, with their licence number, both signatures, a copy for you and the CBS Form 1, plus 5 clear business days to cool off.",
    flag: "Pressure to sign on the spot.",
  },
  {
    q: "What warranty do you give, and who registers the manufacturer's warranty?",
    good: "A written workmanship warranty with its length and what voids it, and a clear answer on who registers the product warranty.",
    flag: "A verbal “it's all covered”.",
    link: { href: "/blog/roof-warranties-explained", label: "How roof warranties work" },
  },
  {
    q: "Who will actually be on my roof?",
    good: "Their own crew, or named subcontractors who are licensed and insured for their part of the work.",
    flag: "Vagueness about who turns up.",
  },
  {
    q: "Is there any asbestos, and how will you handle it?",
    good: "On older homes, they check. More than 10 m² of bonded asbestos needs a SafeWork SA licensed removalist, who must notify SafeWork SA before starting.",
    flag: "An offer to “just take it off” or water-blast it.",
    link: { href: "/blog/asbestos-roof-removal-guide", label: "Asbestos roof removal guide" },
  },
  {
    q: "What happens if it rains or the job runs over?",
    good: "A straightforward plan: how they protect an open roof overnight and how delays are communicated.",
    flag: "“It won't rain.”",
    link: { href: "/blog/rain-during-a-roofing-job", label: "Here's what a well-run job does when it rains." },
  },
  {
    q: "Can I see recent local jobs like mine?",
    good: "Photos or addresses of similar recent work, and a past customer you can call.",
    flag: "No examples, or only stock photos.",
  },
];

const FAQS = [
  {
    q: "How do I check a roofer's licence in SA?",
    a: "Search their name or licence number on the Consumer and Business Services (CBS) 'Find a licence holder' register. Check the name matches the business on the quote and that the licence conditions cover your job.",
  },
  {
    q: "How many quotes should I get?",
    a: "Three is a good number for a big job like a re-roof. Ask every roofer the same questions so you're comparing like with like, and be wary of a quote far below the others.",
  },
  {
    q: "Do roofers in SA need a licence?",
    a: "Yes, for building work done for others. CBS licenses roofing under separate categories, including roof tiling, roof plumbing for metal roofs and gutters, and roof restoration.",
  },
];

const SOURCES = [
  {
    href: "https://www.cbs.sa.gov.au/find-a-licence-holder",
    label: "Find a licence holder",
    note: " (Consumer and Business Services SA)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/occlicensing/Building-Work-Supervisor-Standard-Registration-Conditions.pdf",
    label: "Building work supervisor standard registration conditions: roofing categories",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: Your building contract, your rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://www.sa.gov.au/topics/housing/buying-building-selling/building-a-home/building-indemnity-insurance",
    label: "Building indemnity insurance",
    note: " (SA Government)",
  },
  {
    href: "https://www.safework.sa.gov.au/licence-and-registration/apply-renew/asbestos",
    label: "Asbestos removal licences",
    note: " (SafeWork SA)",
  },
];

const KEY_POINTS = [
  "Check the licence number on the CBS register, and that its conditions cover your job.",
  "Get an itemised written quote and a contract; over $20,000 a contract is required.",
  "The deposit is capped at $1,000, or 5% on contracts over $20,000.",
  "Get the workmanship warranty in writing.",
];

const JUMP_LINKS = [
  { href: "#questions", label: "The 10 questions" },
  { href: "#checklist", label: "Printable checklist" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const h3 = "font-display text-lg font-bold tracking-tight text-ink";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";

export default function QuestionsToAskPage() {
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
            <ArticleMeta slug="questions-to-ask-a-roofer" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              The most important questions to ask a roofer are about their licence, insurance,
              the written quote, the deposit and the warranty. In South Australia you can check
              the licence yourself on the CBS register, the deposit is capped by law at $1,000
              (or 5% on contracts over $20,000), and contracts over $20,000 must be in writing
              with a cooling-off period. Below are the ten questions to ask every roofer, what a
              good answer sounds like, and the red flags.
            </p>

            <ArticleKeyPoints points={KEY_POINTS} jumpLinks={JUMP_LINKS} />

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-questions-to-ask-a-roofer.webp"
                alt={IMAGE_ALT}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-12">
              <article id="questions" className="scroll-mt-24">
                <h2 className={h2}>The 10 questions to ask a roofer</h2>
                <ol className="mt-6 space-y-8">
                  {QUESTIONS.map((item, i) => (
                    <li key={item.q}>
                      <h3 className={h3}>
                        <span className="text-clay">{i + 1}.</span> {item.q}
                      </h3>
                      <p className="mt-2 font-body leading-relaxed text-ink/70">
                        <strong className="text-ink">Good answer:</strong> {item.good}
                      </p>
                      <p className="mt-1 font-body leading-relaxed text-ink/70">
                        <strong className="text-ink">Red flag:</strong> {item.flag}
                      </p>
                      {item.link && (
                        <p className="mt-1 font-body leading-relaxed text-ink/70">
                          <Link href={item.link.href} className={inlineLink}>
                            {item.link.label}
                          </Link>
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
                <p className={body}>
                  Once the quotes are in, here&apos;s{" "}
                  <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                    how to read a roofing quote
                  </Link>{" "}
                  line by line. If someone knocked on your door offering the work, read{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    the common roofing scams in Adelaide
                  </Link>{" "}
                  first. Not sure which trade you need? See{" "}
                  <Link href="/blog/roofer-vs-contractor-vs-plumber" className={inlineLink}>
                    roofer, contractor or roof plumber
                  </Link>
                  .
                </p>
              </article>

              <article id="checklist" className="scroll-mt-24">
                <h2 className={h2}>Take this to every quote</h2>
                <div className="mt-6">
                  <PrintableChecklist
                    heading="Printable checklist: 10 questions to ask a roofer"
                    intro="Ask every roofer the same questions, and note their answers."
                    items={QUESTIONS.map((item) => item.q)}
                  />
                </div>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Or skip the vetting
                </h2>
                <p className={body}>
                  Every roofer we connect you with has been checked for licensing, insurance and
                  track record before they&apos;re matched with a homeowner.{" "}
                  <Link href="/how-we-vet-our-roofers" className={inlineLink}>
                    See exactly how we vet our roofers
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

              <ArticleFaq id="faq" heading="Choosing a roofer: common questions" faqs={FAQS} />

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
