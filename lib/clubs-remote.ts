import type { ClubAmenity, ClubRecord, LocalPlanPricing } from "@/lib/clubs";
import { scheduleWeekday24 } from "@/lib/hours";
import type { MembershipTier } from "@/lib/pricing";

/**
 * Remote club inventory adapter.
 * Expects CLUBS_API_URL to return JSON shaped like:
 *   { clubs: Array<PartialClub> }  OR  Array<PartialClub>
 *
 * Missing fields fall back to sensible seed defaults so a thin CMS feed works.
 */

type RemoteClub = {
  id?: string;
  slug?: string;
  name?: string;
  city?: string;
  state?: string;
  zip?: string;
  address?: string;
  phone?: string;
  distanceMiles?: number;
  latitude?: number;
  longitude?: number;
  amenities?: ClubAmenity[];
  blackCardAvailable?: boolean;
  image?: string;
  pricing?: Partial<Record<MembershipTier, Partial<LocalPlanPricing>>>;
};

const DEFAULT_AMENITIES: ClubAmenity[] = [
  "30-Minute Circuit",
  "Cardio",
  "Free Weights",
  "Wifi",
  "Locker Rooms",
];

function defaultPricing(
  blackCardAvailable: boolean
): Record<MembershipTier, LocalPlanPricing> {
  return {
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
      available: blackCardAvailable,
    },
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64);
}

function normalizeClub(raw: RemoteClub, index: number): ClubRecord | null {
  const name = raw.name?.trim();
  if (!name) return null;
  const blackCardAvailable = raw.blackCardAvailable ?? true;
  const pricing = defaultPricing(blackCardAvailable);
  if (raw.pricing?.classic) {
    pricing.classic = { ...pricing.classic, ...raw.pricing.classic, available: true };
  }
  if (raw.pricing?.["black-card"]) {
    pricing["black-card"] = {
      ...pricing["black-card"],
      ...raw.pricing["black-card"],
      available: blackCardAvailable && (raw.pricing["black-card"].available ?? true),
    };
  }

  const id = raw.id?.trim() || `remote-${index + 1}`;
  const slug = raw.slug?.trim() || slugify(name) || id;

  return {
    id,
    slug,
    name,
    city: raw.city?.trim() || "Unknown",
    state: raw.state?.trim() || "NA",
    zip: raw.zip?.trim() || "00000",
    address: raw.address?.trim() || "Address TBD",
    phone: raw.phone?.trim() || "(555) 000-0000",
    distanceMiles: Number.isFinite(raw.distanceMiles) ? Number(raw.distanceMiles) : 99,
    latitude: Number.isFinite(raw.latitude) ? Number(raw.latitude) : 0,
    longitude: Number.isFinite(raw.longitude) ? Number(raw.longitude) : 0,
    amenities: raw.amenities?.length ? raw.amenities : DEFAULT_AMENITIES,
    schedule: scheduleWeekday24({
      friClose: 22 * 60,
      satOpen: 7 * 60,
      satClose: 19 * 60,
      sunOpen: 7 * 60,
      sunClose: 19 * 60,
    }),
    blackCardAvailable,
    image: raw.image?.trim() || "/images/floor-gym.jpg",
    pricing,
  };
}

export async function fetchRemoteClubRecords(
  url = process.env.CLUBS_API_URL
): Promise<{ records: ClubRecord[]; source: "remote" } | null> {
  if (!url?.trim()) return null;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as
      | RemoteClub[]
      | { clubs?: RemoteClub[] };

    const list = Array.isArray(data) ? data : data.clubs;
    if (!Array.isArray(list) || list.length === 0) return null;

    const records = list
      .map((item, index) => normalizeClub(item, index))
      .filter((item): item is ClubRecord => Boolean(item));

    if (!records.length) return null;
    return { records, source: "remote" };
  } catch {
    return null;
  }
}
