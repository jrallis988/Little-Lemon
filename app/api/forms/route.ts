import { NextResponse } from "next/server";
import {
  acceptSubmission,
  isHoneypotTripped,
  validateSubmission,
} from "@/lib/submissions";

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

  if (isHoneypotTripped(json)) {
    return NextResponse.json({ ok: true });
  }

  const { data, fieldErrors } = validateSubmission(json);
  if (fieldErrors || !data) {
    return NextResponse.json(
      {
        ok: false,
        fieldErrors: fieldErrors ?? {},
        error: "Please fix the highlighted fields.",
      },
      { status: 400 },
    );
  }

  try {
    await acceptSubmission(data);
  } catch (err) {
    console.error("[api/forms] accept failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your submission. Please try again or email the campaign." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
