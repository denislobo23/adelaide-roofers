// lib/supabaseAdmin.js
//
// SERVER-SIDE ONLY. Uses the Supabase service role key, which can bypass
// Row Level Security — this must NEVER be imported into a "use client"
// component or exposed to the browser. Only used inside API routes.
//
// SETUP REQUIRED:
// 1. In Supabase dashboard: Settings → API → copy the "service_role" key
//    (NOT the anon/public key — that's a different key, already used in
//    lib/supabaseClient.js for the browser-side client)
// 2. Add to .env.local + Vercel:
//    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
//    (uses the same NEXT_PUBLIC_SUPABASE_URL already set for the browser client)

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;
