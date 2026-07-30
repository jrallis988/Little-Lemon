"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { Notice } from "@/components/ui/Callout";
import { contentApi } from "@/lib/content";
import { insuranceCarriers } from "@/content/data/departments";
import { useAppointmentStore } from "@/store";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const steps = [
  "Care need",
  "Insurance",
  "Location",
  "Contact",
  "Confirmation",
];

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidName(value: string) {
  return value.trim().length >= 2;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AppointmentWizard() {
  const {
    step,
    draft,
    submitting,
    submitError: storeSubmitError,
    setStep,
    updateDraft,
    reset,
    completeWithReference,
    setSubmitting,
    setSubmitError: setStoreSubmitError,
  } = useAppointmentStore();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const submitError = localError || storeSubmitError;

  const conditionOptions = useMemo(
    () => [
      ...contentApi.conditions.map((c) => ({
        value: c.name,
        label: c.name,
      })),
      ...contentApi.departments.map((d) => ({
        value: `${d.name} (department)`,
        label: `${d.name} (department)`,
      })),
    ],
    [],
  );

  const insuranceOptions = useMemo(
    () =>
      insuranceCarriers.map((c) => ({
        value: c.id,
        label: c.name,
      })),
    [],
  );

  const nameError =
    touched.patientName && !isValidName(draft.patientName)
      ? "Enter the parent or caregiver’s full name."
      : null;
  const phoneError =
    touched.phone && !isValidPhone(draft.phone)
      ? "Enter a valid phone number with at least 10 digits."
      : null;
  const emailError =
    touched.email && !isValidEmail(draft.email)
      ? "Enter a valid email address."
      : null;

  const canNext =
    (step === 0 && Boolean(draft.conditionOrDepartment)) ||
    (step === 1 && Boolean(draft.insuranceCarrierId)) ||
    (step === 2 && Boolean(draft.locationSlug || draft.telehealth)) ||
    (step === 3 &&
      isValidName(draft.patientName) &&
      isValidPhone(draft.phone) &&
      isValidEmail(draft.email) &&
      !nameError &&
      !phoneError &&
      !emailError);

  async function submitRequest() {
    setTouched({ patientName: true, phone: true, email: true });
    setLocalError(null);
    setStoreSubmitError(null);

    if (
      !isValidName(draft.patientName) ||
      !isValidPhone(draft.phone) ||
      !isValidEmail(draft.email)
    ) {
      setLocalError("Please fix the highlighted fields before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditionOrDepartment: draft.conditionOrDepartment,
          insuranceCarrierId: draft.insuranceCarrierId,
          locationSlug: draft.locationSlug,
          telehealth: draft.telehealth,
          patientName: draft.patientName,
          phone: draft.phone,
          email: draft.email,
          notes: draft.notes,
          // Honeypot — leave empty
          website: "",
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        referenceId?: string;
        errors?: string[];
      };
      if (!res.ok || !data.ok || !data.referenceId) {
        throw new Error(
          data.errors?.join(" ") || "Unable to submit your request.",
        );
      }
      completeWithReference(data.referenceId);
      trackEvent("appointment_request_submitted", {
        referenceId: data.referenceId,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to submit your request.";
      setStoreSubmitError(message);
      setSubmitting(false);
    }
  }

  function goNext() {
    setLocalError(null);
    setStoreSubmitError(null);
    if (step === 3) {
      void submitRequest();
      return;
    }
    if (!canNext) {
      setLocalError("Complete the required fields to continue.");
      return;
    }
    setStep(step + 1);
  }

  return (
    <div className="wrap py-s7 pb-s10">
      <ol className="mb-s7 flex flex-wrap gap-s2" aria-label="Appointment steps">
        {steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-sm font-bold",
              i === step
                ? "border-ocean bg-ocean text-white"
                : i < step
                  ? "border-ocean/40 bg-ocean/10 text-ocean"
                  : "border-border bg-white text-text-meta",
            )}
            aria-current={i === step ? "step" : undefined}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mx-auto max-w-[720px] rounded-md border border-border bg-white p-s6">
        {step === 0 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              What care do you need?
            </legend>
            <label
              htmlFor="care-need"
              className="mb-[5px] block text-sm font-bold text-text"
            >
              Condition or department <span className="text-emergency">*</span>
            </label>
            <SelectField
              id="care-need"
              aria-label="Select condition or department"
              value={draft.conditionOrDepartment || undefined}
              onValueChange={(value) => {
                updateDraft({ conditionOrDepartment: value });
                setLocalError(null);
              }}
              placeholder="Select one…"
              options={conditionOptions}
            />
            <Notice className="mt-s4">
              <p>
                This request is reviewed by scheduling staff. It does not create
                a confirmed visit time until you are contacted.
              </p>
            </Notice>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              Insurance verification
            </legend>
            <label
              htmlFor="insurance"
              className="mb-[5px] block text-sm font-bold text-text"
            >
              Insurance carrier <span className="text-emergency">*</span>
            </label>
            <SelectField
              id="insurance"
              aria-label="Select insurance carrier"
              value={draft.insuranceCarrierId || undefined}
              onValueChange={(value) => {
                updateDraft({ insuranceCarrierId: value });
                setLocalError(null);
              }}
              placeholder="Select carrier…"
              options={insuranceOptions}
            />
            <p className="mt-s3 text-sm font-light text-text-meta">
              Self-pay and “not sure” are available. Network checks are completed
              during scheduling follow-up.
            </p>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              Location preference
            </legend>
            <div
              className="mb-s4 flex flex-col gap-s2"
              role="radiogroup"
              aria-label="Preferred location or telehealth"
            >
              {contentApi.locations.map((loc) => (
                <label
                  key={loc.slug}
                  className={cn(
                    "flex cursor-pointer items-start gap-s3 rounded-sm border p-s4",
                    draft.locationSlug === loc.slug && !draft.telehealth
                      ? "border-ocean bg-ocean/[0.04]"
                      : "border-border",
                  )}
                >
                  <input
                    type="radio"
                    name="location"
                    className="mt-1"
                    checked={
                      draft.locationSlug === loc.slug && !draft.telehealth
                    }
                    onChange={() => {
                      updateDraft({
                        locationSlug: loc.slug,
                        telehealth: false,
                      });
                      setLocalError(null);
                    }}
                  />
                  <span>
                    <span className="block text-base font-bold text-text">
                      {loc.name}
                    </span>
                    <span className="text-sm font-light text-text-body">
                      {loc.city}, {loc.state} ·{" "}
                      {loc.services.slice(0, 2).join(", ")}
                    </span>
                  </span>
                </label>
              ))}
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-s3 rounded-sm border p-s4",
                  draft.telehealth
                    ? "border-ocean bg-ocean/[0.04]"
                    : "border-border",
                )}
              >
                <input
                  type="radio"
                  name="location"
                  className="mt-1"
                  checked={draft.telehealth}
                  onChange={() => {
                    updateDraft({ telehealth: true, locationSlug: "" });
                    setLocalError(null);
                  }}
                />
                <span>
                  <span className="block text-base font-bold text-text">
                    Telehealth visit
                  </span>
                  <span className="text-sm font-light text-text-body">
                    Video visit when clinically appropriate
                  </span>
                </span>
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              Contact details
            </legend>
            <div className="mb-s4">
              <label
                htmlFor="patient-name"
                className="mb-[5px] block text-sm font-bold text-text"
              >
                Parent / caregiver name{" "}
                <span className="text-emergency">*</span>
              </label>
              <Input
                id="patient-name"
                value={draft.patientName}
                onChange={(e) => updateDraft({ patientName: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, patientName: true }))}
                autoComplete="name"
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "patient-name-error" : undefined}
                required
              />
              {nameError ? (
                <p
                  id="patient-name-error"
                  className="mt-1 text-sm text-emergency"
                  role="alert"
                >
                  {nameError}
                </p>
              ) : null}
            </div>
            <div className="mb-s4">
              <label
                htmlFor="patient-email"
                className="mb-[5px] block text-sm font-bold text-text"
              >
                Email <span className="text-emergency">*</span>
              </label>
              <Input
                id="patient-email"
                type="email"
                value={draft.email}
                onChange={(e) => updateDraft({ email: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                autoComplete="email"
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "patient-email-error" : undefined}
                required
              />
              {emailError ? (
                <p
                  id="patient-email-error"
                  className="mt-1 text-sm text-emergency"
                  role="alert"
                >
                  {emailError}
                </p>
              ) : null}
            </div>
            <div className="mb-s4">
              <label
                htmlFor="patient-phone"
                className="mb-[5px] block text-sm font-bold text-text"
              >
                Phone number <span className="text-emergency">*</span>
              </label>
              <Input
                id="patient-phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => updateDraft({ phone: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                autoComplete="tel"
                placeholder="(617) 555-0100"
                aria-invalid={Boolean(phoneError)}
                aria-describedby={phoneError ? "patient-phone-error" : undefined}
                required
              />
              {phoneError ? (
                <p
                  id="patient-phone-error"
                  className="mt-1 text-sm text-emergency"
                  role="alert"
                >
                  {phoneError}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="patient-notes"
                className="mb-[5px] block text-sm font-bold text-text"
              >
                Notes (optional)
              </label>
              <textarea
                id="patient-notes"
                value={draft.notes}
                onChange={(e) => updateDraft({ notes: e.target.value })}
                rows={4}
                className="w-full rounded-sm border-[1.5px] border-border bg-white px-[13px] py-2.5 font-sans text-base font-light text-text outline-none focus:border-ocean"
              />
            </div>
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <div role="status" aria-live="polite">
            <h2 className="mb-s3 text-xl font-bold text-ocean">
              Request received
            </h2>
            <p className="mb-s4 text-md font-light text-text-body">
              Thanks{draft.patientName ? `, ${draft.patientName}` : ""}. Your
              appointment request was submitted to our intake queue. A
              scheduler will follow up using {draft.email || "your email"} or{" "}
              {draft.phone}.
            </p>
            <div className="mb-s5 rounded-md bg-surface p-s5">
              <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                Reference ticket
              </div>
              <div
                className="mt-1 font-mono text-2xl font-black tracking-wide text-blue"
                data-testid="appointment-reference"
              >
                {draft.referenceId}
              </div>
              <p className="mt-2 text-sm font-light text-text-meta">
                Keep this ID for your records and any follow-up calls.
              </p>
              <ul className="mt-s4 flex flex-col gap-1 text-sm font-light text-text-body">
                <li>Care need: {draft.conditionOrDepartment}</li>
                <li>
                  Insurance:{" "}
                  {insuranceCarriers.find(
                    (c) => c.id === draft.insuranceCarrierId,
                  )?.name ?? "—"}
                </li>
                <li>
                  Location:{" "}
                  {draft.telehealth
                    ? "Telehealth"
                    : contentApi.getLocation(draft.locationSlug)?.name ?? "—"}
                </li>
                <li>Email: {draft.email}</li>
                <li>Callback phone: {draft.phone}</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-s3">
              <Button href="/patients-families/prepare-for-your-visit" variant="ocean">
                Prepare for your visit
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Start another request
              </Button>
              <Link
                href="/find-a-doctor"
                className="inline-flex items-center text-sm font-bold text-ocean"
              >
                Browse doctors
              </Link>
            </div>
          </div>
        ) : null}

        {step < 4 && submitError ? (
          <p className="mt-s4 text-sm text-emergency" role="alert">
            {submitError}
          </p>
        ) : null}

        {step < 4 ? (
          <div className="mt-s6 flex flex-wrap gap-s3 border-t border-border pt-s5">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => {
                  setLocalError(null);
                  setStoreSubmitError(null);
                  setStep(step - 1);
                }}
              >
                Back
              </Button>
            ) : null}
            <Button
              type="button"
              variant="ocean"
              disabled={!canNext || submitting}
              onClick={goNext}
            >
              {step < 3
                ? "Continue"
                : submitting
                  ? "Submitting…"
                  : "Submit request"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
