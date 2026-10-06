"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function FailedPaymentRetryPage() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [expiry, setExpiry] = useState("12/30");
  const [cvc, setCvc] = useState("123");
  const [zip, setZip] = useState("03885");

  async function retry(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "retry",
          payment: { nameOnCard, cardNumber, expiry, cvc, zip },
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Retry failed.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MemberScreen
      eyebrow="Screen 66 · Failed payment"
      title="Retry payment"
      subtitle="Update your card and retry the past-due amount without leaving the app."
    >
      <MemberCard>
        {done ? (
          <div className="space-y-2 text-center">
            <p className="font-display text-2xl text-emerald-700">Payment cleared</p>
            <p className="text-sm text-pf-ink/65">
              Dunning cleared and membership set back to active.
            </p>
            <Button asChild variant="purple" className="mt-2 w-full">
              <a href="/app/billing">Back to billing</a>
            </Button>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={retry}>
            <p className="rounded-2xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Retries authorize through the payment adapter and clear open/failed invoices.
            </p>
            <Input
              className="border-pf-line"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              required
            />
            <Input
              className="border-pf-line"
              placeholder="Card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                className="border-pf-line"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
              <Input
                className="border-pf-line"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
              <Input
                className="border-pf-line"
                placeholder="ZIP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" variant="purple" className="w-full" disabled={submitting}>
              {submitting ? "Retrying…" : "Retry & update card"}
            </Button>
          </form>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
