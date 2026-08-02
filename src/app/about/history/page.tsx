import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "More than 150 years of advancing pediatric care at Boston Children’s Hospital, founded in 1869.",
};

const milestones = [
  {
    year: "1869",
    title: "Founded",
    body: "Boston Children’s Hospital opens with a mission to care for children and advance pediatric medicine.",
  },
  {
    year: "1900s–1950s",
    title: "Specialty care expands",
    body: "Specialized pediatric services grow as the hospital becomes a destination for complex childhood illness.",
  },
  {
    year: "Teaching hospital",
    title: "Harvard Medical School affiliation",
    body: "As a teaching hospital, Boston Children’s trains generations of clinicians under senior supervision while delivering family-centered care.",
  },
  {
    year: "Today",
    title: "Care, research, and community",
    body: "The hospital continues a four-part mission: exceptional care, research leadership, education, and improving the well-being of local children and families.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        id="history-heading"
        eyebrow="About Us"
        title="Our history"
        lead="For more than 150 years, Boston Children’s Hospital has kept the same vision: to advance pediatric care worldwide."
        actions={
          <Button href="/about" variant="ghost-white">
            Back to About Us
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <ol className="mx-auto flex max-w-[760px] flex-col gap-s5">
          {milestones.map((item) => (
            <li
              key={item.year}
              className="rounded-md border border-border bg-white p-s5"
            >
              <div className="mb-s2 text-xs font-extrabold uppercase tracking-[0.08em] text-ocean">
                {item.year}
              </div>
              <h2 className="mb-s2 text-xl font-bold text-blue">{item.title}</h2>
              <p className="text-base font-light leading-relaxed text-text-body">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-s8 flex flex-wrap justify-center gap-s3">
          <Button href="/about/leadership" variant="outline">
            Leadership
          </Button>
          <Button href="/locations" variant="outline">
            Locations
          </Button>
        </div>
      </div>
    </>
  );
}
