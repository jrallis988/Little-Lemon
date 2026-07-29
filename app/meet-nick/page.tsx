import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Meet Nick",
  description:
    "Born and raised in Newmarket, Nick Varga is an independent write-in candidate for U.S. Senate putting New Hampshire first.",
};

export default function MeetNickPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Meet Nick" },
        ]}
        overline="Meet Nick"
        title="Nick Varga, New Hampshire."
        subtitle="Independent write-in candidate for U.S. Senate. Founder of the Violet Party. Neighbor first."
      />
      <article className="mx-auto max-w-content section-pad bg-warm-white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Prose>
            <p>
              Born and raised in Newmarket, proudly representing Rockingham
              County, Nick understands the values and challenges facing New
              Hampshire families. His commitment to public service is rooted in
              the belief that elected officials must work for the people — not
              special interests, not corporations, not political insiders.
            </p>
            <h2 className="font-display text-2xl font-normal text-ink">
              A Commitment to Independence and Integrity
            </h2>
            <blockquote className="pull-quote">
              “{candidate.pullQuote}”
            </blockquote>
            <p>
              This is the foundation of Nick’s campaign: putting New Hampshire
              first, always. Whether fighting for good-paying jobs, affordable
              healthcare, or supporting our veterans, Nick will never waver from
              his commitment to serve the people who elected him.
            </p>
            <h2 className="font-display text-2xl font-normal text-ink">
              Why he’s running
            </h2>
            <p>{candidate.coreStatement}</p>
            <p>
              On November 3, 2026, voters can write in “Nick Varga” on the General
              Election ballot. He is not on any primary ballot — independent
              write-in candidates don’t participate in party primaries.
            </p>
          </Prose>

          <div className="space-y-4">
            <figure className="relative aspect-[4/5] overflow-hidden bg-paper">
              <Image
                src="/images/candidate-portrait.svg"
                alt="Nick Varga · Newmarket, NH"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-ink/80 px-3 py-2 text-sm text-white">
                Nick Varga · Newmarket, NH
              </figcaption>
            </figure>
            <figure className="relative aspect-video overflow-hidden bg-paper">
              <Image
                src="/images/town-hall.svg"
                alt="Nick on the campaign trail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </figure>
          </div>
        </div>

        <CtaRow
          primary={{ href: "/how-to-vote", label: "How to Vote Write-In" }}
          secondary={{ href: "/violet-party", label: "About the Violet Party" }}
        />
        <p className="mt-8">
          <Link href="/volunteer" className="link-cta">
            Volunteer with Team Varga →
          </Link>
        </p>
      </article>
    </>
  );
}
