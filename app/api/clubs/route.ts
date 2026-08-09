import { NextResponse } from "next/server";
import {
  enrichClubRecords,
  getSeedClubRecords,
  searchClubs,
  type Club,
  type ClubRecord,
} from "@/lib/clubs";
import { fetchRemoteClubRecords } from "@/lib/clubs-remote";

export const dynamic = "force-dynamic";

function filterClubs(clubs: Club[], query: string) {
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

/** Club feed — remote inventory when CLUBS_API_URL is set; seed fallback otherwise. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const origin =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? { latitude: lat, longitude: lng }
      : null;

  let source: "remote-feed" | "seed-feed" = "seed-feed";
  let records: ClubRecord[] = getSeedClubRecords();

  const remote = await fetchRemoteClubRecords();
  if (remote?.records.length) {
    records = remote.records;
    source = "remote-feed";
  }

  const now = new Date();
  let clubs =
    source === "remote-feed"
      ? enrichClubRecords(records, now, origin)
      : q
        ? searchClubs(q, now, origin)
        : enrichClubRecords(records, now, origin);

  if (source === "remote-feed" && q) {
    clubs = filterClubs(clubs, q);
  }

  return NextResponse.json({
    source,
    remoteConfigured: Boolean(process.env.CLUBS_API_URL),
    generatedAt: new Date().toISOString(),
    origin,
    count: clubs.length,
    clubs,
  });
}
