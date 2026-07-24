"use client";

import { FormEvent, useId, useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPinned,
  Users,
} from "lucide-react";

type FormStatus = "idle" | "success" | "error";

type FieldErrors = Record<string, string>;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

function StatusBanner({
  status,
  successMessage,
  errorMessage,
  id,
}: {
  status: FormStatus;
  successMessage: string;
  errorMessage: string;
  id: string;
}) {
  if (status === "idle") return null;
  const isSuccess = status === "success";
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      className={`mt-4 flex items-start gap-2 rounded-sm px-4 py-3 text-sm ${
        isSuccess
          ? "bg-pine-50 text-pine-800"
          : "bg-amber-50 text-amber-900"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      )}
      <span>{isSuccess ? successMessage : errorMessage}</span>
    </div>
  );
}

function LawnSignForm() {
  const statusId = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const address = String(data.get("address") || "").trim();
    const city = String(data.get("city") || "").trim();
    const zip = String(data.get("zip") || "").trim();
    const next: FieldErrors = {};

    if (!name) next.name = "Please enter your name.";
    if (!validateEmail(email)) next.email = "Enter a valid email address.";
    if (!address) next.address = "Street address is required for delivery.";
    if (!city) next.city = "City is required.";
    if (!/^\d{5}(-\d{4})?$/.test(zip)) next.zip = "Enter a valid NH ZIP code.";

    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <div>
        <label htmlFor="lawn-name" className="label-field">
          Full name
        </label>
        <input
          id="lawn-name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-field"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "lawn-name-err" : undefined}
        />
        {errors.name && (
          <p id="lawn-name-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="lawn-email" className="label-field">
          Email
        </label>
        <input
          id="lawn-email"
          name="email"
          type="email"
          autoComplete="email"
          className="input-field"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "lawn-email-err" : undefined}
        />
        {errors.email && (
          <p id="lawn-email-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="lawn-address" className="label-field">
          Street address
        </label>
        <input
          id="lawn-address"
          name="address"
          type="text"
          autoComplete="street-address"
          className="input-field"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "lawn-address-err" : undefined}
        />
        {errors.address && (
          <p id="lawn-address-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.address}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lawn-city" className="label-field">
            City
          </label>
          <input
            id="lawn-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className="input-field"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "lawn-city-err" : undefined}
          />
          {errors.city && (
            <p id="lawn-city-err" className="mt-1 text-sm text-amber-800" role="alert">
              {errors.city}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lawn-zip" className="label-field">
            ZIP
          </label>
          <input
            id="lawn-zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            className="input-field"
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? "lawn-zip-err" : undefined}
          />
          {errors.zip && (
            <p id="lawn-zip-err" className="mt-1 text-sm text-amber-800" role="alert">
              {errors.zip}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Request a lawn sign
      </button>
      <StatusBanner
        id={statusId}
        status={status}
        successMessage="Thanks — we'll be in touch about delivering your lawn sign."
        errorMessage="Please fix the highlighted fields and try again."
      />
    </form>
  );
}

function VolunteerForm() {
  const statusId = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const roles = data.getAll("role");
    const next: FieldErrors = {};

    if (!name) next.name = "Please enter your name.";
    if (!validateEmail(email)) next.email = "Enter a valid email address.";
    if (!validatePhone(phone)) next.phone = "Enter a phone number (10+ digits).";
    if (!roles.length) next.role = "Select at least one volunteer activity.";

    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <div>
        <label htmlFor="vol-name" className="label-field">
          Full name
        </label>
        <input
          id="vol-name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-field"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "vol-name-err" : undefined}
        />
        {errors.name && (
          <p id="vol-name-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-email" className="label-field">
            Email
          </label>
          <input
            id="vol-email"
            name="email"
            type="email"
            autoComplete="email"
            className="input-field"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "vol-email-err" : undefined}
          />
          {errors.email && (
            <p id="vol-email-err" className="mt-1 text-sm text-amber-800" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="vol-phone" className="label-field">
            Phone
          </label>
          <input
            id="vol-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="input-field"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "vol-phone-err" : undefined}
          />
          {errors.phone && (
            <p id="vol-phone-err" className="mt-1 text-sm text-amber-800" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
      <fieldset>
        <legend className="label-field">I can help with</legend>
        <div
          className="space-y-2"
          role="group"
          aria-describedby={errors.role ? "vol-role-err" : undefined}
        >
          {[
            { value: "phone", label: "Phone banking" },
            { value: "canvass", label: "Door-to-door canvassing" },
            { value: "events", label: "Event setup & hospitality" },
            { value: "signs", label: "Lawn sign delivery" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-3 text-base text-granite-700"
            >
              <input
                type="checkbox"
                name="role"
                value={opt.value}
                className="h-4 w-4 rounded-sm border-granite-400 text-pine-600 focus:ring-pine-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.role && (
          <p id="vol-role-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.role}
          </p>
        )}
      </fieldset>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Sign up to volunteer
      </button>
      <StatusBanner
        id={statusId}
        status={status}
        successMessage="You're on the list — our volunteer coordinator will reach out soon."
        errorMessage="Please fix the highlighted fields and try again."
      />
    </form>
  );
}

function NewsletterForm() {
  const statusId = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const next: FieldErrors = {};
    if (!validateEmail(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-4"
      aria-describedby={status !== "idle" ? statusId : undefined}
    >
      <div>
        <label htmlFor="news-email" className="label-field">
          Email address
        </label>
        <input
          id="news-email"
          name="email"
          type="email"
          autoComplete="email"
          className="input-field"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "news-email-err" : undefined}
        />
        {errors.email && (
          <p id="news-email-err" className="mt-1 text-sm text-amber-800" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <p className="text-sm text-granite-500">
        Occasional updates on events, policy, and ways to help. Unsubscribe
        anytime.
      </p>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Subscribe
      </button>
      <StatusBanner
        id={statusId}
        status={status}
        successMessage="You're subscribed. Welcome to the campaign."
        errorMessage="Please enter a valid email and try again."
      />
    </form>
  );
}

const panels = [
  {
    id: "lawn",
    title: "Request a lawn sign",
    description: "Plant a sign and show your neighbors where you stand.",
    icon: MapPinned,
    Form: LawnSignForm,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Phone banks, canvassing, and local events—every hour counts.",
    icon: Users,
    Form: VolunteerForm,
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Stay informed without the noise. Short, useful updates only.",
    icon: Mail,
    Form: NewsletterForm,
  },
] as const;

export function ActionCenter() {
  const [active, setActive] = useState<(typeof panels)[number]["id"]>("volunteer");
  const current = panels.find((p) => p.id === active) ?? panels[1];
  const Form = current.Form;

  return (
    <section
      id="action"
      aria-labelledby="action-heading"
      className="scroll-mt-28 bg-mist"
    >
      <div className="mx-auto max-w-content section-pad">
        <h2 id="action-heading" className="section-title">
          Action Center
        </h2>
        <p className="section-lead">
          Friction-free ways to help—lawn signs, volunteer shifts, and the
          newsletter. Pick a path and we&apos;ll take it from there.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div
            role="tablist"
            aria-label="Action options"
            className="flex flex-row gap-2 overflow-x-auto lg:flex-col"
          >
            {panels.map((panel) => {
              const Icon = panel.icon;
              const selected = active === panel.id;
              return (
                <button
                  key={panel.id}
                  type="button"
                  role="tab"
                  id={`tab-${panel.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${panel.id}`}
                  className={`flex min-w-[10rem] flex-1 items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors lg:flex-none ${
                    selected
                      ? "border-pine-600 bg-pine-700 text-white"
                      : "border-granite-200 bg-white text-granite-700 hover:border-pine-400"
                  }`}
                  onClick={() => setActive(panel.id)}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="text-sm font-semibold">{panel.title}</span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="border border-granite-200 bg-white p-6 sm:p-8"
          >
            <h3 className="font-serif text-2xl font-bold text-granite-800">
              {current.title}
            </h3>
            <p className="mt-2 text-base text-granite-500">
              {current.description}
            </p>
            <div className="mt-6">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
