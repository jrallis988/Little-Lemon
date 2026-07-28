import { NextResponse } from "next/server";
import { checkDatabase } from "@/lib/db";
import {
  databaseProviderFromUrl,
  isResendConfigured,
  isStripeConfigured,
  isStripeWebhookConfigured,
  isTwilioConfigured,
  peekEnv,
} from "@/lib/env";

export const dynamic = "force-dynamic";

/** Liveness + readiness probe for hosting / load balancers. */
export async function GET() {
  const envPeek = peekEnv();
  const db = await checkDatabase();
  const url = process.env.DATABASE_URL ?? "";

  const ready = envPeek.ok && db.ok;
  const body = {
    status: ready ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
    checks: {
      env: envPeek.ok
        ? { ok: true }
        : { ok: false, errors: envPeek.errors },
      database: {
        ok: db.ok,
        latencyMs: db.latencyMs,
        provider: url ? databaseProviderFromUrl(url) : "unknown",
        error: db.error,
      },
      integrations: {
        stripe: envPeek.ok ? isStripeConfigured() : false,
        stripeWebhook: envPeek.ok ? isStripeWebhookConfigured() : false,
        resend: envPeek.ok ? isResendConfigured() : false,
        twilio: envPeek.ok ? isTwilioConfigured() : false,
        pricingProvider: process.env.PRICING_PROVIDER ?? "network",
        liveSwitch: Boolean(process.env.SWITCH_API_URL),
        telehealth: Boolean(process.env.TELEHEALTH_PARTNER_URL),
        mailOrder: Boolean(process.env.MAIL_ORDER_PARTNER_URL),
      },
      launchChecklist: "See docs/LAUNCH.md",
    },
  };

  return NextResponse.json(body, { status: ready ? 200 : 503 });
}
