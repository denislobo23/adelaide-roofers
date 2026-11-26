// lib/solarBudget.js — SERVER ONLY.
//
// The daily cap on Google Solar API calls (SOLAR_DAILY_LIMIT, default 50).
// Counted in Supabase (supabase/solar_usage.sql, take_solar_call) so it holds
// across all of Vercel's server copies. Fails closed: if the count can't be
// checked, no Solar call is made.

export const DEFAULT_DAILY_LIMIT = 50;

export function dailyLimit(env = process.env) {
  const n = parseInt(env.SOLAR_DAILY_LIMIT ?? "", 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_DAILY_LIMIT;
}

// `client` is a Supabase client (or a stub with .rpc() in tests).
export async function takeSolarCall(client, limit) {
  if (!client || !(limit > 0)) return false;
  try {
    const { data, error } = await client.rpc("take_solar_call", { p_limit: limit });
    return !error && data === true;
  } catch {
    return false;
  }
}
