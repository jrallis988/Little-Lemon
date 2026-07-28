import { Resend } from "resend";
import twilio from "twilio";
import { getEnv, isResendConfigured, isTwilioConfigured } from "@/lib/env";
import { formatCurrency } from "@/lib/pricing";

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

/** Dispatch email + optional SMS; never throws — logs each channel result. */
export async function dispatchPriceAlert(
  payload: AlertDispatchPayload
): Promise<DispatchResult[]> {
  const results: DispatchResult[] = [];

  const email = await sendAlertEmail(payload);
  results.push(email);
  console.info("[alert-dispatch]", payload.alertId, email);

  const sms = await sendAlertSms(payload);
  results.push(sms);
  console.info("[alert-dispatch]", payload.alertId, sms);

  return results;
}
