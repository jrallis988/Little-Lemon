import { NextResponse } from "next/server";
import {
  isResendConfigured,
  isStripeConfigured,
  isStripeWebhookConfigured,
  isTwilioConfigured,
  peekEnv,
} from "@/lib/env";
import {
  getLaunchFeatures,
  launchModeLabel,
  V1_PHARMACY_PICKUP_DRUG_IDS,
} from "@/lib/launch-mode";

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
  const launch = getLaunchFeatures();

  return NextResponse.json({
    appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Trump RX",
    launch: {
      mode: launch.mode,
      label: launchModeLabel(),
      v1FormularyCount: V1_PHARMACY_PICKUP_DRUG_IDS.length,
      membership: launch.membership,
      transfer: launch.transfer,
      providers: launch.providers,
      familyProfiles: launch.familyProfiles,
      manufacturerPathway: launch.manufacturerPathway,
      livePharmacyPricing: launch.livePharmacyPricing,
      showLimitedBetaBanner: launch.showLimitedBetaBanner,
    },
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
    },
  });
}
