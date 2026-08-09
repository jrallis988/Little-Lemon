import { NextResponse } from "next/server";
import { issueAccessToken, offlineKeytagPayload } from "@/lib/access";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getSession();
  if (!session?.membershipId && !session?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membershipId = session.membershipId ?? `GUEST-${session.email}`;
  const clubId = session.clubId ?? "pf-midtown";
  const token = await issueAccessToken({ membershipId, clubId, ttlSeconds: 90 });

  return NextResponse.json({
    token: {
      id: token.id,
      code: token.code,
      expiresAt: token.expiresAt,
      clubId: token.clubId,
    },
    offline: offlineKeytagPayload({
      membershipId,
      memberName: [session.firstName, session.lastName].filter(Boolean).join(" "),
      plan: session.plan ?? "member",
      clubName: session.clubName ?? "Planet Fitness",
      code: token.code,
      expiresAt: token.expiresAt,
    }),
  });
}
