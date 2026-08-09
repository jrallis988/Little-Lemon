import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Morgan Bright website and sales inquiries.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="How Morgan Bright handles information collected through this website and sales forms."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 text-base leading-relaxed text-mute sm:px-8 sm:py-24">
          <div>
            <h2 className="text-xl font-bold text-navy">Who we are</h2>
            <p className="mt-3">
              Morgan Bright operates this website to provide product information
              and sales support for academic software. Contact:{" "}
              <a className="text-link hover:text-navy" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Information we collect</h2>
            <p className="mt-3">
              When you submit a demo, pricing, or contact form, we collect details
              you provide such as name, email, organization, role, phone number,
              plan interest, and message content. We may also collect basic
              analytics data (pages viewed, referrer, approximate location) if
              analytics tools are enabled.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">How we use information</h2>
            <p className="mt-3">
              We use inquiry information to respond to sales requests, schedule
              demos, provide pricing guidance, improve our website, and maintain
              business records. We do not sell personal information.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Sharing</h2>
            <p className="mt-3">
              We may share inquiry data with service providers that help us
              operate email delivery, CRM tools, or analytics. Those providers
              may only process data to perform services for Morgan Bright.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Data retention</h2>
            <p className="mt-3">
              Sales inquiries are retained as needed to manage customer
              conversations and business records, then removed or archived
              according to internal retention practices.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Your choices</h2>
            <p className="mt-3">
              You may request access, correction, or deletion of your inquiry
              information by emailing{" "}
              <a className="text-link hover:text-navy" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Updates</h2>
            <p className="mt-3">
              We may update this policy as our products and operations evolve.
              The latest version will always be posted on this page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
