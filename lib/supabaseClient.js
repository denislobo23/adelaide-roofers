// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// These read from .env.local — see .env.local.example.
// The anon key is safe to expose in the browser; row-level security
// on the `leads` table is what actually protects your data.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Guard so the site still builds/renders even before you've added keys.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
