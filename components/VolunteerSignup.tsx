"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { volunteerRoles } from "@/lib/volunteers";

export function VolunteerSignup() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name) {
      setStatus("error");
      setError("Please enter your name.");
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
      id="volunteer-form"
      onSubmit={onSubmit}
      noValidate
      className="mt-14 scroll-mt-28 space-y-4 border border-granite-200 bg-mist p-6 sm:p-8"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <h2 className="font-serif text-2xl font-bold text-granite-800">
        Sign up to volunteer
      </h2>
      <div>
        <label htmlFor="vol-role" className="label-field">
          Opportunity
        </label>
        <select id="vol-role" name="role" className="input-field" defaultValue={volunteerRoles[0]?.id}>
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
          </label>
          <input id="vol-name" name="name" type="text" className="input-field" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="vol-email" className="label-field">
            Email
          </label>
          <input id="vol-email" name="email" type="email" className="input-field" autoComplete="email" />
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
      <p className="text-sm text-granite-500">
        Prefer email first?{" "}
        <Link href="/#join" className="font-semibold text-pine-700 underline-offset-2 hover:underline">
          Join Team Varga
        </Link>
        .
      </p>
      {status !== "idle" && (
        <div
          id={statusId}
          role="status"
          aria-live="polite"
          className={`flex items-start gap-2 rounded-sm px-3 py-2.5 text-sm ${
            status === "success"
              ? "bg-pine-50 text-pine-800"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          )}
          <span>
            {status === "success"
              ? "Thanks — our volunteer coordinator will follow up."
              : error}
          </span>
        </div>
      )}
    </form>
  );
}
