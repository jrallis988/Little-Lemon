import { NextResponse } from "next/server";
import { createPasswordReset } from "@/lib/users";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const token = await createPasswordReset(email);
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    new URL(request.url).origin;

  // In production this would email. For the demo we return the reset path when found.
  return NextResponse.json({
    ok: true,
    message:
      "If that email has an account, a reset link is ready. (Demo returns the link when found.)",
    resetUrl: token
      ? `${origin}/app/login/reset?token=${token}`
      : null,
  });
}
