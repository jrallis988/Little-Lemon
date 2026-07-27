import type { StoreLocation } from "@/lib/types";

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
  },
];

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
