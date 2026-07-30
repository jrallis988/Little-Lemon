import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `Accessibility commitment for ${siteConfig.name}.`,
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Accessibility Statement"
      lead="We aim for WCAG 2.2 AA conformance across public pages and interactive flows."
    >
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Our approach</h2>
        <p>
          The site uses semantic HTML, keyboard-accessible navigation (including
          Radix primitives for menus, dialogs, selects, and tabs), skip links,
          and automated checks in CI (axe + Lighthouse).
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Known limitations</h2>
        <p>
          Some third-party embeds (maps, media) may have limited accessibility.
          The patient portal preview is not a production authenticated
          experience and should not be used for real PHI.
        </p>
      </section>
      <section>
        <h2 className="mb-s2 text-xl font-bold text-ocean">Feedback</h2>
        <p>
          Report accessibility barriers to{" "}
          <a className="font-semibold text-ocean" href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
