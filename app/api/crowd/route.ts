import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getOccupancy } from "@/lib/crowd";
import { HOME_CLUB } from "@/lib/home-club";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = await getSession();
  const clubId =
    searchParams.get("clubId") ?? session?.clubId ?? HOME_CLUB.id;
  const occupancy = await getOccupancy(clubId);
  return NextResponse.json({ occupancy });
}
