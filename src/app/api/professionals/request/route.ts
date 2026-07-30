import { NextResponse } from "next/server";
import { processIntake } from "@/lib/intake/deliver";
import { validateProfessional } from "@/lib/intake/validate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON body."] },
      { status: 400 },
    );
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
