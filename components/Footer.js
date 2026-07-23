// components/Footer.js
import Link from "next/link";
import { site, isLiveBusiness } from "@/data/config";
import { regions } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-mortar bg-ink text-paper">
      <div className="mx-auto max-w-wrap px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <span className="font-display text-xl font-bold tracking-tight">{site.brand}</span>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-mortar">
              {site.shortDescription} We&apos;re a free service — you deal directly with
              the roofer on any quote or work.
            </p>
            <a
              href={site.phoneHref}
              className="mt-5 inline-block font-display text-lg font-semibold tracking-tight text-clay"
            >
              {site.phoneDisplay}
            </a>
          </div>

          <div>
            <span className="eyebrow text-mortar">Areas</span>
            <ul className="mt-3 space-y-2 font-body text-sm">
              {Object.values(regions).map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}`} className="text-paper/80 transition hover:text-clay">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow text-mortar">About</span>
            <ul className="mt-3 space-y-2 font-body text-sm">
              <li><Link href="/about" className="text-paper/80 transition hover:text-clay">About us</Link></li>
              <li><Link href="/services" className="text-paper/80 transition hover:text-clay">Services</Link></li>
              <li><Link href="/#how-it-works" className="text-paper/80 transition hover:text-clay">How it works</Link></li>
              <li><Link href="/#regions" className="text-paper/80 transition hover:text-clay">Find your suburb</Link></li>
              <li><Link href="/privacy" className="text-paper/80 transition hover:text-clay">Privacy Policy</Link></li>
   <li><Link href="/terms" className="text-paper/80 transition hover:text-clay">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 font-body text-xs leading-relaxed text-paper/50">
          {/* This disclosure keeps the referral model honest. Keep it. */}
          <p>
            {site.brand} is a referral service that connects homeowners with independent local
            roofing contractors. We do not carry out roofing work ourselves.{" "}
            {isLiveBusiness
              ? "Work is performed by licensed third-party contractors."
              : "Roofing work is performed by independent licensed contractors, not by Adelaide Roofers."}
          </p>
          <p className="mt-2">
            AdelaideRoofers.com.au is owned and operated by Roofing Digital, a registered business name of NETLOCAL CONSULTING PTY LTD (ABN 69 607 380 638), an Australian
            business specialising in roofing lead generation and customer referral services.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
