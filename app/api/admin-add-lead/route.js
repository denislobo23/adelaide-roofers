// app/api/admin-add-lead/route.js
//
// Manual lead-entry endpoint for phone calls that bypass the contact form
// and calculator — e.g. someone calling the displayed number directly
// instead of submitting online. Closes the gap that lost the 0427102226
// voicemail lead (no Supabase row = invisible to follow-up).
//
// Protected by a shared secret (ADMIN_SECRET) rather than full user auth —
// good enough for a single-operator internal tool, not meant to scale to
// multiple staff logins.
//
// SETUP REQUIRED: add ADMIN_SECRET to .env.local and Vercel env vars —
// pick any password-like string, this is the "password" the /admin/add-lead
// page will ask for.

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, name, phone, suburb, message } = body;

    if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
      return Response.json({ success: false, reason: "unauthorized" }, { status: 401 });
    }

    if (!name?.trim() || !phone?.trim()) {
      return Response.json({ success: false, reason: "missing_fields" }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return Response.json({ success: false, reason: "no_db" }, { status: 500 });
    }

    const { error } = await supabaseAdmin.from("leads").insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        suburb: suburb?.trim() || "",
        message: message?.trim() || "",
        lead_source: "phone_call",
        source_page: "manual_admin_entry",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Manual lead insert failed:", error);
      return Response.json({ success: false, reason: "db_error" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("admin-add-lead failed:", err);
    return Response.json({ success: false, reason: "server_error" }, { status: 500 });
  }
}
