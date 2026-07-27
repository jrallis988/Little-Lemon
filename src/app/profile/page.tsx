"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, BellOff, BookmarkX, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EmptyState } from "@/components/design/empty-state";
import { TrustCallout } from "@/components/design/trust-callout";
import { getDrugById } from "@/lib/data/drugs";
import { getPharmacyById } from "@/lib/data/pharmacies";
import { formatCurrency, generateOffersForDrug } from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import { useProfileStore } from "@/lib/store/profile-store";
import { cn } from "@/lib/utils";

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
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    document.documentElement.classList.toggle("text-senior", largeText);
    return () => {
      document.documentElement.classList.remove("high-contrast", "text-senior");
    };
  }, [highContrast, largeText]);

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            My medications
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Optional local profile — no account required. Saved meds stay in
            this browser.
          </p>
        </header>

        <TrustCallout title="Caregiver-friendly controls">
          Use larger text or high contrast below. Membership sync across devices
          is previewed on the{" "}
          <Link
            href="/membership"
            className="font-medium underline-offset-2 hover:underline"
          >
            membership page
          </Link>
          .
        </TrustCallout>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
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
                Opt-in only. Off by default.
              </p>
            </div>
            <Switch
              checked={allowPersonalizedTips}
              onCheckedChange={setAllowPersonalizedTips}
              aria-label="Allow personalized savings tips"
            />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-3 py-3">
            <div>
              <p className="font-medium">Larger text</p>
              <p className="text-sm text-muted-foreground">
                Increases body text for easier reading.
              </p>
            </div>
            <Switch
              checked={largeText}
              onCheckedChange={setLargeText}
              aria-label="Enable larger text"
            />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-3 py-3">
            <div>
              <p className="font-medium">High contrast</p>
              <p className="text-sm text-muted-foreground">
                Stronger borders and darker text.
              </p>
            </div>
            <Switch
              checked={highContrast}
              onCheckedChange={setHighContrast}
              aria-label="Enable high contrast"
            />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold">Saved meds</h2>
            <Link
              href="/search"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Add from search
            </Link>
          </div>

          {savedMedications.length === 0 ? (
            <EmptyState
              icon={BookmarkX}
              title="No saved medications yet"
              description="Search a drug and tap Save medication to track prices here."
              actionHref="/search"
              actionLabel="Search medications"
            />
          ) : (
            <ul className="space-y-2.5">
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
                    className="rounded-2xl border border-border bg-card p-3.5"
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
                      <Link
                        href={`/search?drug=${drug.id}`}
                        className={cn(
                          buttonVariants({ variant: "secondary" }),
                          "min-h-10"
                        )}
                      >
                        View prices
                      </Link>
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
              <Link
                href="/pharmacies"
                className="text-primary underline-offset-2 hover:underline"
              >
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
