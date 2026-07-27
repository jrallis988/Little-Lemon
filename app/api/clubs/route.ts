import { NextResponse } from "next/server";
import { getClubs, searchClubs } from "@/lib/clubs";

export const dynamic = "force-dynamic";

/** Club feed endpoint — ready to swap for a real CMS/API later. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const clubs = q ? searchClubs(q) : getClubs();

  return NextResponse.json({
    source: "local-feed",
    generatedAt: new Date().toISOString(),
    count: clubs.length,
    clubs,
  });
}
