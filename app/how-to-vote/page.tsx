import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "How to Vote",
  description:
    "Nick Varga is an independent write-in candidate. On November 3, 2026, write in “Nick Varga” on the General Election ballot.",
};

export default function HowToVotePage() {
  return (
    <>
      <PageHero
        overline="General Election · November 3, 2026"
        title="How to Vote Write-In for Nick Varga"
        subtitle="Nick is an independent write-in candidate. Your vote for him happens on the General Election — the final vote that decides who holds the seat."
      />
      <article className="mx-auto max-w-3xl section-pad">
        <div className="border border-amber-700/40 bg-amber-50 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
            Only date that matters
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-granite-800">
            {candidate.electionLabel}
          </p>
          <p className="mt-2 text-base text-granite-600">
            Tuesday · Write in “{candidate.fullName}” on your General Election
            ballot.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-2xl font-bold text-granite-800">
          Step by step
        </h2>
        <ol className="mt-6 space-y-5">
          {[
            "Go to your polling place on November 3, 2026 (or cast an absentee ballot by the deadline).",
            "Find the U.S. Senate race on your General Election ballot.",
            "Use the write-in line. Write “Nick Varga” clearly.",
            "Do not leave it blank if you intend to vote for Nick — a write-in is how independents win.",
          ].map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-pine-700 text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="pt-1 text-lg text-granite-700">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 border border-granite-200 bg-mist p-6">
          <h2 className="font-serif text-xl font-bold text-granite-800">
            About the September primary
          </h2>
          <Prose>
            <p>
              Do not emphasize September 8, 2026. Nick is not on any primary
              ballot because independent write-in candidates don’t participate in
              party primaries. Mentioning that date confuses voters who might
              think they need to vote for Nick then.
            </p>
            <p>
              Your vote for Nick is on <strong>November 3, 2026</strong> — the
              General Election.
            </p>
          </Prose>
        </div>

        <CtaRow
          primary={{ href: "/#join", label: "Join Team Varga" }}
          secondary={{ href: "/volunteer", label: "Volunteer" }}
        />
        <p className="mt-6 text-sm text-granite-500">
          Questions?{" "}
          <Link href="/contact" className="font-semibold text-pine-700 underline-offset-2 hover:underline">
            Contact the campaign
          </Link>
          .
        </p>
      </article>
    </>
  );
}
