"use client";

import { FormEvent, useState } from "react";
import {
  normalizePlanInterest,
  planInterestOptions,
  type LeadType,
} from "@/lib/leads";
import { site } from "@/lib/site";

type LeadFormProps = {
  type: LeadType;
  title?: string;
  submitLabel?: string;
  defaultPlan?: string;
};

export function LeadForm({
  type,
  title,
  submitLabel = "Submit request",
  defaultPlan = "Not sure yet",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const selectedPlan = normalizePlanInterest(defaultPlan);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      role: String(formData.get("role") ?? ""),
      planInterest: String(formData.get("planInterest") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Request submitted.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded bg-white p-6 shadow-card sm:p-8">
        {title ? (
          <h2 className="text-2xl font-bold tracking-tight text-navy">{title}</h2>
        ) : null}
        <div
          className="mt-6 rounded border border-navy/15 bg-paper-warm p-5"
          role="status"
        >
          <p className="text-lg font-bold text-navy">Request received</p>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">{message}</p>
          <p className="mt-4 text-sm text-mute">
            Prefer email? Reach sales at{" "}
            <a className="font-semibold text-link hover:text-navy" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
          <button
            type="button"
            className="btn-outline mt-6 !py-2"
            onClick={() => {
              setStatus("idle");
              setMessage("");
            }}
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded bg-white p-6 shadow-card sm:p-8">
      {title ? (
        <h2 className="text-2xl font-bold tracking-tight text-navy">{title}</h2>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate={false}>
        {/* Honeypot — hidden from people, filled by many bots */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" name="website" type="text" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">
            Full name
            <input
              required
              name="name"
              type="text"
              autoComplete="name"
              className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            />
          </label>
          <label className="block text-sm font-semibold text-ink">
            Work email
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">
            School / organization
            <input
              required={type !== "contact"}
              name="organization"
              type="text"
              autoComplete="organization"
              className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            />
          </label>
          <label className="block text-sm font-semibold text-ink">
            Role
            <input
              name="role"
              type="text"
              placeholder="Teacher, principal, curriculum lead…"
              className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">
            Plan interest
            <select
              name="planInterest"
              defaultValue={selectedPlan}
              className="mt-1.5 w-full rounded border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            >
              {planInterestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-ink">
            Phone (optional)
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-ink">
          Message
          <textarea
            name="message"
            rows={4}
            placeholder={
              type === "demo"
                ? "Tell us about your classroom or school and when you’d like a walkthrough."
                : type === "pricing"
                  ? "Share seat counts, grade levels, or rollout timing."
                  : "How can we help?"
            }
            className="mt-1.5 w-full rounded border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending…" : submitLabel}
        </button>

        {status === "error" && message ? (
          <p className="text-sm font-medium text-accent-deep" role="alert">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
