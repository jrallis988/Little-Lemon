import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Community Health",
  description:
    "Boston Children’s Hospital community health and anchor strategy — improving conditions that shape children’s well-being.",
};

const pillars = [
  {
    title: "Inclusive hiring",
    body: "Expanding opportunity for local residents through workforce pathways and inclusive employment practices.",
  },
  {
    title: "Local purchasing",
    body: "Directing institutional purchasing power toward local and diverse suppliers to strengthen community economies.",
  },
  {
    title: "Community investment",
    body: "Supporting projects with health and social returns — including housing, early childhood, youth engagement, and mental health.",
  },
  {
    title: "Sustainable partnerships",
    body: "Collaborating across hospital departments and community organizations as a Healthcare Anchor Network member.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        id="community-heading"
        eyebrow="About Us"
        title="Community health & anchor strategy"
        lead="Boston Children’s is an anchor institution for our local community — working to improve the conditions that shape children’s health and opportunity."
        actions={
          <Button href="/about" variant="ghost-white">
            Back to About Us
          </Button>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 max-w-[760px]">
          <p className="mb-s4 text-md font-light leading-relaxed text-text-body">
            Since 2018, Boston Children&apos;s has been a member of the
            Healthcare Anchor Network, a national group of hospitals and health
            systems working to build more inclusive and sustainable local
            economies. The hospital&apos;s community mission focuses on
            improving health and well-being for children and families nearby.
          </p>
          <p className="text-sm font-light text-text-meta">
            Summary adapted from public community and social responsibility
            materials linked from{" "}
            <a
              href="https://www.childrenshospital.org/about-us"
              className="font-semibold text-ocean underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              childrenshospital.org/about-us
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-md border border-border bg-white p-s5"
            >
              <h2 className="mb-s2 text-lg font-bold text-blue">
                {pillar.title}
              </h2>
              <p className="text-sm font-light leading-relaxed text-text-body">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-s8 flex flex-wrap gap-s3">
          <Button href="/patients-families" variant="outline">
            Patients &amp; Families
          </Button>
          <Button href="/about/leadership" variant="outline">
            Leadership
          </Button>
        </div>
      </div>
    </>
  );
}
