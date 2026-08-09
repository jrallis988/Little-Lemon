"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MemberCard,
  MemberScreen,
} from "@/components/member/member-ui";

export default function FailedPaymentRetryPage() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function retry(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    setSubmitting(false);
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
              Your membership is active again. Check-in and keytag are unlocked.
            </p>
            <Button asChild variant="purple" className="mt-2 w-full">
              <a href="/app/billing">Back to billing</a>
            </Button>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={retry}>
            <p className="rounded-2xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
              Past due: <span className="font-semibold">$24.99</span> monthly dues
              failed on the last attempt.
            </p>
            <div>
              <label className="text-xs font-semibold text-pf-ink/65" htmlFor="card">
                Card number
              </label>
              <Input
                id="card"
                className="mt-1 border-pf-line"
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-pf-ink/65" htmlFor="exp">
                  Expiry
                </label>
                <Input id="exp" className="mt-1 border-pf-line" placeholder="MM/YY" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-pf-ink/65" htmlFor="cvc">
                  CVC
                </label>
                <Input id="cvc" className="mt-1 border-pf-line" required />
              </div>
            </div>
            <Button type="submit" variant="purple" className="w-full" disabled={submitting}>
              {submitting ? "Retrying…" : "Retry $24.99"}
            </Button>
          </form>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
