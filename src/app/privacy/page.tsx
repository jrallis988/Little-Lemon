import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles information submitted through this website.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="This policy describes how information submitted through appointment, referral, and contact forms is handled on this site."
    >
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Scope</h2>
        <p>
          This website collects information you voluntarily submit through care
          request forms (appointments, referrals, and second opinions). It is
          not a patient portal and should not be used to send urgent medical
          information.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">
          Information we collect
        </h2>
        <p>
          Depending on the form, we may collect your name, email, phone number,
          insurance preference, preferred location, and a short clinical
          summary needed for scheduling triage.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">How we use it</h2>
        <p>
          Intake submissions are used to route requests to scheduling or access
          teams, generate a reference ID, and follow up with you. Delivery may
          use secure email, webhook integrations, or an approved operations
          queue configured by site administrators.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Retention</h2>
        <p>
          Retention periods should match your organization&apos;s records policy.
          Configure storage and vendor agreements before processing real
          protected health information in production.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a className="font-semibold text-ocean" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
