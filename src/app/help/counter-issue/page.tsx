"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

export default function CounterIssuePage() {
  const [loading, setLoading] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<"counter_price" | "out_of_stock">(
    "counter_price"
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const expected = String(form.get("expectedPrice") || "");
    const charged = String(form.get("chargedPrice") || "");
    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email")),
          name: String(form.get("name") || "") || null,
          subject:
            category === "out_of_stock"
              ? "Out of stock at pharmacy"
              : "Counter price mismatch",
          category,
          body: String(form.get("body")),
          pharmacyName: String(form.get("pharmacyName") || "") || null,
          drugName: String(form.get("drugName") || "") || null,
          expectedPrice: expected ? Number(expected) : null,
          chargedPrice: charged ? Number(charged) : null,
          priority: "high",
        }),
      });
      const data = (await res.json()) as {
        ticket?: { id: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not submit.");
      setDoneId(data.ticket?.id ?? "ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Counter support</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Out of stock or price mismatch
          </h1>
          <p className="text-muted-foreground">
            If the pharmacy cannot fill today or the counter total differs from
            your Trump RX estimate, tell us what happened — we will triage it.
          </p>
        </header>

        <TrustCallout title="While you wait">
          Ask the pharmacist to check another strength/pack size, transfer the
          Rx, or compare your insurance copay. Bring the{" "}
          <Link href="/help/pharmacist" className="font-medium underline-offset-2 hover:underline">
            pharmacist guide
          </Link>
          .
        </TrustCallout>

        {doneId ? (
          <div className="rounded-2xl border border-savings/30 bg-savings/10 p-5 text-center">
            <CheckCircle2 className="mx-auto size-8 text-savings" />
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Support ticket opened
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team will review pharmacy processing issues. Keep your coupon
              screen and receipt if you have one.
            </p>
            <Link href="/search" className={cn(buttonVariants(), "mt-4")}>
              Compare another pharmacy
            </Link>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={category === "counter_price" ? "default" : "outline"}
                onClick={() => setCategory("counter_price")}
              >
                Price mismatch
              </Button>
              <Button
                type="button"
                variant={category === "out_of_stock" ? "default" : "outline"}
                onClick={() => setCategory("out_of_stock")}
              >
                Out of stock
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="drugName">Medication</Label>
                <Input id="drugName" name="drugName" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pharmacyName">Pharmacy</Label>
                <Input id="pharmacyName" name="pharmacyName" className="h-11" />
              </div>
              {category === "counter_price" && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="expectedPrice">App / coupon price</Label>
                    <Input
                      id="expectedPrice"
                      name="expectedPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="chargedPrice">Counter charged</Label>
                    <Input
                      id="chargedPrice"
                      name="chargedPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      className="h-11"
                    />
                  </div>
                </>
              )}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="body">What happened</Label>
                <textarea
                  id="body"
                  name="body"
                  required
                  minLength={10}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Include reject codes, time of visit, or stock ETA if available."
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="min-h-11" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Submit to support
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
