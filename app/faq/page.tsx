import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { FaqAccordion } from "@/components/FaqAccordion";
import { candidate } from "@/lib/candidate";
import { faqs, NH_ELECTIONS_URL } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Straight answers about ${candidate.fullName} — who he is, what he stands for, how to meet him, how to help, and how to vote for him on ${candidate.electionLabel}.`,
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "FAQ" },
        ]}
        overline="Frequently Asked Questions"
        title="Getting to know Nick — quickly."
        subtitle="Plain answers for voters who just found this campaign. Dig deeper on Issues, Meet Nick, Events, and Contact when you’re ready."
      />

      <article className="mx-auto max-w-3xl section-pad">
        <div className="border border-slate-line bg-paper p-5 text-sm leading-relaxed text-slate-text">
          <p>
            <strong className="font-semibold text-ink">Quick note:</strong> These
            answers are campaign information in everyday language. For official
            ballot instructions, polling places, and registration rules, use{" "}
            <a
              href={NH_ELECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red underline underline-offset-2"
            >
              New Hampshire Secretary of State — Elections
            </a>
            .
          </p>
        </div>

        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mt-12 border border-red/30 bg-paper p-6">
          <h2 className="font-display text-2xl font-bold text-ink">
            Ready for the next step?
          </h2>
          <p className="mt-3 text-body-lg text-slate-text">
            On {candidate.electionLabel}, write in “{candidate.fullName}” on your
            General Election ballot — or volunteer, request a town visit, or get
            in touch with the campaign.
          </p>
          <CtaRow
            primary={{ href: "/how-to-vote", label: "How to Vote →" }}
            secondary={{ href: "/volunteer", label: "Volunteer" }}
          />
        </div>

        <p className="mt-10 text-sm text-slate-muted">
          Looking for accessibility settings? Open{" "}
          <strong className="font-semibold text-slate-text">Accessibility</strong>{" "}
          in the top bar, or visit the{" "}
          <Link
            href="/accessibility"
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            Accessibility Statement
          </Link>
          .
        </p>
      </article>
    </>
  );
}
