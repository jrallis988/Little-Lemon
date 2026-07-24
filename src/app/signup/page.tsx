"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/context";
import { PLATFORM_NAME, USERNAME_MAX, USERNAME_MIN } from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("Creating your place...");
    setSubmitting(true);
    const result = await signup({
      email,
      password,
      username,
      display_name: displayName,
    });
    setSubmitting(false);
    if (result.error) {
      setStatus("");
      setError(result.error);
      return;
    }
    setStatus("Account created. Time to personalize it.");
    router.push("/onboarding");
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#e9eef4] px-4 py-12">
      <section className="mp-card w-full max-w-lg p-6">
        <Link href="/" className="text-sm font-bold no-underline">
          {PLATFORM_NAME}
        </Link>
        <h1 className="mt-4 text-3xl font-black text-[#0f2744]">Create your account</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          This prototype stores your mock account in localStorage.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <Input
            id="display-name"
            label="Display name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            minLength={USERNAME_MIN}
            maxLength={USERNAME_MAX}
            pattern="[a-zA-Z0-9_]+"
            hint="Use 3-24 letters, numbers, or underscores."
            required
          />
          <Input
            id="signup-email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <Input
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            autoComplete="new-password"
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
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Sign up"}
          </Button>
        </form>

        <p className="mt-5 text-sm text-[#5b6b7c]">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
