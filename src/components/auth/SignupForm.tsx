"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_PATTERN,
} from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export interface SignupFormValues {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void>;
  error?: string | null;
  className?: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unable to create your account. Please try again.";
}

export function SignupForm({ onSubmit, error, className }: SignupFormProps) {
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const usernameId = useId();
  const displayNameId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const usernameError = useMemo(() => {
    if (!username) return undefined;
    return USERNAME_PATTERN.test(username)
      ? undefined
      : "Use 3-24 letters, numbers, or underscores.";
  }, [username]);

  const passwordError =
    confirmPassword && password !== confirmPassword
      ? "Passwords do not match."
      : undefined;

  const canSubmit =
    email.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    displayName.trim().length > 0 &&
    USERNAME_PATTERN.test(username) &&
    password === confirmPassword &&
    !submitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setLocalError(null);

    try {
      await onSubmit({
        email: email.trim(),
        password,
        username: username.trim(),
        displayName: displayName.trim(),
      });
    } catch (submitError) {
      setLocalError(getErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = localError ?? error;

  return (
    <form className={cn("mp-card space-y-4 p-5", className)} onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl font-black text-[#0f2744]">Create your profile</h1>
        <p className="mt-1 text-sm text-[#5b6b7c]">
          Claim a username and start making your place feel like you.
        </p>
      </div>

      {displayError ? (
        <div
          className="flex gap-2 rounded-[4px] border border-[#b42318] bg-red-50 p-3 text-sm text-[#7a160f]"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{displayError}</span>
        </div>
      ) : null}

      <Input
        id={emailId}
        label="Email"
        type="email"
        value={email}
        autoComplete="email"
        required
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        id={usernameId}
        label="Username"
        value={username}
        autoComplete="username"
        required
        minLength={USERNAME_MIN}
        maxLength={USERNAME_MAX}
        pattern="[A-Za-z0-9_]{3,24}"
        hint="3-24 characters: letters, numbers, and underscores only."
        error={usernameError}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        id={displayNameId}
        label="Display name"
        value={displayName}
        autoComplete="name"
        required
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <Input
        id={passwordId}
        label="Password"
        type="password"
        value={password}
        autoComplete="new-password"
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <Input
        id={confirmPasswordId}
        label="Confirm password"
        type="password"
        value={confirmPassword}
        autoComplete="new-password"
        required
        error={passwordError}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      <Button type="submit" disabled={!canSubmit} className="w-full">
        <UserPlus className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Creating..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-[#5b6b7c]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
