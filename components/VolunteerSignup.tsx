"use client";

import { useState } from "react";
import Link from "next/link";
import { volunteerRoles } from "@/lib/volunteers";
import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { postCampaignForm } from "@/lib/form-client";

const SUCCESS_MESSAGE =
  "Thanks — we received your volunteer sign-up. Campaign staff will follow up by email.";

export function VolunteerSignup() {
  const { statusId, status, fieldProps, FieldError, StatusRegion, reportErrors, reportSuccess } =
    useAccessibleForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const role = String(data.get("role") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await postCampaignForm({
        form: "volunteer",
        name,
        email,
        role,
        phone,
        company,
      });
      if (!result.ok) {
        reportErrors(result.fieldErrors ?? {}, result.error);
        return;
      }
      form.reset();
      reportSuccess(SUCCESS_MESSAGE);
    } catch {
      reportErrors({}, "Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
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
          disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
            {...fieldProps("email")}
          />
          <FieldError name="email" />
        </div>
      </div>
      <div>
        <label htmlFor="vol-phone" className="label-field">
          Phone
        </label>
        <input
          id="vol-phone"
          name="phone"
          type="tel"
          className="input-field"
          autoComplete="tel"
          disabled={submitting}
        />
      </div>
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="vol-company">Company</label>
        <input
          id="vol-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit volunteer sign-up"}
      </button>
      <p className="text-sm text-slate-muted">
        Prefer email first?{" "}
        <Link href="/#join" className="font-semibold text-red underline-offset-2 hover:underline">
          Join Team Varga on the homepage
        </Link>
        .
      </p>
      <StatusRegion successMessage={SUCCESS_MESSAGE} />
    </form>
  );
}
