import { NextResponse } from "next/server";
import { processIntake } from "@/lib/intake/deliver";
import { validateProfessional } from "@/lib/intake/validate";
import {
  clientKey,
  isHoneypotTriggered,
  rateLimit,
} from "@/lib/intake/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = rateLimit(`professional:${clientKey(request)}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, errors: ["Too many requests. Please try again shortly."] },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON body."] },
      { status: 400 },
    );
  }

  if (isHoneypotTriggered(body)) {
    const prefix = body.channel === "second-opinion" ? "SO" : "REF";
    return NextResponse.json({
      ok: true,
      referenceId: `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`,
      delivery: { stored: false, emailed: false, webhook: false },
    });
  }

  const channel =
    body.channel === "second-opinion" ? "second-opinion" : "referral";

  const parsed = validateProfessional(channel, body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors },
      { status: 400 },
    );
  }

  try {
    const record = await processIntake(channel, parsed.data);
    return NextResponse.json({
      ok: true,
      referenceId: record.referenceId,
      delivery: {
        stored: record.delivery.stored,
        emailed: record.delivery.emailed,
        webhook: record.delivery.webhook,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        errors: [
          err instanceof Error
            ? err.message
            : "Unable to submit professional request.",
        ],
      },
      { status: 502 },
    );
  }
}
