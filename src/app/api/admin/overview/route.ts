import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { peekEnv, isStripeConfigured } from "@/lib/env";

/** Admin overview — drugs, pharmacies, coupons, switch events, chats. */
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    drugCount,
    pharmacyCount,
    contractCount,
    couponCount,
    alertCount,
    passCount,
    openChats,
    openTickets,
    openTransfers,
    recentSwitch,
    switchByStatus,
  ] = await Promise.all([
    prisma.drug.count(),
    prisma.pharmacy.count(),
    prisma.pharmacyContract.count(),
    prisma.coupon.count(),
    prisma.priceAlert.count({ where: { active: true } }),
    prisma.digitalPass.count(),
    prisma.conversation.count({
      where: { status: { in: ["open", "waiting"] } },
    }),
    prisma.supportTicket.count({
      where: { status: { in: ["open", "in_progress"] } },
    }),
    prisma.prescriptionTransfer.count({
      where: { status: { in: ["submitted", "in_review"] } },
    }),
    prisma.switchEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { pharmacy: { select: { name: true } } },
    }),
    prisma.switchEvent.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const peek = peekEnv();

  return NextResponse.json({
    counts: {
      drugs: drugCount,
      pharmacies: pharmacyCount,
      contracts: contractCount,
      coupons: couponCount,
      activeAlerts: alertCount,
      digitalPasses: passCount,
      openChats,
      openTickets,
      openTransfers,
    },
    switchAnalytics: {
      byStatus: switchByStatus.map((row) => ({
        status: row.status,
        count: row._count.status,
      })),
      recent: recentSwitch.map((e) => ({
        id: e.id,
        status: e.status,
        confidence: e.confidence,
        liveSwitch: e.liveSwitch,
        pharmacyName: e.pharmacy?.name ?? null,
        createdAt: e.createdAt.toISOString(),
      })),
    },
    launch: {
      envOk: peek.ok,
      stripe: peek.ok ? isStripeConfigured() : false,
      liveSwitch: Boolean(process.env.SWITCH_API_URL),
      externalPricing: (process.env.PRICING_PROVIDER ?? "network") === "external",
      telehealth: Boolean(process.env.TELEHEALTH_PARTNER_URL),
      mailOrder: Boolean(process.env.MAIL_ORDER_PARTNER_URL),
    },
  });
}
