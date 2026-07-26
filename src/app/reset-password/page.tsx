"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PLATFORM_NAME } from "@/lib/constants";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSentTo(email);
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-12">
      <section className="mp-card w-full max-w-md p-6">
        <Link href="/" className="text-sm font-bold no-underline">
          {PLATFORM_NAME}
        </Link>
        <h1 className="mt-4 text-3xl font-black text-[#222222]">Reset password</h1>
        <p className="mt-2 text-sm text-[#6E6E6E]">
          Enter your account email and we will show the mock reset confirmation.
        </p>

        {sentTo ? (
          <div className="mt-6 rounded-[4px] border border-[#1E824C]/30 bg-[#1E824C]/10 p-4">
            <h2 className="font-black text-[#222222]">Reset link sent</h2>
            <p className="mt-1 text-sm text-[#6E6E6E]">
              If this were connected to email, a reset link would be on its way to{" "}
              <strong>{sentTo}</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setSentTo("")}>
                Send another
              </Button>
              <Button onClick={() => {
                window.location.href = "/login";
              }}>
                Back to login
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              id="reset-email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        )}

        <p className="mt-5 text-sm text-[#6E6E6E]">
          Remembered it? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
