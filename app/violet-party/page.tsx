import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { violetParty } from "@/lib/violet";

export const metadata: Metadata = {
  title: "Violet Party",
  description:
    "Not Red. Not Blue. Something New. The Violet Party is a movement to put people over politics — founded by Nick Varga in New Hampshire.",
};

export default function VioletPartyPage() {
  return (
    <>
      <PageHero
        overline={violetParty.overline}
        title={violetParty.headline}
        subtitle={violetParty.subhead}
      />
      <div className="border-b border-violet-200 bg-violet-50">
        <div className="mx-auto max-w-content px-5 py-6 sm:px-8">
          <p className="font-serif text-2xl font-bold text-violet-800 sm:text-3xl">
            {violetParty.taglineCompact}
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
          What it is
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-granite-800">
          Why Violet
        </h2>
        <Prose>
          {violetParty.why.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </Prose>

        <h2 className="mt-14 font-serif text-3xl font-bold text-granite-800">
          Six Core Principles
        </h2>
        <ol className="mt-8 space-y-6">
          {violetParty.principles.map((principle) => (
            <li
              key={principle.number}
              className="border-t border-granite-200 pt-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
                {principle.number}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-granite-800">
                {principle.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-granite-600">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 border border-granite-200 bg-mist p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
            Who started it
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-granite-800">
            Nick Varga
          </h2>
          <Prose>
            {violetParty.founder.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Prose>
          <Link
            href="/meet-nick"
            className="mt-6 inline-flex text-base font-semibold text-pine-700 underline-offset-2 hover:underline"
          >
            Read Nick’s full story →
          </Link>
        </div>

        <div className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
            Join us
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-granite-800">
            Be Part of Something New
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-granite-600">
            The Violet Party grows when neighbors talk to neighbors. Sign up,
            tell someone, or show up at a town hall. This is how movements start.
          </p>
          <CtaRow
            primary={{ href: "/#join", label: "Join the Movement →" }}
            secondary={{ href: "/volunteer", label: "Volunteer" }}
          />
        </div>
      </article>
    </>
  );
}
