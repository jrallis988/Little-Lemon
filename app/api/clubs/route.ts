import { NextResponse } from "next/server";
import { getClubs, searchClubs } from "@/lib/clubs";

export const dynamic = "force-dynamic";

/** Club feed — seed inventory today; swap `lib/clubs` source for a live CMS/API. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const origin =
    Number.isFinite(lat) && Number.isFinite(lng)
      ? { latitude: lat, longitude: lng }
      : null;

  const clubs = q ? searchClubs(q, new Date(), origin) : getClubs(new Date(), origin);

  return NextResponse.json({
    source: process.env.CLUBS_API_URL ? "remote-feed" : "seed-feed",
    generatedAt: new Date().toISOString(),
    origin,
    count: clubs.length,
    clubs,
  });
}
