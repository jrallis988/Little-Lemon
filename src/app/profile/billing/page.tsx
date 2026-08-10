"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { UpgradeButton } from "@/components/upgrade-button";
import { cn } from "@/lib/utils";

interface ProfileBilling {
  membershipTier: string;
  membershipStatus: string | null;
  membershipExpiresAt: string | null;
  email: string;
  name: string | null;
}

export default function BillingPage() {
  const [profile, setProfile] = useState<ProfileBilling | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then(async (res) => {
        if (res.status === 401) throw new Error("Sign in required");
        if (!res.ok) throw new Error("Could not load billing.");
        const data = (await res.json()) as { profile: ProfileBilling };
        setProfile(data.profile);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function openPortal() {
    setPortalLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Billing portal unavailable.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Billing portal unavailable.");
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading billing…
      </div>
    );
  }

  if (error === "Sign in required" || !profile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">Sign in required</h1>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "mt-5")}>
          Sign in
        </Link>
      </div>
    );
  }

  const isPlus = profile.membershipTier === "plus";

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
        <header className="space-y-1.5">
          <p className="text-sm font-medium text-primary">Account</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Subscription & billing
          </h1>
          <p className="text-muted-foreground">
            Manage Trump RX Plus, payment methods, invoices, and cancellations.
          </p>
        </header>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold">
                {isPlus ? "Trump RX Plus" : "Trump RX Free"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {profile.email}
                {profile.membershipStatus ? ` · ${profile.membershipStatus}` : ""}
              </p>
              {profile.membershipExpiresAt && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Renews / ends{" "}
                  {new Date(profile.membershipExpiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <CreditCard className="size-6 text-primary" />
          </div>

          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {isPlus ? (
              <>
                <li>Member pricing where available</li>
                <li>Family profiles (up to 5)</li>
                <li>Cross-device price alerts</li>
              </>
            ) : (
              <>
                <li>Free coupons and pharmacy comparison</li>
                <li>Upgrade anytime for Plus benefits</li>
              </>
            )}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {isPlus ? (
              <Button
                size="lg"
                className="min-h-11"
                onClick={() => void openPortal()}
                disabled={portalLoading}
              >
                {portalLoading && <Loader2 className="animate-spin" />}
                Manage billing in Stripe
              </Button>
            ) : (
              <UpgradeButton />
            )}
            <Link
              href="/membership"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
            >
              Compare plans
            </Link>
          </div>
          {error && error !== "Sign in required" && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </section>

        <TrustCallout title="Secure payments">
          Card updates, invoices, and cancellations are handled by Stripe Customer
          Portal when billing is configured for this environment.
        </TrustCallout>

        <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
          ← Back to account
        </Link>
      </div>
    </div>
  );
}
