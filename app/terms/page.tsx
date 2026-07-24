import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose } from "@/components/PageChrome";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms for using the ${candidate.fullName} campaign website.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero overline="Legal" title="Terms & Conditions" />
      <article className="mx-auto max-w-3xl section-pad">
        <p className="text-sm text-slate-muted">Last updated: July 24, 2026</p>
        <Prose>
          <p>
            By using this website, you agree to these terms. Content is provided
            for informational and political campaign purposes related to{" "}
            {candidate.fullName}&apos;s independent write-in candidacy for U.S.
            Senate.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Use of the site
          </h2>
          <p>
            Do not misuse forms, attempt to disrupt the site, or scrape content
            for commercial reuse without permission. Volunteer and contact
            submissions must be accurate to the best of your knowledge.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Political communications
          </h2>
          <p>
            Messages sent by the campaign may include event updates and volunteer
            requests. Text STOP to opt out of SMS. See our{" "}
            <Link href="/privacy" className="font-semibold text-red underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Contact
          </h2>
          <p>
            Questions:{" "}
            <a href={`mailto:${candidate.email}`} className="font-semibold text-red underline-offset-2 hover:underline">
              {candidate.email}
            </a>
            .
          </p>
        </Prose>
      </article>
    </>
  );
}
