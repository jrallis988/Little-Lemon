"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

function ElementsForm({
  membershipId,
  onPaid,
  onError,
}: {
  membershipId: string;
  onPaid: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  async function pay() {
    if (!stripe || !elements) return;
    setSubmitting(true);
    onError("");
    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/join/checkout/success?membershipId=${membershipId}`,
        },
      });
      if (result.error) {
        onError(result.error.message ?? "Payment failed.");
        return;
      }
      const intentId = result.paymentIntent?.id;
      if (!intentId) {
        onError("Payment did not return an intent id.");
        return;
      }
      onPaid(intentId);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <PaymentElement />
      <Button
        type="button"
        variant="purple"
        className="w-full"
        disabled={!stripe || submitting}
        onClick={() => void pay()}
      >
        {submitting ? "Processing…" : "Pay with Stripe Elements"}
      </Button>
    </div>
  );
}

export function StripeElementsPay({
  publishableKey,
  clientSecret,
  membershipId,
  onPaid,
  onError,
}: {
  publishableKey: string;
  clientSecret: string;
  membershipId: string;
  onPaid: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    setStripePromise(loadStripe(publishableKey));
  }, [publishableKey]);

  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe" as const,
        variables: { colorPrimary: "#3d0958" },
      },
    }),
    [clientSecret]
  );

  if (!stripePromise) {
    return <p className="text-sm text-pf-ink/60">Loading Stripe…</p>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <ElementsForm
        membershipId={membershipId}
        onPaid={onPaid}
        onError={onError}
      />
    </Elements>
  );
}
