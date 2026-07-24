import Image from "next/image";
import Link from "next/link";
import { candidate } from "@/lib/candidate";

export function MeetCandidate() {
  return (
    <section
      id="meet"
      aria-labelledby="meet-heading"
      className="scroll-mt-28 bg-snow"
    >
      <div className="mx-auto grid max-w-content items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[5/4] overflow-hidden bg-mist lg:order-2">
          <Image
            src="/images/town-hall.svg"
            alt={`${candidate.firstName} speaking with voters outside a New Hampshire town hall`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
            Meet {candidate.firstName}
          </p>
          <h2
            id="meet-heading"
            className="mt-3 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
          >
            {candidate.firstName} {candidate.lastName}, New Hampshire native
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-granite-600">
            {candidate.bioShort.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/#why"
            className="mt-6 inline-flex border-b-2 border-pine-600 pb-0.5 text-base font-semibold text-pine-700 transition-colors hover:border-pine-800 hover:text-pine-800"
          >
            Why {candidate.firstName} is running →
          </Link>
        </div>
      </div>

      <div className="border-y border-granite-200 bg-mist">
        <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14 md:py-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-granite-200">
            <Image
              src="/images/candidate-portrait.svg"
              alt={`Portrait of ${candidate.fullName}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-granite-800 sm:text-3xl">
              From {candidate.familyBusiness} to the trail
            </h3>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-granite-600 sm:text-lg">
              {candidate.bioLong.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
