import { getEnv } from "@/lib/env";

export type FulfillmentChannel = "telehealth" | "mail_order" | "specialty_transfer";

export interface FulfillmentHandoffRequest {
  channel: FulfillmentChannel;
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: 30 | 90;
  pharmacyId?: string;
  zip?: string;
  userEmail?: string;
}

export interface FulfillmentHandoffResult {
  channel: FulfillmentChannel;
  status: "ready" | "partner_required" | "queued";
  title: string;
  body: string;
  ctaLabel: string;
  ctaUrl?: string;
  partner?: string;
}

/**
 * Telehealth + mail-order / specialty chaining.
 * When partner URLs are configured, returns deep links; otherwise queues a
 * guided handoff message so the UI still closes the discovery → fill loop.
 */
export function buildFulfillmentHandoff(
  req: FulfillmentHandoffRequest
): FulfillmentHandoffResult {
  const env = getEnv();
  const telehealthUrl = process.env.TELEHEALTH_PARTNER_URL;
  const mailOrderUrl = process.env.MAIL_ORDER_PARTNER_URL;

  if (req.channel === "telehealth") {
    if (telehealthUrl) {
      const url = new URL(telehealthUrl);
      url.searchParams.set("drug", req.drugId);
      url.searchParams.set("strength", req.strengthId);
      url.searchParams.set("qty", String(req.quantity));
      return {
        channel: "telehealth",
        status: "ready",
        title: "Continue with telehealth",
        body: "Connect with a partner clinician who can evaluate whether a prescription is appropriate — then route it to your chosen pharmacy.",
        ctaLabel: "Start telehealth visit",
        ctaUrl: url.toString(),
        partner: "telehealth",
      };
    }
    return {
      channel: "telehealth",
      status: "partner_required",
      title: "Telehealth partner not connected yet",
      body: "Set TELEHEALTH_PARTNER_URL to enable one-tap clinical handoff. Until then, use your own clinician and bring the Trump RX coupon to any in-network pharmacy.",
      ctaLabel: "Compare local pharmacies",
      ctaUrl: `${env.NEXT_PUBLIC_APP_URL}/pharmacies`,
    };
  }

  if (req.channel === "mail_order" || req.channel === "specialty_transfer") {
    if (mailOrderUrl) {
      const url = new URL(mailOrderUrl);
      url.searchParams.set("drug", req.drugId);
      url.searchParams.set("channel", req.channel);
      return {
        channel: req.channel,
        status: "ready",
        title:
          req.channel === "specialty_transfer"
            ? "Transfer to specialty / mail-order"
            : "Ship to your door",
        body: "Hand off this quote to a mail-order or specialty partner for doorstep delivery when retail pickup isn’t ideal.",
        ctaLabel: "Transfer prescription",
        ctaUrl: url.toString(),
        partner: "mail_order",
      };
    }
    return {
      channel: req.channel,
      status: "partner_required",
      title: "Mail-order partner not connected yet",
      body: "Set MAIL_ORDER_PARTNER_URL to enable transfer chaining. You can still fill locally with a Trump RX coupon today.",
      ctaLabel: "Get local coupon",
      ctaUrl: `${env.NEXT_PUBLIC_APP_URL}/search?drug=${encodeURIComponent(req.drugId)}`,
    };
  }

  return {
    channel: req.channel,
    status: "queued",
    title: "Fulfillment handoff",
    body: "Choose a channel to continue.",
    ctaLabel: "Continue",
  };
}
