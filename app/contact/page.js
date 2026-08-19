// app/contact/page.js
import Link from "next/link";
import { site } from "@/data/config";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Adelaide Roofers",
  description:
    "Get in touch with Adelaide Roofers — call, or send your details and we'll match you with a vetted local roofer.",
  alternates: { canonical: `${site.url}/contact` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO — same dark-overlay treatment as service/suburb pages ── */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-home.webp)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div
          className="relative mx-auto max-w-wrap px-5 py-20 md:py-28"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
        >
          <nav className="mb-4 font-body text-sm text-paper/70">
            <Link href="/" className="transition hover:text-clay">
              Home
            </Link>
            <span className="px-1.5">/</span>
            <span className="text-paper/85">Contact</span>
          </nav>
          <span className="eyebrow text-clay">Get in touch</span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.07] tracking-tight md:text-5xl">
            Contact Adelaide Roofers
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/90">
            Call us directly, or send your details below and we&apos;ll match you with a
            vetted local roofer — free, no obligation.
          </p>
          <div className="mt-7">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-xl bg-clay px-6 py-3.5 font-display font-bold tracking-tight text-ink transition hover:brightness-95"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────── */}
      <section className="bg-ink">
        <div className="mx-auto max-w-wrap px-5 py-20">
          <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
                Ready to be matched with a vetted roofer in your area?
              </h2>
              <p className="mt-4 font-body text-paper/70">
                Tell us your suburb and what&apos;s going on with your roof, and we&apos;ll
                take it from there.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Free — we're paid by the roofer, not by you",
                  "Every roofer checked for licensing, insurance, and track record",
                  "Matched to someone who already works your suburb",
                ].map((item) => (
                  <li key={item} className="flex gap-3 font-body text-paper/85">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-5 w-5 shrink-0 text-clay"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-body text-sm text-paper/50">
                Prefer to talk it through first?{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-clay underline-offset-2 hover:underline"
                >
                  Call {site.phoneDisplay}
                </a>
              </p>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
