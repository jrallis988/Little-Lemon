import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { ContactForm } from "@/components/ContactForm";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Nick Varga campaign.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Get in touch"
        title="Contact"
        subtitle="Questions about volunteering, events, press, or write-in voting — reach out."
      />
      <div className="mx-auto grid max-w-content gap-10 section-pad lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-bold text-granite-800">
            Campaign contact
          </h2>
          <ul className="mt-4 space-y-2 text-base text-granite-600">
            <li>
              <a
                href={`mailto:${candidate.email}`}
                className="font-semibold text-pine-700 underline-offset-2 hover:underline"
              >
                {candidate.email}
              </a>
            </li>
            <li>
              <a href="tel:+16035550142" className="underline-offset-2 hover:underline">
                {candidate.phone}
              </a>
            </li>
            <li>{candidate.mailAddress}</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
