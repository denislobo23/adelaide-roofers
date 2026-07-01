// data/faqs.js
// ─────────────────────────────────────────────────────────────
// GENERAL FAQs — questions whose answer is the SAME for every
// suburb (how the service works, cost to use, etc.).
//
// These live ONCE, here, shown on the homepage. Do NOT copy these
// onto suburb pages reworded — that's the duplicate-content pattern
// we're avoiding. Suburb pages get only questions whose ANSWER
// genuinely changes by suburb (cost, local roof stock, council rules).
// ─────────────────────────────────────────────────────────────

export const generalFaqs = [
  {
    q: "Is it free to use Adelaide Roofers?",
    a: "Yes. Connecting you with a local roofer is completely free and there's no obligation. You only ever deal directly with the roofer on any quote or work — we just make the introduction.",
  },
  {
    q: "Do you do the roofing work yourselves?",
    a: "No. Adelaide Roofers is a referral service, not a roofing company. We connect you with an independent, licensed local roofing contractor who carries out the actual work. We're not a party to the job or the quote.",
  },
  {
    q: "How does it work?",
    a: "You tell us your suburb and what's happening with your roof — by phone or through the form. We connect you with a roofing contractor who covers your part of Adelaide, and they get in touch to arrange a look and a quote.",
  },
  {
    q: "How quickly will a roofer get in touch?",
    a: "That depends on the roofer's schedule and how urgent the job is — an active leak is usually treated as a priority. If it's urgent, calling is the fastest way to get moving.",
  },
  {
    q: "Does it cost anything to get a quote?",
    a: "Getting a quote from the roofer is between you and them, but roofers in our network provide obligation-free quotes after inspecting the roof. You're never locked into proceeding.",
  },
  {
    q: "Which areas do you cover?",
    a: "Suburbs right across metropolitan Adelaide — the northern, southern, eastern and western suburbs. Pick your region on the homepage to find your suburb, or just call and tell us where you are.",
  },
];
