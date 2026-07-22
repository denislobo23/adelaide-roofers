// app/api/save-email/route.js
//
// POST { refNumber, email }
//
// Backs the optional "email me a copy too" capture on the get-my-estimate
// success screen (see app/get-my-estimate/page.js — handleEmailCapture).
//
// Two things happen here:
//   1. Find the lead row already created by /api/send-estimate (matched
//      by ref_number) and attach the email to it in Supabase — a durable
//      record of who this lead is, regardless of what happens with email.
//   2. Push that email into MailerLite's "estimate-lead" group, with the
//      lead's existing pdf_url attached as a custom field. A MailerLite
//      Automation (triggered by "Group: estimate-lead joined") sends the
//      actual email — a "Download your estimate" button using the
//      {$pdf_url} merge tag — and can continue into a longer nurture
//      sequence from there. This route only gets them into the group;
//      MailerLite does the rest, same pattern as the ebook capture.
//
// The MailerLite step is deliberately non-blocking on failure: if it
// fails, the customer's email is still saved in Supabase and the lead
// isn't lost — it just means the automated email didn't fire, which is
// worth knowing about (logged below) but shouldn't break the response.
//
// ⚠️ REQUIRES an `email` column on the Supabase `leads` table (text,
// nullable) — same as the `ref_number` column send-estimate/route.js
// depends on.
//
// ⚠️ REQUIRES in MailerLite: a group named "estimate-lead" (its numeric ID
// goes in MAILERLITE_ESTIMATE_GROUP_ID) and a custom field named "pdf_url"
// (Subscribers → Fields) for the merge tag to work in the Automation.
//
// SETUP REQUIRED: SUPABASE_SERVICE_ROLE_KEY, MAILERLITE_API_KEY,
// MAILERLITE_ESTIMATE_GROUP_ID

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { addSubscriberToGroup } from "@/lib/mailerlite";

export async function POST(request) {
  try {
    const body = await request.json();
    const { refNumber, email } = body;

    if (!refNumber || !email?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      console.warn("Supabase admin client not configured — cannot save email.");
      return Response.json({ success: false, reason: "not_configured" }, { status: 500 });
    }

    const trimmedEmail = email.trim();

    // 1. Update the lead's email in Supabase, and get back the row's
    // pdf_url + name in the same call so we don't need a second query.
    const { error, data } = await supabaseAdmin
      .from("leads")
      .update({ email: trimmedEmail })
      .eq("ref_number", refNumber)
      .select("name, pdf_url")
      .maybeSingle();

    if (error) {
      console.error("save-email Supabase update failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    if (!data) {
      console.warn(`save-email: no lead found for ref_number ${refNumber}`);
      return Response.json({ success: false, reason: "lead_not_found" }, { status: 404 });
    }

    // 2. Push into MailerLite's estimate-lead group so the Automation can
    // send the actual email. Non-blocking: a MailerLite hiccup shouldn't
    // undo the fact that we already saved the email against the lead.
    if (process.env.MAILERLITE_ESTIMATE_GROUP_ID) {
      try {
        await addSubscriberToGroup({
          email: trimmedEmail,
          groupId: process.env.MAILERLITE_ESTIMATE_GROUP_ID,
          fields: {
            ...(data.name ? { name: data.name.split(" ")[0] } : {}),
            ...(data.pdf_url ? { pdf_url: data.pdf_url } : {}),
          },
        });
      } catch (mlError) {
        console.error("save-email MailerLite push failed:", mlError);
        // Fall through — the email is saved either way, see comment above.
      }
    } else {
      console.warn(
        "MAILERLITE_ESTIMATE_GROUP_ID not set — skipping MailerLite push."
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("save-email route failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
