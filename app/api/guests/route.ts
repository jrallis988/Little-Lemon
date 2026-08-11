import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createGuestPass, listGuestPasses } from "@/lib/guests";
import { HOME_CLUB } from "@/lib/home-club";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.membershipId) {
    return NextResponse.json({ passes: [] });
  }
  const passes = await listGuestPasses(session.membershipId);
  return NextResponse.json({ passes });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.plan === "classic") {
    return NextResponse.json(
      { error: "Guest passes require Black Card." },
      { status: 403 }
    );
  }

  let body: { guestName?: string };
  try {
    body = (await request.json()) as { guestName?: string };
  } catch {
    body = {};
  }

  const membershipId = session.membershipId ?? `TEMP-${session.email}`;
  const pass = await createGuestPass({
    membershipId,
    guestName: body.guestName ?? "Guest",
    clubId: session.clubId ?? HOME_CLUB.id,
    clubName: session.clubName ?? HOME_CLUB.name,
  });

  return NextResponse.json({ pass }, { status: 201 });
}
