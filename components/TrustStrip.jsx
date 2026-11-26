// components/TrustStrip.jsx
//
// The three trust points shown along the bottom of both calculators
// (RoofCalculator and HeroCalculatorMini). Each claim is backed by
// /how-we-vet-our-roofers (licence + written workmanship warranty) and the
// privacy wording on the estimate and contact forms.

const ITEMS = [
  "Licensed SA roofers only",
  "Workmanship warranty in writing",
  "No spam. We never share your details",
];

export default function TrustStrip({ compact = false }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center border-t-2 border-mortar bg-paper ${
        compact ? "gap-x-4 gap-y-1.5 px-4 py-3" : "gap-x-6 gap-y-2 px-5 py-3.5"
      }`}
    >
      {ITEMS.map((t) => (
        <li
          key={t}
          className={`flex items-center gap-2 font-semibold text-ink/75 ${compact ? "text-xs" : "text-xs sm:text-sm"}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC5B3A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}
