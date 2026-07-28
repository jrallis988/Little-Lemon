import { prisma } from "@/lib/db";
import type { LocationContext } from "@/lib/types";

export function milesBetween(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Resolve ZIP via local cache, then Zippopotam.us (no API key). */
export async function resolveZip(zip: string): Promise<LocationContext | null> {
  const clean = zip.trim().slice(0, 5);
  if (!/^\d{5}$/.test(clean)) return null;

  const cached = await prisma.zipLocation.findUnique({ where: { zip: clean } });
  if (cached) {
    return {
      zip: cached.zip,
      city: cached.city,
      state: cached.state,
      latitude: cached.latitude,
      longitude: cached.longitude,
      label: cached.label,
    };
  }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${clean}`, {
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      "post code": string;
      places: Array<{
        "place name": string;
        state: string;
        "state abbreviation": string;
        latitude: string;
        longitude: string;
      }>;
    };
    const place = data.places?.[0];
    if (!place) return null;
    const location: LocationContext = {
      zip: clean,
      city: place["place name"],
      state: place["state abbreviation"],
      latitude: Number(place.latitude),
      longitude: Number(place.longitude),
      label: `${place["place name"]}, ${place["state abbreviation"]} ${clean}`,
    };
    await prisma.zipLocation.upsert({
      where: { zip: clean },
      create: location,
      update: {
        city: location.city,
        state: location.state,
        latitude: location.latitude,
        longitude: location.longitude,
        label: location.label,
      },
    });
    return location;
  } catch {
    return null;
  }
}
