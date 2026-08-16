"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = signup(displayName, username);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace("/lineup");
  }

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-5 py-8 stage-wash">
      <Logo />
      <h1 className="mt-10 font-display text-5xl uppercase tracking-[0.04em]">
        Get on the list
      </h1>
      <p className="mt-2 text-smoke">
        Demo signup lands you in Maya Kill&apos;s greenroom.
      </p>
      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
            Stage name
          </label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Maya Kill"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
            Username
          </label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="maya.kill"
            required
          />
        </div>
        {error ? <p className="text-sm text-marquee">{error}</p> : null}
        <Button type="submit" className="w-full" size="lg">
          Claim your spot
        </Button>
        <p className="text-center text-sm text-smoke">
          Already here?{" "}
          <Link href="/login" className="text-spotlight hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
