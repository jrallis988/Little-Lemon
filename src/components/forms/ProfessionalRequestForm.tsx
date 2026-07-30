"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Notice } from "@/components/ui/Callout";
import { trackEvent } from "@/lib/analytics";

type RequestMode = "referral" | "second-opinion";

const textareaClass =
  "min-h-28 w-full rounded-sm border-[1.5px] border-border bg-white px-[13px] py-2.5 font-sans text-base font-light text-text outline-none transition-[border-color] placeholder:text-text-ghost focus:border-ocean";

export function ProfessionalRequestForm({ mode }: { mode: RequestMode }) {
  const [referenceId, setReferenceId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isReferral = mode === "referral";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      channel: mode,
      requesterName: String(form.get("requesterName") || ""),
      practiceOrRelationship: String(form.get("practiceOrRelationship") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      patientName: String(form.get("patientName") || ""),
      patientDob: String(form.get("patientDob") || ""),
      specialty: String(form.get("specialty") || ""),
      urgency: String(form.get("urgencyOrRecords") || ""),
      summary: String(form.get("details") || ""),
    };

    try {
      const res = await fetch("/api/professionals/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        referenceId?: string;
        errors?: string[];
      };
      if (!res.ok || !data.ok || !data.referenceId) {
        throw new Error(data.errors?.join(" ") || "Unable to submit request.");
      }
      setReferenceId(data.referenceId);
      trackEvent(
        isReferral ? "referral_submitted" : "second_opinion_submitted",
        { referenceId: data.referenceId },
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return (
      <div
        className="rounded-md border border-ocean/30 bg-ocean/[0.06] p-s6"
        role="status"
        aria-live="polite"
      >
        <span className="eyebrow">Request received</span>
        <h2 className="mb-s3 text-2xl font-bold text-blue">
          Thank you. Your reference ID is {referenceId}.
        </h2>
        <p className="mb-s4 max-w-[680px] text-base font-light text-text-body">
          Your request was submitted to the care access intake queue. Our team
          will review it and contact you using the information you provided.
        </p>
        <Button onClick={() => setReferenceId("")} variant="outline-ocean">
          Start another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-s7">
      <Notice>
        <p>
          Submissions are stored in the intake queue and optionally emailed or
          forwarded to your configured webhook. Do not include unnecessary PHI
          beyond what is needed for triage.
        </p>
      </Notice>

      <fieldset>
        <legend className="mb-s5 text-xl font-bold text-ocean">
          {isReferral ? "Referring clinician" : "Person making this request"}
        </legend>
        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
          <div>
            <Label htmlFor="requester-name">
              {isReferral ? "Clinician name" : "Full name"}
            </Label>
            <Input
              id="requester-name"
              name="requesterName"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <Label htmlFor="practice">
              {isReferral
                ? "Practice or organization"
                : "Relationship to patient"}
            </Label>
            <Input id="practice" name="practiceOrRelationship" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-s5 text-xl font-bold text-ocean">
          {isReferral ? "Referral details" : "Patient and case details"}
        </legend>
        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
          <div>
            <Label htmlFor="patient-name">Patient name</Label>
            <Input id="patient-name" name="patientName" required />
          </div>
          <div>
            <Label htmlFor="patient-dob">Date of birth</Label>
            <Input id="patient-dob" name="patientDob" type="date" required />
          </div>
          <div>
            <Label htmlFor="specialty">
              {isReferral
                ? "Requested specialty"
                : "Primary diagnosis or specialty"}
            </Label>
            <Select id="specialty" name="specialty" required defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option>Cardiology</option>
              <option>Genetics</option>
              <option>Neurology</option>
              <option>Oncology</option>
              <option>Orthopedics</option>
              <option>Other / not sure</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="urgency">
              {isReferral ? "Clinical urgency" : "Records available"}
            </Label>
            <Select
              id="urgency"
              name="urgencyOrRecords"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {isReferral ? (
                <>
                  <option>Routine</option>
                  <option>Expedited</option>
                  <option>Urgent — clinician call requested</option>
                </>
              ) : (
                <>
                  <option>Clinical notes</option>
                  <option>Imaging</option>
                  <option>Pathology</option>
                  <option>Multiple record types</option>
                  <option>Not yet available</option>
                </>
              )}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="details">
              {isReferral
                ? "Clinical question and reason for referral"
                : "What question would you like the reviewing team to address?"}
            </Label>
            <textarea
              id="details"
              name="details"
              className={textareaClass}
              required
              minLength={20}
            />
          </div>
        </div>
      </fieldset>

      <label className="flex items-start gap-s3 text-sm text-text-body">
        <input
          type="checkbox"
          name="authorization"
          required
          className="mt-1 h-4 w-4 accent-ocean"
        />
        <span>
          I confirm that I am authorized to make this request and may be
          contacted about the information provided.
        </span>
      </label>

      {error ? (
        <p className="text-sm text-emergency" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="ocean" size="lg" disabled={submitting}>
        {submitting
          ? "Submitting…"
          : isReferral
            ? "Submit referral request"
            : "Submit second opinion request"}
      </Button>
    </form>
  );
}
