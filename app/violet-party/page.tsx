import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { violetParty } from "@/lib/violet";
import { SectionIntro } from "@/components/SectionIntro";

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
      <div className="border-b border-slate-line bg-charcoal">
        <div className="mx-auto max-w-content px-6 py-8 md:px-8">
          <p className="font-display text-card-display font-normal text-yellow sm:text-3xl">
            {violetParty.taglineCompact}
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-content section-pad bg-warm-white">
        <SectionIntro overline="What it is" title="Why Violet" />
        <div className="mt-6">
          <Prose>
            {violetParty.why.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Prose>
        </div>

        <div className="mt-16">
          <SectionIntro overline="Principles" title="Six Core Principles" />
        </div>
        <ol className="mt-8 space-y-6">
          {violetParty.principles.map((principle) => (
            <li key={principle.number} className="border-t border-slate-line pt-6">
              <p className="font-display text-overline font-normal uppercase text-red">
                {principle.number}
              </p>
              <h3 className="mt-2 font-display text-xl font-normal text-ink">
                {principle.title}
              </h3>
              <p className="mt-2 text-body-lg text-slate-text">{principle.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 border border-slate-line bg-paper p-6 sm:p-8">
          <SectionIntro overline="Who started it" title="Nick Varga" />
          <div className="mt-4">
            <Prose>
              {violetParty.founder.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Prose>
          </div>
          <Link href="/meet-nick" className="link-cta mt-6">
            Read Nick’s full story →
          </Link>
        </div>

        <div className="mt-14">
          <SectionIntro
            overline="Join us"
            title="Be Part of Something New"
            lead="The Violet Party grows when neighbors talk to neighbors. Sign up, tell someone, or show up at a town hall. This is how movements start."
          />
          <CtaRow
            primary={{ href: "/#join", label: "Join the Movement →" }}
            secondary={{ href: "/volunteer", label: "Volunteer" }}
          />
        </div>
      </article>
    </>
  );
}
