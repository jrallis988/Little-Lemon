import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Request Medical Records",
  description:
    "How patients and families can request, receive, and share Boston Children's Hospital medical records.",
};

export default function MedicalRecordsPage() {
  return (
    <>
      <PageHero
        id="records-heading"
        eyebrow="Health information management"
        title="Request medical records"
        lead="Choose the fastest option for the information you need and learn what is required for a complete request."
        actions={
          <Button href="/portal" variant="ocean">
            View records in MyChildren&apos;s
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <Notice>
          <p>
            Many visit summaries, test results, and medication lists are
            available in the patient portal without a formal records request.
            Call the Health Information Management team for records that do not
            appear there.
          </p>
        </Notice>

        <section className="py-s7" aria-labelledby="request-options">
          <h2 id="request-options" className="mb-s5 text-2xl font-bold text-ocean">
            Ways to get records
          </h2>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            {[
              ["Patient portal", "Download available results, visit summaries, and medication information. You can also send records already in the portal to another clinician."],
              ["Formal request", "Submit a signed authorization when you need a complete chart, older records, imaging, or delivery to a third party."],
              ["Care-to-care transfer", "Ask the receiving clinician's office to contact us when records are needed for ongoing treatment."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-md border border-border bg-white p-s5">
                <h3 className="mb-s2 text-lg font-bold text-blue">{title}</h3>
                <p className="text-sm font-light text-text-body">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-s7 lg:grid-cols-2">
          <section aria-labelledby="request-needs">
            <h2 id="request-needs" className="mb-s4 text-xl font-bold text-ocean">
              Include with a formal request
            </h2>
            <ul className="ml-s5 flex list-disc flex-col gap-s2 text-base font-light text-text-body">
              <li>Patient&apos;s full name, date of birth, and contact information</li>
              <li>Specific dates of service and the records requested</li>
              <li>Where and how records should be delivered</li>
              <li>Patient or authorized representative signature and date</li>
              <li>Proof of authority when required for a guardian or representative</li>
            </ul>
          </section>
          <section aria-labelledby="timing-heading">
            <h2 id="timing-heading" className="mb-s4 text-xl font-bold text-ocean">
              Timing, cost, and privacy
            </h2>
            <p className="mb-s3 text-base font-light text-text-body">
              Processing time depends on the record&apos;s age, size, and delivery
              method. We will explain any permitted fee before fulfilling a
              chargeable request.
            </p>
            <p className="text-base font-light text-text-body">
              Some records have additional consent requirements. For privacy,
              use the portal, approved secure delivery, mail, or in-person
              options rather than ordinary email.
            </p>
          </section>
        </div>

        <section className="mt-s7 rounded-md bg-surface p-s6" aria-labelledby="records-contact">
          <h2 id="records-contact" className="mb-s3 text-xl font-bold text-blue">
            Need help with a request?
          </h2>
          <p className="mb-s4 text-base font-light text-text-body">
            Health Information Management can help identify the right form and
            confirm receipt of a request. Keep a copy of your authorization.
          </p>
          <Button href="tel:16173557546" variant="outline-ocean">
            Call (617) 355-7546
          </Button>
        </section>
      </div>
    </>
  );
}
