import { NextResponse } from "next/server";
import {
  DEMO_MEMBER_PASSWORD,
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyDemoPassword,
  type SessionUser,
} from "@/lib/auth";
import { getMembershipByEmail } from "@/lib/memberships";

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

  if (!verifyDemoPassword(password)) {
    return NextResponse.json(
      {
        error: `Invalid credentials. Demo password is “${DEMO_MEMBER_PASSWORD}”.`,
      },
      { status: 401 }
    );
  }

  const membership = await getMembershipByEmail(email);
  const user: SessionUser = membership
    ? {
        email: membership.member.email,
        firstName: membership.member.firstName,
        lastName: membership.member.lastName,
        membershipId: membership.id,
        clubId: membership.clubId,
        clubName: membership.clubName,
        plan: membership.plan,
      }
    : {
        email,
        firstName: email.split("@")[0] || "Member",
        lastName: "",
        membershipId: null,
        clubId: "pf-midtown",
        clubName: "Planet Fitness Midtown",
        plan: "black-card",
      };

  const token = createSessionToken(user);
  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
