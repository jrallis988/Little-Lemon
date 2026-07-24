"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

export function JoinForm() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const first = String(data.get("first_name") || "").trim();
    const last = String(data.get("last_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();

    if (!first || !last) {
      setStatus("error");
      setError("Please enter your first and last name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    if (zip && !/^\d{5}(-\d{4})?$/.test(zip)) {
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
      id="join"
      aria-labelledby="join-heading"
      className="scroll-mt-28 bg-navy"
    >
      <div className="mx-auto max-w-content section-pad">
        <div className="mx-auto max-w-2xl">
          <SectionIntro
            overline="Get involved"
            title="Join Team Varga"
            lead="Sign up to support my campaign"
            tone="dark"
            titleId="join-heading"
          />

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-8 space-y-4 border border-white/15 bg-ink/30 p-6 sm:p-8"
            aria-describedby={status !== "idle" ? statusId : undefined}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="join-first" className="mb-1.5 block text-sm font-semibold text-white/85">
                  First Name
                </label>
                <input
                  id="join-first"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  className="w-full rounded-cta border border-white/20 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
                />
              </div>
              <div>
                <label htmlFor="join-last" className="mb-1.5 block text-sm font-semibold text-white/85">
                  Last Name
                </label>
                <input
                  id="join-last"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  className="w-full rounded-cta border border-white/20 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
                />
              </div>
            </div>
            <div>
              <label htmlFor="join-email" className="mb-1.5 block text-sm font-semibold text-white/85">
                Email <span className="text-red">*</span>
              </label>
              <input
                id="join-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-cta border border-white/20 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="join-phone" className="mb-1.5 block text-sm font-semibold text-white/85">
                  Cell Phone
                </label>
                <input
                  id="join-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-cta border border-white/20 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
                />
              </div>
              <div>
                <label htmlFor="join-zip" className="mb-1.5 block text-sm font-semibold text-white/85">
                  Zip Code
                </label>
                <input
                  id="join-zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className="w-full rounded-cta border border-white/20 bg-navy px-4 py-3 text-white placeholder:text-white/40 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/30"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Join The Team →
            </button>
            <p className="text-xs leading-relaxed text-white/50">
              By submitting your cell phone number you agree to receive periodic
              text messages from the Nick Varga Campaign. Message and data rates
              may apply. Text HELP for info. Text STOP to stop.{" "}
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
                className={`flex items-start gap-2 rounded-cta px-3 py-2.5 text-sm ${
                  status === "success"
                    ? "bg-white/10 text-white"
                    : "bg-red/20 text-white"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                )}
                <span>
                  {status === "success"
                    ? "You're on the team — welcome aboard."
                    : error}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
