"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { candidate } from "@/lib/candidate";

export function Hero() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const first = String(data.get("first_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();

    if (!first) {
      setStatus("error");
      setError("Please enter your first name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      setStatus("error");
      setError("Enter a valid ZIP code.");
      return;
    }
    setStatus("success");
    setError("");
    e.currentTarget.reset();
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-granite-900"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/nh-landscape.svg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-granite-900 via-granite-900/92 to-granite-900/55" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-granite-900/20 to-transparent lg:block" />
      </div>

      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-24">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            {candidate.fullName} for {candidate.office}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-serif text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {candidate.heroHeadline}
            <span className="mt-2 block text-[0.72em] font-bold text-granite-100">
              — a fighter for New Hampshire
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-granite-200">
            {candidate.heroSubhead} Born and raised here. Focused on costs, Main
            Street, and the communities we refuse to lose.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#donate" className="btn-accent">
              Donate Today
            </Link>
            <Link
              href="/#meet"
              className="btn border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-granite-800"
            >
              Meet Morgan
            </Link>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-1">
          <div className="border border-white/15 bg-snow p-5 shadow-xl sm:p-7">
            <h2 className="font-serif text-2xl font-bold text-granite-800">
              Sign up to learn more
            </h2>
            <p className="mt-1 text-sm text-granite-500">
              Get event invites, volunteer opportunities, and updates from the trail.
            </p>
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-5 space-y-3"
              aria-describedby={status !== "idle" ? statusId : undefined}
            >
              <div>
                <label htmlFor="hero-first" className="label-field">
                  First name
                </label>
                <input
                  id="hero-first"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  className="input-field"
                  placeholder="First name"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="hero-email" className="label-field">
                    Email address <span className="text-amber-700">*</span>
                  </label>
                  <input
                    id="hero-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input-field"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="hero-zip" className="label-field">
                    ZIP code <span className="text-amber-700">*</span>
                  </label>
                  <input
                    id="hero-zip"
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                    className="input-field"
                    placeholder="ZIP code"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hero-phone" className="label-field">
                  Mobile number
                </label>
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="input-field"
                  placeholder="Mobile number"
                />
              </div>
              <label className="flex items-start gap-2 text-sm text-granite-600">
                <input
                  type="checkbox"
                  name="sms"
                  className="mt-1 h-4 w-4 rounded-sm border-granite-400 text-pine-600 focus:ring-pine-500"
                />
                Yes, I agree to occasional text updates. Msg &amp; data rates may
                apply. Reply STOP to opt out.
              </label>
              <button type="submit" className="btn-primary w-full">
                Join Our Team
              </button>
              <p className="text-xs leading-relaxed text-granite-400">
                By signing up you agree to receive campaign updates from{" "}
                {candidate.committee}. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
              {status !== "idle" && (
                <div
                  id={statusId}
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-2 rounded-sm px-3 py-2.5 text-sm ${
                    status === "success"
                      ? "bg-pine-50 text-pine-800"
                      : "bg-amber-50 text-amber-900"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  )}
                  <span>
                    {status === "success"
                      ? "You're on the list — welcome to the campaign."
                      : error}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-granite-950/50">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-5 py-3 text-sm text-granite-300 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            New Hampshire native · Laconia roots · Concord home · Main Street experience
          </p>
          <Link href="/#donate" className="font-semibold text-amber-300 underline-offset-2 hover:underline">
            Chip in to keep this campaign local →
          </Link>
        </div>
      </div>
    </section>
  );
}
