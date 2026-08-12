import { NextResponse } from "next/server";
import {
  notifyJoinSignup,
  persistJoinSignup,
  validateJoinPayload,
} from "@/lib/join";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { data, fieldErrors } = validateJoinPayload(json);

  // Honeypot trip: pretend success, skip persistence
  if (
    data &&
    typeof json === "object" &&
    json &&
    String((json as Record<string, unknown>).company ?? "").trim()
  ) {
    return NextResponse.json({ ok: true });
  }

  if (fieldErrors || !data) {
    return NextResponse.json(
      { ok: false, fieldErrors: fieldErrors ?? {}, error: "Please fix the highlighted fields." },
      { status: 400 },
    );
  }

  try {
    await persistJoinSignup(data);
  } catch (err) {
    console.error("[api/join] persist failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 500 },
    );
  }

  try {
    await notifyJoinSignup(data);
  } catch (err) {
    // Signup is already saved — don't fail the user for notify issues
    console.error("[api/join] notify failed", err);
  }

  return NextResponse.json({ ok: true });
}
