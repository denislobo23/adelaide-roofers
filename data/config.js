// data/config.js
// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH. Change a value here and it updates
// across every page, the header, footer, schema markup and CTAs.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: "Adelaide Roofers",
  // The domain, no trailing slash. Used for canonical URLs + sitemap.
  url: "https://adelaideroofers.com.au",

  // ── GENERAL ENQUIRY NUMBER (your mobile, for now) ──────────
  // This is the catch-all number: shown in the header/footer, on the
  // homepage, and on any region that doesn't yet have its own roofer.
  // You answer it and route the enquiry. Swap for a tracked number later.
  phoneDisplay: "0433 915 802",
  phoneHref: "tel:+61433915802", // E.164 format for click-to-call

  // ── WHAT THIS BUSINESS HONESTLY IS ─────────────────────────
  shortDescription:
    "Adelaide Roofers connects local homeowners with roofing contractors across metropolitan Adelaide.",

  // ── GOOGLE SEARCH CONSOLE ──────────────────────────────────
  // Paste ONLY the content="..." token from the GSC "HTML tag" method
  // here, then redeploy and click Verify. Leave "" until you have it.
  gscVerification: "",

  // ── SOCIAL / LINK PREVIEW IMAGE ────────────────────────────
  ogImage: "/images/hero-home.webp",
};

// ── PER-REGION ROOFER PARTNERS ───────────────────────────────
// We connect homeowners with a trusted local roofer, BY REGION —
// one roofer per region rather than one for all of Adelaide.
//
// A region only shows its OWN phone number once `signed: true` AND a
// number is filled in. Until then, that region quietly falls back to
// the general enquiry number above and the contact form. Fill these
// in as you sign each roofer — this is the only place you change them.
//
// Only publish licence / reviews once they are REAL. Empty by design
// so nothing false can ship by accident.
export const regionPartners = {
  "northern-suburbs": {
    signed: false,
    phoneDisplay: "",
    phoneHref: "",
    legalName: "",
    licence: "",
    reviews: { ratingValue: null, reviewCount: null },
  },
  "western-suburbs": {
    signed: false,
    phoneDisplay: "",
    phoneHref: "",
    legalName: "",
    licence: "",
    reviews: { ratingValue: null, reviewCount: null },
  },
  "eastern-suburbs": {
    signed: false,
    phoneDisplay: "",
    phoneHref: "",
    legalName: "",
    licence: "",
    reviews: { ratingValue: null, reviewCount: null },
  },
  "southern-suburbs": {
    signed: false,
    phoneDisplay: "",
    phoneHref: "",
    legalName: "",
    licence: "",
    reviews: { ratingValue: null, reviewCount: null },
  },
};

// Is a region "live" — i.e. has a signed roofer with a real number?
export function regionLive(regionSlug) {
  const p = regionPartners[regionSlug];
  return !!(p && p.signed && p.phoneDisplay && p.phoneHref);
}

// The phone to show for a given region: its own if live, else the
// general enquiry number. `regional` tells callers which one they got.
export function phoneForRegion(regionSlug) {
  const p = regionPartners[regionSlug];
  if (p && p.signed && p.phoneDisplay && p.phoneHref) {
    return { display: p.phoneDisplay, href: p.phoneHref, regional: true };
  }
  return { display: site.phoneDisplay, href: site.phoneHref, regional: false };
}

// True if ANY region has a signed roofer. Used for footer/schema wording.
export const isLiveBusiness = Object.values(regionPartners).some((p) => p.signed);
