import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SocialProof } from "@/components/SocialProof";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why schools buy Morgan Bright academic software for diagnostics, adaptive instruction, and progress monitoring.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Morgan Bright"
        title="A focused software purchase with a clear classroom job."
        description="Morgan Bright exists to help educators identify learning hurdles, personalize instruction, and prove progress — then buy the plan that fits their setting."
        actions={
          <>
            <Link href="/demo" className="btn-primary">
              Request a demo
            </Link>
            <Link href="/features" className="btn-outline">
              Explore features
            </Link>
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy">
              Why schools choose us
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              Broad content libraries leave teachers to invent the intervention
              process. Morgan Bright is narrower on purpose: diagnose the
              barrier, adapt the lesson path, and monitor what works.
            </p>
            <ul className="mt-6 space-y-3 text-base text-ink-soft">
              <li>Built for classroom intervention, not generic content browsing</li>
              <li>Clear Classroom, School, and District purchasing paths</li>
              <li>Designed around learning-style differences as instructional inputs</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/images/mission.jpg"
              alt="Students engaged in collaborative classroom learning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SocialProof />
    </>
  );
}
