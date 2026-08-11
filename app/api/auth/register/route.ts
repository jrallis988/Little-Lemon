import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  type SessionUser,
} from "@/lib/auth";
import { HOME_CLUB } from "@/lib/home-club";
import { getMembershipByEmail } from "@/lib/memberships";
import { ensureWelcomeNotifications } from "@/lib/notifications";
import { createUser } from "@/lib/users";

export const dynamic = "force-dynamic";

type Body = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";

  if (!email.includes("@") || password.length < 8 || !firstName || !lastName) {
    return NextResponse.json(
      {
        error:
          "First name, last name, email, and a password of at least 8 characters are required.",
      },
      { status: 400 }
    );
  }

  try {
    const membership = await getMembershipByEmail(email);
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
      phone: body.phone,
      membershipId: membership?.id ?? null,
    });
    await ensureWelcomeNotifications(user.id);

    const sessionUser: SessionUser = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      membershipId: user.membershipId,
      clubId: membership?.clubId ?? HOME_CLUB.id,
      clubName: membership?.clubName ?? HOME_CLUB.name,
      plan: membership?.plan ?? "black-card",
    };

    const response = NextResponse.json({ user: sessionUser }, { status: 201 });
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken(sessionUser),
      sessionCookieOptions()
    );
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not register." },
      { status: 409 }
    );
  }
}
