import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Leadership at Boston Children’s Hospital guiding clinical care, research, education, and community health.",
};

const leaders = [
  {
    name: "Kevin B. Churchwell, MD",
    role: "President and Chief Executive Officer",
    summary:
      "Provides leadership, vision, and oversight across clinical care, research and innovation, medical education, and community engagement. An advocate for equity, diversity, and inclusion, Dr. Churchwell founded Boston Children’s Office of Health Equity and Inclusion.",
  },
  {
    name: "Clinical & operating leadership",
    role: "Physician-in-Chief · Surgeon-in-Chief · Nursing · Operations",
    summary:
      "Senior clinical and operational leaders partner across departments to deliver high-reliability care, advance specialty programs, and support families throughout the care journey.",
  },
  {
    name: "Research leadership",
    role: "Chief Scientific Officer and research administration",
    summary:
      "Scientific and administrative leaders steward one of the world’s leading pediatric research enterprises — connecting discovery with clinical teams across the hospital.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        id="leadership-heading"
        eyebrow="About Us"
        title="Our leadership"
        lead="Leaders across care, research, education, and community health guide Boston Children’s mission to advance pediatric medicine worldwide."
        actions={
          <Button href="/about" variant="ghost-white">
            Back to About Us
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 max-w-[720px]">
          <p className="text-md font-light leading-relaxed text-text-body">
            This overview is adapted from publicly available leadership
            information on{" "}
            <a
              href="https://www.childrenshospital.org/about-us"
              className="font-semibold text-ocean underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              childrenshospital.org/about-us
            </a>
            . For official biographies and disclosures, refer to the hospital’s
            published leadership pages.
          </p>
        </div>

        <ul className="flex flex-col gap-s4">
          {leaders.map((leader) => (
            <li
              key={leader.name}
              className="rounded-md border border-border bg-white p-s6"
            >
              <h2 className="mb-1 text-xl font-bold text-blue">{leader.name}</h2>
              <p className="mb-s3 text-sm font-bold text-ocean">{leader.role}</p>
              <p className="text-base font-light leading-relaxed text-text-body">
                {leader.summary}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-s8 flex flex-wrap gap-s3">
          <Button href="/about/community" variant="outline">
            Community health
          </Button>
          <Button href="/research" variant="outline">
            Research hub
          </Button>
        </div>
      </div>
    </>
  );
}
