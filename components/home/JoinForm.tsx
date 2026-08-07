"use client";

import Link from "next/link";
import { SectionIntro } from "@/components/SectionIntro";
import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { demoFormSuccess } from "@/lib/demo";

export function JoinForm() {
  const {
    statusId,
    status,
    fieldProps,
    FieldError,
    StatusRegion,
    reportErrors,
    reportSuccess,
  } = useAccessibleForm();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const first = String(data.get("first_name") || "").trim();
    const last = String(data.get("last_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const zip = String(data.get("zip") || "").trim();
    const errors: Record<string, string> = {};

    if (!first) errors.first_name = "Enter your first name.";
    if (!last) errors.last_name = "Enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (zip && !/^\d{5}(-\d{4})?$/.test(zip)) {
      errors.zip = "Enter a valid ZIP code.";
    }

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    // Demo mode: front-end success only — no email/CRM/API
    reportSuccess(demoFormSuccess.join);
    e.currentTarget.reset();
  }

  return (
    <section id="join" aria-labelledby="join-heading" className="scroll-mt-28 bg-navy">
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
            <p
              className="rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-xs leading-relaxed text-white/75"
              role="note"
            >
              Demo mode: this form validates and shows a success message only. It does not send
              email, sync a CRM, or save data.
            </p>
            <RequiredLegend />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="join-first" className="mb-1.5 block text-sm font-semibold text-white">
                  First Name
                  <RequiredMark />
                </label>
                <input
                  id="join-first"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="input-field border-white/20 bg-navy text-white placeholder:text-white/50"
                  {...fieldProps("first_name")}
                />
                <FieldError name="first_name" />
              </div>
              <div>
                <label htmlFor="join-last" className="mb-1.5 block text-sm font-semibold text-white">
                  Last Name
                  <RequiredMark />
                </label>
                <input
                  id="join-last"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="input-field border-white/20 bg-navy text-white placeholder:text-white/50"
                  {...fieldProps("last_name")}
                />
                <FieldError name="last_name" />
              </div>
            </div>
            <div>
              <label htmlFor="join-email" className="mb-1.5 block text-sm font-semibold text-white">
                Email
                <RequiredMark />
              </label>
              <input
                id="join-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field border-white/20 bg-navy text-white placeholder:text-white/50"
                {...fieldProps("email")}
              />
              <FieldError name="email" />
            </div>
            <div>
              <label htmlFor="join-zip" className="mb-1.5 block text-sm font-semibold text-white">
                ZIP code
              </label>
              <input
                id="join-zip"
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                className="input-field border-white/20 bg-navy text-white placeholder:text-white/50"
                {...fieldProps("zip")}
                aria-required={undefined}
              />
              <FieldError name="zip" />
            </div>
            <button type="submit" className="btn-primary w-full">
              Join the campaign
            </button>
            <p className="text-sm text-white/85">
              By signing up you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <StatusRegion successMessage={demoFormSuccess.join} />
          </form>
        </div>
      </div>
    </section>
  );
}
