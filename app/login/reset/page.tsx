"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { DEMO_CREDENTIALS } from "@/lib/mock/data";
import { APP_NAME } from "@/lib/utils";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-surface-muted px-4 py-8 text-navy-900">
      <div className="mx-auto max-w-md animate-slide-up">
        <Link
          href="/login"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:no-underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to sign in
        </Link>
        <Card className="overflow-hidden">
          <CardHeader className="bg-navy-900 text-white">
            <CardTitle className="flex items-center gap-2 text-white">
              <MailCheck className="h-4 w-4" aria-hidden />
              Reset your {APP_NAME} password
            </CardTitle>
            <p className="mt-1 text-xs text-navy-100">
              Mock mode keeps this local and shows the demo recovery instructions.
            </p>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="space-y-4">
                <div className="rounded-card border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <p className="font-bold">Reset instructions ready</p>
                  <p className="mt-1">
                    In this demo, no email is sent. Use the demo password{" "}
                    <span className="font-mono font-bold">{DEMO_CREDENTIALS.password}</span>{" "}
                    to sign in.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-btn border border-brand bg-brand px-4 py-2 text-sm font-bold text-white shadow-soft hover:bg-brand-dark hover:no-underline"
                >
                  Return to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={error}
                  helperText={`Try ${DEMO_CREDENTIALS.email} for the demo account.`}
                  required
                />
                <Button type="submit" className="w-full">
                  Show Reset Instructions
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
