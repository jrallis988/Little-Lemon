import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose } from "@/components/PageChrome";
import { LegalReviewBanner } from "@/components/LegalReviewBanner";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms for using the ${candidate.fullName} campaign website.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Terms & Conditions" },
        ]}
        overline="Legal"
        title="Terms & Conditions"
      />
      <article className="mx-auto max-w-3xl section-pad">
        <p className="text-sm text-slate-muted">Last Updated: July 28, 2026</p>
        <LegalReviewBanner />
        <p className="mb-6 border border-slate-line bg-paper px-4 py-3 text-sm text-slate-muted">
          Demo status: these Terms are draft display copy for layout review. Form
          submissions on this preview do not create binding service records.
        </p>
        <Prose>
          <p>
            Welcome to the official campaign website for {candidate.fullName}. By
            accessing, browsing, or utilizing this website and related campaign
            services, you agree to comply with and be bound by the following Terms
            and Conditions. Please review them carefully before using our platform
            or submitting volunteer, contact, or signup forms.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website or engaging with {candidate.committee} online,
            you acknowledge that you have read, understood, and agree to be bound
            by these Terms and Conditions, alongside our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-red underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            . If you do not agree with any part of these terms, you must refrain
            from using this website and related services.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">
            2. Campaign Purpose &amp; Eligibility
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-ink">Purpose:</strong> This
              site provides information about {candidate.fullName}&apos;s
              independent write-in candidacy for U.S. Senate from New Hampshire
              and ways to get involved.
            </li>
            <li>
              <strong className="font-semibold text-ink">Age:</strong> By
              submitting forms or volunteering, you represent that you are at
              least 18 years of age (or the age of majority in your jurisdiction)
              and that the information you provide is accurate to the best of
              your knowledge.
            </li>
            <li>
              <strong className="font-semibold text-ink">No booking services:</strong>{" "}
              This website does not offer lodging reservations, hospitality
              bookings, or commercial checkout.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">
            3. Use of the Website
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Use this site only for lawful purposes related to learning about
              the campaign, volunteering, contacting the campaign, or accessing
              publicly posted information.
            </li>
            <li>
              Do not misuse forms, attempt to disrupt or overload the site,
              introduce malware, scrape content for commercial reuse without
              permission, or impersonate another person.
            </li>
            <li>
              We may suspend or limit access if we reasonably believe activity
              violates these terms or endangers the site, campaign staff, or
              supporters.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">
            4. Volunteer &amp; Contact Submissions
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Submitting a volunteer, join, town-visit, or contact form does not
              create an employment relationship or guarantee a response timeline.
            </li>
            <li>
              You agree that information you submit is truthful and that we may
              use it as described in our Privacy Policy.
            </li>
            <li>
              Political communications you receive may include event updates and
              volunteer requests. Text STOP to opt out of SMS where applicable.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">
            5. Conduct
          </h2>
          <p>
            {candidate.committee} is committed to a respectful environment for
            supporters, volunteers, and staff. We reserve the right to refuse
            further engagement with any individual whose conduct online or at
            campaign events is abusive, illegal, harassing, or endangers the
            safety of others.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">
            6. Intellectual Property &amp; Website Content
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Content, branding, visual designs, logos, text, and graphics on
              this website are owned by {candidate.committee} or used with
              permission, and are protected by applicable copyright and trademark
              laws.
            </li>
            <li>
              You may not copy, reproduce, republish, or distribute site content
              for commercial purposes without explicit written consent from the
              campaign.
            </li>
            <li>
              Fair use for news reporting and commentary is permitted to the
              extent allowed by law.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">
            7. Political Disclaimer
          </h2>
          <p>
            Content on this website is for informational and political campaign
            purposes. Nothing on this site constitutes legal, financial, or
            professional advice. Ballot instructions are provided to help voters
            understand how to support {candidate.fullName} as an independent
            write-in candidate; always confirm official voting procedures with
            your local election officials.
          </p>
          <p>Paid for by {candidate.committee}.</p>

          <h2 className="font-display text-2xl font-bold text-ink">
            8. Limitation of Liability
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-ink">Website availability:</strong>{" "}
              The site is provided “as is.” We do not warrant uninterrupted or
              error-free access.
            </li>
            <li>
              <strong className="font-semibold text-ink">Force majeure:</strong> The
              campaign is not liable for failure to perform obligations under
              these terms if such failure stems from acts of God, extreme weather,
              utility outages, government restrictions, platform outages, or other
              circumstances beyond our reasonable control.
            </li>
            <li>
              To the fullest extent permitted by law, {candidate.committee} is
              not liable for indirect, incidental, or consequential damages
              arising from your use of this website.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink">
            9. Modifications to Terms
          </h2>
          <p>
            We reserve the right to update, modify, or replace these Terms and
            Conditions at any time. Changes take effect when posted to this page
            with a revised “Last Updated” date. Your continued use of the site
            following updates constitutes acceptance of the revised terms.
          </p>

          <h2 className="font-display text-2xl font-bold text-ink">
            10. Contact Information
          </h2>
          <p>
            Questions about these Terms and Conditions: email{" "}
            <a
              href={`mailto:${candidate.email}`}
              className="font-semibold text-red underline-offset-2 hover:underline"
            >
              {candidate.email}
            </a>
            , call {candidate.phone}, or use our{" "}
            <Link
              href="/contact"
              className="font-semibold text-red underline-offset-2 hover:underline"
            >
              Contact
            </Link>{" "}
            page. Mail: {candidate.mailAddress}.
          </p>
        </Prose>

        <p className="mt-12">
          <Link
            href="/"
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </article>
    </>
  );
}
