import { NextResponse } from "next/server";
import { recordCheckIn, validateAccessToken } from "@/lib/access";
import { getSession } from "@/lib/auth";
import { getClubById } from "@/lib/clubs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { code?: string; clubId?: string };
  try {
    body = (await request.json()) as { code?: string; clubId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json({ error: "code is required." }, { status: 400 });
  }

  const session = await getSession();
  const clubId = body.clubId ?? session?.clubId ?? undefined;
  const result = await validateAccessToken(code, clubId);

  const club = clubId ? getClubById(clubId) : null;
  const membershipId =
    result.ok
      ? result.token.membershipId
      : session?.membershipId ?? "unknown";

  await recordCheckIn({
    membershipId,
    clubId: clubId ?? "unknown",
    clubName: club?.name ?? session?.clubName ?? "Planet Fitness",
    result: result.ok
      ? "success"
      : result.result === "club_full"
        ? "club_full"
        : "denied",
    tokenId: result.ok ? result.token.id : null,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, result: result.result, message: result.message },
      { status: result.result === "club_full" ? 409 : 403 }
    );
  }

  return NextResponse.json({
    ok: true,
    result: "success",
    membershipId: result.token.membershipId,
    clubId: result.token.clubId,
  });
}
