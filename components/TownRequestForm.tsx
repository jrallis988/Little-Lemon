"use client";

import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";

export function TownRequestForm() {
  const { statusId, status, fieldProps, FieldError, StatusRegion, reportErrors, reportSuccess } =
    useAccessibleForm();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const town = String(data.get("town") || "").trim();
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

    reportSuccess("Visit request received — we’ll be in touch.");
    e.currentTarget.reset();
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
          {...fieldProps("town")}
        />
        <FieldError name="town" />
      </div>
      <div>
        <label htmlFor="town-notes" className="label-field">
          What should Nick hear about?
        </label>
        <textarea id="town-notes" name="notes" rows={4} className="input-field" />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Request a Visit
      </button>
      <StatusRegion successMessage="Visit request received — we’ll be in touch." />
    </form>
  );
}
