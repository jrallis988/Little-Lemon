import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pharmacy notice",
  description: "Important pharmacy and health information for the prototype.",
};

export default function PharmacyNoticePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Pharmacy & health notice
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {SITE_NAME} demonstrates pharmacy UX patterns (refills, caregiver
          profiles, clinical scheduling). It does not dispense medication, verify
          prescriptions, or provide medical advice.
        </p>
        <p>
          Care profiles and prescription details in the demo are fictional.
          Never enter real patient data into this prototype.
        </p>
        <p>
          Vaccine and testing “appointments” are local demo requests only. For
          real care, contact a licensed pharmacy or clinician.
        </p>
      </div>
    </article>
  );
}
