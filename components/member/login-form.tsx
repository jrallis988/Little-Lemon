"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { DEMO_MEMBER_PASSWORD } from "@/lib/auth-shared";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/app";
  const reason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Sign-in failed.");
      }
      router.replace(next.startsWith("/app") ? next : "/app");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MemberScreen
      eyebrow="Screen 21–22 · Auth"
      title={
        reason === "expired"
          ? "Session expired"
          : reason === "update"
            ? "Update required"
            : "Sign in"
      }
      subtitle={
        reason === "expired"
          ? "Screen 84 — sign in again to keep using check-in and your keytag."
          : reason === "update"
            ? "Screen 85 — this build needs a refresh before member tools unlock."
            : "Member utility login. Acquisition and join stay on the public website."
      }
    >
      {reason === "update" ? (
        <MemberCard className="mb-3 border-amber-200 bg-amber-50 text-sm text-amber-900">
          A newer app build is available. Refresh, then sign in with your member
          email.
        </MemberCard>
      ) : null}

      <MemberCard>
        <form className="space-y-3" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-pf-ink/65">
              Email
            </label>
            <Input
              id="email"
              type="email"
              className="mt-1 border-pf-line"
              placeholder="you@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-xs font-semibold text-pf-ink/65"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="mt-1 border-pf-line"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            variant="purple"
            className="w-full"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? "Signing in…" : "Continue to app"}
          </Button>
          <p className="text-center text-xs text-pf-ink/55">
            Demo password:{" "}
            <code className="rounded bg-pf-mist px-1">{DEMO_MEMBER_PASSWORD}</code>
            . Uses a join membership when the email matches.
          </p>
          <p className="text-center text-xs text-pf-ink/55">
            New here?{" "}
            <Link href="/join" className="font-semibold text-pf-purple underline">
              Join on the website
            </Link>
          </p>
        </form>
      </MemberCard>

      <div className="mt-3 flex gap-2 text-center text-[11px]">
        <Link
          href="/app/login?reason=expired"
          className="flex-1 rounded-xl border border-pf-line bg-white px-2 py-2 font-semibold text-pf-ink/60"
        >
          Preview expired
        </Link>
        <Link
          href="/app/login?reason=update"
          className="flex-1 rounded-xl border border-pf-line bg-white px-2 py-2 font-semibold text-pf-ink/60"
        >
          Preview force update
        </Link>
      </div>
    </MemberScreen>
  );
}
