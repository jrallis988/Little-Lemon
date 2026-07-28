import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { peekEnv, isStripeConfigured } from "@/lib/env";

function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allow.includes(email.toLowerCase());
}

/** Admin overview — drugs, pharmacies, coupons, switch events. */
export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    drugCount,
    pharmacyCount,
    contractCount,
    couponCount,
    alertCount,
    passCount,
    recentSwitch,
    switchByStatus,
  ] = await Promise.all([
    prisma.drug.count(),
    prisma.pharmacy.count(),
    prisma.pharmacyContract.count(),
    prisma.coupon.count(),
    prisma.priceAlert.count({ where: { active: true } }),
    prisma.digitalPass.count(),
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
