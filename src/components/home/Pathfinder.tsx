import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";

const paths = [
  {
    title: "Parents & caregivers",
    desc: "Find specialists, learn about conditions, and prepare for your child's visit.",
    href: "/find-a-doctor",
    cta: "Find care",
  },
  {
    title: "Clinicians",
    desc: "Refer a patient, access the Physician Access Line, or explore CME.",
    href: "/emergency",
    cta: "Refer a patient",
  },
  {
    title: "Researchers",
    desc: "Explore our labs, clinical trials, publications, and research programs.",
    href: "/search?q=research",
    cta: "Access research tools",
  },
  {
    title: "International families",
    desc: "Coordinate care across borders with our International Health Services team.",
    href: "/about",
    cta: "Plan your visit",
  },
];

export function Pathfinder() {
  return (
    <section className="bg-white py-s9" aria-labelledby="pf-heading">
      <div className="wrap">
        <div className="section-header">
          <span className="eyebrow">Who are you?</span>
          <h2 id="pf-heading">Find your path</h2>
          <p>
            Boston Children&apos;s serves families, clinicians, researchers, and
            patients from around the world. Tell us who you are, and we&apos;ll
            show you what you need.
          </p>
        </div>
        <div className="mt-s6 grid grid-cols-1 gap-s4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group block rounded-md border-[1.5px] border-border bg-white px-s5 pb-s4 pt-s5 no-underline transition-all duration-ease hover:-translate-y-[3px] hover:border-ocean hover:shadow-md"
            >
              <div className="mb-s3 flex h-11 w-11 items-center justify-center rounded-sm bg-ocean/10 transition-all group-hover:bg-ocean">
                <IconArrowRight className="h-[22px] w-[22px] text-ocean transition-colors group-hover:text-white" />
              </div>
              <div className="mb-s1 text-base font-bold text-text">
                {path.title}
              </div>
              <div className="mb-s3 text-sm font-light leading-[1.6] text-text-body">
                {path.desc}
              </div>
              <div className="flex items-center gap-[5px] text-sm font-bold text-ocean">
                {path.cta}
                <IconArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
