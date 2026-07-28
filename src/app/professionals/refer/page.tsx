import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ProfessionalRequestForm } from "@/components/forms/ProfessionalRequestForm";

export const metadata: Metadata = {
  title: "Refer a Patient",
  description:
    "Submit a referral request to Boston Children's Hospital and find urgent clinician-to-clinician support.",
};

export default function ReferPatientPage() {
  return (
    <>
      <PageHero
        id="refer-heading"
        eyebrow="For healthcare professionals"
        title="Refer a patient"
        lead="Send the access team the clinical and contact details needed to route a pediatric referral."
        actions={
          <Button href="tel:16173556363" variant="ghost-white">
            Urgent clinician line: (617) 355-6363
          </Button>
        }
      />
      <div className="wrap py-s7 pb-s10">
        <div className="grid grid-cols-1 items-start gap-s7 lg:grid-cols-[1fr_280px]">
          <ProfessionalRequestForm mode="referral" />
          <aside className="rounded-md bg-surface p-s5" aria-labelledby="refer-ready">
            <h2 id="refer-ready" className="mb-s3 text-lg font-bold text-blue">
              Before you begin
            </h2>
            <ul className="ml-s4 flex list-disc flex-col gap-s2 text-sm font-light text-text-body">
              <li>Patient demographics and guardian contact</li>
              <li>Insurance and authorization information</li>
              <li>Clinical summary and reason for referral</li>
              <li>Relevant notes, labs, and imaging</li>
              <li>Requested specialty and urgency</li>
            </ul>
            <p className="mt-s4 border-t border-border pt-s4 text-sm font-light text-text-body">
              For an unstable or life-threatening situation, call 911. For an
              urgent transfer, use the clinician line above.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
