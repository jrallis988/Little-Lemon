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
  const isReferral = mode === "referral";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prefix = isReferral ? "REF" : "SO";
    const reference = `${prefix}-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;
    setReferenceId(reference);
    trackEvent(isReferral ? "referral_mock_submitted" : "second_opinion_mock_submitted", {
      referenceId: reference,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          This prototype did not transmit patient information. In a connected
          service, our access team would review the request and contact you using
          the information supplied.
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
          Prototype form: submissions are confirmed on this page but are not
          sent or stored. Do not enter real patient information.
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
            <Input id="requester-name" name="requesterName" autoComplete="name" required />
          </div>
          <div>
            <Label htmlFor="practice">
              {isReferral ? "Practice or organization" : "Relationship to patient"}
            </Label>
            <Input id="practice" name="practiceOrRelationship" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
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
              {isReferral ? "Requested specialty" : "Primary diagnosis or specialty"}
            </Label>
            <Select id="specialty" name="specialty" required defaultValue="">
              <option value="" disabled>Select one</option>
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
            <Select id="urgency" name="urgencyOrRecords" required defaultValue="">
              <option value="" disabled>Select one</option>
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
            <textarea id="details" name="details" className={textareaClass} required />
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
          I confirm that I am authorized to make this request and may be contacted
          about the information provided.
        </span>
      </label>

      <Button type="submit" variant="ocean" size="lg">
        {isReferral ? "Submit referral request" : "Submit second opinion request"}
      </Button>
    </form>
  );
}
