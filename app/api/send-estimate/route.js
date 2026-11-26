// app/api/send-estimate/route.js
//
// POST { customer: { name, mobile }, answers: {...}, estimate: { low, high }, timeframe }
//
// Pipeline: generate PDF → upload to Supabase Storage → send SMS with the
// link → save the lead → notify Denis (SMS + email). Returns
// { success: true, refNumber } or an honest failure reason — it does NOT
// return the estimate figures. The on-screen page never reveals numbers;
// the SMS'd PDF is the only place they appear.
//
// ⚠️ REQUIRES a new column on the Supabase `leads` table: ref_number
// (text, nullable). Without it, the optional "email me a copy" capture on
// the success screen has no way to find this row again to attach the
// email to. Add it in the Supabase table editor before deploying this.
//
// SETUP REQUIRED (see lib/supabaseAdmin.js, lib/sendSms.js, and
// lib/sendLeadEmail.js for details):
// - SUPABASE_SERVICE_ROLE_KEY
// - CLICKSEND_USERNAME, CLICKSEND_API_KEY
// - NOTIFY_PHONE_NUMBER (Denis's number, for the SMS lead notification)
// - RESEND_API_KEY, NOTIFY_EMAIL (Denis's email, for the email lead
//   notification — see lib/sendLeadEmail.js for Resend domain setup)
// - A Supabase Storage bucket named "estimates", set to public read access
//
// RESILIENCE: every step is attempted even if an earlier one fails (e.g.
// Supabase down). Denis's email always carries the PDF as an attachment and
// says what failed, so a lead is never silently lost. The customer is told
// the truth: estimate texted, delayed, or (only if nothing worked) an error.
//
// SMOKE TEST MODE: a request with header `x-smoke-test: <SMOKE_TEST_TOKEN>`
// runs the whole pipeline but sends NO SMS and NO email; the PDF upload and
// lead row are written and then deleted. See scripts/smoke-estimate.mjs.
// A wrong or unconfigured token is rejected (403) so a test can never fall
// through to a real send.
//
// UPDATE: fires a second SMS via sendSms() AND an email via
// sendLeadEmail() once the lead is saved, so calculator leads notify
// Denis the same way contact form leads already do (see
// app/api/contact/route.js). Both are separate from the customer-facing
// SMS above and never block or fail the request — a failed notification
// just means follow-up may need to be manual.

import { renderToBuffer } from "@react-pdf/renderer";
import EstimatePDF from "@/components/pdf/EstimatePDF";
import { buildEstimateBreakdown } from "@/lib/estimateBreakdown";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendSms } from "@/lib/sendSms";
import { estimateCost, normaliseAnswers, RANGE_LABEL } from "@/lib/pricing";
import { sendLeadEmail } from "@/lib/sendLeadEmail";
import { site } from "@/data/config";
import { PHONE_DISPLAY } from "@/lib/siteConfig";
import { tidyAddress } from "@/lib/formatAddress";

function generateRefNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AR-${y}${m}${d}-${rand}`;
}

async function notifyLeadSms({ customer, answers, estimate }) {
  if (!process.env.NOTIFY_PHONE_NUMBER) {
    console.warn(
      "NOTIFY_PHONE_NUMBER not configured — skipping calculator lead SMS notification."
    );
    return;
  }

  const location = answers.suburb || answers.address || "";
  await sendSms({
    to: process.env.NOTIFY_PHONE_NUMBER,
    message: `New lead (calculator): ${customer.name}, ${customer.mobile}${
      location ? `, ${location}` : ""
    }. Est: $${estimate.low}-$${estimate.high} (${RANGE_LABEL}).`,
  });
}

const escapeHtml = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildCalculatorEmail({ customer, answers, estimate, timeframe, breakdown, refNumber, problems = [] }) {
  const subject = `${problems.length ? "ACTION NEEDED: " : ""}New lead (calculator): ${customer.name} — $${estimate.low}-$${estimate.high} (${RANGE_LABEL})`;

  const rows = [
    ["Name", customer.name],
    ["Phone", customer.mobile],
    ["Address", answers.address || "(not provided)"],
    ["Suburb", answers.suburb || "(not provided)"],
    ["Job type", breakdown.jobTypeLabel],
    ["Estimate", `$${estimate.low} - $${estimate.high} (${RANGE_LABEL})`],
    ["Timeframe", timeframe || "(not provided)"],
    ["Ref number", refNumber],
  ];
  if (answers.asbestosRedirect) {
    rows.push(["Note", `Asked for ${answers.requestedJobType} on an asbestos roof; priced as replacement.`]);
  }
  if (answers.slateRedirect) {
    rows.push(["Note", "Asked for painting on a slate roof; priced as a slate restoration."]);
  }
  if (problems.length) {
    rows.unshift(["ACTION NEEDED", problems.join("\n")]);
  }

  const text =
    rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n\nCustomer-facing number on the site, PDF and SMS: ${PHONE_DISPLAY}`;

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px;">New lead — calculator</h2>
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
      <p style="margin-top: 16px; font-size: 12px; color: #777;">Customer-facing number on the site, PDF and SMS: ${escapeHtml(PHONE_DISPLAY)}</p>
    </div>
  `;

  return { subject, html, text };
}

function smokeTestMode(request) {
  const header = request.headers.get("x-smoke-test");
  if (!header) return { active: false };
  const token = process.env.SMOKE_TEST_TOKEN;
  return { active: true, valid: Boolean(token) && header === token };
}

export async function POST(request) {
  try {
    const smoke = smokeTestMode(request);
    if (smoke.active && !smoke.valid) {
      return Response.json({ success: false, reason: "bad_smoke_token" }, { status: 403 });
    }

    const body = await request.json();
    const { customer, timeframe } = body;

    if (!customer?.name || !customer?.mobile || !body.answers || !timeframe) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    // Recompute from the answers with the shared pricing (lib/pricing.js)
    // rather than trusting a figure sent from the browser.
    // Asbestos restoration/painting requests become a replacement estimate.
    const answers = normaliseAnswers({ ...body.answers, address: tidyAddress(body.answers.address) });
    let estimate;
    try {
      estimate = estimateCost(answers);
    } catch {
      estimate = null;
    }
    if (!estimate || !Number.isFinite(estimate.low) || !Number.isFinite(estimate.high)) {
      return Response.json({ success: false, reason: "invalid_answers" }, { status: 400 });
    }

    const refNumber = generateRefNumber();
    const breakdown = buildEstimateBreakdown({ answers, estimate });
    const checks = {};
    const problems = [];

    // 1. Generate the PDF
    const pdfBuffer = await renderToBuffer(
      <EstimatePDF
        customer={customer}
        answers={answers}
        estimate={estimate}
        breakdown={breakdown}
        refNumber={refNumber}
      />
    );
    checks.pdfBytes = pdfBuffer.length;

    // 2. Upload to Supabase Storage. A failure here must not stop the rest.
    const filePath = smoke.active ? `smoke-tests/${refNumber}.pdf` : `${refNumber}.pdf`;
    let publicUrl = null;
    if (supabaseAdmin) {
      try {
        const { error: uploadError } = await supabaseAdmin.storage
          .from("estimates")
          .upload(filePath, pdfBuffer, { contentType: "application/pdf", upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabaseAdmin.storage.from("estimates").getPublicUrl(filePath);
        publicUrl = urlData?.publicUrl || null;
        checks.storage = "ok";
      } catch (uploadErr) {
        console.error("Storage upload failed:", uploadErr);
        checks.storage = `failed: ${uploadErr?.message || uploadErr}`;
        problems.push(
          "PDF upload to Supabase failed, so the customer was NOT texted their estimate. The PDF is attached: please send it to them."
        );
      }
    } else {
      console.warn("Supabase admin client not configured — skipping storage upload.");
      checks.storage = "not configured";
      problems.push(
        "Supabase is not configured, so the customer was NOT texted their estimate. The PDF is attached: please send it to them."
      );
    }

    // 3. Text the customer the link (only if we actually have a URL).
    // Short branded link (app/e/[ref]/route.js) that redirects to the PDF.
    const shortUrl = `${site.url}/e/${refNumber}`;
    let smsResult = { success: false, reason: "no_url" };
    if (publicUrl && !smoke.active) {
      const firstName = customer.name.split(" ")[0];
      try {
        smsResult = await sendSms({
          to: customer.mobile,
          message: `Hi ${firstName}, here's your Adelaide Roofers estimate for ${answers.address}: ${shortUrl} Questions? Call ${PHONE_DISPLAY}.`,
        });
      } catch (smsErr) {
        console.error("Customer SMS threw:", smsErr);
        smsResult = { success: false, reason: "exception" };
      }
      if (!smsResult.success) {
        problems.push(`The text to the customer failed (${smsResult.reason}). Estimate link: ${publicUrl}`);
      }
    }
    checks.customerSms = smoke.active
      ? "skipped (smoke test)"
      : smsResult.success
      ? "ok"
      : smsResult.reason;

    // 4. Save the lead. A failure here must not stop the notifications.
    let leadSaved = false;
    if (supabaseAdmin) {
      try {
        const { error: insertError } = await supabaseAdmin.from("leads").insert([
          {
            name: customer.name,
            phone: customer.mobile,
            address: answers.address,
            suburb: answers.suburb || "",
            timeframe,
            job_type: breakdown.jobTypeLabel,
            lead_source: smoke.active ? "smoke_test" : "roof_calculator",
            pdf_url: publicUrl,
            message: `${JSON.stringify(answers)}. Estimate: $${estimate.low}-$${estimate.high} (${RANGE_LABEL}).`,
            source_page: "get-my-estimate",
            ref_number: refNumber,
            created_at: new Date().toISOString(),
          },
        ]);
        if (insertError) throw insertError;
        leadSaved = true;
        checks.leadSaved = "ok";
      } catch (insertErr) {
        console.error("Lead insert failed:", insertErr);
        checks.leadSaved = `failed: ${insertErr?.message || insertErr}`;
        problems.push("Saving the lead to Supabase failed. This email is the only record of it.");
      }
    } else {
      checks.leadSaved = "not configured";
      problems.push("Supabase is not configured, so the lead was not saved. This email is the only record of it.");
    }

    // Smoke test: clean up what it wrote, report, and stop before any notification.
    if (smoke.active) {
      let savedLead = null;
      if (supabaseAdmin) {
        if (leadSaved && smoke.valid) {
          // Read the row back so the smoke test can show what was stored
          // (only ever with a valid SMOKE_TEST_TOKEN; see the 403 above).
          const { data } = await supabaseAdmin
            .from("leads")
            .select("address, suburb")
            .eq("ref_number", refNumber)
            .maybeSingle()
            .then((r) => r, () => ({ data: null }));
          savedLead = data;
        }
        if (checks.storage === "ok") {
          await supabaseAdmin.storage.from("estimates").remove([filePath]).catch(() => {});
        }
        if (leadSaved) {
          await supabaseAdmin.from("leads").delete().eq("ref_number", refNumber).then(
            () => {},
            () => {}
          );
        }
      }
      const ok = checks.pdfBytes > 1000 && checks.storage === "ok" && checks.leadSaved === "ok";
      return Response.json(
        { success: ok, smokeTest: true, refNumber, estimate, checks, problems, savedLead },
        { status: ok ? 200 : 500 }
      );
    }

    // 5. Notify Denis — SMS and email, each fire-and-log. The email carries
    // the PDF and says what failed, so the lead can be followed up by hand.
    let notified = false;
    try {
      await notifyLeadSms({ customer, answers, estimate });
    } catch (notifyErr) {
      console.error("Calculator lead SMS notification failed:", notifyErr);
    }

    try {
      const { subject, html, text } = buildCalculatorEmail({
        customer,
        answers,
        estimate,
        timeframe,
        breakdown,
        refNumber,
        problems,
      });
      const emailResult = await sendLeadEmail({
        subject,
        html,
        text,
        attachments: [{ filename: `${refNumber}.pdf`, content: pdfBuffer.toString("base64") }],
      });
      notified = Boolean(emailResult?.success);
    } catch (emailErr) {
      console.error("Calculator lead email notification failed:", emailErr);
    }

    if (smsResult.success) {
      return Response.json({ success: true, refNumber });
    }
    if (leadSaved || notified) {
      // We have the lead, but the customer didn't get their text.
      const reason = publicUrl ? "sms_failed" : "delivery_delayed";
      return Response.json({ success: false, reason, leadSaved: true, refNumber }, { status: 200 });
    }
    console.error(`send-estimate: lead ${refNumber} could not be saved or notified`, checks);
    return Response.json({ success: false, reason: "lead_not_saved" }, { status: 500 });
  } catch (err) {
    console.error("send-estimate pipeline failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
