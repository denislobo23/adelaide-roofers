// components/CallButton.js
import { site, phoneForRegion } from "@/data/config";

// Pass `region` (a region slug) on region/suburb pages and the button
// shows that region's roofer number once it's signed — otherwise it
// falls back to the general enquiry number. No region = general number.
export default function CallButton({ className = "", label, region }) {
  const phone = region
    ? phoneForRegion(region)
    : { display: site.phoneDisplay, href: site.phoneHref };

  return (
    <a
      href={phone.href}
      className={`inline-flex items-center gap-2 rounded-lg bg-clay px-6 py-3.5 font-display font-semibold tracking-tight text-paper shadow-sm transition hover:bg-clay-deep active:scale-[0.98] ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 5.5C3 4.1 4.1 3 5.5 3h1.4c.6 0 1.1.4 1.3 1l.9 3.2c.1.5 0 1-.4 1.4l-1.4 1.2a13 13 0 0 0 5.5 5.5l1.2-1.4c.4-.4.9-.5 1.4-.4l3.2.9c.6.2 1 .7 1 1.3v1.4c0 1.4-1.1 2.5-2.5 2.5C10.8 21 3 13.2 3 5.5Z"
          fill="currentColor"
        />
      </svg>
      {label || `Call ${phone.display}`}
    </a>
  );
}
