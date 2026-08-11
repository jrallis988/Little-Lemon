import { NextResponse } from "next/server";
import {
  DEMO_MEMBER_PASSWORD,
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyDemoPassword,
  type SessionUser,
} from "@/lib/auth";
import { HOME_CLUB } from "@/lib/home-club";
import { getMembershipByEmail } from "@/lib/memberships";
import { ensureWelcomeNotifications } from "@/lib/notifications";
import { authenticateUser, createUser, getUserByEmail } from "@/lib/users";

export const dynamic = "force-dynamic";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!email.includes("@") || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  let user = await authenticateUser(email, password);
  const membership = await getMembershipByEmail(email);

  // Demo fallback: password pfmember provisions/upgrades a local account.
  if (!user && verifyDemoPassword(password)) {
    const existing = await getUserByEmail(email);
    if (existing) {
      user = existing;
    } else {
      user = await createUser({
        email,
        password: DEMO_MEMBER_PASSWORD,
        firstName: membership?.member.firstName || email.split("@")[0] || "Member",
        lastName: membership?.member.lastName || "",
        phone: membership?.member.phone,
        membershipId: membership?.id ?? null,
      });
    }
  }

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  if (membership && user.membershipId !== membership.id) {
    const { updateUser } = await import("@/lib/users");
    user =
      (await updateUser(user.id, { membershipId: membership.id })) ?? user;
  }

  await ensureWelcomeNotifications(user.id);

  const sessionUser: SessionUser = {
    userId: user.id,
    email: user.email,
    firstName: user.firstName || membership?.member.firstName || "Member",
    lastName: user.lastName || membership?.member.lastName || "",
    membershipId: user.membershipId ?? membership?.id ?? null,
    clubId: membership?.clubId ?? HOME_CLUB.id,
    clubName: membership?.clubName ?? HOME_CLUB.name,
    plan: membership?.plan ?? "black-card",
  };

  const token = createSessionToken(sessionUser);
  const response = NextResponse.json({ user: sessionUser });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
