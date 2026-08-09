import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getOccupancy } from "@/lib/crowd";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = await getSession();
  const clubId =
    searchParams.get("clubId") ?? session?.clubId ?? "pf-midtown";
  const occupancy = await getOccupancy(clubId);
  return NextResponse.json({ occupancy });
}
