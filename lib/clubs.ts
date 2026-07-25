export type ClubAmenity =
  | "30-Minute Circuit"
  | "Cardio"
  | "Free Weights"
  | "Black Card Spa"
  | "Tanning"
  | "Massage Chairs"
  | "HydroMassage"
  | "Total Body Enhancement"
  | "Wifi"
  | "Locker Rooms";

export type DayHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type Club = {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone: string;
  distanceMiles: number;
  latitude: number;
  longitude: number;
  amenities: ClubAmenity[];
  hours: DayHours[];
  openNow: boolean;
  blackCardAvailable: boolean;
};

export const CLUBS: Club[] = [
  {
    id: "pf-midtown",
    name: "Planet Fitness Midtown",
    city: "Atlanta",
    state: "GA",
    zip: "30308",
    address: "931 Monroe Dr NE",
    phone: "(404) 555-0142",
    distanceMiles: 1.2,
    latitude: 33.779,
    longitude: -84.368,
    amenities: [
      "30-Minute Circuit",
      "Cardio",
      "Free Weights",
      "Black Card Spa",
      "Tanning",
      "Massage Chairs",
      "Wifi",
      "Locker Rooms",
    ],
    hours: [
      { day: "Mon–Thu", open: "24 hours", close: "" },
      { day: "Fri", open: "12:00 AM", close: "10:00 PM" },
      { day: "Sat", open: "7:00 AM", close: "7:00 PM" },
      { day: "Sun", open: "7:00 AM", close: "7:00 PM" },
    ],
    openNow: true,
    blackCardAvailable: true,
  },
  {
    id: "pf-decatur",
    name: "Planet Fitness Decatur",
    city: "Decatur",
    state: "GA",
    zip: "30030",
    address: "140 Clairemont Ave",
    phone: "(404) 555-0198",
    distanceMiles: 4.6,
    latitude: 33.775,
    longitude: -84.296,
    amenities: [
      "30-Minute Circuit",
      "Cardio",
      "Free Weights",
      "Black Card Spa",
      "HydroMassage",
      "Total Body Enhancement",
      "Wifi",
      "Locker Rooms",
    ],
    hours: [
      { day: "Mon–Thu", open: "24 hours", close: "" },
      { day: "Fri", open: "12:00 AM", close: "9:00 PM" },
      { day: "Sat", open: "7:00 AM", close: "7:00 PM" },
      { day: "Sun", open: "7:00 AM", close: "7:00 PM" },
    ],
    openNow: true,
    blackCardAvailable: true,
  },
  {
    id: "pf-buckhead",
    name: "Planet Fitness Buckhead",
    city: "Atlanta",
    state: "GA",
    zip: "30305",
    address: "3340 Peachtree Rd NE",
    phone: "(404) 555-0117",
    distanceMiles: 5.1,
    latitude: 33.847,
    longitude: -84.368,
    amenities: [
      "30-Minute Circuit",
      "Cardio",
      "Free Weights",
      "Black Card Spa",
      "Tanning",
      "Massage Chairs",
      "Wifi",
      "Locker Rooms",
    ],
    hours: [
      { day: "Mon–Thu", open: "24 hours", close: "" },
      { day: "Fri", open: "12:00 AM", close: "10:00 PM" },
      { day: "Sat", open: "6:00 AM", close: "8:00 PM" },
      { day: "Sun", open: "7:00 AM", close: "7:00 PM" },
    ],
    openNow: true,
    blackCardAvailable: true,
  },
  {
    id: "pf-marietta",
    name: "Planet Fitness Marietta",
    city: "Marietta",
    state: "GA",
    zip: "30060",
    address: "2200 Roswell Rd",
    phone: "(770) 555-0164",
    distanceMiles: 12.8,
    latitude: 33.952,
    longitude: -84.55,
    amenities: [
      "30-Minute Circuit",
      "Cardio",
      "Free Weights",
      "Wifi",
      "Locker Rooms",
    ],
    hours: [
      { day: "Mon–Thu", open: "24 hours", close: "" },
      { day: "Fri", open: "12:00 AM", close: "9:00 PM" },
      { day: "Sat", open: "7:00 AM", close: "7:00 PM" },
      { day: "Sun", open: "8:00 AM", close: "6:00 PM" },
    ],
    openNow: false,
    blackCardAvailable: false,
  },
  {
    id: "pf-sandy-springs",
    name: "Planet Fitness Sandy Springs",
    city: "Sandy Springs",
    state: "GA",
    zip: "30328",
    address: "6100 Roswell Rd",
    phone: "(404) 555-0133",
    distanceMiles: 9.4,
    latitude: 33.92,
    longitude: -84.379,
    amenities: [
      "30-Minute Circuit",
      "Cardio",
      "Free Weights",
      "Black Card Spa",
      "Tanning",
      "HydroMassage",
      "Wifi",
      "Locker Rooms",
    ],
    hours: [
      { day: "Mon–Thu", open: "24 hours", close: "" },
      { day: "Fri", open: "12:00 AM", close: "10:00 PM" },
      { day: "Sat", open: "7:00 AM", close: "7:00 PM" },
      { day: "Sun", open: "7:00 AM", close: "7:00 PM" },
    ],
    openNow: true,
    blackCardAvailable: true,
  },
];

export function searchClubs(query: string): Club[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...CLUBS].sort((a, b) => a.distanceMiles - b.distanceMiles);
  }

  return CLUBS.filter((club) => {
    const haystack = [
      club.name,
      club.city,
      club.state,
      club.zip,
      club.address,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  }).sort((a, b) => a.distanceMiles - b.distanceMiles);
}

export function formatHours(hours: DayHours): string {
  if (hours.closed) return "Closed";
  if (!hours.close) return hours.open;
  return `${hours.open} – ${hours.close}`;
}
