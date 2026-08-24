"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustCallout } from "@/components/design/trust-callout";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type PlanType = "commercial" | "medicare_part_d" | "medicaid" | "other";

interface SavedPlan {
  planType: PlanType;
  carrierName: string | null;
  memberIdMasked: string | null;
  annualDeductible: number | null;
  deductibleMet: number | null;
  remainingDeductible: number;
  typicalCopay: number | null;
  updatedAt?: string;
}

const PLAN_TYPES: Array<{ id: PlanType; label: string }> = [
  { id: "commercial", label: "Commercial / employer" },
  { id: "medicare_part_d", label: "Medicare Part D" },
  { id: "medicaid", label: "Medicaid" },
  { id: "other", label: "Other / not sure" },
];

export default function InsuranceProfilePage() {
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [planType, setPlanType] = useState<PlanType>("commercial");
  const [carrierName, setCarrierName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [annualDeductible, setAnnualDeductible] = useState("");
  const [deductibleMet, setDeductibleMet] = useState("");
  const [typicalCopay, setTypicalCopay] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/insurance/plan-import");
    if (res.status === 401) throw new Error("Sign in required");
    if (!res.ok) throw new Error("Could not load plan.");
    const data = (await res.json()) as { plan: SavedPlan | null };
    if (data.plan) {
      setPlan(data.plan);
      setPlanType(data.plan.planType);
      setCarrierName(data.plan.carrierName ?? "");
      setDeductibleMet(String(data.plan.deductibleMet ?? ""));
      setAnnualDeductible(String(data.plan.annualDeductible ?? ""));
      setTypicalCopay(
        data.plan.typicalCopay != null ? String(data.plan.typicalCopay) : ""
      );
    }
  }

  useEffect(() => {
    load()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/insurance/plan-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          carrierName: carrierName || null,
          memberId: memberId || null,
          annualDeductible: annualDeductible ? Number(annualDeductible) : null,
          deductibleMet: deductibleMet ? Number(deductibleMet) : null,
          typicalCopay: typicalCopay ? Number(typicalCopay) : null,
        }),
      });
      const data = (await res.json()) as { message?: string; error?: string; plan?: SavedPlan };
      if (!res.ok) throw new Error(data.error ?? "Could not save plan.");
      setPlan(data.plan ?? null);
      setMemberId("");
      setMessage(data.message ?? "Plan saved.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save plan.");
    } finally {
      setSaving(false);
    }
  }

  async function removePlan() {
    setSaving(true);
    try {
      const res = await fetch("/api/insurance/plan-import", { method: "DELETE" });
      if (!res.ok) throw new Error("Could not remove plan.");
      setPlan(null);
      setCarrierName("");
      setMemberId("");
      setAnnualDeductible("");
      setDeductibleMet("");
      setTypicalCopay("");
      setMessage("Plan removed from your account.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove plan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading insurance profile…
      </div>
    );
  }

  if (error === "Sign in required") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Sign in required</h1>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "mt-5")}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Account</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Insurance plan
          </h1>
          <p className="text-muted-foreground">
            Save deductible and copay estimates for the Insurance vs cash tool on
            search results. Not eligibility verification.
          </p>
        </header>

        <TrustCallout variant="warning" title="Not insurance advice">
          Trump RX does not bill your plan. These fields help you compare coupon
          prices with what you expect to pay through insurance.
        </TrustCallout>

        {plan && (
          <section className="rounded-2xl border border-savings/30 bg-savings/10 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-5 text-savings" />
              <div>
                <p className="font-semibold capitalize">
                  {plan.carrierName ?? plan.planType.replaceAll("_", " ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan.memberIdMasked ? `Member ${plan.memberIdMasked}` : "No member ID saved"}
                  {plan.typicalCopay != null &&
                    ` · Typical copay ${formatCurrency(plan.typicalCopay)}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  Deductible remaining{" "}
                  {formatCurrency(plan.remainingDeductible)}
                </p>
              </div>
            </div>
          </section>
        )}

        <form
          onSubmit={save}
          className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
        >
          <h2 className="font-display text-xl font-semibold">
            {plan ? "Update plan" : "Add plan details"}
          </h2>

          <div className="flex flex-wrap gap-2">
            {PLAN_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanType(p.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium",
                  planType === p.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-muted"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="carrier">Carrier / plan name</Label>
              <Input
                id="carrier"
                value={carrierName}
                onChange={(e) => setCarrierName(e.target.value)}
                placeholder="e.g. Blue Cross PPO"
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="memberId">Member ID (optional)</Label>
              <Input
                id="memberId"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Last 4 stored only"
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="copay">Typical copay</Label>
              <Input
                id="copay"
                inputMode="decimal"
                value={typicalCopay}
                onChange={(e) => setTypicalCopay(e.target.value)}
                placeholder="45.00"
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deductible">Annual deductible</Label>
              <Input
                id="deductible"
                inputMode="decimal"
                value={annualDeductible}
                onChange={(e) => setAnnualDeductible(e.target.value)}
                placeholder="1500"
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="met">Deductible met so far</Label>
              <Input
                id="met"
                inputMode="decimal"
                value={deductibleMet}
                onChange={(e) => setDeductibleMet(e.target.value)}
                placeholder="200"
                className="h-11"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-muted-foreground" role="status">
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" size="lg" className="min-h-11" disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              Save plan
            </Button>
            {plan && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="min-h-11"
                disabled={saving}
                onClick={() => void removePlan()}
              >
                Remove
              </Button>
            )}
          </div>
        </form>

        <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
          ← Back to account
        </Link>
      </div>
    </div>
  );
}
