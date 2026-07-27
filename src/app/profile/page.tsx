"use client";

import Link from "next/link";
import { Bell, BellOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getDrugById } from "@/lib/data/drugs";
import { getPharmacyById } from "@/lib/data/pharmacies";
import { formatCurrency, generateOffersForDrug } from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import { useProfileStore } from "@/lib/store/profile-store";

export default function ProfilePage() {
  const location = useLocationStore((s) => s.location);
  const displayName = useProfileStore((s) => s.displayName);
  const setDisplayName = useProfileStore((s) => s.setDisplayName);
  const savedMedications = useProfileStore((s) => s.savedMedications);
  const preferredPharmacyIds = useProfileStore((s) => s.preferredPharmacyIds);
  const removeMedication = useProfileStore((s) => s.removeMedication);
  const setPriceAlert = useProfileStore((s) => s.setPriceAlert);
  const allowPersonalizedTips = useProfileStore((s) => s.allowPersonalizedTips);
  const setAllowPersonalizedTips = useProfileStore(
    (s) => s.setAllowPersonalizedTips
  );
  const togglePreferredPharmacy = useProfileStore(
    (s) => s.togglePreferredPharmacy
  );

  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8 sm:px-6">
        <header className="space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            My medications
          </h1>
          <p className="text-lg text-muted-foreground">
            Optional local profile — no account required. Saved meds and
            preferences stay in this browser.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Light profile</h2>
          <div className="space-y-1.5">
            <Label htmlFor="display-name">Display name (optional)</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Alex"
              className="h-11 max-w-sm text-base"
            />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-3 py-3">
            <div>
              <p className="font-medium">Personalized savings tips</p>
              <p className="text-sm text-muted-foreground">
                Opt-in only. Off by default. We never sell search history.
              </p>
            </div>
            <Switch
              checked={allowPersonalizedTips}
              onCheckedChange={setAllowPersonalizedTips}
              aria-label="Allow personalized savings tips"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold">Saved meds</h2>
            <Button render={<Link href="/search" />} variant="outline">
              Add from search
            </Button>
          </div>

          {savedMedications.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-10 text-center text-muted-foreground">
              No saved medications yet. Search a drug and tap{" "}
              <strong className="text-foreground">Save medication</strong>.
            </p>
          ) : (
            <ul className="space-y-3">
              {savedMedications.map((med) => {
                const drug = getDrugById(med.drugId);
                if (!drug) return null;
                const strength = drug.strengths.find(
                  (s) => s.id === med.strengthId
                );
                const current = generateOffersForDrug(
                  drug,
                  {
                    strengthId: med.strengthId,
                    quantity: med.quantity,
                    supplyDays: med.supplyDays,
                  },
                  location
                ).sort(
                  (a, b) => a.offer.couponPrice - b.offer.couponPrice
                )[0];

                return (
                  <li
                    key={`${med.drugId}-${med.strengthId}`}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold capitalize">
                          {drug.genericName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {strength?.label} · Qty {med.quantity} ·{" "}
                          {med.supplyDays}-day
                        </p>
                        {current && (
                          <p className="mt-1 text-sm">
                            Lowest nearby:{" "}
                            <span className="font-semibold text-primary">
                              {formatCurrency(current.offer.couponPrice)}
                            </span>{" "}
                            at {current.pharmacy.name}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-lg"
                          aria-label={
                            med.priceAlertEnabled
                              ? "Disable price alert"
                              : "Enable price alert"
                          }
                          onClick={() =>
                            setPriceAlert(
                              med.drugId,
                              med.strengthId,
                              !med.priceAlertEnabled,
                              current?.offer.couponPrice
                            )
                          }
                        >
                          {med.priceAlertEnabled ? <Bell /> : <BellOff />}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-lg"
                          aria-label="Remove saved medication"
                          onClick={() =>
                            removeMedication(med.drugId, med.strengthId)
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        render={
                          <Link href={`/search?drug=${drug.id}`} />
                        }
                        variant="secondary"
                        className="min-h-10"
                      >
                        View prices
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">
            Preferred pharmacies
          </h2>
          {preferredPharmacyIds.length === 0 ? (
            <p className="text-muted-foreground">
              Star pharmacies from search results or the{" "}
              <Link href="/pharmacies" className="text-primary underline-offset-2 hover:underline">
                pharmacy finder
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-2">
              {preferredPharmacyIds.map((id) => {
                const pharmacy = getPharmacyById(id);
                if (!pharmacy) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{pharmacy.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pharmacy.address}, {pharmacy.city}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => togglePreferredPharmacy(id)}
                    >
                      Remove
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
