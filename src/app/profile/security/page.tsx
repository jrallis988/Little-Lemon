"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

interface SecurityData {
  email: string;
  name: string | null;
  phone: string | null;
  allowPersonalizedTips: boolean;
  twoFactorEnabled: boolean;
  twoFactorMethod: string | null;
  hasPassword: boolean;
  createdAt: string;
}

export default function SecuritySettingsPage() {
  const [security, setSecurity] = useState<SecurityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function load() {
    const res = await fetch("/api/me/security");
    if (res.status === 401) throw new Error("Sign in required");
    if (!res.ok) throw new Error("Could not load security settings.");
    const data = (await res.json()) as { security: SecurityData };
    setSecurity(data.security);
    setPhone(data.security.phone ?? "");
  }

  useEffect(() => {
    load()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function patch(body: Record<string, unknown>) {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/me/security", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        security?: Partial<SecurityData>;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Update failed");
      setSecurity((prev) => (prev ? { ...prev, ...data.security } : prev));
      setMessage("Settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/me/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not change password.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change password.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading security settings…
      </div>
    );
  }

  if (error === "Sign in required" || !security) {
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
            Security & privacy
          </h1>
          <p className="text-muted-foreground">
            Manage password, two-factor sign-in preference, and privacy controls
            for {security.email}.
          </p>
        </header>

        <TrustCallout title="We never sell health query data">
          Personalized tips stay on your account when enabled. See the{" "}
          <Link href="/privacy" className="font-medium underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </TrustCallout>

        {error && error !== "Sign in required" && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-xl bg-muted/60 px-3 py-2 text-sm" role="status">
            {message}
          </p>
        )}

        <section className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Sign-in security</h2>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/50 px-3 py-3">
            <div>
              <p className="font-medium">Email two-factor preference</p>
              <p className="text-sm text-muted-foreground">
                When enabled, Trump RX will require an email code at sign-in once
                OTP delivery is configured in this environment.
              </p>
            </div>
            <Switch
              checked={security.twoFactorEnabled}
              disabled={saving}
              onCheckedChange={(v) =>
                void patch({
                  twoFactorEnabled: v,
                  twoFactorMethod: v ? "email" : null,
                })
              }
              aria-label="Enable email two-factor preference"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone (for SMS alerts)</Label>
            <div className="flex flex-wrap gap-2">
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1…"
                className="h-11 max-w-xs"
              />
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => void patch({ phone: phone || null })}
              >
                Save phone
              </Button>
            </div>
          </div>

          {security.hasPassword ? (
            <form onSubmit={changePassword} className="space-y-3 border-t border-border pt-4">
              <h3 className="font-semibold">Change password</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-11"
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="min-h-11">
                {saving && <Loader2 className="animate-spin" />}
                Update password
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              This account has no password yet.{" "}
              <Link href="/forgot-password" className="text-primary hover:underline">
                Use password recovery
              </Link>{" "}
              if you need credential access.
            </p>
          )}
        </section>

        <section className="space-y-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-semibold">Privacy controls</h2>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/50 px-3 py-3">
            <div>
              <p className="font-medium">Personalized savings tips</p>
              <p className="text-sm text-muted-foreground">
                Allow account-based tips based on saved medications.
              </p>
            </div>
            <Switch
              checked={security.allowPersonalizedTips}
              disabled={saving}
              onCheckedChange={(v) => void patch({ allowPersonalizedTips: v })}
              aria-label="Personalized tips"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/forgot-password" className="font-medium text-primary hover:underline">
              Reset password by email
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/profile/billing" className="font-medium text-primary hover:underline">
              Billing
            </Link>
          </div>
        </section>

        <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
          ← Back to account
        </Link>
      </div>
    </div>
  );
}
