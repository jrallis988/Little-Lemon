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

  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "forgot") {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = (await response.json()) as {
          error?: string;
          message?: string;
          resetUrl?: string | null;
        };
        if (!response.ok) throw new Error(data.error ?? "Request failed.");
        setInfo(
          data.resetUrl
            ? `${data.message} Open: ${data.resetUrl}`
            : data.message ?? "Check your email."
        );
        return;
      }

      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "register"
            ? { email, password, firstName, lastName }
            : { email, password }
        ),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Sign-in failed.");
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
            : mode === "register"
              ? "Create account"
              : mode === "forgot"
                ? "Reset password"
                : "Sign in"
      }
      subtitle={
        reason === "expired"
          ? "Screen 84 — sign in again to keep using check-in and your keytag."
          : reason === "update"
            ? "Screen 85 — this build needs a refresh before member tools unlock."
            : "Hashed local accounts + session cookies. Demo password still works for quick QA."
      }
    >
      <MemberCard>
        <form className="space-y-3" onSubmit={onSubmit}>
          {mode === "register" ? (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-pf-ink/65" htmlFor="fn">
                  First name
                </label>
                <Input
                  id="fn"
                  className="mt-1 border-pf-line"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pf-ink/65" htmlFor="ln">
                  Last name
                </label>
                <Input
                  id="ln"
                  className="mt-1 border-pf-line"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : null}
          <div>
            <label htmlFor="email" className="text-xs font-semibold text-pf-ink/65">
              Email
            </label>
            <Input
              id="email"
              type="email"
              className="mt-1 border-pf-line"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {mode !== "forgot" ? (
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "register" ? 8 : 1}
              />
            </div>
          ) : null}
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="break-all text-xs text-emerald-700" role="status">
              {info}
            </p>
          ) : null}
          <Button
            type="submit"
            variant="purple"
            className="w-full"
            disabled={submitting}
          >
            {submitting
              ? "Working…"
              : mode === "register"
                ? "Create account"
                : mode === "forgot"
                  ? "Email reset link"
                  : "Continue to app"}
          </Button>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <button
              type="button"
              className="font-semibold text-pf-purple"
              onClick={() => setMode(mode === "register" ? "login" : "register")}
            >
              {mode === "register" ? "Have an account? Sign in" : "Create account"}
            </button>
            <button
              type="button"
              className="font-semibold text-pf-ink/55"
              onClick={() => setMode(mode === "forgot" ? "login" : "forgot")}
            >
              {mode === "forgot" ? "Back to sign in" : "Forgot password"}
            </button>
          </div>
          <p className="text-center text-xs text-pf-ink/55">
            QA shortcut password:{" "}
            <code className="rounded bg-pf-mist px-1">{DEMO_MEMBER_PASSWORD}</code>
          </p>
          <p className="text-center text-xs text-pf-ink/55">
            New member?{" "}
            <Link href="/join" className="font-semibold text-pf-purple underline">
              Join on the website
            </Link>
          </p>
        </form>
      </MemberCard>
    </MemberScreen>
  );
}
