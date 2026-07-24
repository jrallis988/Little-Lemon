import Image from "next/image";
import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { SectionIntro } from "@/components/SectionIntro";

export function AboutPreview() {
  return (
    <section
      id="meet-preview"
      aria-labelledby="meet-preview-heading"
      className="scroll-mt-28 bg-warm-white"
    >
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="Meet Nick"
          title={
            <>
              Nick Varga,
              <br />
              New Hampshire.
            </>
          }
          lead="Born and raised in Newmarket, proudly representing Rockingham County, Nick understands the values and challenges facing New Hampshire families. His commitment to public service is rooted in the belief that elected officials must work for the people — not special interests, not corporations, not political insiders."
          titleId="meet-preview-heading"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h3 className="font-display text-card-display font-normal text-ink">
              A Commitment to Independence and Integrity
            </h3>
            <blockquote className="pull-quote">
              “{candidate.pullQuote}”
              <footer className="mt-3 font-sans text-sm font-semibold not-italic text-slate-muted">
                — Nick Varga
              </footer>
            </blockquote>
            <p className="text-body-lg text-slate-text">
              This is the foundation of Nick’s campaign: putting New Hampshire
              first, always. Whether fighting for good-paying jobs, affordable
              healthcare, or supporting our veterans, Nick will never waver from
              his commitment to serve the people who elected him.
            </p>
            <Link href="/meet-nick" className="link-cta">
              Learn More About Nick →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <figure className="relative aspect-[4/5] overflow-hidden bg-paper">
              <Image
                src="/images/candidate-portrait.svg"
                alt="Nick Varga · Newmarket, NH"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-ink/80 px-3 py-2 text-sm text-white">
                Nick Varga · Newmarket, NH
              </figcaption>
            </figure>
            <figure className="relative aspect-[4/5] overflow-hidden bg-paper">
              <Image
                src="/images/town-hall.svg"
                alt="Nick Varga on the campaign trail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-ink/80 px-3 py-2 text-sm text-white">
                On the campaign trail
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
