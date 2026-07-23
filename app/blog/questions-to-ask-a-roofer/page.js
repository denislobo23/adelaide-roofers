// app/blog/questions-to-ask-a-roofer/page.js
// Featured image: public/images/blog-questions-to-ask-a-roofer.webp (NEW — see prompt in chat)

import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";
import ArticleSidebar from "@/components/ArticleSidebar";

export const metadata = {
  title: "10 Questions to Ask a Roofer Before You Sign | Adelaide Roofers",
  description:
    "The questions that actually separate a properly licensed, insured roofer from a risky one — and what a good answer to each one sounds like.",
  alternates: { canonical: `${site.url}/blog/questions-to-ask-a-roofer` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${site.url}/#resources` },
    {
      "@type": "ListItem",
      position: 3,
      name: "10 Questions to Ask a Roofer Before You Sign",
      item: `${site.url}/blog/questions-to-ask-a-roofer`,
    },
  ],
};

const QUESTIONS = [
  {
    q: "Are you licensed, and can I see your licence number?",
    a: "A legitimate roofer will give this without hesitation. You can verify a South Australian building licence yourself rather than just taking their word for it.",
  },
  {
    q: "What insurance do you carry — public liability and building indemnity?",
    a: "Public liability covers damage or injury during the job; building indemnity protects you if the roofer can't finish or defects show up later. Ask for both, not just one.",
  },
  {
    q: "Can I get the quote in writing, itemised?",
    a: "A written, itemised quote is the single best protection against scope creep and surprise costs later. Be wary of anyone reluctant to put numbers on paper.",
  },
  {
    q: "What's included, and what isn't?",
    a: "Waste removal, scaffolding, and cleanup are sometimes extra rather than included — ask directly so the final bill doesn't surprise you.",
  },
  {
    q: "What warranty do you offer, and what does it actually cover?",
    a: "Ask for the warranty length and what specifically voids it. A vague verbal 'yeah it's covered' isn't the same as a written warranty with real terms.",
  },
  {
    q: "How long has your business been operating?",
    a: "Not a dealbreaker on its own, but worth knowing — a longer track record generally means more accountability if something goes wrong down the line.",
  },
  {
    q: "Can you show me examples of similar recent work?",
    a: "Recent, relevant examples — ideally local — are a fair thing to ask for and a reasonable roofer won't mind sharing them.",
  },
  {
    q: "Who will actually be doing the work?",
    a: "Some jobs get subcontracted out. There's nothing wrong with that as long as you know who's actually on your roof and that they're covered by the same insurance and licensing.",
  },
  {
    q: "What happens if it rains or the job runs over?",
    a: "A roofer who's done this before has a straightforward answer — weather delays are normal, and how they handle them tells you a lot about how they run a job.",
  },
  {
    q: "What's your payment structure?",
    a: "Be cautious of anyone asking for full payment upfront in cash. A reasonable deposit followed by payment on completion is standard practice.",
  },
];

export default function QuestionsToAskARooferPage() {
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
              10 Questions to Ask a Roofer Before You Sign
            </h1>
            <p className="mt-6 font-body leading-relaxed text-ink/70">
              Most roofing disputes trace back to something that was never confirmed upfront —
              not necessarily bad workmanship. These ten questions cover the things worth
              nailing down before you commit to anyone.
            </p>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/blog-questions-to-ask-a-roofer.webp"
                alt="Homeowner reviewing a written roofing quote before signing"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>

            <div className="mt-14 space-y-10">
              {QUESTIONS.map((item, i) => (
                <article key={item.q}>
                  <h2 className="font-display text-xl font-bold tracking-tight text-clay">
                    {i + 1}. {item.q}
                  </h2>
                  <p className="mt-3 font-body leading-relaxed text-ink/70">{item.a}</p>
                </article>
              ))}

              <article>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Or skip the vetting entirely
                </h2>
                <p className="mt-4 font-body leading-relaxed text-ink/70">
                  Every roofer we connect you with has already answered these questions
                  satisfactorily — checked for licensing, insurance, and track record before
                  they're ever matched with a homeowner. That's the whole reason a matching
                  service like this exists.{" "}
                  <Link href="/how-we-vet-our-roofers" className="font-semibold text-clay hover:text-clay-deep">
                    See exactly how we vet our roofers
                  </Link>.
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
