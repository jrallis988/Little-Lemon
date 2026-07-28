import { NextResponse } from "next/server";
import {
  isResendConfigured,
  isStripeConfigured,
  isStripeWebhookConfigured,
  isTwilioConfigured,
  peekEnv,
} from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Public launch config — partner availability for CTA gating.
 * No secrets; safe for the browser.
 */
export async function GET() {
  const peek = peekEnv();
  const telehealth = Boolean(process.env.TELEHEALTH_PARTNER_URL);
  const mailOrder = Boolean(process.env.MAIL_ORDER_PARTNER_URL);
  const liveSwitch = Boolean(process.env.SWITCH_API_URL);
  const externalPricing =
    (process.env.PRICING_PROVIDER ?? "network") === "external";

  return NextResponse.json({
    appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Trump RX",
    partners: {
      telehealth,
      mailOrder,
      liveSwitch,
      externalPricing,
    },
    /** Hide fulfillment CTAs until partners are wired (Part 1 §5). */
    showFulfillmentPanel: telehealth || mailOrder,
    billing: {
      stripe: peek.ok ? isStripeConfigured() : false,
      stripeWebhook: peek.ok ? isStripeWebhookConfigured() : false,
    },
    alerts: {
      email: peek.ok ? isResendConfigured() : false,
      sms: peek.ok ? isTwilioConfigured() : false,
    },
    binRouting: {
      bin: process.env.TRUMPRX_BIN ?? "610020",
      pcn: process.env.TRUMPRX_PCN ?? "TRUMPRX",
      group: process.env.TRUMPRX_GROUP ?? "TRXSAVE",
      note: "Replace with registered PBM BIN/PCN/Group before go-live.",
    },
  });
}
