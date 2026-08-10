"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [devUrl, setDevUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setDevUrl(null);
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(form.get("email")) }),
      });
      const data = (await res.json()) as {
        message?: string;
        error?: string;
        devResetUrl?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not start reset.");
      setMessage(
        data.message ??
          "If an account exists for that email, password reset instructions were sent."
      );
      if (data.devResetUrl) setDevUrl(data.devResetUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start reset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="trx-atmosphere flex min-h-[70dvh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Pill className="size-5" />
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold">
          Forgot password
        </h1>
        <p className="mt-1 text-muted-foreground">
          Enter your account email and we will send a reset link.
        </p>

        {message ? (
          <div className="mt-6 space-y-3 text-sm">
            <p className="rounded-xl bg-muted/60 px-3 py-3">{message}</p>
            {devUrl && (
              <p className="rounded-xl border border-dashed border-border px-3 py-3 text-muted-foreground">
                Dev mode (email not configured):{" "}
                <Link href={devUrl} className="font-medium text-primary underline">
                  Open reset link
                </Link>
              </p>
            )}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
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
              Send reset link
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
