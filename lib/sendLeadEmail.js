// lib/sendLeadEmail.js
//
// Minimal Resend client — sends a plain-text/HTML notification email to
// NOTIFY_EMAIL the moment a lead is saved, alongside the existing
// ClickSend SMS notification (see lib/sendSms.js). This does NOT replace
// the SMS — both fire independently, and a failure in either one never
// blocks the other or the lead save itself.
//
// REQUIRED ENV VARS (see .env.local):
//   RESEND_API_KEY   — resend.com → API Keys
//   NOTIFY_EMAIL      — where lead notification emails are sent
//                       (denis.lobo@adelaideroofers.com.au)
//
// SETUP REQUIRED before this works:
//   1. Sign up at resend.com
//   2. Add + verify adelaideroofers.com.au as a sending domain (Resend
//      gives you DNS TXT/DKIM records — add in Vercel → Domains → DNS
//      Records, same pattern as the MailerLite SPF/DKIM setup)
//   3. Generate an API key, add as RESEND_API_KEY in .env.local AND
//      Vercel's environment variables
//
// Returns { success: true } or { success: false, reason }. Never throws
// — callers should still wrap calls in try/catch defensively, but this
// function itself resolves rather than rejects on failure, matching the
// fire-and-log pattern already used for SMS.

const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendLeadEmail({ subject, html, text }) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
    console.warn(
      "Resend not fully configured — skipping lead email notification."
    );
    return { success: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Adelaide Roofers Leads <leads@adelaideroofers.com.au>`,
        to: [process.env.NOTIFY_EMAIL],
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend email failed (${res.status}): ${body}`);
      return { success: false, reason: "send_failed" };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend email send threw:", err);
    return { success: false, reason: "exception" };
  }
}
