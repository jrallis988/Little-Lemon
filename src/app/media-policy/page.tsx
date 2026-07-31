import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Media & Image Policy",
  description: "How imagery and media assets are sourced and attributed.",
};

export default function MediaPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Media & image policy"
      lead="Production launches should use licensed or owned photography. Staging may use temporary stock imagery."
    >
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Staging imagery</h2>
        <p>
          Provider, campus, and program images in the local catalog currently
          use Unsplash URLs for layout and performance testing. These are
          temporary stand-ins and must be replaced before an official launch.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Production requirements</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use hospital-owned or contract-licensed photography</li>
          <li>Store assets in CMS (Sanity) with alt text and rights metadata</li>
          <li>Confirm model/patient consent for identifiable subjects</li>
          <li>Prefer Next.js Image optimization with approved remote hosts</li>
        </ul>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Editorial review</h2>
        <p>
          Clinical copy, insurance lists, hours, and phone numbers should be
          reviewed by clinical and communications stakeholders before
          production indexing is enabled.
        </p>
      </section>
    </LegalPage>
  );
}
