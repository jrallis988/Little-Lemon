import { NextResponse } from "next/server";
import { consumePasswordReset } from "@/lib/users";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { token?: string; password?: string };
  try {
    body = (await request.json()) as { token?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const token = body.token?.trim() ?? "";
  const password = body.password ?? "";
  if (!token || password.length < 8) {
    return NextResponse.json(
      { error: "Token and a password of at least 8 characters are required." },
      { status: 400 }
    );
  }

  const result = await consumePasswordReset(token, password);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
