import {
  formatHours,
  isOpenAt,
  scheduleWeekday24,
  toDisplayHours,
  todaysHoursLabel,
  type DisplayHoursRow,
  type WeeklySchedule,
} from "@/lib/hours";
import type { MembershipTier } from "@/lib/pricing";

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

export type LocalPlanPricing = {
  monthlyDues: number;
  enrollmentFee: number;
  annualFee: number;
  annualFeeMonth: string;
  available: boolean;
};

export type ClubRecord = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone: string;
  /** Fallback sort distance when no user coordinates are provided. */
  distanceMiles: number;
  latitude: number;
  longitude: number;
  amenities: ClubAmenity[];
  schedule: WeeklySchedule;
  blackCardAvailable: boolean;
  image: string;
  pricing: Record<MembershipTier, LocalPlanPricing>;
};

export type Club = ClubRecord & {
  hours: DisplayHoursRow[];
  openNow: boolean;
  todayLabel: string;
};

const STANDARD_AMENITIES: ClubAmenity[] = [
  "30-Minute Circuit",
  "Cardio",
  "Free Weights",
  "Wifi",
  "Locker Rooms",
];

const SPA_AMENITIES: ClubAmenity[] = [
  ...STANDARD_AMENITIES,
  "Black Card Spa",
  "Tanning",
  "Massage Chairs",
];

function plan(
  classic: number,
  black: number | null,
  enrollClassic = 0,
  enrollBlack = 0
): Record<MembershipTier, LocalPlanPricing> {
  return {
    classic: {
      monthlyDues: classic,
      enrollmentFee: enrollClassic,
      annualFee: 49,
      annualFeeMonth: "September",
      available: true,
    },
    "black-card": {
      monthlyDues: black ?? 24.99,
      enrollmentFee: enrollBlack,
      annualFee: 49,
      annualFeeMonth: "September",
      available: black != null,
    },
  };
}

const CLUB_RECORDS: ClubRecord[] = [
  {
    id: "pf-midtown",
    slug: "atlanta-midtown",
    name: "Planet Fitness Midtown",
    city: "Atlanta",
    state: "GA",
    zip: "30308",
    address: "931 Monroe Dr NE",
    phone: "(404) 555-0142",
    distanceMiles: 1.2,
    latitude: 33.779,
    longitude: -84.368,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-decatur",
    slug: "decatur",
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
      ...STANDARD_AMENITIES,
      "Black Card Spa",
      "HydroMassage",
      "Total Body Enhancement",
    ],
    schedule: scheduleWeekday24({
      friClose: 21 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 22.99),
  },
  {
    id: "pf-buckhead",
    slug: "atlanta-buckhead",
    name: "Planet Fitness Buckhead",
    city: "Atlanta",
    state: "GA",
    zip: "30305",
    address: "3340 Peachtree Rd NE",
    phone: "(404) 555-0117",
    distanceMiles: 5.1,
    latitude: 33.847,
    longitude: -84.368,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 6 * 60,
      satClose: 20 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(19.99, 24.99),
  },
  {
    id: "pf-marietta",
    slug: "marietta",
    name: "Planet Fitness Marietta",
    city: "Marietta",
    state: "GA",
    zip: "30060",
    address: "2200 Roswell Rd",
    phone: "(770) 555-0164",
    distanceMiles: 12.8,
    latitude: 33.952,
    longitude: -84.55,
    amenities: STANDARD_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 21 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 8 * 60,
      sunClose: 18 * 60,
    }),
    blackCardAvailable: false,
    image: "/images/hero-gym.jpg",
    pricing: plan(10, null, 0, 0),
  },
  {
    id: "pf-sandy-springs",
    slug: "sandy-springs",
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
      ...STANDARD_AMENITIES,
      "Black Card Spa",
      "Tanning",
      "HydroMassage",
    ],
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 24.99, 0, 1),
  },
  {
    id: "pf-canal",
    slug: "manhattan-canal-st",
    name: "Planet Fitness Manhattan (Canal St)",
    city: "New York",
    state: "NY",
    zip: "10013",
    address: "370 Canal St",
    phone: "(212) 555-0188",
    distanceMiles: 746,
    latitude: 40.7209,
    longitude: -74.0048,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-union-square",
    slug: "manhattan-union-square",
    name: "Planet Fitness Manhattan (Union Square)",
    city: "New York",
    state: "NY",
    zip: "10003",
    address: "22 E 14th St",
    phone: "(212) 555-0177",
    distanceMiles: 747,
    latitude: 40.735,
    longitude: -73.991,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 23 * 60,
      satOpen: 6 * 60,
      satClose: 20 * 60,
      sunOpen: 7 * 60,
      sunClose: 20 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(22.99, 24.99),
  },
  {
    id: "pf-south-loop",
    slug: "chicago-south-loop",
    name: "Planet Fitness Chicago (South Loop)",
    city: "Chicago",
    state: "IL",
    zip: "60605",
    address: "521 S State St",
    phone: "(312) 555-0144",
    distanceMiles: 587,
    latitude: 41.875,
    longitude: -87.627,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/hero-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-hollywood-village",
    slug: "chicago-little-village",
    name: "Planet Fitness Chicago (Little Village)",
    city: "Chicago",
    state: "IL",
    zip: "60608",
    address: "2558 W Cermak Rd",
    phone: "(312) 555-0166",
    distanceMiles: 590,
    latitude: 41.852,
    longitude: -87.69,
    amenities: STANDARD_AMENITIES.concat(["Black Card Spa", "Tanning"]),
    schedule: scheduleWeekday24({
      friClose: 21 * 60,
      satOpen: 7 * 60,
      satClose: 18 * 60,
      sunOpen: 8 * 60,
      sunClose: 18 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(10, 22.99),
  },
  {
    id: "pf-hollywood-tokyo",
    slug: "los-angeles-little-tokyo",
    name: "Planet Fitness Los Angeles (Little Tokyo)",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    address: "333 S Alameda St",
    phone: "(213) 555-0190",
    distanceMiles: 1930,
    latitude: 34.044,
    longitude: -118.238,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 6 * 60,
      satClose: 20 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 24.99, 0, 0),
  },
  {
    id: "pf-miami-brickell",
    slug: "miami-brickell",
    name: "Planet Fitness Miami (Brickell)",
    city: "Miami",
    state: "FL",
    zip: "33131",
    address: "901 S Miami Ave",
    phone: "(305) 555-0121",
    distanceMiles: 605,
    latitude: 25.765,
    longitude: -80.193,
    amenities: SPA_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/hero-gym.jpg",
    pricing: plan(15, 24.99),
  },
];

/** Haversine distance in miles. */
export function distanceMilesBetween(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const r = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}

function enrichClub(
  record: ClubRecord,
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club {
  const distanceMiles = origin
    ? Number(
        distanceMilesBetween(
          origin.latitude,
          origin.longitude,
          record.latitude,
          record.longitude
        ).toFixed(1)
      )
    : record.distanceMiles;

  return {
    ...record,
    distanceMiles,
    hours: toDisplayHours(record.schedule),
    openNow: isOpenAt(record.schedule, now),
    todayLabel: todaysHoursLabel(record.schedule, now),
  };
}

export function getClubs(
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club[] {
  return CLUB_RECORDS.map((record) => enrichClub(record, now, origin)).sort(
    (a, b) => a.distanceMiles - b.distanceMiles
  );
}

export function getClubById(
  id: string,
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club | null {
  const record = CLUB_RECORDS.find((club) => club.id === id);
  return record ? enrichClub(record, now, origin) : null;
}

export function getClubBySlug(
  slug: string,
  now = new Date()
): Club | null {
  const record = CLUB_RECORDS.find((club) => club.slug === slug);
  return record ? enrichClub(record, now) : null;
}

export function searchClubs(
  query: string,
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club[] {
  const clubs = getClubs(now, origin);
  const normalized = query.trim().toLowerCase();
  if (!normalized) return clubs;

  return clubs.filter((club) => {
    const haystack = [
      club.name,
      club.city,
      club.state,
      club.zip,
      club.address,
      club.slug,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export { formatHours };

/** @deprecated use getClubs() */
export const CLUBS = getClubs();
