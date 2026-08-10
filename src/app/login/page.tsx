"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: String(form.get("email")),
        password: String(form.get("password")),
        redirect: false,
      });
      if (result?.error) {
        setError("Email or password is incorrect.");
        return;
      }
      router.push("/profile");
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
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
        <h1 className="mt-4 font-display text-3xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-muted-foreground">
          Sign in to manage medications, alerts, and membership.
        </p>

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
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
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
          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </p>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          New to Trump RX?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
