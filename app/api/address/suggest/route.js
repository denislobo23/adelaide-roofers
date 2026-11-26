// GET /api/address/suggest?q=4 tintern — address suggestions from
// OpenStreetMap Nominatim (see lib/nominatim.js for the usage-policy rules
// this follows). 503 means "type the address by hand".

import { suggestAddresses, LookupUnavailable, MAX_QUERY_LENGTH } from "@/lib/nominatim";
import { guardAddressRequest, unavailable, ok } from "@/lib/addressRoute";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const q = (new URL(request.url).searchParams.get("q") || "").trim().slice(0, MAX_QUERY_LENGTH);
  if (q.length < 4) return ok({ suggestions: [] });
  const blocked = guardAddressRequest(request);
  if (blocked) return unavailable(blocked);
  try {
    return ok({ suggestions: await suggestAddresses(q) });
  } catch (err) {
    const reason = err instanceof LookupUnavailable ? err.reason : "error";
    console.error("Address suggest failed:", reason, err instanceof LookupUnavailable ? "" : err);
    return unavailable(reason);
  }
}
