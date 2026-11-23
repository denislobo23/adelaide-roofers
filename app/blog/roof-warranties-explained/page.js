// app/blog/roof-warranties-explained/page.js
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
  "Three roofers fixing new Colorbond sheets over the timber frame of a single-storey home, part-way through a re-roof";

export const metadata = articleMetadata({
  slug: "roof-warranties-explained",
  title: "Roof Warranty Explained: What's Covered in SA | Adelaide Roofers",
  description:
    "A roof warranty comes in layers: the manufacturer's, the roofer's, and protections in SA law. What each covers, how long, and what can void it.",
  image: "/images/service-roof-replacement.webp",
  imageAlt: IMAGE_ALT,
});

const HEADLINE = "Roof Warranties Explained: What's Actually Covered";

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
      item: `${site.url}/blog/roof-warranties-explained`,
    },
  ],
};

const LAYERS = [
  {
    what: "Materials warranty",
    from: "The manufacturer",
    covers: "Defects in the product itself, such as a sheet rusting through or a tile failing",
    length: "BlueScope: up to 45 years on Colorbond roofing, depending on product and location. Monier: 30 years on its tiles",
  },
  {
    what: "Workmanship warranty",
    from: "Your roofer",
    covers: "Faults in the installation, such as a leak from poor flashing",
    length: "Set by the roofer; get it in writing",
  },
  {
    what: "Statutory warranties",
    from: "SA law (Building Work Contractors Act)",
    covers: "Domestic building work done with care, in good and suitable materials, meeting plans and legal requirements",
    length: "Claims up to 5 years after the work is finished",
  },
  {
    what: "Consumer guarantees",
    from: "Australian Consumer Law",
    covers: "Products of acceptable quality; services with due care and skill",
    length: "A reasonable time; a business can't take these away",
  },
  {
    what: "Building indemnity insurance",
    from: "Arranged by the builder",
    covers: "Incomplete or defective work if the builder dies, disappears or becomes insolvent",
    length: "Only for work needing council approval and costing $20,000 or more",
  },
];

const PAPERWORK = [
  "Written workmanship warranty: length, what it covers, what voids it",
  "Product names and colours used (e.g. Colorbond steel, tile profile)",
  "Manufacturer warranty registered, or confirmation the roofer has applied",
  "Final invoice and the contract (with the CBS Form 1 if it applies)",
  "Completion date written down: statutory claim periods run from it",
  "Photos of the finished roof",
  "Maintenance guide from the manufacturer",
  "Building indemnity insurance certificate, if the job needed one",
];

const FAQS = [
  {
    q: "How long is a roof warranty?",
    a: "It depends which one. BlueScope offers up to 45 years on Colorbond roofing, depending on product and location, and Monier warrants its roof tiles for 30 years from purchase. A roofer's workmanship warranty is set by the roofer. SA's statutory warranties allow claims for up to five years after domestic building work is finished.",
  },
  {
    q: "Does a roof warranty transfer to a new owner?",
    a: "SA's statutory warranties pass to later owners of the property. Manufacturer and workmanship warranties depend on their terms, so check each one and keep the paperwork to hand over when you sell.",
  },
  {
    q: "What voids a Colorbond warranty?",
    a: "BlueScope says overpainting Colorbond voids its warranties. Its warranties also depend on the product suiting the location, and BlueScope sets out the maintenance it expects, such as washing areas rain doesn't reach.",
  },
  {
    q: "What if my roofer won't fix a defect?",
    a: "Put the problem in writing and give them a reasonable chance to fix it. If that fails, contact Consumer and Business Services (CBS), which licenses building work contractors in SA, for advice on your options.",
  },
];

const SOURCES = [
  {
    href: "https://www.sa.gov.au/topics/business-and-trade/building-industry/planning-professionals/builder-responsibilities",
    label: "Builder responsibilities: statutory warranties",
    note: " (SA Government)",
  },
  {
    href: "https://www.sa.gov.au/topics/housing/buying-building-selling/building-a-home/building-indemnity-insurance",
    label: "Building indemnity insurance",
    note: " (SA Government)",
  },
  {
    href: "https://www.lawhandbook.sa.gov.au/ch23s11s02.php",
    label: "Building work contracts: statutory warranties",
    note: " (Law Handbook, Legal Services Commission of SA)",
  },
  {
    href: "https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees",
    label: "Consumer rights and guarantees",
    note: " (ACCC)",
  },
  {
    href: "https://www.cbs.sa.gov.au/documents/form-1-building-contract-rights-and-obligations.pdf",
    label: "Form 1: building contract rights and obligations",
    note: " (Consumer and Business Services SA, PDF)",
  },
  {
    href: "https://bluescopesteel.com.au/resources/articles/bluescope-launches-new-colorbond-steel-colour-palette",
    label: "Colorbond steel roofing warranty of up to 45 years",
    note: " (BlueScope)",
  },
  {
    href: "https://colorbond.com/faq",
    label: "Colorbond steel FAQs: warranty applications",
    note: " (Colorbond, BlueScope)",
  },
  {
    href: "https://cdn.dcs.lysaght.com/download/tb-02",
    label: "Technical Bulletin TB-2: overpainting and restoration",
    note: " (BlueScope, PDF)",
  },
  {
    href: "https://www.monier.com.au/warranty/",
    label: "Roof tile warranty",
    note: " (Monier)",
  },
];

const KEY_POINTS = [
  "Materials (manufacturer) and workmanship (roofer) warranties are separate; you want both.",
  "SA law adds statutory warranties: claims up to five years after the work is finished.",
  "Overpainting Colorbond voids BlueScope's warranties.",
  "Keep the paperwork: completion date, products used and the written warranty.",
];

const JUMP_LINKS = [
  { href: "#layers", label: "The five layers" },
  { href: "#voided", label: "What voids a warranty" },
  { href: "#ask", label: "What to ask for" },
  { href: "#paperwork", label: "Paperwork checklist" },
  { href: "#faq", label: "FAQs" },
];

const h2 = "font-display text-2xl font-bold tracking-tight text-clay";
const body = "mt-4 font-body leading-relaxed text-ink/70";
const list = "mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-ink/70 marker:text-clay";
const inlineLink = "font-semibold text-clay underline-offset-2 hover:underline";
const th = "border-b border-mortar px-4 py-3 font-display text-sm font-bold text-ink";
const td = "border-b border-mortar px-4 py-3 font-body text-sm text-ink/75 align-top";

export default function RoofWarrantiesPage() {
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
            <ArticleMeta slug="roof-warranties-explained" headline={HEADLINE} />
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              A roof warranty is really several layers. The manufacturer covers the product: up
              to 45 years on Colorbond roofing from BlueScope, depending on the product and
              location, or 30 years on Monier roof tiles. Your roofer covers the installation with
              a workmanship warranty, which should be in writing. On top of that, SA law gives
              statutory warranties on domestic building work, with claims allowed for up to five
              years after the job is finished, and the Australian Consumer Law guarantees work
              done with due care and skill.
            </p>
            <p className={body}>
              Below: what each layer covers, what can void a warranty, what to ask for, and a
              checklist of the paperwork to keep.
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
              <article id="layers" className="scroll-mt-24">
                <h2 className={h2}>The five layers of a roof warranty</h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-mortar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper">
                        <th className={th}>What</th>
                        <th className={th}>From</th>
                        <th className={th}>Covers</th>
                        <th className={th}>How long</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LAYERS.map((row, i) => (
                        <tr key={row.what} className={i % 2 === 1 ? "bg-paper/50" : ""}>
                          <td className={`${td} font-semibold text-ink`}>{row.what}</td>
                          <td className={td}>{row.from}</td>
                          <td className={td}>{row.covers}</td>
                          <td className={td}>{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={body}>
                  The SA Government notes there can be longer claim periods for breach of contract
                  or negligence, capped at ten years. Building indemnity insurance often won&apos;t
                  apply to a re-roof, because a like-for-like re-roof usually doesn&apos;t need
                  council approval; here&apos;s{" "}
                  <Link href="/blog/council-approval-roof-replacement-sa" className={inlineLink}>
                    when a new roof needs approval
                  </Link>
                  .
                </p>
              </article>

              <article id="voided" className="scroll-mt-24">
                <h2 className={h2}>What can void a roof warranty</h2>
                <ul className={list}>
                  <li>
                    <strong className="text-ink">Painting over Colorbond:</strong> BlueScope says
                    overpainting voids its warranties. Check before any{" "}
                    <Link href="/blog/roof-restoration-cost-adelaide" className={inlineLink}>
                      roof restoration
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">The wrong product for the location:</strong>{" "}
                    BlueScope&apos;s cover depends on where the roof is, especially near the sea.
                    See{" "}
                    <Link href="/blog/does-colorbond-rust" className={inlineLink}>
                      does Colorbond rust
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">Not following the installation guide:</strong>{" "}
                    Monier&apos;s tile warranty applies when the tiles are installed to its
                    installation guides.
                  </li>
                  <li>
                    <strong className="text-ink">Later trades:</strong> solar, antenna or air-con
                    installers can crack tiles or leave metal shavings that stain. Tell your roofer
                    before others work on the roof; see{" "}
                    <Link href="/blog/solar-panels-and-your-roof" className={inlineLink}>
                      solar panels and your roof
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-ink">No maintenance:</strong> manufacturers publish the
                    upkeep they expect, such as BlueScope&apos;s advice to wash areas rain
                    doesn&apos;t reach.
                  </li>
                  <li>
                    <strong className="text-ink">Not registering:</strong> BlueScope takes
                    warranty applications for up to 12 months after installation.
                  </li>
                </ul>
                <p className={body}>
                  Your statutory rights and consumer guarantees are different: a business
                  can&apos;t take them away with its own terms.
                </p>
              </article>

              <article id="ask" className="scroll-mt-24">
                <h2 className={h2}>What to ask your roofer for</h2>
                <ul className={list}>
                  <li>A written workmanship warranty, with its length and what voids it.</li>
                  <li>The exact products and colours on the quote, so the materials warranty is clear.</li>
                  <li>Who registers the manufacturer&apos;s warranty, and when.</li>
                  <li>Their licence number, so you can check it with CBS.</li>
                  <li>
                    Who to call for a warranty problem, and how quickly they respond. More in{" "}
                    <Link href="/blog/questions-to-ask-a-roofer" className={inlineLink}>
                      questions to ask a roofer
                    </Link>{" "}
                    and{" "}
                    <Link href="/blog/how-to-read-a-roofing-quote" className={inlineLink}>
                      how to read a roofing quote
                    </Link>
                    .
                  </li>
                </ul>
              </article>

              <article id="paperwork" className="scroll-mt-24">
                <h2 className={h2}>Keep the paperwork</h2>
                <p className={body}>
                  A warranty is only as good as your ability to prove it. File these the week the
                  job finishes, and hand them over if you sell.
                </p>
                <div className="mt-6">
                  <PrintableChecklist
                    heading="Printable checklist: roof warranty paperwork"
                    intro="Keep these together from the day the job finishes."
                    items={PAPERWORK}
                  />
                </div>
              </article>

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Every roofer we connect you with offers a real warranty
                </h2>
                <p className={body}>
                  A written workmanship warranty is one of the things we check for before
                  connecting you with a local roofer, not something you have to negotiate for
                  yourself.
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

              <ArticleFaq id="faq" heading="Roof warranties: common questions" faqs={FAQS} />

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
