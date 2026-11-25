// lib/siteConfig.js
//
// The ONE place the public phone number lives. Everything reads it from
// here: header, footer, CTAs and schema (via data/config.js), the estimate
// thank-you screen, the PDF, the customer SMS and the lead emails.
// To switch to the Avanser tracking number, change these two lines.

export const PHONE_DISPLAY = "0433 915 802";
export const PHONE_HREF = "tel:+61433915802"; // E.164 format for click-to-call
