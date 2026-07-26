import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 1869, Boston Children's Hospital has cared for children with complex conditions for more than 150 years.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        id="about-heading"
        eyebrow="About Boston Children's"
        title="Where the world comes for answers."
        lead="Founded in 1869, Boston Children's Hospital has cared for children with complex conditions for more than 150 years. We are a teaching hospital of Harvard Medical School."
      />

      <div className="wrap">
        <section className="py-s10" aria-labelledby="mission-heading">
          <div className="grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Our focus</span>
              <h2
                id="mission-heading"
                className="mb-s4 mt-s2 text-2xl font-bold text-ocean"
              >
                We care for the children that others can&apos;t.
              </h2>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                Many of the children who come to us have already seen other
                doctors and hospitals. They come to Boston Children&apos;s
                because their condition is rare, complex, or not responding to
                treatment.
              </p>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                Our teams are built around the specific needs of each specialty.
                We bring together clinicians, researchers, and specialists whose
                entire focus is one area of care.
              </p>
              <Button href="/programs/epilepsy-program" variant="outline">
                Our specialties
              </Button>
            </div>
            <div
              className="photo-family relative min-h-[320px] overflow-hidden rounded-lg"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,10,30,.35)] to-transparent" />
            </div>
          </div>
        </section>

        <blockquote className="my-s6 border-y border-border py-s6 text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.45] text-ocean">
          &ldquo;When we couldn&apos;t find answers anywhere else, Boston
          Children&apos;s already knew what they were looking for.&rdquo;
          <footer className="mt-s3 text-sm font-light text-text-meta">
            — Parent of a rare disease patient
          </footer>
        </blockquote>

        <div
          className="my-s7 rounded-md bg-blue py-s7"
          role="region"
          aria-label="Hospital statistics"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { num: "1869", label: "Year founded" },
              { num: "1,100+", label: "Physicians and scientists" },
              { num: "$400M+", label: "Annual research investment" },
            ].map((stat, i) => (
              <div
                key={stat.num}
                className={`px-s7 py-s6 text-center ${
                  i < 2 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <span className="mb-2 block text-[clamp(36px,5vw,58px)] font-black leading-none tracking-[-0.03em] text-white">
                  {stat.num}
                </span>
                <span className="text-sm font-light text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <section className="py-s10" aria-labelledby="research-heading">
          <div className="grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
            <div
              className="photo-lab relative min-h-[320px] overflow-hidden rounded-lg lg:order-1"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,10,30,.35)] to-transparent" />
            </div>
            <div className="lg:order-2">
              <span className="eyebrow">Research & discovery</span>
              <h2
                id="research-heading"
                className="mb-s4 mt-s2 text-2xl font-bold text-ocean"
              >
                We find treatments that don&apos;t exist yet.
              </h2>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                Boston Children&apos;s is the world&apos;s leading pediatric
                research institution. Our scientists work alongside our clinical
                teams — which means the distance between a lab discovery and a
                child&apos;s care is very short.
              </p>
              <Button href="/search?q=research" variant="outline">
                Explore research
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
