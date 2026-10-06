import { NextResponse } from "next/server";
import { createPasswordReset } from "@/lib/users";
import { normalizeEmail } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const token = await createPasswordReset(email);
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    new URL(request.url).origin;

  const resetUrl = token
    ? `${origin}/app/login/reset?token=${token}`
    : null;

  // Never reveal whether the email exists. In non-production, optionally
  // return the reset URL so local QA can complete the flow without SMTP.
  const exposeResetUrl =
    process.env.NODE_ENV !== "production" &&
    process.env.EXPOSE_PASSWORD_RESET_URL === "true";

  return NextResponse.json({
    ok: true,
    message:
      "If an account exists for that email, password reset instructions will be sent.",
    ...(exposeResetUrl && resetUrl ? { resetUrl } : {}),
  });
}
