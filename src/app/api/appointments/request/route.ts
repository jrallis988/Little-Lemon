import { NextResponse } from "next/server";
import { processIntake } from "@/lib/intake/deliver";
import { validateAppointment } from "@/lib/intake/validate";
import { insuranceCarriers } from "@/content/data/departments";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON body."] },
      { status: 400 },
    );
  }

  const parsed = validateAppointment(
    (body ?? {}) as Parameters<typeof validateAppointment>[0],
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
