import { NextResponse } from "next/server";
import { isDemoAuthEnabled } from "@/lib/auth-shared";
import { getStoreBackend, isMemoryStore } from "@/lib/db";
import { paymentsConfigured } from "@/lib/payments";

export const dynamic = "force-dynamic";

/** Liveness / config probe for ops and CI smoke checks. */
export async function GET() {
  const hasAuthSecret = Boolean(
    process.env.AUTH_SECRET?.trim() || process.env.STRIPE_SECRET_KEY?.trim()
  );
  const storeBackend = await getStoreBackend();

  return NextResponse.json({
    ok: true,
    service: "planet-fitness-stratham",
    time: new Date().toISOString(),
    env: process.env.NODE_ENV,
    checks: {
      authSecretConfigured: hasAuthSecret,
      accessSecretConfigured: Boolean(
        process.env.ACCESS_CONTROL_SECRET?.trim() || hasAuthSecret
      ),
      stripeConfigured: paymentsConfigured(),
      demoAuthEnabled: isDemoAuthEnabled(),
      clubsApiConfigured: Boolean(process.env.CLUBS_API_URL?.trim()),
      siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
      storeBackend,
      memoryStore: isMemoryStore(),
    },
  });
}
