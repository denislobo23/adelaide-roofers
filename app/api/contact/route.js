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

async function sendLeadSms({ name, phone, suburb }) {
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
          body: `New lead (contact form): ${name}, ${phone}${
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

function buildContactEmail({ name, phone, email, suburb, message, consent }) {
  const subject = `New lead (contact form): ${name}${suburb ? ` — ${suburb}` : ""}`;

  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "(not provided)"],
    ["Suburb", suburb || "(not provided)"],
    ["Consent to be contacted", consent ? "Yes" : "No"],
    ["Message", message || "(none)"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">New lead — contact form</h2>
      <table cellpadding="6" cellspacing="0">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 600; vertical-align: top;">${label}</td>
            <td>${String(value).replace(/\n/g, "<br />")}</td>
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

    if (!name?.trim() || !phone?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — contact form lead not saved.");
      return Response.json({ success: false, reason: "storage_unavailable" }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("leads").insert([
      {
        name,
        phone,
        email: email || "",
        suburb: suburb || "",
        timeframe: "",
        job_type: "General enquiry",
        lead_source: "contact_form",
        message: consent
          ? `${message || ""} [Consent given to be contacted by matched roofer]`
          : message || "",
        source_page: "homepage",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Contact form insert failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    // Fire-and-log SMS notification — never block or fail the lead save
    // over an SMS delivery problem.
    try {
      await sendLeadSms({ name, phone, suburb });
    } catch (smsErr) {
      console.error("Lead SMS notification failed:", smsErr);
    }

    // Fire-and-log email notification — same defensive pattern, runs
    // independently of the SMS above.
    try {
      const { subject, html, text } = buildContactEmail({
        name,
        phone,
        email,
        suburb,
        message,
        consent,
      });
      await sendLeadEmail({ subject, html, text });
    } catch (emailErr) {
      console.error("Lead email notification failed:", emailErr);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
