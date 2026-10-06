/**
 * Payment adapter.
 * - Test mode (no STRIPE_SECRET_KEY): authorize locally, never charges a processor
 * - Stripe Checkout: hosted checkout session redirect
 * - Stripe Elements / PaymentIntent: client_secret for card Element confirmation
 * - Legacy card authorize: server-side PaymentIntent (PCI-sensitive; prefer Checkout/Elements)
 *
 * Card numbers are never persisted — only last4 + brand reach membership storage.
 */

export type PaymentAuthorizeInput = {
  amountCents: number;
  currency?: string;
  customerEmail: string;
  customerName: string;
  description: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  billingZip: string;
};

export type PaymentAuthorizeResult = {
  ok: boolean;
  processor: "test" | "stripe";
  paymentStatus: "test_authorized" | "stripe_authorized" | "failed";
  reference: string | null;
  last4: string;
  brand: string;
  message?: string;
};

export type CheckoutSessionInput = {
  amountCents: number;
  currency?: string;
  customerEmail: string;
  customerName: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
};

export type CheckoutSessionResult =
  | { ok: true; sessionId: string; url: string }
  | { ok: false; message: string };

export type PaymentIntentInput = {
  amountCents: number;
  currency?: string;
  customerEmail: string;
  description: string;
  metadata?: Record<string, string>;
};

export type PaymentIntentResult =
  | {
      ok: true;
      clientSecret: string;
      paymentIntentId: string;
    }
  | { ok: false; message: string };

function guessBrand(digits: string) {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6/.test(digits)) return "Discover";
  return "Card";
}

function basicLuhn(digits: string) {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (Number.isNaN(n)) return false;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

async function stripeForm(
  path: string,
  params: URLSearchParams
): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return { ok: false, data: { error: { message: "Stripe is not configured." } } };
  }
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const data = (await response.json()) as Record<string, unknown>;
  return { ok: response.ok, data };
}

export async function authorizePayment(
  input: PaymentAuthorizeInput
): Promise<PaymentAuthorizeResult> {
  const digits = input.cardNumber.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  const brand = guessBrand(digits);

  if (digits.length < 13 || digits.length > 19 || !basicLuhn(digits)) {
    return {
      ok: false,
      processor: process.env.STRIPE_SECRET_KEY ? "stripe" : "test",
      paymentStatus: "failed",
      reference: null,
      last4: last4 || "0000",
      brand,
      message: "Enter a valid card number.",
    };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    try {
      const params = new URLSearchParams({
        amount: String(Math.max(50, input.amountCents)),
        currency: input.currency ?? "usd",
        confirm: "true",
        "payment_method_data[type]": "card",
        "payment_method_data[card][number]": digits,
        "payment_method_data[card][exp_month]": input.expiryMonth,
        "payment_method_data[card][exp_year]": input.expiryYear,
        "payment_method_data[card][cvc]": input.cvc,
        "payment_method_data[billing_details][name]": input.customerName,
        "payment_method_data[billing_details][email]": input.customerEmail,
        "payment_method_data[billing_details][address][postal_code]":
          input.billingZip,
        description: input.description,
        "metadata[source]": "pf-acquisition-join",
      });

      const { ok, data } = await stripeForm("/payment_intents", params);
      const error = data.error as { message?: string } | undefined;

      if (!ok || error) {
        return {
          ok: false,
          processor: "stripe",
          paymentStatus: "failed",
          reference: typeof data.id === "string" ? data.id : null,
          last4,
          brand,
          message: error?.message ?? "Stripe payment failed.",
        };
      }

      return {
        ok: true,
        processor: "stripe",
        paymentStatus: "stripe_authorized",
        reference: typeof data.id === "string" ? data.id : null,
        last4,
        brand,
      };
    } catch {
      return {
        ok: false,
        processor: "stripe",
        paymentStatus: "failed",
        reference: null,
        last4,
        brand,
        message: "Could not reach Stripe. Try again.",
      };
    }
  }

  // Test mode: authorize without charging a processor.
  return {
    ok: true,
    processor: "test",
    paymentStatus: "test_authorized",
    reference: `test_${Date.now()}`,
    last4,
    brand,
  };
}

/** Stripe Checkout Session — preferred hosted payment path. */
export async function createCheckoutSession(
  input: CheckoutSessionInput
): Promise<CheckoutSessionResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ok: false, message: "Stripe is not configured." };
  }

  try {
    const params = new URLSearchParams({
      mode: "payment",
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      customer_email: input.customerEmail,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": input.currency ?? "usd",
      "line_items[0][price_data][unit_amount]": String(
        Math.max(50, input.amountCents)
      ),
      "line_items[0][price_data][product_data][name]": input.description,
      "payment_intent_data[metadata][source]": "pf-acquisition-checkout",
      "payment_intent_data[description]": input.description,
    });

    if (input.metadata) {
      for (const [key, value] of Object.entries(input.metadata)) {
        params.set(`metadata[${key}]`, value);
        params.set(`payment_intent_data[metadata][${key}]`, value);
      }
    }

    const { ok, data } = await stripeForm("/checkout/sessions", params);
    const error = data.error as { message?: string } | undefined;
    if (!ok || error || typeof data.url !== "string" || typeof data.id !== "string") {
      return {
        ok: false,
        message: error?.message ?? "Could not create Stripe Checkout session.",
      };
    }

    return { ok: true, sessionId: data.id, url: data.url };
  } catch {
    return { ok: false, message: "Could not reach Stripe Checkout." };
  }
}

/** PaymentIntent for Stripe Elements confirmation on the client. */
export async function createElementsPaymentIntent(
  input: PaymentIntentInput
): Promise<PaymentIntentResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ok: false, message: "Stripe is not configured." };
  }

  try {
    const params = new URLSearchParams({
      amount: String(Math.max(50, input.amountCents)),
      currency: input.currency ?? "usd",
      "automatic_payment_methods[enabled]": "true",
      receipt_email: input.customerEmail,
      description: input.description,
      "metadata[source]": "pf-acquisition-elements",
    });
    if (input.metadata) {
      for (const [key, value] of Object.entries(input.metadata)) {
        params.set(`metadata[${key}]`, value);
      }
    }

    const { ok, data } = await stripeForm("/payment_intents", params);
    const error = data.error as { message?: string } | undefined;
    if (
      !ok ||
      error ||
      typeof data.client_secret !== "string" ||
      typeof data.id !== "string"
    ) {
      return {
        ok: false,
        message: error?.message ?? "Could not create PaymentIntent.",
      };
    }

    return {
      ok: true,
      clientSecret: data.client_secret,
      paymentIntentId: data.id,
    };
  } catch {
    return { ok: false, message: "Could not reach Stripe." };
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return null;
  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: { Authorization: `Bearer ${stripeKey}` },
        cache: "no-store",
      }
    );
    if (!response.ok) return null;
    return (await response.json()) as {
      id: string;
      payment_status?: string;
      payment_intent?: string | { id?: string };
      customer_details?: { email?: string; name?: string };
      metadata?: Record<string, string>;
      amount_total?: number;
    };
  } catch {
    return null;
  }
}

export function paymentsConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripePublishableKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
}

export function preferredStripeMode(): "checkout" | "elements" | "none" {
  if (!paymentsConfigured()) return "none";
  if (stripePublishableKey()) return "elements";
  return "checkout";
}
