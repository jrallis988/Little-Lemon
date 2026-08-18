"use client";

import { useState } from "react";
import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { postCampaignForm } from "@/lib/form-client";

const SUCCESS_MESSAGE =
  "Thanks — we received your town visit request. Campaign staff will follow up by email.";

export function TownRequestForm() {
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
    const town = String(data.get("town") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    const company = String(data.get("company") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!town) errors.town = "Enter your town or city.";

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await postCampaignForm({
        form: "town-request",
        name,
        email,
        town,
        notes,
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
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 border border-slate-line bg-white p-6 sm:p-8"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <RequiredLegend />
      <div>
        <label htmlFor="town-name" className="label-field">
          Your name
          <RequiredMark />
        </label>
        <input
          id="town-name"
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
        <label htmlFor="town-email" className="label-field">
          Email
          <RequiredMark />
        </label>
        <input
          id="town-email"
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
      <div>
        <label htmlFor="town-town" className="label-field">
          Town or city
          <RequiredMark />
        </label>
        <input
          id="town-town"
          name="town"
          type="text"
          className="input-field"
          placeholder="e.g. Newmarket"
          required
          disabled={submitting}
          {...fieldProps("town")}
        />
        <FieldError name="town" />
      </div>
      <div>
        <label htmlFor="town-notes" className="label-field">
          What should Nick hear about?
        </label>
        <textarea
          id="town-notes"
          name="notes"
          rows={4}
          className="input-field"
          disabled={submitting}
        />
      </div>
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="town-company">Company</label>
        <input
          id="town-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Sending…" : "Request a Visit"}
      </button>
      <StatusRegion successMessage={SUCCESS_MESSAGE} />
    </form>
  );
}
