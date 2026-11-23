// app/blog/roofer-vs-contractor-vs-plumber/page.js
// Featured image: public/images/service-roof-restoration.webp (existing library image)

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

const IMAGE_ALT =
  "Roofer in hi-vis working along the hip of a freshly restored charcoal tile roof on a single-storey home";

export const metadata = articleMetadata({
  slug: "roofer-vs-contractor-vs-plumber",
  title: "Roof Plumber vs Roofer vs Contractor: Who Do You Need? | Adelaide Roofers",
  description:
    "Roof plumber, roof tiler or builder? In SA each roofing job has its own licence category. What each trade does, and how to check the licence fits your job.",
  image: "/images/service-roof-restoration.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Roofer vs Roof Contractor vs Roof Plumber: Which Do You Need?";

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
      item: `${site.url}/blog/roofer-vs-contractor-vs-plumber`,
    },
  ],
};

const CATEGORIES = [
  {
    name: "Roof plumbing",
    covers: "Installing and repairing metal roof sheeting and wall cladding, gutters, downpipes and sarking; restoring metal roofs; skylights and whirlybirds on metal roofs. May also replace roof tiles with metal sheeting.",
  },
  {
    name: "Roof tiling",
    covers: "Installing concrete, terracotta or pressed metal tiles, or slate, as the roof covering.",
  },
  {
    name: "Roof restoration",
    covers: "Repairing gutters, fascias, battens and downpipes; re-bedding and re-pointing ridge capping; replacing cracked tiles; preparing and painting metal and tile roofs.",
  },
  {
    name: "Skylight or roof ventilator installation",
    covers: "Fitting skylights and roof ventilators.",
  },
];

const JOBS = [
  ["New Colorbond roof, or tile to metal", "Roof plumbing"],
  ["New gutters and downpipes", "Roof plumbing (restoration covers gutter repairs)"],
  ["New tile roof, or re-tiling", "Roof tiling"],
  ["Ridge capping, cracked tiles, cleaning and recoating", "Roof restoration"],
  ["Restoring a metal roof", "Roof plumbing or roof restoration"],
  ["Whirlybird or skylight", "Skylight or roof ventilator installation (roof plumbing on metal roofs)"],
  ["Re-roof plus new framing or an extension", "A builder whose licence covers the structural work"],
  ["Removing an asbestos roof", "A SafeWork SA licensed asbestos removalist"],
];

const FAQS = [
  {
    q: "What does a roof plumber do?",
    a: "In SA, the roof plumbing licence category covers metal roof sheeting and wall cladding, gutters, downpipes and sarking, metal roof restoration, and skylights and whirlybirds on metal roofs. It also allows replacing tiles with metal sheeting.",
  },
  {
    q: "Is a roof plumber the same as a plumber?",
    a: "No. In SA, roof plumbing is a building work licence category administered by Consumer and Business Services (CBS). A general plumber's licence is a different scheme, so check that whoever does your roof has the roofing condition.",
  },
  {
    q: "Can a roof tiler install a Colorbond roof?",
    a: "Only if their licence also covers it. The roof tiling category covers tiles and slate; metal sheeting falls under roof plumbing. Many businesses hold more than one condition, so check the CBS register.",
  },
  {
    q: "How do I check what a roofer is licensed for?",
    a: "Search their name or licence number on the CBS 'Find a licence holder' register. It shows whether the licence is current and its conditions, which should match the work on your quote.",
  },
];

const SOURCES = [
  {
    href: "https://www.cbs.sa.gov.au/documents/occlicensing/Building-Work-Supervisor-Standard-Registration-Conditions.pdf",
    label: "Building work supervisor standard registration conditions: roofing categories",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://www.cbs.sa.gov.au/find-a-licence-holder",
    label: "Find a licence holder",
    note: " (Consumer and Business Services SA)",
  },
  {
    href: "https://www.lawhandbook.sa.gov.au/ch23s11s01.php",
    label: "Licensing of builders",
    note: " (Law Handbook, Legal Services Commission of SA)",
  },
  {
    href: "https://www.safework.sa.gov.au/licence-and-registration/apply-renew/asbestos",
    label: "Asbestos removal licences",
    note: " (SafeWork SA)",
  },
];

const KEY_POINTS = [
  "“Roofer” and “roof contractor” are everyday terms, not licence types.",
  "In SA, roofing work is licensed under the Building Work Contractors Act, with separate categories.",
  "Roof plumbing covers metal roofs, gutters and downpipes; roof tiling covers tiles and slate.",
  "Check the licence conditions on the CBS register match your job.",
];

const JUMP_LINKS = [
  { href: "#terms", label: "The three terms" },
  { href: "#roof-plumber", label: "What a roof plumber does" },
  { href: "#which-job", label: "Which licence for which job" },
  { href: "#check", label: "How to check" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay hover:text-clay-deep";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function RooferVsPlumberPage() {
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
            <ArticleMeta slug="roofer-vs-contractor-vs-plumber" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              In South Australia, a roof plumber is licensed for metal roofs, gutters and
              downpipes, while a roof tiler is licensed for tile and slate roofs. &ldquo;Roofer&rdquo;
              and &ldquo;roof contractor&rdquo; are everyday names, not licence types. What matters
              is the licence: SA licenses roofing work under the Building Work Contractors Act,
              with separate categories for roof plumbing, roof tiling, roof restoration and
              skylight or ventilator installation. Check the roofer&apos;s licence on the CBS
              register and make sure its conditions cover your job.
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
              <article id="terms" className="scroll-mt-24">
                <h2 className={h2}>Roofer, roof contractor, roof plumber: the three terms</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Roofer:</strong> the umbrella term most people
                    use for anyone who tiles, re-roofs, restores or repairs roofs. It says nothing
                    about the licence they hold.
                  </li>
                  <li>
                    <strong className="text-ink">Roof contractor:</strong> usually describes the
                    business that contracts with you and runs the job, sometimes using
                    subcontractors. Often the same business as &ldquo;the roofer&rdquo;.
                  </li>
                  <li>
                    <strong className="text-ink">Roof plumber:</strong> the one term that matches a
                    specific licence category in SA, covering metal roofs and roof drainage.
                  </li>
                </ul>
              </article>

              <article id="roof-plumber" className="scroll-mt-24">
                <h2 className={h2}>What does a roof plumber do? SA&apos;s roofing licence categories</h2>
                <p className={body}>
                  Builders must be licensed for most domestic building work in SA, and a licence
                  can be limited to particular trades. Consumer and Business Services (CBS) sets
                  out these roofing categories:
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Category</th>
                        <th className={th}>Scope of work (summarised)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CATEGORIES.map((c, i) => (
                        <tr key={c.name} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{c.name}</td>
                          <td className={td}>{c.covers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  A builder with an unrestricted licence can also do roofing work. Roof plumbing in
                  SA sits in this building licence scheme, separate from a general plumber&apos;s
                  licence.
                </p>
              </article>

              <article id="which-job" className="scroll-mt-24">
                <h2 className={h2}>Which licence for which job</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>Your job</th>
                        <th className={th}>Licence condition to look for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {JOBS.map(([job, licence], i) => (
                        <tr key={job} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{job}</td>
                          <td className={td}>{licence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  Our guide on{" "}
                  <Link href="/blog/tile-to-metal-roofing" className={inlineLink}>
                    going from tile to metal
                  </Link>{" "}
                  explains what that job involves, and the{" "}
                  <Link href="/blog/asbestos-roof-removal-guide" className={inlineLink}>
                    asbestos roof removal guide
                  </Link>{" "}
                  covers asbestos.
                </p>
              </article>

              <article id="check" className="scroll-mt-24">
                <h2 className={h2}>How to check before you sign</h2>
                <ul className={list}>
                  <li>Ask for the licence number, and check it on the CBS register.</li>
                  <li>Check the name on the register matches the business on the quote.</li>
                  <li>Check the licence conditions cover the work being quoted.</li>
                  <li>If parts are subcontracted, ask who does them and what they&apos;re licensed for.</li>
                </ul>
                <p className={body}>
                  More in{" "}
                  <Link href="/blog/questions-to-ask-a-roofer" className={inlineLink}>
                    10 questions to ask a roofer
                  </Link>{" "}
                  and{" "}
                  <Link href="/blog/roofing-scams-adelaide" className={inlineLink}>
                    common roofing scams in Adelaide
                  </Link>
                  .
                </p>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Skip the guesswork
                </h2>
                <p className={body}>
                  Tell us what your roof needs and we&apos;ll connect you with someone holding the
                  right licence for that job.
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

              <ArticleFaq id="faq" heading="Roof plumbers and roofers: common questions" faqs={FAQS} />

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
