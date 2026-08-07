"use client";

import Link from "next/link";
import { volunteerRoles } from "@/lib/volunteers";
import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { DemoFormNote } from "@/components/DemoFormNote";
import { demoFormSuccess } from "@/lib/demo";

export function VolunteerSignup() {
  const { statusId, status, fieldProps, FieldError, StatusRegion, reportErrors, reportSuccess } =
    useAccessibleForm();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    // Demo mode: front-end success only — no email/CRM/API
    reportSuccess(demoFormSuccess.volunteer);
    e.currentTarget.reset();
  }

  return (
    <form
      id="volunteer-form"
      onSubmit={onSubmit}
      noValidate
      className="mt-14 scroll-mt-28 space-y-4 border border-slate-line bg-paper p-6 sm:p-8"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <h2 className="font-display text-2xl font-bold text-ink">Sign up to volunteer</h2>
      <DemoFormNote />
      <RequiredLegend />
      <div>
        <label htmlFor="vol-role" className="label-field">
          Opportunity
        </label>
        <select
          id="vol-role"
          name="role"
          className="input-field"
          defaultValue={volunteerRoles[0]?.id}
        >
          {volunteerRoles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} — {item.location}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="label-field">
            Full name
            <RequiredMark />
          </label>
          <input
            id="vol-name"
            name="name"
            type="text"
            className="input-field"
            autoComplete="name"
            required
            {...fieldProps("name")}
          />
          <FieldError name="name" />
        </div>
        <div>
          <label htmlFor="vol-email" className="label-field">
            Email
            <RequiredMark />
          </label>
          <input
            id="vol-email"
            name="email"
            type="email"
            className="input-field"
            autoComplete="email"
            required
            {...fieldProps("email")}
          />
          <FieldError name="email" />
        </div>
      </div>
      <div>
        <label htmlFor="vol-phone" className="label-field">
          Phone
        </label>
        <input id="vol-phone" name="phone" type="tel" className="input-field" autoComplete="tel" />
      </div>
      <button type="submit" className="btn-primary">
        Submit volunteer sign-up
      </button>
      <p className="text-sm text-slate-muted">
        Prefer email first?{" "}
        <Link href="/#join" className="font-semibold text-red underline-offset-2 hover:underline">
          Join Team Varga on the homepage
        </Link>
        .
      </p>
      <StatusRegion successMessage={demoFormSuccess.volunteer} />
    </form>
  );
}
