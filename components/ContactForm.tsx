"use client";

import { useState } from "react";
import { RequiredLegend, RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { postCampaignForm } from "@/lib/form-client";

const SUCCESS_MESSAGE = "Thanks — your message was sent to the campaign. We’ll follow up by email.";

export function ContactForm() {
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
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();
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

    setSubmitting(true);
    try {
      const result = await postCampaignForm({
        form: "contact",
        name,
        email,
        message,
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
      className="space-y-4 border border-slate-line bg-white p-6"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
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
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
          {...fieldProps("message")}
        />
        <FieldError name="message" />
      </div>
      <div className="join-hp" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
      <StatusRegion successMessage={SUCCESS_MESSAGE} />
    </form>
  );
}
