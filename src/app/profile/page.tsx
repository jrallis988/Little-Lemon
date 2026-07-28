"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, BookmarkX, Loader2, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmptyState } from "@/components/design/empty-state";
import { TrustCallout } from "@/components/design/trust-callout";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface ProfileData {
  id: string;
  email: string;
  name: string | null;
  allowPersonalizedTips: boolean;
  membershipTier: string;
  membershipStatus: string | null;
  membershipExpiresAt: string | null;
  savedMedications: Array<{
    id: string;
    strengthId: string;
    quantity: number;
    supplyDays: number;
    drug: {
      id: string;
      genericName: string;
      brandName: string;
      strengths: Array<{ id: string; label: string }>;
    };
  }>;
  preferredPharmacies: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
  }>;
  priceAlerts: Array<{
    id: string;
    baselinePrice: number;
    targetPrice: number | null;
    drug: { id: string; genericName: string };
  }>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/me", { signal: controller.signal });
        if (response.status === 401) {
          setUnauthorized(true);
          return;
        }
        if (!response.ok) throw new Error("Could not load your account.");
        const data = (await response.json()) as { profile: ProfileData };
        setProfile(data.profile);
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(
          caught instanceof Error ? caught.message : "Could not load your account."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    document.documentElement.classList.toggle("text-senior", largeText);
    return () => {
      document.documentElement.classList.remove("high-contrast", "text-senior");
    };
  }, [highContrast, largeText]);

  if (loading) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading your account…
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-semibold">Sign in to view your account</h1>
        <p className="mt-2 text-muted-foreground">
          Saved medications, preferred pharmacies, alerts, and membership are
          stored securely with your account.
        </p>
        <Link
          href="/login"
          className={cn(buttonVariants({ size: "lg" }), "mt-5 min-h-11")}
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center text-destructive">
        {error ?? "Could not load your account."}
      </div>
    );
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            My medications
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Manage your saved prescriptions, pharmacies, alerts, and membership.
          </p>
        </header>

        <TrustCallout title="Caregiver-friendly controls">
          Use larger text or high contrast below. Your signed-in account keeps
          saved information available across devices. Manage plan options on the{" "}
          <Link
            href="/membership"
            className="font-medium underline-offset-2 hover:underline"
          >
            membership page
          </Link>
          .
        </TrustCallout>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {profile.name || "Trump RX member"}
              </h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
            <div className="rounded-lg bg-secondary px-3 py-2 text-sm">
              <span className="font-semibold capitalize">
                {profile.membershipTier}
              </span>
              {profile.membershipStatus && (
                <span className="text-muted-foreground">
                  {" "}
                  · {profile.membershipStatus}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-3 py-3">
            <div>
              <p className="font-medium">Personalized savings tips</p>
              <p className="text-sm text-muted-foreground">
                {profile.allowPersonalizedTips ? "Enabled" : "Not enabled"}
              </p>
            </div>
            <span className="text-sm font-medium">
              {profile.allowPersonalizedTips ? "On" : "Off"}
            </span>
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

          {profile.savedMedications.length === 0 ? (
            <EmptyState
              icon={BookmarkX}
              title="No saved medications yet"
              description="Search a drug and tap Save medication to track prices here."
              actionHref="/search"
              actionLabel="Search medications"
            />
          ) : (
            <ul className="space-y-2.5">
              {profile.savedMedications.map((med) => {
                const strength = med.drug.strengths.find(
                  (s) => s.id === med.strengthId
                );

                return (
                  <li
                    key={med.id}
                    className="rounded-2xl border border-border bg-card p-3.5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold capitalize">
                          {med.drug.genericName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {strength?.label} · Qty {med.quantity} ·{" "}
                          {med.supplyDays}-day
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/search?drug=${med.drug.id}`}
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
          {profile.preferredPharmacies.length === 0 ? (
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
              {profile.preferredPharmacies.map((pharmacy) => (
                <li
                  key={pharmacy.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <MapPin className="size-4 shrink-0 text-primary" />
                  <div>
                    <Link
                      href={`/pharmacies/${pharmacy.id}`}
                      className="font-medium hover:underline"
                    >
                      {pharmacy.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {pharmacy.address}, {pharmacy.city}, {pharmacy.state}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">Price alerts</h2>
          {profile.priceAlerts.length === 0 ? (
            <p className="text-muted-foreground">
              No active alerts. Set an alert while comparing medication prices.
            </p>
          ) : (
            <ul className="space-y-2">
              {profile.priceAlerts.map((alert) => (
                <li
                  key={alert.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <Bell className="size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium capitalize">
                      {alert.drug.genericName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Baseline {formatCurrency(alert.baselinePrice)}
                      {alert.targetPrice
                        ? ` · Target ${formatCurrency(alert.targetPrice)}`
                        : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <SavedPassesSection />
      </div>
    </div>
  );
}

function SavedPassesSection() {
  const [passes, setPasses] = useState<
    Array<{
      id: string;
      passCode: string;
      totalCounterPrice: number;
      status: string;
      issuedAt: string;
      items: Array<{
        pharmacyName: string | null;
        counterPrice: number;
        coupon: { drugName: string; memberId: string; expiresAt: string };
      }>;
    }>
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/me/passes")
      .then(async (res) => {
        if (!res.ok) return { passes: [] };
        return res.json() as Promise<{ passes: typeof passes }>;
      })
      .then((data) => setPasses(data.passes ?? []))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Digital passes</h2>
        <Link
          href="/checkout"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Open checkout
        </Link>
      </div>
      {!loaded ? (
        <p className="text-sm text-muted-foreground">Loading passes…</p>
      ) : passes.length === 0 ? (
        <p className="text-muted-foreground">
          Issue a digital pass from checkout while signed in — it will appear
          here for the counter.
        </p>
      ) : (
        <ul className="space-y-2">
          {passes.map((pass) => (
            <li
              key={pass.id}
              className="rounded-xl border border-border bg-card px-4 py-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{pass.passCode}</p>
                <p className="tabular-nums font-medium">
                  {formatCurrency(pass.totalCounterPrice)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {pass.status} · {new Date(pass.issuedAt).toLocaleDateString()} ·{" "}
                {pass.items.length} item{pass.items.length === 1 ? "" : "s"}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {pass.items.map((item, idx) => (
                  <li key={`${pass.id}-${idx}`} className="text-muted-foreground">
                    {item.coupon.drugName}
                    {item.pharmacyName ? ` @ ${item.pharmacyName}` : ""} ·{" "}
                    {formatCurrency(item.counterPrice)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
