import Link from "next/link";
import { Button } from "@/components/ui/Button";

const pillars = [
  {
    title: "Highest-quality care",
    body: "Provide the highest quality of health care for every child.",
    href: "/find-a-doctor",
  },
  {
    title: "Research & discovery",
    body: "Lead the way in research so discoveries reach the bedside faster.",
    href: "/research",
  },
  {
    title: "Educate future leaders",
    body: "Train the next generation of pediatric clinicians as a teaching hospital.",
    href: "/about/leadership",
  },
  {
    title: "Community well-being",
    body: "Enhance the health of children and families in our local community.",
    href: "/about/community",
  },
];

export function AboutMission() {
  return (
    <section className="bg-white py-s9" aria-labelledby="mission-home-heading">
      <div className="wrap">
        <div className="section-header max-w-[720px]">
          <span className="eyebrow">Our mission</span>
          <h2 id="mission-home-heading">
            Advancing pediatric care worldwide for over 150 years.
          </h2>
          <p>
            Boston Children&apos;s Hospital maintains a four-part mission —
            care, research, education, and community — the same vision that has
            guided us since 1869.
          </p>
        </div>

        <div className="mt-s6 grid grid-cols-1 gap-s4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group block rounded-md border border-border bg-surface p-s5 no-underline transition-all hover:-translate-y-0.5 hover:border-ocean hover:bg-white hover:shadow-md"
            >
              <div className="mb-s2 text-xs font-extrabold uppercase tracking-[0.08em] text-ocean">
                0{index + 1}
              </div>
              <div className="mb-s2 text-base font-bold text-blue group-hover:text-ocean">
                {pillar.title}
              </div>
              <p className="text-sm font-light leading-relaxed text-text-body">
                {pillar.body}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-s7 flex flex-wrap items-center gap-s3">
          <Button href="/about" variant="ocean">
            Explore About Us
          </Button>
          <Button href="/about/history" variant="outline">
            Our history
          </Button>
          <Button href="/locations" variant="outline">
            Locations
          </Button>
        </div>
      </div>
    </section>
  );
}
