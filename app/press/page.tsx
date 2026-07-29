import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Press / Media Kit",
  description: "Press contacts and media resources for the Nick Varga campaign.",
};

export default function PressPage() {
  return (
    <>
      <PageHero
        overline="Media"
        title="Press / Media Kit"
        subtitle="Resources for journalists covering the 2026 New Hampshire U.S. Senate race."
      />
      <article className="mx-auto max-w-3xl section-pad">
        <Prose>
          <p>
            Nick Varga is an independent write-in candidate for U.S. Senate from
            New Hampshire and founder of the Violet Party. Election Day is{" "}
            {candidate.electionLabel}.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Press contact
          </h2>
          <p>
            Email{" "}
            <a href={`mailto:${candidate.email}`} className="font-semibold text-red underline-offset-2 hover:underline">
              {candidate.email}
            </a>{" "}
            with interview requests, fact checks, and photo needs.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Quick facts
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Hometown: {candidate.hometown}, NH ({candidate.county})</li>
            <li>Ballot: Independent write-in (General Election only)</li>
            <li>Tagline: {candidate.tagline}</li>
            <li>Movement: Violet Party — {`Not Red. Not Blue. Something New.`}</li>
            <li>No corporate PAC money</li>
          </ul>
          <p className="text-sm text-slate-muted">
            High-resolution photos and a full bio PDF will be added as assets are
            finalized.
          </p>
        </Prose>
        <CtaRow
          primary={{ href: "/meet-nick", label: "Meet Nick" }}
          secondary={{ href: "/transparency", label: "Transparency" }}
        />
        <p className="mt-6">
          <Link href="/contact" className="font-semibold text-red underline-offset-2 hover:underline">
            Contact the campaign →
          </Link>
        </p>
      </article>
    </>
  );
}
