import "server-only";

import locationsJson from "@/data/locations.json";
import vehiclesJson from "@/data/vehicles.json";
import type { Location, Vehicle, VehicleSearch } from "@/lib/types";

/**
 * Mock data layer.
 *
 * This file pretends to be our backend. The route handlers in `app/api/*`
 * call these functions, and you can also call them directly from Server
 * Components. You should not need to change this file.
 *
 * Every call waits `MOCK_DELAY_MS` (default 600ms) so you can see your
 * loading states. Set `MOCK_DELAY_MS=0` to turn it off.
 */

const locations = locationsJson as Location[];
const vehicles = vehiclesJson as Vehicle[];

function delay() {
  const ms = Number(process.env.MOCK_DELAY_MS ?? 600);
  return new Promise((resolve) => setTimeout(resolve, Number.isFinite(ms) ? ms : 0));
}

export async function getLocations(): Promise<Location[]> {
  await delay();
  return locations;
}

export async function getVehicles(search: VehicleSearch = {}): Promise<Vehicle[]> {
  await delay();
  const { location, guests, type, bathroom, petFriendly } = search;
  return vehicles.filter((v) => {
    if (location && !v.locationIds.includes(location)) return false;
    if (guests && v.seats < guests) return false;
    if (type && v.type !== type) return false;
    if (bathroom && !v.bathroom) return false;
    if (petFriendly && !v.petFriendly) return false;
    return true;
  });
}
