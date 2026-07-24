"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { PRESCRIPTIONS } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/pharmacy";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PrescriptionTracker } from "@/components/pharmacy/prescription-tracker";
import { ProfileSwitcher } from "@/components/pharmacy/profile-switcher";

export function PharmacyDashboard() {
  const [profileId, setProfileId] = useState("profile-self");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const prescriptions = useMemo(
    () => PRESCRIPTIONS.filter((rx) => rx.profileId === profileId),
    [profileId],
  );

  const refillable = prescriptions.filter(
    (rx) => rx.refillsRemaining > 0 && rx.status !== "filling",
  );

  function toggleRx(id: string, checked: boolean) {
    setSelectedIds((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id),
    );
  }

  return (
    <section aria-labelledby="pharmacy-dashboard-heading" className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id="pharmacy-dashboard-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Pharmacy & health
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Refill in a few taps, track fills visually, and switch caregiver
            profiles without losing context.
          </p>
        </div>
        <ProfileSwitcher
          value={profileId}
          onChange={(id) => {
            setProfileId(id);
            setSelectedIds([]);
          }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-sm text-muted-foreground lg:col-span-2">
            No active prescriptions for this profile.
          </p>
        ) : (
          prescriptions.map((rx) => (
            <PrescriptionTracker key={rx.id} prescription={rx} />
          ))
        )}
      </div>

      <div className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Quick refill
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select prescriptions to refill for the active profile.
            </p>
          </div>
          <Button
            disabled={selectedIds.length === 0}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <RefreshCw className="size-4" aria-hidden />
            Refill selected ({selectedIds.length})
          </Button>
        </div>

        <ul className="mt-5 divide-y divide-border/70" role="list">
          {refillable.map((rx) => {
            const checked = selectedIds.includes(rx.id);
            const fieldId = `refill-${rx.id}`;
            return (
              <li key={rx.id} className="flex items-start gap-3 py-4">
                <Checkbox
                  id={fieldId}
                  checked={checked}
                  onCheckedChange={(value) => toggleRx(rx.id, value === true)}
                  className="mt-1"
                />
                <Label htmlFor={fieldId} className="flex-1 cursor-pointer">
                  <span className="block text-sm font-medium text-foreground">
                    {rx.medicationName}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {rx.dosage} · {rx.refillsRemaining} refills left
                    {typeof rx.estimatedCopay === "number"
                      ? ` · est. ${formatCurrency(rx.estimatedCopay)}`
                      : ""}
                  </span>
                </Label>
              </li>
            );
          })}
          {refillable.length === 0 ? (
            <li className="py-6 text-sm text-muted-foreground">
              Nothing ready to refill right now.
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
