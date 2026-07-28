import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaRow } from "@/components/PageChrome";
import { FaqAccordion } from "@/components/FaqAccordion";
import { candidate } from "@/lib/candidate";
import { NH_ELECTIONS_URL, NH_SOS_HOME_URL, writeInFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Write-In FAQ",
  description:
    "Plain-language answers about write-in voting for Nick Varga in New Hampshire’s General Election, with links to official Secretary of State resources.",
};

export default function WriteInFaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/how-to-vote", label: "How to Vote" },
          { label: "Write-In FAQ" },
        ]}
        overline="Write-In FAQ"
        title="Write-in voting, explained simply."
        subtitle="Neutral, informational answers for voters. For official ballot instructions, always use New Hampshire election resources."
      />

      <article className="mx-auto max-w-3xl section-pad">
        <div className="border border-slate-line bg-paper p-5 text-sm leading-relaxed text-slate-text">
          <p>
            <strong className="font-semibold text-ink">Important:</strong> This
            FAQ is campaign education material. It is not legal advice and does
            not replace instructions from election officials. When in doubt,
            follow your ballot and official New Hampshire sources.
          </p>
          <p className="mt-3">
            Official resources:{" "}
            <a
              href={NH_ELECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red underline underline-offset-2"
            >
              NH Secretary of State — Elections
            </a>
            {" · "}
            <a
              href={NH_SOS_HOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red underline underline-offset-2"
            >
              sos.nh.gov
            </a>
          </p>
        </div>

        <div className="mt-10">
          <FaqAccordion items={writeInFaqs} />
        </div>

        <div className="mt-12 border border-red/30 bg-paper p-6">
          <h2 className="font-display text-2xl font-bold text-ink">
            For this campaign
          </h2>
          <p className="mt-3 text-body-lg text-slate-text">
            On {candidate.electionLabel}, write in “{candidate.fullName}” on
            your General Election ballot. Nick is an independent write-in
            candidate — the General Election is the vote that decides the seat.
          </p>
          <CtaRow
            primary={{ href: "/how-to-vote", label: "How to Vote Write-In →" }}
            secondary={{ href: "/volunteer", label: "Volunteer" }}
          />
        </div>

        <p className="mt-10 text-sm text-slate-muted">
          Looking for accessibility settings? Open{" "}
          <strong className="font-semibold text-slate-text">Accessibility</strong>{" "}
          in the top bar, or visit the{" "}
          <Link href="/accessibility" className="font-semibold text-red underline-offset-2 hover:underline">
            Accessibility Statement
          </Link>
          .
        </p>
      </article>
    </>
  );
}
