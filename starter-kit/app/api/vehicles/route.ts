import type { NextRequest } from "next/server";

import { getVehicles } from "@/lib/data";
import type { ApiList, Vehicle } from "@/lib/types";

/**
 * GET /api/vehicles?location=lisbon&guests=2
 *
 * Optional query params (all combinable):
 *   location     location id (see /api/locations)
 *   guests       number – only vehicles with at least this many seats
 *   type         campervan | motorhome          (bonus: "Campervan" chip)
 *   bathroom     true – only with a full bathroom (bonus: "Full Bathroom" chip)
 *   petFriendly  true – only pet-friendly         (bonus: "Pet Friendly" chip)
 *
 * Without params, returns all vehicles. Unknown or empty params are ignored.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const guests = Number(params.get("guests"));
  const type = params.get("type");

  const data = await getVehicles({
    location: params.get("location") || undefined,
    guests: Number.isInteger(guests) && guests > 0 ? guests : undefined,
    type: type === "campervan" || type === "motorhome" ? type : undefined,
    bathroom: params.get("bathroom") === "true" || undefined,
    petFriendly: params.get("petFriendly") === "true" || undefined,
  });

  return Response.json({ data, meta: { total: data.length } } satisfies ApiList<Vehicle>);
}
