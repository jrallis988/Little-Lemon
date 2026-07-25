"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/context";
import { DEMO_PASSWORD, PLATFORM_AUDIENCE, PLATFORM_NAME } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("nova@example.com");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitLogin(event?: FormEvent<HTMLFormElement>, demo = false) {
    event?.preventDefault();
    setError("");
    setStatus(demo ? "Opening Nova's demo account..." : "Checking your login...");
    setSubmitting(true);
    const result = await login(demo ? "nova@example.com" : email, demo ? DEMO_PASSWORD : password);
    setSubmitting(false);
    if (result.error) {
      setStatus("");
      setError(result.error);
      return;
    }
    setStatus("Welcome back. Redirecting...");
    router.push("/home");
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#e9eef4] px-4 py-12">
      <section className="mp-card w-full max-w-md p-6">
        <Link href="/" className="text-sm font-bold no-underline">
          {PLATFORM_NAME}
        </Link>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#3b6ea5]">
          {PLATFORM_AUDIENCE}
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#0f2744]">Log in</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Demo teen account: Nova (15) — or sign in with your own mock profile.
        </p>

        <form onSubmit={(event) => void submitLogin(event)} className="mt-6 space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          {error ? (
            <p className="rounded-[4px] border border-[#b42318]/40 bg-[#b42318]/10 px-3 py-2 text-sm font-medium text-[#b42318]">
              {error}
            </p>
          ) : null}
          {status ? (
            <p className="rounded-[4px] border border-[#3b6ea5]/30 bg-[#d7e4f3] px-3 py-2 text-sm font-medium text-[#0f2744]">
              {status}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <Button
          variant="secondary"
          className="mt-3 w-full"
          disabled={submitting}
          onClick={() => void submitLogin(undefined, true)}
        >
          Continue as Nova (demo)
        </Button>

        <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
          <Link href="/reset-password">Forgot password?</Link>
          <Link href="/signup">Create an account</Link>
        </div>
      </section>
    </main>
  );
}
