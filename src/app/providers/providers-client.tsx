"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Stethoscope } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

export default function ProvidersClient() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email")),
          name: String(form.get("name") || "") || null,
          subject: `Provider inquiry: ${String(form.get("organization") || "Practice")}`,
          category: "other",
          body: [
            `Role: ${String(form.get("role") || "provider")}`,
            `Organization: ${String(form.get("organization") || "—")}`,
            `NPI (optional): ${String(form.get("npi") || "—")}`,
            `Phone: ${String(form.get("phone") || "—")}`,
            "",
            String(form.get("message") || ""),
          ].join("\n"),
          priority: "normal",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not submit inquiry.");
      setDone(true);
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit inquiry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <header className="space-y-2">
          <p className="text-sm font-medium text-primary">For clinicians</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Provider portal
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Help patients compare cash-discount pharmacy prices and use Trump RX
            coupons at the counter — without replacing clinical judgment or
            insurance benefits.
          </p>
        </header>

        <TrustCallout title="Private discount program">
          Trump RX is not a government plan and does not bill insurance. Share
          the pharmacist guide and Insurance vs cash tool when patients ask about
          cash-pay fills.
        </TrustCallout>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Share pricing links",
              body: "Send patients to Compare prices with their medication name.",
            },
            {
              title: "Counter guidance",
              body: "Print the pharmacist processing guide for discount-card claims.",
            },
            {
              title: "Transfer support",
              body: "Patients can request Rx transfers to network pharmacies.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-4 text-sm"
            >
              <Stethoscope className="size-5 text-primary" />
              <p className="mt-2 font-semibold">{card.title}</p>
              <p className="mt-1 text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap gap-2">
          <Link href="/search" className={cn(buttonVariants())}>
            Open price search
          </Link>
          <Link
            href="/help/pharmacist"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Pharmacist guide
          </Link>
          <Link
            href="/transfer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Transfer flow
          </Link>
        </div>

        {done ? (
          <div className="rounded-2xl border border-savings/30 bg-savings/10 p-5 text-center">
            <CheckCircle2 className="mx-auto size-8 text-savings" />
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Inquiry received
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our partnerships team will follow up about clinic materials and
              onboarding.
            </p>
            <Button className="mt-4" variant="outline" onClick={() => setDone(false)}>
              Submit another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
          >
            <h2 className="font-display text-xl font-semibold">
              Request provider materials
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="organization">Clinic / organization</Label>
                <Input id="organization" name="organization" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Physician, NP, pharmacist…"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="npi">NPI (optional)</Label>
                <Input id="npi" name="npi" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" className="h-11" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="message">How can we help?</Label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Patient education kits, EHR linkouts, pharmacy network questions…"
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
              Submit inquiry
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
