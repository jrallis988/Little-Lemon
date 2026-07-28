import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Billing and Insurance",
  description:
    "Understand Boston Children's Hospital bills, insurance authorization, estimates, payment options, and financial assistance.",
};

const steps = [
  {
    title: "Before care",
    body: "Confirm that Boston Children's and the individual clinicians involved are in network. Ask your insurer whether the visit, test, procedure, or referral needs prior authorization.",
  },
  {
    title: "After care",
    body: "Your insurer sends an explanation of benefits (EOB) showing what it covered. The EOB is not a bill. We send a statement for the amount assigned to you after insurance processes the claim.",
  },
  {
    title: "If something looks wrong",
    body: "Compare the statement with your EOB, then call the billing number on your statement. Have the patient account number, date of service, and insurer's explanation ready.",
  },
];

export default function BillingPage() {
  return (
    <>
      <PageHero
        id="billing-heading"
        eyebrow="Patients & families"
        title="Billing and insurance"
        lead="Understand coverage, estimates, statements, payment options, and where to get help."
        actions={
          <Button href="tel:16173553399" variant="ocean">
            Call Patient Financial Services
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <Notice>
          <p>
            For the most accurate benefit information, contact your insurance
            company using the member-services number on your card. Coverage can
            vary by plan even within the same insurer.
          </p>
        </Notice>

        <section className="py-s7" aria-labelledby="billing-process">
          <h2 id="billing-process" className="mb-s5 text-2xl font-bold text-ocean">
            How the billing process works
          </h2>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-md border border-border bg-white p-s5">
                <span className="eyebrow">Step {index + 1}</span>
                <h3 className="mb-s2 text-lg font-bold text-text">{step.title}</h3>
                <p className="text-sm font-light text-text-body">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-s7 lg:grid-cols-2">
          <section aria-labelledby="estimate-heading">
            <h2 id="estimate-heading" className="mb-s4 text-xl font-bold text-ocean">
              Estimates and authorization
            </h2>
            <ul className="ml-s5 flex flex-col gap-s2">
              {[
                "Ask your care team for the scheduled procedure or service name.",
                "Request a good-faith estimate before planned care.",
                "Confirm referral and prior-authorization requirements with your insurer.",
                "Tell registration about insurance changes before the visit.",
              ].map((item) => (
                <li key={item} className="list-disc text-base font-light text-text-body">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="help-heading">
            <h2 id="help-heading" className="mb-s4 text-xl font-bold text-ocean">
              Payment and financial help
            </h2>
            <p className="mb-s4 text-base font-light text-text-body">
              Payment plans and financial assistance may be available based on
              household circumstances. Applying for help does not affect your
              child&apos;s care.
            </p>
            <div className="flex flex-wrap gap-s3">
              <Button href="tel:16173553399" variant="outline-ocean">
                Billing: (617) 355-3399
              </Button>
              <Button href="/portal" variant="outline">
                View bills in the portal
              </Button>
            </div>
          </section>
        </div>

        <section className="mt-s7 rounded-md bg-surface p-s6" aria-labelledby="billing-ready">
          <h2 id="billing-ready" className="mb-s3 text-xl font-bold text-blue">
            Have this information ready when you call
          </h2>
          <p className="text-base font-light text-text-body">
            Patient name and date of birth, account or guarantor number,
            insurance card, date of service, and the bill or EOB you are asking
            about. Do not send financial or medical information by ordinary
            email.
          </p>
        </section>
      </div>
    </>
  );
}
