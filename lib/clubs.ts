import { HOME_CLUB } from "@/lib/home-club";
import {
  formatHours,
  isOpenAt,
  scheduleOpen247,
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

const FULL_SPA_AMENITIES: ClubAmenity[] = [
  ...SPA_AMENITIES,
  "HydroMassage",
  "Total Body Enhancement",
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

/** Seacoast NH / nearby MA seed clubs. Home club is Planet Fitness Stratham. */
const CLUB_RECORDS: ClubRecord[] = [
  {
    id: HOME_CLUB.id,
    slug: HOME_CLUB.slug,
    name: HOME_CLUB.name,
    city: HOME_CLUB.city,
    state: HOME_CLUB.state,
    zip: HOME_CLUB.zip,
    address: HOME_CLUB.address,
    phone: HOME_CLUB.phone,
    distanceMiles: 0,
    latitude: HOME_CLUB.latitude,
    longitude: HOME_CLUB.longitude,
    amenities: FULL_SPA_AMENITIES,
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-portsmouth",
    slug: "portsmouth-nh",
    name: "Planet Fitness Portsmouth",
    city: "Portsmouth",
    state: "NH",
    zip: "03801",
    address: "1800 Woodbury Ave",
    phone: "(603) 431-1100",
    distanceMiles: 8.4,
    latitude: 43.0789,
    longitude: -70.7931,
    amenities: SPA_AMENITIES.concat(["HydroMassage"]),
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-exeter",
    slug: "exeter-nh",
    name: "Planet Fitness Exeter",
    city: "Exeter",
    state: "NH",
    zip: "03833",
    address: "12 Industrial Dr",
    phone: "(603) 778-1100",
    distanceMiles: 4.1,
    latitude: 42.9814,
    longitude: -70.9478,
    amenities: SPA_AMENITIES,
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/floor-gym.jpg",
    pricing: plan(15, 22.99),
  },
  {
    id: "pf-seabrook",
    slug: "seabrook-nh",
    name: "Planet Fitness Seabrook",
    city: "Seabrook",
    state: "NH",
    zip: "03874",
    address: "271 Lafayette Rd",
    phone: "(603) 474-1100",
    distanceMiles: 11.2,
    latitude: 42.8942,
    longitude: -70.8711,
    amenities: SPA_AMENITIES.concat(["HydroMassage"]),
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/hero-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-dover",
    slug: "dover-nh",
    name: "Planet Fitness Dover",
    city: "Dover",
    state: "NH",
    zip: "03820",
    address: "45 Washington St",
    phone: "(603) 742-1100",
    distanceMiles: 14.6,
    latitude: 43.1979,
    longitude: -70.8737,
    amenities: SPA_AMENITIES,
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-amesbury",
    slug: "amesbury-ma",
    name: "Planet Fitness Amesbury",
    city: "Amesbury",
    state: "MA",
    zip: "01913",
    address: "24 Macy St",
    phone: "(978) 388-1100",
    distanceMiles: 13.8,
    latitude: 42.8587,
    longitude: -70.9301,
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
    image: "/images/floor-gym.jpg",
    pricing: plan(15, 24.99),
  },
  {
    id: "pf-rochester",
    slug: "rochester-nh",
    name: "Planet Fitness Rochester",
    city: "Rochester",
    state: "NH",
    zip: "03867",
    address: "160 Washington St",
    phone: "(603) 332-1100",
    distanceMiles: 19.5,
    latitude: 43.3042,
    longitude: -70.9756,
    amenities: STANDARD_AMENITIES.concat(["Black Card Spa", "Tanning"]),
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/hero-gym.jpg",
    pricing: plan(10, 22.99),
  },
  {
    id: "pf-salem-nh",
    slug: "salem-nh",
    name: "Planet Fitness Salem",
    city: "Salem",
    state: "NH",
    zip: "03079",
    address: "99 Cluff Crossing Rd",
    phone: "(603) 898-1100",
    distanceMiles: 28.4,
    latitude: 42.7876,
    longitude: -71.2009,
    amenities: FULL_SPA_AMENITIES,
    schedule: scheduleOpen247(),
    blackCardAvailable: true,
    image: "/images/cardio-gym.jpg",
    pricing: plan(15, 24.99, 0, 1),
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

export function getSeedClubRecords(): ClubRecord[] {
  return CLUB_RECORDS;
}

export function enrichClubRecords(
  records: ClubRecord[],
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club[] {
  return records
    .map((record) => enrichClub(record, now, origin))
    .sort((a, b) => a.distanceMiles - b.distanceMiles);
}

export function getClubs(
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club[] {
  return enrichClubRecords(CLUB_RECORDS, now, origin);
}

export function getClubById(
  id: string,
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club | null {
  const record = CLUB_RECORDS.find((club) => club.id === id);
  return record ? enrichClub(record, now, origin) : null;
}

export function getClubBySlug(slug: string, now = new Date()): Club | null {
  const record = CLUB_RECORDS.find((club) => club.slug === slug);
  return record ? enrichClub(record, now) : null;
}

export function getHomeClub(
  now = new Date(),
  origin?: { latitude: number; longitude: number } | null
): Club {
  return getClubById(HOME_CLUB.id, now, origin) ?? getClubs(now, origin)[0]!;
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
