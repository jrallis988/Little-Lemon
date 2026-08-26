"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

interface PharmacyOption {
  id: string;
  name: string;
  city: string;
  state: string;
}

export default function TransferPage() {
  const [pharmacies, setPharmacies] = useState<PharmacyOption[]>([]);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pharmacies?limit=40")
      .then(async (res) => {
        if (!res.ok) return;
        const data = (await res.json()) as {
          pharmacies?: PharmacyOption[];
          results?: PharmacyOption[];
        };
        setPharmacies(data.pharmacies ?? data.results ?? []);
      })
      .catch(() => undefined);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const toPharmacyId = String(form.get("toPharmacyId") || "");
    try {
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: String(form.get("patientName")),
          contactEmail: String(form.get("contactEmail") || "") || null,
          contactPhone: String(form.get("contactPhone") || "") || null,
          drugName: String(form.get("drugName")),
          strength: String(form.get("strength") || "") || null,
          quantity: String(form.get("quantity") || "") || null,
          fromPharmacyName: String(form.get("fromPharmacyName")),
          fromPharmacyPhone: String(form.get("fromPharmacyPhone") || "") || null,
          toPharmacyId: toPharmacyId || null,
          notes: String(form.get("notes") || "") || null,
        }),
      });
      const data = (await res.json()) as {
        transfer?: { id: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not submit transfer.");
      setSubmittedId(data.transfer?.id ?? "ok");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit transfer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">
            Connection to your pharmacy
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Request a transfer to a participating pharmacy
          </h1>
          <p className="text-muted-foreground">
            TrumpRx does not take ownership of your prescription. This form asks
            a participating pharmacy to request a transfer from your current
            pharmacy — they complete the call. Only useful when the medication’s
            access path is pharmacy pickup.
          </p>
        </header>

        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            "Share current pharmacy details",
            "Choose a participating pharmacy",
            "Receiving pharmacy requests the transfer",
          ].map((step, i) => (
            <li
              key={step}
              className="rounded-2xl border border-border bg-card p-4 text-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Step {i + 1}
              </p>
              <p className="mt-1 font-medium">{step}</p>
            </li>
          ))}
        </ol>

        <TrustCallout title="Controlled substances may differ">
          Some medications cannot transfer the same way in every state. Your
          pharmacist will confirm eligibility.
        </TrustCallout>

        {submittedId ? (
          <div className="rounded-2xl border border-savings/30 bg-savings/10 p-5 text-center">
            <CheckCircle2 className="mx-auto size-8 text-savings" />
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Transfer request received
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep your current bottle handy. Compare prices at the new pharmacy
              before you pick up.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/pharmacies" className={cn(buttonVariants())}>
                Find pharmacies
              </Link>
              <Link
                href="/help/pharmacist"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Pharmacist guide
              </Link>
              <Button variant="ghost" onClick={() => setSubmittedId(null)}>
                Submit another
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="patientName">Patient name</Label>
                <Input id="patientName" name="patientName" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input id="contactPhone" name="contactPhone" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="drugName">Medication</Label>
                <Input
                  id="drugName"
                  name="drugName"
                  required
                  placeholder="atorvastatin"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="strength">Strength / quantity</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="strength" name="strength" placeholder="10 mg" className="h-11" />
                  <Input id="quantity" name="quantity" placeholder="Qty 30" className="h-11" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fromPharmacyName">Current pharmacy</Label>
                <Input
                  id="fromPharmacyName"
                  name="fromPharmacyName"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fromPharmacyPhone">Current pharmacy phone</Label>
                <Input id="fromPharmacyPhone" name="fromPharmacyPhone" className="h-11" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="toPharmacyId">Preferred Trump RX pharmacy</Label>
                <select
                  id="toPharmacyId"
                  name="toPharmacyId"
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                  defaultValue=""
                >
                  <option value="">Choose from nearby network…</option>
                  {pharmacies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.city}, {p.state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Notes for the pharmacy</Label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
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
              Submit transfer request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
