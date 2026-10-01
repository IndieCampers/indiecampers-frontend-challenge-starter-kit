import { getLocations } from "@/lib/data";
import type { ApiList, Location } from "@/lib/types";

/** GET /api/locations — all pick-up locations. */
export async function GET() {
  const data = await getLocations();
  return Response.json({ data, meta: { total: data.length } } satisfies ApiList<Location>);
}
