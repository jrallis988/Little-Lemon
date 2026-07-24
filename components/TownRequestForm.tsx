"use client";

import { FormEvent, useId, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function TownRequestForm() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const town = String(data.get("town") || "").trim();
    if (!name || !town) {
      setStatus("error");
      setError("Please include your name and town.");
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
      className="space-y-4 border border-granite-200 bg-white p-6 sm:p-8"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <div>
        <label htmlFor="town-name" className="label-field">
          Your name
        </label>
        <input id="town-name" name="name" type="text" className="input-field" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="town-email" className="label-field">
          Email
        </label>
        <input id="town-email" name="email" type="email" className="input-field" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="town-town" className="label-field">
          Town or city
        </label>
        <input
          id="town-town"
          name="town"
          type="text"
          className="input-field"
          placeholder="e.g. Newmarket"
        />
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
            {status === "success"
              ? "Got it — we’ll follow up about bringing Nick to your town."
              : error}
          </span>
        </div>
      )}
    </form>
  );
}
