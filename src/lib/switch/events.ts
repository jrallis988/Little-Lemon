import { prisma } from "@/lib/db";

/** Persist Smart Switch outcomes for claim-reject analytics. */
export async function logSwitchEvent(input: {
  userId?: string | null;
  pharmacyId?: string | null;
  drugId?: string | null;
  status: string;
  confidence?: number;
  liveSwitch?: boolean;
  detail?: Record<string, unknown>;
}) {
  try {
    await prisma.switchEvent.create({
      data: {
        userId: input.userId ?? null,
        pharmacyId: input.pharmacyId ?? null,
        drugId: input.drugId ?? null,
        status: input.status,
        confidence: input.confidence ?? null,
        liveSwitch: Boolean(input.liveSwitch),
        detailJson: JSON.stringify(input.detail ?? {}),
      },
    });
  } catch (err) {
    console.error("[switch-event] failed to persist", err);
  }
}
