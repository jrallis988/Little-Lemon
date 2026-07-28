"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Notice } from "@/components/ui/Callout";
import { contentApi } from "@/lib/content";
import { insuranceCarriers } from "@/content/data/departments";
import { useAppointmentStore } from "@/store";
import { cn } from "@/lib/cn";

const steps = [
  "Care need",
  "Insurance",
  "Location",
  "Contact",
  "Confirmation",
];

export function AppointmentWizard() {
  const { step, draft, setStep, updateDraft, complete, reset } =
    useAppointmentStore();

  const conditionOptions = useMemo(
    () => [
      ...contentApi.conditions.map((c) => c.name),
      ...contentApi.departments.map((d) => `${d.name} (department)`),
    ],
    [],
  );

  const canNext =
    (step === 0 && draft.conditionOrDepartment) ||
    (step === 1 && draft.insuranceCarrierId) ||
    (step === 2 && (draft.locationSlug || draft.telehealth)) ||
    (step === 3 && draft.patientName.trim() && draft.phone.trim());

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
            <label className="mb-[5px] block text-sm font-bold text-text">
              Condition or department
            </label>
            <Select
              value={draft.conditionOrDepartment}
              onChange={(e) =>
                updateDraft({ conditionOrDepartment: e.target.value })
              }
              aria-label="Select condition or department"
            >
              <option value="">Select one…</option>
              {conditionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            <Notice className="mt-s4">
              <p>
                This is a prototype request flow. No appointment is actually
                scheduled.
              </p>
            </Notice>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              Insurance verification
            </legend>
            <label className="mb-[5px] block text-sm font-bold text-text">
              Insurance carrier
            </label>
            <Select
              value={draft.insuranceCarrierId}
              onChange={(e) =>
                updateDraft({ insuranceCarrierId: e.target.value })
              }
              aria-label="Select insurance carrier"
            >
              <option value="">Select carrier…</option>
              {insuranceCarriers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <p className="mt-s3 text-sm font-light text-text-meta">
              In production this step would check network participation and
              referral requirements.
            </p>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="mb-s4 text-xl font-bold text-ocean">
              Location preference
            </legend>
            <div className="mb-s4 flex flex-col gap-s2">
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
                    onChange={() =>
                      updateDraft({
                        locationSlug: loc.slug,
                        telehealth: false,
                      })
                    }
                  />
                  <span>
                    <span className="block text-base font-bold text-text">
                      {loc.name}
                    </span>
                    <span className="text-sm font-light text-text-body">
                      {loc.city}, {loc.state} · {loc.services.slice(0, 2).join(", ")}
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
                  onChange={() =>
                    updateDraft({ telehealth: true, locationSlug: "" })
                  }
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
                Parent / caregiver name
              </label>
              <Input
                id="patient-name"
                value={draft.patientName}
                onChange={(e) => updateDraft({ patientName: e.target.value })}
                autoComplete="name"
              />
            </div>
            <div className="mb-s4">
              <label
                htmlFor="patient-phone"
                className="mb-[5px] block text-sm font-bold text-text"
              >
                Phone number
              </label>
              <Input
                id="patient-phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => updateDraft({ phone: e.target.value })}
                autoComplete="tel"
              />
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
          </fieldset>
        ) : null}

        {step === 4 ? (
          <div role="status" aria-live="polite">
            <h2 className="mb-s3 text-xl font-bold text-ocean">
              Request received
            </h2>
            <p className="mb-s4 text-md font-light text-text-body">
              Thanks{draft.patientName ? `, ${draft.patientName}` : ""}. Your
              mock appointment request is confirmed.
            </p>
            <div className="mb-s5 rounded-md bg-surface p-s5">
              <div className="text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                Reference ticket
              </div>
              <div className="mt-1 text-2xl font-black tracking-wide text-blue">
                {draft.referenceId}
              </div>
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
              </ul>
            </div>
            <div className="flex flex-wrap gap-s3">
              <Button href="/portal" variant="ocean">
                Open MyChildren&apos;s sandbox
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
              >
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

        {step < 4 ? (
          <div className="mt-s6 flex flex-wrap gap-s3 border-t border-border pt-s5">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : null}
            {step < 3 ? (
              <Button
                type="button"
                variant="ocean"
                disabled={!canNext}
                onClick={() => canNext && setStep(step + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                variant="ocean"
                disabled={!canNext}
                onClick={() => canNext && complete()}
              >
                Submit request
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
