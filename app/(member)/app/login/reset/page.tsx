"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Reset failed.");
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/app/login"), 1200);
  }

  return (
    <MemberScreen
      eyebrow="Auth · Reset"
      title="Choose a new password"
      subtitle="Passwords are hashed with scrypt before storage."
    >
      <MemberCard>
        {done ? (
          <p className="text-sm font-semibold text-emerald-700">
            Password updated. Redirecting to sign in…
          </p>
        ) : (
          <form className="space-y-3" onSubmit={onSubmit}>
            <Input
              type="password"
              className="border-pf-line"
              placeholder="New password (8+ chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" variant="purple" className="w-full" disabled={!token}>
              Update password
            </Button>
          </form>
        )}
      </MemberCard>
    </MemberScreen>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm">Loading…</div>}>
      <ResetForm />
    </Suspense>
  );
}
