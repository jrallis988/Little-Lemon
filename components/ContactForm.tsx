"use client";

import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { DemoFormNote } from "@/components/DemoFormNote";
import { demoFormSuccess } from "@/lib/demo";

export function ContactForm() {
  const { statusId, status, fieldProps, FieldError, StatusRegion, reportErrors, reportSuccess } =
    useAccessibleForm();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!message) errors.message = "Enter a message.";

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    // Demo mode: front-end success only — no email/CRM/API
    reportSuccess(demoFormSuccess.contact);
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 border border-slate-line bg-white p-6"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <DemoFormNote />
      <RequiredLegend />
      <div>
        <label htmlFor="contact-name" className="label-field">
          Name
          <RequiredMark />
        </label>
        <input
          id="contact-name"
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
        <label htmlFor="contact-email" className="label-field">
          Email
          <RequiredMark />
        </label>
        <input
          id="contact-email"
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
        <label htmlFor="contact-message" className="label-field">
          Message
          <RequiredMark />
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="input-field"
          required
          {...fieldProps("message")}
        />
        <FieldError name="message" />
      </div>
      <button type="submit" className="btn-primary">
        Send message
      </button>
      <StatusRegion successMessage={demoFormSuccess.contact} />
    </form>
  );
}
