import { Resend } from "resend";
import twilio from "twilio";
import { getEnv, isResendConfigured, isTwilioConfigured } from "@/lib/env";
import { formatCurrency } from "@/lib/pricing";
import { logger } from "@/lib/logger";

export type AlertDispatchPayload = {
  alertId: string;
  email: string;
  phone?: string | null;
  drugId: string;
  drugName: string;
  brandName?: string;
  price: number;
  baselinePrice: number;
  supplyDays: number;
  quantity: number;
};

export type DispatchResult = {
  channel: "email" | "sms";
  ok: boolean;
  skipped?: boolean;
  error?: string;
  providerId?: string;
};

function getResend(): Resend | null {
  if (!isResendConfigured()) return null;
  return new Resend(getEnv().RESEND_API_KEY!);
}

function getTwilio() {
  if (!isTwilioConfigured()) return null;
  const env = getEnv();
  return twilio(env.TWILIO_ACCOUNT_SID!, env.TWILIO_AUTH_TOKEN!);
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function sendAlertEmail(
  payload: AlertDispatchPayload
): Promise<DispatchResult> {
  const resend = getResend();
  const env = getEnv();
  if (!resend || !env.RESEND_FROM_EMAIL) {
    return { channel: "email", ok: false, skipped: true, error: "Resend not configured" };
  }

  try {
    const subject = `Trump RX price drop: ${payload.drugName} now ${formatCurrency(payload.price)}`;
    const html = `
      <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
        <h1 style="font-size: 20px;">Price alert</h1>
        <p>
          <strong>${payload.drugName}</strong>
          ${payload.brandName ? `(${payload.brandName})` : ""}
          dropped to <strong>${formatCurrency(payload.price)}</strong>
          (was tracking from ${formatCurrency(payload.baselinePrice)}).
        </p>
        <p>
          Qty ${payload.quantity} · ${payload.supplyDays}-day supply.
          Trump RX is a discount provider — <strong>not insurance</strong>.
          Compare with your plan copay before you fill.
        </p>
        <p>
          <a href="${env.NEXT_PUBLIC_APP_URL}/search?drug=${encodeURIComponent(payload.drugId)}">
            Compare prices
          </a>
        </p>
        <p style="font-size: 12px; color: #666;">
          You received this because you enabled a price alert on Trump RX.
        </p>
      </div>
    `;

    const result = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: payload.email,
      subject,
      html,
    });

    if (result.error) {
      return {
        channel: "email",
        ok: false,
        error: result.error.message,
      };
    }

    return {
      channel: "email",
      ok: true,
      providerId: result.data?.id,
    };
  } catch (err) {
    return {
      channel: "email",
      ok: false,
      error: err instanceof Error ? err.message : "Email send failed",
    };
  }
}

export async function sendAlertSms(
  payload: AlertDispatchPayload
): Promise<DispatchResult> {
  const client = getTwilio();
  const env = getEnv();
  if (!client || !env.TWILIO_FROM_NUMBER) {
    return { channel: "sms", ok: false, skipped: true, error: "Twilio not configured" };
  }
  if (!payload.phone) {
    return { channel: "sms", ok: false, skipped: true, error: "No phone on account" };
  }

  try {
    const body = `Trump RX: ${payload.drugName} now ${formatCurrency(payload.price)} (from ${formatCurrency(payload.baselinePrice)}). Not insurance — compare your copay. ${env.NEXT_PUBLIC_APP_URL}/search`;
    const msg = await client.messages.create({
      from: env.TWILIO_FROM_NUMBER,
      to: payload.phone,
      body,
    });
    return { channel: "sms", ok: true, providerId: msg.sid };
  } catch (err) {
    return {
      channel: "sms",
      ok: false,
      error: err instanceof Error ? err.message : "SMS send failed",
    };
  }
}

/** Dispatch email + optional SMS; never throws. */
export async function dispatchPriceAlert(
  payload: AlertDispatchPayload
): Promise<DispatchResult[]> {
  const results: DispatchResult[] = [];

  const email = await sendAlertEmail(payload);
  results.push(email);
  logger.info("alert_dispatch_email", { alertId: payload.alertId, ...email });

  const sms = await sendAlertSms(payload);
  results.push(sms);
  logger.info("alert_dispatch_sms", { alertId: payload.alertId, ...sms });

  return results;
}

export type ChatNotifyPayload = {
  conversationId: string;
  preview: string;
  topic?: string | null;
  pagePath?: string | null;
  visitorName?: string | null;
  visitorEmail?: string | null;
};

/** Email (and optional SMS) ADMIN_EMAILS when a visitor sends a chat message. */
export async function notifyAdminsOfChatMessage(
  payload: ChatNotifyPayload
): Promise<DispatchResult[]> {
  const env = getEnv();
  const emails = adminEmails();
  const results: DispatchResult[] = [];
  const inboxUrl = `${env.NEXT_PUBLIC_APP_URL}/admin/messages`;
  const who =
    payload.visitorName ||
    payload.visitorEmail ||
    "A visitor";
  const preview = payload.preview.slice(0, 280);

  const resend = getResend();
  if (resend && env.RESEND_FROM_EMAIL && emails.length > 0) {
    try {
      const result = await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: emails,
        subject: `Trump RX chat: ${who} needs help`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
            <h1 style="font-size: 18px;">New support message</h1>
            <p><strong>${who}</strong>${payload.visitorEmail ? ` · ${payload.visitorEmail}` : ""}</p>
            <p>Topic: ${payload.topic ?? "general"}${payload.pagePath ? ` · Page: ${payload.pagePath}` : ""}</p>
            <blockquote style="border-left: 3px solid #e24a2e; margin: 12px 0; padding-left: 12px;">
              ${preview.replace(/</g, "&lt;")}
            </blockquote>
            <p><a href="${inboxUrl}">Open support inbox</a></p>
          </div>
        `,
      });
      results.push(
        result.error
          ? { channel: "email", ok: false, error: result.error.message }
          : { channel: "email", ok: true, providerId: result.data?.id }
      );
    } catch (err) {
      results.push({
        channel: "email",
        ok: false,
        error: err instanceof Error ? err.message : "Chat email failed",
      });
    }
  } else {
    results.push({
      channel: "email",
      ok: false,
      skipped: true,
      error:
        emails.length === 0
          ? "ADMIN_EMAILS not set"
          : "Resend not configured",
    });
  }

  const smsTo = process.env.ADMIN_SMS_TO?.trim();
  const client = getTwilio();
  if (client && env.TWILIO_FROM_NUMBER && smsTo) {
    try {
      const msg = await client.messages.create({
        from: env.TWILIO_FROM_NUMBER,
        to: smsTo,
        body: `Trump RX chat from ${who}: ${preview.slice(0, 120)}… ${inboxUrl}`,
      });
      results.push({ channel: "sms", ok: true, providerId: msg.sid });
    } catch (err) {
      results.push({
        channel: "sms",
        ok: false,
        error: err instanceof Error ? err.message : "Chat SMS failed",
      });
    }
  }

  for (const r of results) {
    logger.info("chat_admin_notify", {
      conversationId: payload.conversationId,
      ...r,
    });
  }
  return results;
}
