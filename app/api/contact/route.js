// app/api/contact/route.js
//
// POST { name, phone, email, suburb, message, consent }
//
// Fallback for the homepage contact form — saves straight to the same
// Supabase `leads` table the calculator pipeline uses, tagged with
// lead_source: "contact_form" so you can tell the two apart in Supabase.
// No PDF — just a lead you follow up manually. Email is optional
// — phone stays the one required contact field, since fulfillment here is
// a phone call, not an email delivery — but capturing it when given
// widens who lands in the future nurture list.
//
// UPDATE: fires BOTH an SMS notification via ClickSend to
// NOTIFY_PHONE_NUMBER AND an email notification via Resend to
// NOTIFY_EMAIL the moment a lead is saved, so a new lead doesn't just sit
// silently in Supabase. Neither notification failing blocks the other or
// fails the request — the lead is already safely saved either way.

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendLeadEmail } from "@/lib/sendLeadEmail";

async function sendLeadSms({ name, phone, suburb, formLabel }) {
  if (
    !process.env.CLICKSEND_USERNAME ||
    !process.env.CLICKSEND_API_KEY ||
    !process.env.NOTIFY_PHONE_NUMBER
  ) {
    console.warn(
      "ClickSend not fully configured — skipping lead SMS notification."
    );
    return;
  }

  const auth = Buffer.from(
    `${process.env.CLICKSEND_USERNAME}:${process.env.CLICKSEND_API_KEY}`
  ).toString("base64");

  const res = await fetch("https://rest.clicksend.com/v3/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      messages: [
        {
          source: "adelaideroofers",
          body: `New lead (${formLabel}): ${name}, ${phone}${
            suburb ? `, ${suburb}` : ""
          }`,
          to: process.env.NOTIFY_PHONE_NUMBER,
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`ClickSend SMS failed (${res.status}): ${body}`);
  }
}

const escapeHtml = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildContactEmail({ name, phone, email, suburb, message, consent, problem = "", formLabel = "contact form" }) {
  const subject = `${problem ? "ACTION NEEDED: " : ""}New lead (${formLabel}): ${name}${suburb ? ` — ${suburb}` : ""}`;

  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "(not provided)"],
    ["Suburb", suburb || "(not provided)"],
    ["Consent to be contacted", consent ? "Yes" : "No"],
    ["Message", message || "(none)"],
  ];
  if (problem) rows.unshift(["ACTION NEEDED", problem]);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">New lead — ${escapeHtml(formLabel)}</h2>
      <table cellpadding="6" cellspacing="0">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 600; vertical-align: top;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value).replace(/\n/g, "<br />")}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  return { subject, html, text };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, suburb, message, consent } = body;

    // The region pages' form (components/LeadForm.js) posts here too, with
    // form: "region" and the page's area name, so it's saved and notified
    // the same way but can be told apart.
    const fromRegion = body.form === "region";
    const regionPage = fromRegion ? String(body.page || "general").replace(/[^\w\s-]/g, "").trim().slice(0, 60) || "general" : "";
    const formLabel = fromRegion ? `region page: ${regionPage}` : "contact form";

    if (!name?.trim() || !phone?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    // Save the lead, but don't stop if Supabase is down: the SMS and email
    // below still go out, so the lead isn't lost.
    let leadSaved = false;
    let saveProblem = "";
    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — contact form lead not saved.");
      saveProblem = "Supabase is not configured, so this lead was NOT saved. This email is the only record of it.";
    } else {
      try {
        const { error } = await supabaseAdmin.from("leads").insert([
          {
            name,
            phone,
            email: email || "",
            suburb: suburb || "",
            timeframe: "",
            job_type: "General enquiry",
            lead_source: fromRegion ? "website_form" : "contact_form",
            message: consent
              ? `${message || ""} [Consent given to be contacted by matched roofer]`
              : message || "",
            source_page: fromRegion ? regionPage : "homepage",
            created_at: new Date().toISOString(),
          },
        ]);
        if (error) throw error;
        leadSaved = true;
      } catch (dbErr) {
        console.error("Contact form insert failed:", dbErr);
        saveProblem = "Saving this lead to Supabase failed. This email is the only record of it.";
      }
    }

    // Fire-and-log SMS notification — never block or fail the lead save
    // over an SMS delivery problem.
    let smsSent = false;
    try {
      await sendLeadSms({ name, phone, suburb, formLabel });
      smsSent = Boolean(
        process.env.CLICKSEND_USERNAME && process.env.CLICKSEND_API_KEY && process.env.NOTIFY_PHONE_NUMBER
      );
    } catch (smsErr) {
      console.error("Lead SMS notification failed:", smsErr);
    }

    // Fire-and-log email notification — same defensive pattern, runs
    // independently of the SMS above.
    let emailSent = false;
    try {
      const { subject, html, text } = buildContactEmail({
        name,
        phone,
        email,
        suburb,
        message,
        consent,
        problem: saveProblem,
        formLabel,
      });
      const emailResult = await sendLeadEmail({ subject, html, text });
      emailSent = Boolean(emailResult?.success);
    } catch (emailErr) {
      console.error("Lead email notification failed:", emailErr);
    }

    // Only fail if the lead was neither saved nor sent anywhere.
    if (!leadSaved && !smsSent && !emailSent) {
      console.error("Contact form lead could not be saved or notified.");
      return Response.json({ success: false, reason: "lead_not_saved" }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
