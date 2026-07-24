"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, LogIn } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { DEMO_CREDENTIALS } from "@/lib/mock/data";
import { getMockSnapshot, mockApi } from "@/lib/mock/store";
import { useAuth } from "@/lib/auth/AuthProvider";
import { APP_NAME } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, profile, loading, usingMock } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (loading || !profile) return;
    router.replace(profile.onboardingComplete ? "/home" : "/onboarding");
  }, [loading, profile, router]);

  const demoHint = useMemo(
    () => `${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`,
    []
  );

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) nextErrors.password = "Password is required.";
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      const signedIn = mockApi.getUserByEmail(email.trim());
      const nextProfile = signedIn
        ? getMockSnapshot().profiles.find((item) => item.userId === signedIn.id)
        : null;
      router.push(nextProfile?.onboardingComplete ? "/home" : "/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-muted text-navy-900">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(61,115,192,0.20),transparent_34%),linear-gradient(180deg,#f3f5f8_0%,#e8eef7_100%)] px-4 py-8">
        <div className="mx-auto max-w-md animate-slide-up">
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
                <LogIn className="h-4 w-4" aria-hidden />
                Sign in to {APP_NAME}
              </CardTitle>
              <p className="mt-1 text-xs text-navy-100">
                Open your profile, messages, friends, and feed.
              </p>
            </CardHeader>
            <CardContent>
              {usingMock ? (
                <div className="mb-4 rounded-card border border-brand/20 bg-brand-soft p-3 text-sm text-navy-700">
                  <p className="font-bold">Demo account</p>
                  <p className="mt-1 font-mono text-xs">{demoHint}</p>
                  <Button
                    className="mt-3"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEmail(DEMO_CREDENTIALS.email);
                      setPassword(DEMO_CREDENTIALS.password);
                      setError("");
                      setFieldErrors({});
                    }}
                  >
                    <KeyRound className="h-4 w-4" aria-hidden />
                    Use demo login
                  </Button>
                </div>
              ) : null}

              <form onSubmit={submit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={fieldErrors.email}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={fieldErrors.password}
                  required
                />
                {error ? (
                  <p className="rounded-card border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" className="w-full" isLoading={submitting}>
                  Sign In
                </Button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
                <Link href="/signup" className="font-bold">
                  Create an account
                </Link>
                <Link href="/login/reset" className="font-bold">
                  Reset password
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
