import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${siteConfig.name} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lead="By using this website you agree to these terms."
    >
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Informational use</h2>
        <p>
          Content on this site is for general information and care navigation.
          It is not a substitute for professional medical advice, diagnosis, or
          treatment. In an emergency, call 911 or go to the nearest emergency
          department.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">
          Appointment requests
        </h2>
        <p>
          Submitting a request does not guarantee an appointment time.
          Scheduling staff will confirm availability, insurance requirements,
          and clinical appropriateness.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Acceptable use</h2>
        <p>
          Do not misuse forms, attempt unauthorized access, scrape content at
          scale, or submit malicious content. We may rate-limit or block abusive
          traffic.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Contact</h2>
        <p>
          Questions:{" "}
          <a className="font-semibold text-ocean" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
