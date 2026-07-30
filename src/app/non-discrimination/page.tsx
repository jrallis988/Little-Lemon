import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Non-Discrimination Notice",
  description: `Non-discrimination notice for ${siteConfig.name}.`,
};

export default function NonDiscriminationPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Non-Discrimination Notice"
      lead="We do not discriminate on the basis of race, color, national origin, age, disability, sex, or other protected characteristics."
    >
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Equal access</h2>
        <p>
          Language assistance and disability-related accommodations are
          available for care navigation and visits. Ask your care team or
          contact us if you need support accessing services.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">How to file a concern</h2>
        <p>
          Contact{" "}
          <a className="font-semibold text-ocean" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          to report a concern. You may also have rights to file complaints with
          applicable state or federal agencies.
        </p>
      </section>
    </LegalPage>
  );
}
