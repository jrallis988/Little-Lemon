import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Morgan Bright sales for product questions, demos, and school purchasing support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk with the Morgan Bright sales team."
        description="Questions about features, rollout, or purchasing? Send a message and we’ll follow up."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy">Sales email</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-link hover:text-navy"
              >
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Phone</h2>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="mt-2 inline-block text-mute hover:text-navy"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Location</h2>
              <p className="mt-2 text-mute">{site.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Hours</h2>
              <p className="mt-2 text-mute">
                Monday–Friday, 9:00 AM–5:00 PM ET
              </p>
            </div>
          </div>

          <LeadForm
            type="contact"
            title="Send a message"
            submitLabel="Send message"
          />
        </div>
      </section>
    </>
  );
}
