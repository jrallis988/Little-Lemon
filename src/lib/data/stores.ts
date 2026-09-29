import type { StoreLocation, StoreService } from "@/lib/types";

export const STORE_SERVICE_LABEL: Record<StoreService, string> = {
  pharmacy: "Pharmacy",
  drive_thru: "Drive-thru",
  vaccines: "Vaccines",
  photo: "Photo",
  open_24: "Open 24 hours",
  same_day: "Same-day delivery",
};

export const STORE_SERVICE_FILTERS: {
  id: StoreService;
  label: string;
}[] = [
  { id: "pharmacy", label: "Pharmacy" },
  { id: "drive_thru", label: "Drive-thru" },
  { id: "vaccines", label: "Vaccines" },
  { id: "photo", label: "Photo" },
  { id: "open_24", label: "Open 24 hours" },
  { id: "same_day", label: "Same-day delivery" },
];

export const NEARBY_STORES: StoreLocation[] = [
  {
    id: "store-4821",
    name: "Walgreens RX — Market & 5th",
    address: "850 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    phone: "(415) 555-0142",
    hoursSummary: "Open until 10 PM",
    hasDriveThru: true,
    latitude: 37.785,
    longitude: -122.407,
    distanceMiles: 0.4,
    services: ["pharmacy", "drive_thru", "vaccines", "photo", "same_day"],
  },
  {
    id: "store-4902",
    name: "Walgreens RX — Mission & 16th",
    address: "2690 Mission Street",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    phone: "(415) 555-0198",
    hoursSummary: "Open until 9 PM",
    hasDriveThru: false,
    latitude: 37.758,
    longitude: -122.419,
    distanceMiles: 1.8,
    services: ["pharmacy", "vaccines", "photo"],
  },
  {
    id: "store-5011",
    name: "Walgreens RX — Geary & 20th",
    address: "2145 Geary Boulevard",
    city: "San Francisco",
    state: "CA",
    zip: "94115",
    phone: "(415) 555-0177",
    hoursSummary: "Open 24 hours",
    hasDriveThru: true,
    latitude: 37.784,
    longitude: -122.435,
    distanceMiles: 2.3,
    services: [
      "pharmacy",
      "drive_thru",
      "vaccines",
      "photo",
      "open_24",
      "same_day",
    ],
  },
];

/** Map pin positions as percentages within the SF demo map frame. */
export function storeMapPosition(store: StoreLocation): {
  left: number;
  top: number;
} {
  const latMin = 37.75;
  const latMax = 37.79;
  const lngMin = -122.44;
  const lngMax = -122.4;
  const left =
    ((store.longitude - lngMin) / (lngMax - lngMin)) * 70 + 15;
  const top =
    ((latMax - store.latitude) / (latMax - latMin)) * 60 + 18;
  return {
    left: Math.min(88, Math.max(10, left)),
    top: Math.min(82, Math.max(12, top)),
  };
}

export const PHOTO_OFFERS = [
  {
    id: "photo-all",
    title: "50% off everything photo",
    detail: "Prints, gifts, and same-day keepsakes.",
  },
  {
    id: "photo-books",
    title: "60% off same-day layflat photo books",
    detail: "Order in the morning, pick up tonight.",
  },
  {
    id: "photo-signs",
    title: "65% off same-day double-sided yard signs",
    detail: "Birthdays, celebrations, and events.",
  },
] as const;
