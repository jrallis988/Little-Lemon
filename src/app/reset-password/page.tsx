"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailDefault = params.get("email") ?? "";
  const tokenDefault = params.get("token") ?? "";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));
    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email")),
          token: String(form.get("token")),
          password,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not reset password.");
      router.push("/login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <input type="hidden" name="token" value={tokenDefault} />
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={emailDefault}
          required
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm">Confirm password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          minLength={8}
          required
          className="h-11"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="min-h-11 w-full" disabled={loading}>
        {loading && <Loader2 className="animate-spin" />}
        Update password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="trx-atmosphere flex min-h-[70dvh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Pill className="size-5" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold">
          Choose a new password
        </h1>
        <p className="mt-1 text-muted-foreground">
          Use at least 8 characters. Then sign in with your updated password.
        </p>
        <Suspense fallback={<p className="mt-6 text-sm text-muted-foreground">Loading…</p>}>
          <ResetForm />
        </Suspense>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
