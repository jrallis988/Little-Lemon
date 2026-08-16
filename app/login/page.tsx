"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("maya.kill@greenroom.app");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace(params.get("next") || "/lineup");
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
          Email or username
        </label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
          Password
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      {error ? <p className="text-sm text-marquee">{error}</p> : null}
      <Button type="submit" className="w-full" size="lg">
        Walk in
      </Button>
      <p className="text-center text-sm text-smoke">
        New comic?{" "}
        <Link href="/signup" className="text-spotlight hover:underline">
          Create a stage name
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-lg px-5 py-8 stage-wash">
      <Logo />
      <h1 className="mt-10 font-display text-5xl uppercase tracking-[0.04em]">
        Sign in
      </h1>
      <p className="mt-2 text-smoke">Backstage access for working comics.</p>
      <Suspense fallback={<p className="mt-10 text-smoke">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
