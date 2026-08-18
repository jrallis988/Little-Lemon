import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { ContactForm } from "@/components/ContactForm";
import { candidate, hasMailAddress, hasPublicPhone, phoneTelHref } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Nick Varga campaign.",
};

export default function ContactPage() {
  const tel = phoneTelHref();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
        overline="Get in touch"
        title="Contact"
        subtitle="Questions about volunteering, events, press, or write-in voting — reach out."
      />
      <div className="mx-auto grid max-w-content gap-10 section-pad lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">
            Campaign contact
          </h2>
          <ul className="mt-4 space-y-2 text-base text-slate-text">
            <li>
              <a
                href={`mailto:${candidate.email}`}
                className="font-semibold text-red underline-offset-2 hover:underline"
              >
                {candidate.email}
              </a>
            </li>
            {hasPublicPhone() && tel ? (
              <li>
                <a href={tel} className="underline-offset-2 hover:underline">
                  {candidate.phone}
                </a>
              </li>
            ) : null}
            {hasMailAddress() ? <li>{candidate.mailAddress}</li> : null}
          </ul>
          <p className="mt-4 text-sm text-slate-muted">
            Use the form to reach campaign staff. Messages are saved and emailed
            when campaign notify settings are configured.
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
