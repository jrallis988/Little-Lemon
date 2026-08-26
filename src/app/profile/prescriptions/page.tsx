"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarClock, Loader2, Pill, Receipt } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmptyState } from "@/components/design/empty-state";
import { TrustCallout } from "@/components/design/trust-callout";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface MedRow {
  id: string;
  strengthId: string;
  quantity: number;
  supplyDays: number;
  rxStatus: string;
  lastFilledAt: string | null;
  nextRefillAt: string | null;
  refillsRemaining: number | null;
  notes: string | null;
  drug: {
    id: string;
    genericName: string;
    brandName: string;
    strengths: Array<{ id: string; label: string }>;
  };
}

interface CouponRow {
  id: string;
  status: string;
  couponPrice: number;
  retailPrice: number;
  issuedAt: string;
  expiresAt: string;
  drug: { genericName: string; brandName: string };
  pharmacy: { name: string; city: string; state: string };
}

export default function PrescriptionsPage() {
  const [medications, setMedications] = useState<MedRow[]>([]);
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [refillReminders, setRefillReminders] = useState(true);
  const [reminderSaving, setReminderSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/me/prescriptions");
    if (res.status === 401) throw new Error("Sign in required");
    if (!res.ok) throw new Error("Could not load prescriptions.");
    const data = (await res.json()) as {
      medications: MedRow[];
      coupons: CouponRow[];
      refillRemindersEnabled?: boolean;
    };
    setMedications(data.medications);
    setCoupons(data.coupons);
    setRefillReminders(data.refillRemindersEnabled ?? true);
  }

  useEffect(() => {
    load()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function markRefilled(med: MedRow) {
    setSavingId(med.id);
    try {
      const next = new Date();
      next.setDate(next.getDate() + med.supplyDays);
      const res = await fetch("/api/me/prescriptions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: med.id,
          lastFilledAt: new Date().toISOString(),
          nextRefillAt: next.toISOString(),
          refillsRemaining:
            med.refillsRemaining == null
              ? null
              : Math.max(0, med.refillsRemaining - 1),
          rxStatus: "active",
        }),
      });
      if (!res.ok) throw new Error("Could not update refill.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  }

  async function setStatus(id: string, rxStatus: string) {
    setSavingId(id);
    try {
      const res = await fetch("/api/me/prescriptions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, rxStatus }),
      });
      if (!res.ok) throw new Error("Could not update status.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  }

  async function toggleAccountReminders(enabled: boolean) {
    setReminderSaving(true);
    setRefillReminders(enabled);
    try {
      const res = await fetch("/api/me/refill-reminders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refillRemindersEnabled: enabled }),
      });
      if (!res.ok) throw new Error("Could not update reminders.");
    } catch (err) {
      setRefillReminders(!enabled);
      setError(err instanceof Error ? err.message : "Could not update reminders.");
    } finally {
      setReminderSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading refill tracker…
      </div>
    );
  }

  if (error === "Sign in required") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Sign in required</h1>
        <p className="mt-2 text-muted-foreground">
          Track active fills and coupon history in your account.
        </p>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "mt-5")}>
          Sign in
        </Link>
      </div>
    );
  }

  const active = medications.filter((m) => m.rxStatus === "active");
  const other = medications.filter((m) => m.rxStatus !== "active");

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Account tools</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Saved medications & reminders
          </h1>
          <p className="text-muted-foreground">
            Organize included medications you care about and optional refill
            reminders. TrumpRx is not your pharmacy of record and does not own
            or fill these prescriptions — confirm everything with your pharmacy
            or manufacturer program.
          </p>
        </header>

        <TrustCallout title="Reminders are guidance only">
          TrumpRx does not dispense medication. When enabled, email/SMS reminders
          fire a few days before a tracked next refill date (requires Resend/Twilio
          in production).
        </TrustCallout>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3">
          <div>
            <p className="font-medium">Email & SMS refill reminders</p>
            <p className="text-sm text-muted-foreground">
              Account-wide toggle for active medications with a next refill date.
            </p>
          </div>
          <Switch
            checked={refillReminders}
            disabled={reminderSaving}
            onCheckedChange={(v) => void toggleAccountReminders(v)}
            aria-label="Enable refill reminders"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Link href="/search" className={cn(buttonVariants())}>
            Find prices
          </Link>
          <Link
            href="/transfer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Transfer a prescription
          </Link>
          <Link
            href="/profile"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Back to account
          </Link>
        </div>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">
            Reminder tracker
          </h2>
          {active.length === 0 ? (
            <EmptyState
              icon={Pill}
              title="No active medications tracked"
              description="Save a medication from search, then mark fills here."
              actionHref="/search"
              actionLabel="Search medications"
            />
          ) : (
            <ul className="space-y-3">
              {active.map((med) => {
                const strength = med.drug.strengths.find(
                  (s) => s.id === med.strengthId
                );
                return (
                  <li
                    key={med.id}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold capitalize">
                          {med.drug.genericName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Brand {med.drug.brandName} · {strength?.label} · Qty{" "}
                          {med.quantity} · {med.supplyDays}-day
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize">
                        {med.rxStatus}
                      </span>
                    </div>
                    <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                      <div className="rounded-xl bg-muted/50 px-3 py-2">
                        <dt className="text-muted-foreground">Last filled</dt>
                        <dd className="font-medium">
                          {med.lastFilledAt
                            ? new Date(med.lastFilledAt).toLocaleDateString()
                            : "Not set"}
                        </dd>
                      </div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CalendarClock className="size-3.5" /> Next refill
                        </dt>
                        <dd className="font-medium">
                          {med.nextRefillAt
                            ? new Date(med.nextRefillAt).toLocaleDateString()
                            : "Estimate after first fill"}
                        </dd>
                      </div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2">
                        <dt className="text-muted-foreground">Refills left</dt>
                        <dd className="font-medium">
                          {med.refillsRemaining ?? "Ask pharmacist"}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        disabled={savingId === med.id}
                        onClick={() => void markRefilled(med)}
                      >
                        {savingId === med.id && (
                          <Loader2 className="animate-spin" />
                        )}
                        Mark filled today
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={savingId === med.id}
                        onClick={() => void setStatus(med.id, "paused")}
                      >
                        Pause
                      </Button>
                      <Link
                        href={`/search?drug=${med.drug.id}`}
                        className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
                      >
                        Compare prices
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {other.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold">Paused / completed</h2>
            <ul className="space-y-2">
              {other.map((med) => (
                <li
                  key={med.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-sm"
                >
                  <span className="capitalize">
                    {med.drug.genericName} · {med.rxStatus}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void setStatus(med.id, "active")}
                  >
                    Reactivate
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">Coupon history</h2>
          {coupons.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No coupons issued yet"
              description="When you generate a coupon or digital pass, it will appear here."
              actionHref="/search"
              actionLabel="Get a coupon"
            />
          ) : (
            <ul className="space-y-2">
              {coupons.map((c) => (
                <li
                  key={c.id}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium capitalize">{c.drug.genericName}</p>
                      <p className="text-muted-foreground">
                        {c.pharmacy.name} · {c.pharmacy.city}, {c.pharmacy.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-semibold tabular-nums text-primary">
                        {formatCurrency(c.couponPrice)}
                      </p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {c.status} · {new Date(c.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
