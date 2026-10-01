// Shared types for the mock API. Feel free to extend them.

export type Location = {
  id: string;
  name: string;
  country: string;
};

export type VehicleType = "campervan" | "motorhome";
export type Transmission = "manual" | "automatic";

export type Vehicle = {
  id: string;
  slug: string;
  /** e.g. "Active Standard Select" */
  name: string;
  type: VehicleType;
  /** Manufacturer, shown as "{make} or Similar" */
  make: string;
  sleeps: number;
  seats: number;
  transmission: Transmission;
  /** Has a full bathroom */
  bathroom: boolean;
  petFriendly: boolean;
  /** Length in feet and inches, e.g. "19'9" */
  length: string;
  /** Current price per night (after discount) */
  pricePerNight: number;
  /** Price per night before the discount, or null when there is no discount */
  originalPricePerNight: number | null;
  /** e.g. 10 for "-10%", or null when there is no discount */
  discountPercent: number | null;
  currency: "EUR";
  rating: number;
  reviewCount: number;
  /** Shows the "New Vehicles" badge */
  isNew: boolean;
  locationIds: string[];
  image: { src: string; alt: string };
};

export type VehicleSearch = {
  /** Location id, e.g. "lisbon" */
  location?: string;
  /** Number of guests – only vehicles with at least this many seats */
  guests?: number;
  /** Bonus filters (the chips in the design) */
  type?: VehicleType;
  bathroom?: boolean;
  petFriendly?: boolean;
};

export type ApiList<T> = {
  data: T[];
  meta: { total: number };
};
