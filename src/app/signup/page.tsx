"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/context";
import {
  AGE_MAX,
  AGE_MIN,
  PLATFORM_AUDIENCE,
  PLATFORM_NAME,
  USERNAME_MAX,
  USERNAME_MIN,
} from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [teenConfirm, setTeenConfirm] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum) || ageNum < AGE_MIN || ageNum > AGE_MAX) {
      setError(`Vibe is only for teens ages ${AGE_MIN}–${AGE_MAX}.`);
      return;
    }
    if (!teenConfirm) {
      setError(`Please confirm you are between ${AGE_MIN} and ${AGE_MAX}.`);
      return;
    }
    setStatus("Creating your profile...");
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
    // Persist age into the new profile via sessionStorage for onboarding
    sessionStorage.setItem("vibe-signup-age", String(ageNum));
    setStatus("Account created. Time to personalize it.");
    router.push("/onboarding");
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-12">
      <section className="mp-card w-full max-w-lg p-6">
        <Link href="/" className="text-sm font-bold no-underline">
          {PLATFORM_NAME}
        </Link>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#7B61FF]">
          {PLATFORM_AUDIENCE}
        </p>
        <h1 className="mt-2 text-3xl font-black text-[#222222]">Create your account</h1>
        <p className="mt-2 text-sm text-[#6E6E6E]">
          Vibe is a teen-only space. You must be {AGE_MIN}–{AGE_MAX} to join.
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
            id="signup-age"
            label={`Age (${AGE_MIN}–${AGE_MAX})`}
            type="number"
            inputMode="numeric"
            min={AGE_MIN}
            max={AGE_MAX}
            value={age}
            onChange={(event) => setAge(event.target.value)}
            hint="Parents and adults: this platform is not for you."
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
          <label className="flex items-start gap-2 text-sm text-[#222222]">
            <input
              type="checkbox"
              className="mt-1"
              checked={teenConfirm}
              onChange={(event) => setTeenConfirm(event.target.checked)}
              required
            />
            <span>
              I confirm I am between {AGE_MIN} and {AGE_MAX} years old and want a
              customizable teen profile on {PLATFORM_NAME}.
            </span>
          </label>
          {error ? (
            <p className="rounded-[4px] border border-[#b42318]/40 bg-[#b42318]/10 px-3 py-2 text-sm font-medium text-[#b42318]">
              {error}
            </p>
          ) : null}
          {status ? (
            <p className="rounded-[4px] border border-[#7B61FF]/30 bg-[#EEE9FF] px-3 py-2 text-sm font-medium text-[#222222]">
              {status}
            </p>
          ) : null}
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Sign up"}
          </Button>
        </form>

        <p className="mt-5 text-sm text-[#6E6E6E]">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
