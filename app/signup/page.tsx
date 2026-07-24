"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { APP_NAME, isValidUsername, slugifyUsername } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const { signup, profile, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
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

  const validate = () => {
    const messages: string[] = [];
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) messages.push("Enter a valid email.");
    if (password.length < 8) messages.push("Password must be at least 8 characters.");
    if (!displayName.trim()) messages.push("Display name is required.");
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
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-muted text-navy-900">
      <div className="min-h-screen bg-[radial-gradient(circle_at_85%_8%,rgba(61,115,192,0.22),transparent_32%),linear-gradient(180deg,#f3f5f8_0%,#e9eef6_100%)] px-4 py-8">
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
                <Sparkles className="h-4 w-4" aria-hidden />
                Create your profile
              </CardTitle>
              <p className="mt-1 text-xs text-navy-100">
                Start with the basics. You can tune the whole page next.
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
                {error ? (
                  <p className="rounded-card border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" isLoading={submitting}>
                  Create Your Profile
                </Button>
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
