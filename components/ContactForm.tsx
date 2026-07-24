"use client";

import { FormEvent, useId, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) {
      setStatus("error");
      setError("Please include your name and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    setStatus("success");
    setError("");
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4 border border-granite-200 bg-white p-6"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <div>
        <label htmlFor="contact-name" className="label-field">
          Name
        </label>
        <input id="contact-name" name="name" type="text" className="input-field" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="contact-email" className="label-field">
          Email
        </label>
        <input id="contact-email" name="email" type="email" className="input-field" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="contact-message" className="label-field">
          Message
        </label>
        <textarea id="contact-message" name="message" rows={5} className="input-field" />
      </div>
      <button type="submit" className="btn-primary">
        Send message
      </button>
      {status !== "idle" && (
        <div
          id={statusId}
          role="status"
          aria-live="polite"
          className={`flex items-start gap-2 rounded-sm px-3 py-2.5 text-sm ${
            status === "success" ? "bg-pine-50 text-pine-800" : "bg-amber-50 text-amber-900"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          )}
          <span>
            {status === "success" ? "Message received — we’ll follow up." : error}
          </span>
        </div>
      )}
    </form>
  );
}
