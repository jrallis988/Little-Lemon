"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { AlertCircle, LogIn } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DEMO_PASSWORD } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  error?: string | null;
  className?: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unable to sign in. Please try again.";
}

export function LoginForm({ onSubmit, error, className }: LoginFormProps) {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setLocalError(null);

    try {
      await onSubmit({ email: email.trim(), password });
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
        <h1 className="text-2xl font-black text-[#0f2744]">Sign in</h1>
        <p className="mt-1 text-sm text-[#5b6b7c]">
          Demo: nova@example.com / {DEMO_PASSWORD}
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
        id={passwordId}
        label="Password"
        type="password"
        value={password}
        autoComplete="current-password"
        required
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button type="submit" disabled={submitting} className="w-full">
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href="/signup" className="font-semibold hover:underline">
          Create an account
        </Link>
        <Link href="/reset-password" className="font-semibold hover:underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
