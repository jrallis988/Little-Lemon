"use client";

import { FormEvent, useState } from "react";
import type { LeadType } from "@/lib/leads";

type LeadFormProps = {
  type: LeadType;
  title?: string;
  submitLabel?: string;
  defaultPlan?: string;
};

const planOptions = ["Classroom", "School", "District", "Not sure yet"];

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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; message?: string };

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

  return (
    <div className="rounded bg-white p-6 shadow-card sm:p-8">
      {title ? (
        <h2 className="text-2xl font-bold tracking-tight text-navy">{title}</h2>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
              defaultValue={defaultPlan}
              className="mt-1.5 w-full rounded border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none transition focus:border-navy"
            >
              {planOptions.map((option) => (
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

        {message ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-accent-deep" : "text-accent"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
