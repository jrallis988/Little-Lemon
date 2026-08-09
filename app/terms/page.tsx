import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Morgan Bright marketing and sales website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="These terms govern use of the Morgan Bright public website and sales inquiry forms."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-base leading-relaxed text-mute sm:px-8 sm:py-24">
          <div>
            <h2 className="text-xl font-bold text-navy">Website purpose</h2>
            <p className="mt-3">
              This website provides product information and sales pathways for
              Morgan Bright academic software. Submitting a form does not create
              a purchase contract. Final pricing, licensing, and service terms
              are confirmed in a separate agreement.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Acceptable use</h2>
            <p className="mt-3">
              Do not misuse the site, attempt unauthorized access, submit abusive
              content, scrape content at scale, or use automated systems to spam
              inquiry forms.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Intellectual property</h2>
            <p className="mt-3">
              Site content, branding, and materials are owned by Morgan Bright or
              its licensors and may not be reused for commercial purposes without
              permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">No warranties</h2>
            <p className="mt-3">
              Website content is provided for general informational and sales
              purposes. Product availability, pricing, and features may change
              without notice.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, Morgan Bright is not liable
              for damages arising from use of this marketing website or reliance
              on preliminary pricing information.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a className="text-link hover:text-navy" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
