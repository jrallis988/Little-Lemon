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

const CLUB_RECORDS: ClubRecord[] = [
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
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: {
      classic: {
        monthlyDues: 15,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
      "black-card": {
        monthlyDues: 24.99,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
    },
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
    schedule: scheduleWeekday24({
      friClose: 21 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: {
      classic: {
        monthlyDues: 15,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
      "black-card": {
        monthlyDues: 22.99,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
    },
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
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 6 * 60,
      satClose: 20 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: {
      classic: {
        monthlyDues: 19.99,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
      "black-card": {
        monthlyDues: 24.99,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
    },
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
    schedule: scheduleWeekday24({
      friClose: 21 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 8 * 60,
      sunClose: 18 * 60,
    }),
    blackCardAvailable: false,
    image: "/images/hero-gym.jpg",
    pricing: {
      classic: {
        monthlyDues: 10,
        enrollmentFee: 0,
        annualFee: 39,
        annualFeeMonth: "June",
        available: true,
      },
      "black-card": {
        monthlyDues: 24.99,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: false,
      },
    },
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
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: {
      classic: {
        monthlyDues: 15,
        enrollmentFee: 0,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
      "black-card": {
        monthlyDues: 24.99,
        enrollmentFee: 1,
        annualFee: 49,
        annualFeeMonth: "June",
        available: true,
      },
    },
  },
];

function enrichClub(record: ClubRecord, now = new Date()): Club {
  return {
    ...record,
    hours: toDisplayHours(record.schedule),
    openNow: isOpenAt(record.schedule, now),
    todayLabel: todaysHoursLabel(record.schedule, now),
  };
}

/** API-shaped club feed. Swap this for a CMS/HTTP source later. */
export function getClubs(now = new Date()): Club[] {
  return CLUB_RECORDS.map((record) => enrichClub(record, now)).sort(
    (a, b) => a.distanceMiles - b.distanceMiles
  );
}

export function getClubById(id: string, now = new Date()): Club | null {
  const record = CLUB_RECORDS.find((club) => club.id === id);
  return record ? enrichClub(record, now) : null;
}

export function searchClubs(query: string, now = new Date()): Club[] {
  const clubs = getClubs(now);
  const normalized = query.trim().toLowerCase();
  if (!normalized) return clubs;

  return clubs.filter((club) => {
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
  });
}

export { formatHours };

/** @deprecated use getClubs() — kept for gradual migration */
export const CLUBS = getClubs();
