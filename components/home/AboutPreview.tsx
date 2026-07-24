import Image from "next/image";
import Link from "next/link";
import { candidate } from "@/lib/candidate";

export function AboutPreview() {
  return (
    <section
      id="meet-preview"
      aria-labelledby="meet-preview-heading"
      className="scroll-mt-28 bg-snow"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          Meet Nick
        </p>
        <h2
          id="meet-preview-heading"
          className="mt-2 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
        >
          Nick Varga, New Hampshire.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-granite-600">
          Born and raised in Newmarket, proudly representing Rockingham County,
          Nick understands the values and challenges facing New Hampshire
          families. His commitment to public service is rooted in the belief that
          elected officials must work for the people — not special interests, not
          corporations, not political insiders.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-granite-800">
              A Commitment to Independence and Integrity
            </h3>
            <blockquote className="border-l-4 border-pine-600 pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-granite-700">
                “{candidate.pullQuote}”
              </p>
              <footer className="mt-3 text-sm font-semibold text-granite-500">
                — Nick Varga
              </footer>
            </blockquote>
            <p className="text-base leading-relaxed text-granite-600 sm:text-lg">
              This is the foundation of Nick’s campaign: putting New Hampshire
              first, always. Whether fighting for good-paying jobs, affordable
              healthcare, or supporting our veterans, Nick will never waver from
              his commitment to serve the people who elected him.
            </p>
            <Link
              href="/meet-nick"
              className="inline-flex border-b-2 border-pine-600 pb-0.5 text-base font-semibold text-pine-700 hover:border-pine-800"
            >
              Learn More About Nick →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <figure className="relative aspect-[4/5] overflow-hidden bg-mist">
              <Image
                src="/images/candidate-portrait.svg"
                alt="Nick Varga · Newmarket, NH"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-granite-900/75 px-3 py-2 text-sm text-white">
                Nick Varga · Newmarket, NH
              </figcaption>
            </figure>
            <figure className="relative aspect-[4/5] overflow-hidden bg-mist">
              <Image
                src="/images/town-hall.svg"
                alt="Nick Varga on the campaign trail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-granite-900/75 px-3 py-2 text-sm text-white">
                On the campaign trail
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
