import { NextResponse } from "next/server";
import { hasNotifyConfigured, isEphemeralRuntime } from "@/lib/submissions";

export const runtime = "nodejs";

/** Lightweight deploy check — no secrets, just readiness flags. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    notifyConfigured: hasNotifyConfigured(),
    ephemeralRuntime: isEphemeralRuntime(),
  });
}
