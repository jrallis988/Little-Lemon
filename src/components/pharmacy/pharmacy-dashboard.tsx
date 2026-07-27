"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";

import { formatCurrency } from "@/lib/pharmacy";
import { usePharmacy } from "@/lib/store/pharmacy";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PrescriptionTracker } from "@/components/pharmacy/prescription-tracker";
import { ProfileSwitcher } from "@/components/pharmacy/profile-switcher";

export function PharmacyDashboard() {
  const { prescriptions, refillPrescriptions, advancingIds } = usePharmacy();
  const [profileId, setProfileId] = useState("profile-self");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastRefillCount, setLastRefillCount] = useState(0);

  const profilePrescriptions = useMemo(
    () => prescriptions.filter((rx) => rx.profileId === profileId),
    [prescriptions, profileId],
  );

  const refillable = profilePrescriptions.filter(
    (rx) =>
      rx.refillsRemaining > 0 &&
      rx.status !== "filling" &&
      rx.status !== "received",
  );

  const isAdvancing = advancingIds.some((id) =>
    profilePrescriptions.some((rx) => rx.id === id),
  );

  function toggleRx(id: string, checked: boolean) {
    setSelectedIds((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id),
    );
  }

  function handleRefill() {
    if (selectedIds.length === 0) return;
    const count = selectedIds.length;
    refillPrescriptions(selectedIds);
    setLastRefillCount(count);
    setSelectedIds([]);
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

      {lastRefillCount > 0 ? (
        <div
          className="flex items-start gap-3 rounded-xl border border-health/25 bg-health/10 px-4 py-3 text-sm text-foreground"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-health" aria-hidden />
          <p>
            Refill submitted for {lastRefillCount} prescription
            {lastRefillCount === 1 ? "" : "s"}. Watch the tracker move from
            Received → Filling → Ready.
            {isAdvancing ? " Pharmacy is processing now…" : ""}
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {profilePrescriptions.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-sm text-muted-foreground lg:col-span-2">
            No active prescriptions for this profile.
          </p>
        ) : (
          profilePrescriptions.map((rx) => (
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
            disabled={selectedIds.length === 0 || isAdvancing}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            onClick={handleRefill}
          >
            <RefreshCw
              className={`size-4 ${isAdvancing ? "animate-spin" : ""}`}
              aria-hidden
            />
            {isAdvancing
              ? "Processing…"
              : `Refill selected (${selectedIds.length})`}
          </Button>
        </div>

        <ul className="mt-5 divide-y divide-border/70" role="list">
          {refillable.map((rx) => {
            const checked = selectedIds.includes(rx.id);
            const labelId = `refill-label-${rx.id}`;
            return (
              <li key={rx.id} className="flex items-start gap-3 py-4">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => toggleRx(rx.id, value === true)}
                  className="mt-1"
                  disabled={isAdvancing}
                  aria-labelledby={labelId}
                />
                <button
                  type="button"
                  id={labelId}
                  className="flex-1 cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isAdvancing}
                  onClick={() => toggleRx(rx.id, !checked)}
                >
                  <span className="block text-sm font-medium text-foreground">
                    {rx.medicationName}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {rx.dosage} · {rx.refillsRemaining} refills left
                    {typeof rx.estimatedCopay === "number"
                      ? ` · est. ${formatCurrency(rx.estimatedCopay)}`
                      : ""}
                  </span>
                </button>
              </li>
            );
          })}
          {refillable.length === 0 ? (
            <li className="py-6 text-sm text-muted-foreground">
              {isAdvancing
                ? "Fill in progress — trackers above are updating."
                : "Nothing ready to refill right now."}
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
