/**
 * Payment adapter.
 * - With STRIPE_SECRET_KEY: creates a PaymentIntent (manual capture / authorize-style)
 * - Without: test authorization that never charges a real processor
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

      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
      const data = (await response.json()) as {
        id?: string;
        status?: string;
        error?: { message?: string };
      };

      if (!response.ok || data.error) {
        return {
          ok: false,
          processor: "stripe",
          paymentStatus: "failed",
          reference: data.id ?? null,
          last4,
          brand,
          message: data.error?.message ?? "Stripe payment failed.",
        };
      }

      return {
        ok: true,
        processor: "stripe",
        paymentStatus: "stripe_authorized",
        reference: data.id ?? null,
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
  // Stripe test Visa 4242… also works here for local QA.
  return {
    ok: true,
    processor: "test",
    paymentStatus: "test_authorized",
    reference: `test_${Date.now()}`,
    last4,
    brand,
  };
}

export function paymentsConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
