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
            <h2 className="text-xl font-bold text-navy">Information we collect</h2>
            <p className="mt-3">
              When you submit a demo, pricing, or contact form, we collect details
              you provide such as name, email, organization, role, phone number,
              plan interest, and message content.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">How we use information</h2>
            <p className="mt-3">
              We use inquiry information to respond to sales requests, schedule
              demos, provide pricing guidance, and improve our website experience.
              We do not sell personal information.
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
            <h2 className="text-xl font-bold text-navy">Contact</h2>
            <p className="mt-3">
              Privacy questions can be sent to{" "}
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
