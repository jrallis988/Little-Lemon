import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { DEFAULT_LOCATION } from "@/lib/chains";
import { dispatchPriceAlert } from "@/lib/alerts/dispatch";
import { getPriceQuotes, sortComparisonRows } from "@/lib/pricing-service";
import { logger } from "@/lib/logger";

const createSchema = z.object({
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  baselinePrice: z.number().positive(),
  targetPrice: z.number().positive().optional(),
  zip: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const alerts = await prisma.priceAlert.findMany({
    where: { userId: session.user.id, active: true },
    include: { drug: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ alerts });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to set price alerts" }, { status: 401 });
  }
  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid alert" }, { status: 400 });
  }

  const alert = await prisma.priceAlert.upsert({
    where: {
      userId_drugId_strengthId_quantity_supplyDays: {
        userId: session.user.id,
        drugId: parsed.data.drugId,
        strengthId: parsed.data.strengthId,
        quantity: parsed.data.quantity,
        supplyDays: parsed.data.supplyDays,
      },
    },
    create: {
      userId: session.user.id,
      drugId: parsed.data.drugId,
      strengthId: parsed.data.strengthId,
      quantity: parsed.data.quantity,
      supplyDays: parsed.data.supplyDays,
      baselinePrice: parsed.data.baselinePrice,
      targetPrice: parsed.data.targetPrice,
      active: true,
    },
    update: {
      baselinePrice: parsed.data.baselinePrice,
      targetPrice: parsed.data.targetPrice,
      active: true,
    },
  });

  return NextResponse.json({ alert }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await prisma.priceAlert.updateMany({
    where: { id, userId: session.user.id },
    data: { active: false },
  });
  return NextResponse.json({ ok: true });
}

/**
 * Cron worker: PUT with Authorization: Bearer $ALERTS_CRON_SECRET
 * Checks active alerts, dispatches Resend/Twilio when prices drop.
 * Individual send failures are logged and do not abort the job.
 */
export async function PUT(req: Request) {
  const env = getEnv();
  const authHeader = req.headers.get("authorization");
  if (!env.ALERTS_CRON_SECRET || authHeader !== `Bearer ${env.ALERTS_CRON_SECRET}`) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const alerts = await prisma.priceAlert.findMany({
    where: { active: true },
    include: { user: true, drug: true },
  });

  const triggered: Array<{
    alertId: string;
    email: string;
    price: number;
    delivery: unknown;
  }> = [];
  const failures: Array<{ alertId: string; error: string }> = [];

  for (const alert of alerts) {
    try {
      const location = DEFAULT_LOCATION;
      const rows = sortComparisonRows(
        await getPriceQuotes({
          drugId: alert.drugId,
          strengthId: alert.strengthId,
          quantity: alert.quantity,
          supplyDays: alert.supplyDays as 30 | 90,
          location,
          plusMember:
            alert.user.membershipTier === "plus" &&
            alert.user.membershipStatus === "active",
        }),
        "price"
      );
      const lowest = rows[0]?.offer.couponPrice;

      await prisma.priceAlert.update({
        where: { id: alert.id },
        data: { lastCheckedAt: new Date() },
      });

      if (typeof lowest !== "number") continue;
      const target = alert.targetPrice ?? alert.baselinePrice;
      if (lowest >= target) continue;

      const delivery = await dispatchPriceAlert({
        alertId: alert.id,
        email: alert.user.email,
        phone: alert.user.phone,
        drugId: alert.drugId,
        drugName: alert.drug.genericName,
        brandName: alert.drug.brandName,
        price: lowest,
        baselinePrice: alert.baselinePrice,
        supplyDays: alert.supplyDays,
        quantity: alert.quantity,
      });

      const anyDelivered = delivery.some((d) => d.ok);
      // Advance baseline when at least one channel succeeded, or when all
      // channels were intentionally skipped (providers not configured) so
      const onlySkipped = delivery.every((d) => d.skipped);
      if (anyDelivered || onlySkipped) {
        await prisma.priceAlert.update({
          where: { id: alert.id },
          data: { lastNotifiedAt: new Date(), baselinePrice: lowest },
        });
      }

      triggered.push({
        alertId: alert.id,
        email: alert.user.email,
        price: lowest,
        delivery,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "alert check failed";
      logger.error("alerts_cron_dispatch_failed", { alertId: alert.id, message });
      failures.push({ alertId: alert.id, error: message });
    }
  }

  try {
    await prisma.coupon.updateMany({
      where: { status: "issued", expiresAt: { lt: new Date() } },
      data: { status: "expired" },
    });
  } catch (err) {
    logger.error("alerts_cron_expiry_sweep_failed", { error: err instanceof Error ? err.message : String(err) });
  }

  return NextResponse.json({
    checked: alerts.length,
    triggered: triggered.length,
    failed: failures.length,
    triggers: triggered,
    failures,
  });
}
