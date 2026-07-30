import { NextResponse } from "next/server";
import { processIntake } from "@/lib/intake/deliver";
import { validateAppointment } from "@/lib/intake/validate";
import {
  clientKey,
  isHoneypotTriggered,
  rateLimit,
} from "@/lib/intake/rateLimit";
import { insuranceCarriers } from "@/content/data/departments";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = rateLimit(`appointment:${clientKey(request)}`);
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

  // Silent success for bots filling honeypot fields
  if (isHoneypotTriggered(body)) {
    return NextResponse.json({
      ok: true,
      referenceId: `BCH-${Math.floor(100000 + Math.random() * 900000)}`,
      delivery: { stored: false, emailed: false, webhook: false },
    });
  }

  const parsed = validateAppointment(
    body as Parameters<typeof validateAppointment>[0],
  );
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, errors: parsed.errors },
      { status: 400 },
    );
  }

  const carrier = insuranceCarriers.find(
    (c) => c.id === parsed.data.insuranceCarrierId,
  );
  const payload = {
    ...parsed.data,
    insuranceCarrierName: carrier?.name,
  };

  try {
    const record = await processIntake("appointment", payload);
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
            : "Unable to submit appointment request.",
        ],
      },
      { status: 502 },
    );
  }
}
