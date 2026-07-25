"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import {
  APP_NAME,
  TEEN_MAX_AGE,
  TEEN_MIN_AGE,
  isValidUsername,
  slugifyUsername,
  teenAgeError,
} from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const { signup, profile, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (loading || !profile) return;
    router.replace(profile.onboardingComplete ? "/home" : "/onboarding");
  }, [loading, profile, router]);

  const usernameError = useMemo(() => {
    if (!username) return submitted ? "Username is required." : "";
    if (!isValidUsername(username)) {
      return "Use 3-24 lowercase letters, numbers, or underscores.";
    }
    if (mockApi.isUsernameTaken(username)) return "That username is already taken.";
    return "";
  }, [submitted, username]);

  const birthdateError = useMemo(() => {
    if (!submitted && !birthdate) return "";
    return teenAgeError(birthdate);
  }, [birthdate, submitted]);

  const validate = () => {
    const messages: string[] = [];
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) messages.push("Enter a valid email.");
    if (password.length < 8) messages.push("Password must be at least 8 characters.");
    if (!displayName.trim()) messages.push("Display name is required.");
    const ageMessage = teenAgeError(birthdate);
    if (ageMessage) messages.push(ageMessage);
    if (!ageConfirmed) {
      messages.push(`Confirm you are between ${TEEN_MIN_AGE} and ${TEEN_MAX_AGE}.`);
    }
    if (!username) {
      messages.push("Username is required.");
    } else if (!isValidUsername(username)) {
      messages.push("Use 3-24 lowercase letters, numbers, or underscores.");
    } else if (mockApi.isUsernameTaken(username)) {
      messages.push("That username is already taken.");
    }
    setError(messages[0] || "");
    return messages.length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await signup({
        email: email.trim(),
        password,
        username,
        displayName: displayName.trim(),
      });
      const userId = mockApi.getSessionUserId();
      if (userId) {
        mockApi.updateProfile(userId, { birthdate, showAge: true });
      }
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-muted text-navy-900">
      <div className="min-h-screen bg-[radial-gradient(circle_at_85%_8%,rgba(27,182,168,0.18),transparent_32%),linear-gradient(180deg,#eef2f7_0%,#e4ebf5_100%)] px-4 py-8">
        <div className="mx-auto max-w-lg animate-slide-up">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to {APP_NAME}
          </Link>

          <Card className="overflow-hidden">
            <CardHeader className="bg-navy-900 text-white">
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                Create your vibe
              </CardTitle>
              <p className="mt-1 text-xs text-navy-100">
                {APP_NAME} is for teens ages {TEEN_MIN_AGE}–{TEEN_MAX_AGE}. Start with the
                basics, then customize everything.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Display name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    error={submitted && !displayName.trim() ? "Display name is required." : ""}
                    required
                  />
                  <Input
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(slugifyUsername(event.target.value))}
                    error={usernameError}
                    helperText={
                      username && !usernameError
                        ? `@${username} is available.`
                        : "Lowercase letters, numbers, and underscores."
                    }
                    required
                  />
                </div>
                <Input
                  label="Birthday"
                  type="date"
                  value={birthdate}
                  onChange={(event) => setBirthdate(event.target.value)}
                  error={birthdateError}
                  helperText={`You must be ${TEEN_MIN_AGE}–${TEEN_MAX_AGE} to join.`}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={
                    submitted && !/^\S+@\S+\.\S+$/.test(email.trim())
                      ? "Enter a valid email."
                      : ""
                  }
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={
                    submitted && password.length < 8
                      ? "Password must be at least 8 characters."
                      : ""
                  }
                  helperText="Use at least 8 characters. Demo accounts use demo1234."
                  required
                />
                <label className="flex items-start gap-3 rounded-card border border-surface-border bg-surface-muted px-3 py-3 text-sm text-navy-800">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-brand"
                    checked={ageConfirmed}
                    onChange={(event) => setAgeConfirmed(event.target.checked)}
                  />
                  <span>
                    I confirm I am between {TEEN_MIN_AGE} and {TEEN_MAX_AGE} years old and
                    want a teen-only profile on {APP_NAME}.
                  </span>
                </label>
                {error ? (
                  <p className="rounded-card border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" isLoading={submitting}>
                  Create Your Profile
                </Button>
                <p className="flex items-start gap-2 text-xs text-navy-600">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-dark" aria-hidden />
                  Grown-ups can help you sign up, but profiles on {APP_NAME} are for teens.
                </p>
              </form>
              <p className="mt-5 text-center text-sm text-navy-600">
                Already have a profile?{" "}
                <Link href="/login" className="font-bold">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
