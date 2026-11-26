// GET /api/roof-estimate?lat=-34.93&lon=138.60 — a roof-size suggestion
// from the Google Solar API for the address the customer picked.
//
// Always answers 200. {} means "no suggestion" (switched off, limit hit,
// no data, error): the calculator then shows the size step as normal.
// Order matters: the cheap checks come before the daily count is used.
// Nothing is cached or stored; see docs/solar-autofill-plan.md.

import { solarEnabled, findClosestBuilding } from "@/lib/solar";
import { roofFromInsights } from "@/lib/roofFromSolar";
import { takeSolarCall, dailyLimit } from "@/lib/solarBudget";
import { makeGuard, ok } from "@/lib/addressRoute";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// At most 3 Solar lookups per visitor per 10 minutes.
const guard = makeGuard({ limit: 3, windowMs: 10 * 60 * 1000 });

// South Australia only (the address lookup is SA-only too).
const inSA = (lat, lon) => lat > -38.2 && lat < -25.9 && lon > 128.9 && lon < 141.1;

export async function GET(request) {
  if (!solarEnabled()) return ok({});
  const params = new URL(request.url).searchParams;
  const lat = Number(params.get("lat"));
  const lon = Number(params.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !inSA(lat, lon)) return ok({});
  if (guard(request)) return ok({});
  if (!(await takeSolarCall(supabaseAdmin, dailyLimit()))) return ok({});

  const insights = await findClosestBuilding(lat, lon);
  const roof = roofFromInsights(insights, { lat, lon });
  return ok(roof ? { areaM2: roof.areaM2, shape: roof.shape } : {});
}
