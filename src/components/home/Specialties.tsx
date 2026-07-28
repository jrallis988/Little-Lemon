import Link from "next/link";
import { Button } from "@/components/ui/Button";

const specialties = [
  { name: "Heart conditions", desc: "Congenital and acquired heart disease", href: "/programs/heart-center" },
  { name: "Neurology", desc: "Brain, spine, and nervous system conditions", href: "/conditions/epilepsy-in-children" },
  { name: "Cancer & blood", desc: "Oncology, hematology, and transplant", href: "/programs/cancer-blood-disorders" },
  { name: "Genetic conditions", desc: "Genetic and undiagnosed conditions", href: "/search?q=genetic" },
  { name: "Orthopedics", desc: "Bones, joints, and musculoskeletal care", href: "/find-a-doctor?specialty=Orthopedics" },
  { name: "Epilepsy", desc: "Seizure diagnosis and treatment", href: "/programs/epilepsy-program" },
  { name: "Brain tumors", desc: "Neuro-oncology and neurosurgery", href: "/find-a-doctor?specialty=Neuro-oncology" },
  { name: "Emergency care", desc: "Level 1 pediatric trauma center", href: "/emergency" },
];

export function Specialties() {
  return (
    <section className="bg-surface py-s9" aria-labelledby="spec-heading">
      <div className="wrap">
        <div className="section-header">
          <span className="eyebrow">Specialties</span>
          <h2 id="spec-heading">Is this the right hospital for your child?</h2>
          <p>
            We care for children with some of the most complex and rare
            conditions in medicine. Here are the areas where we have the deepest
            expertise.
          </p>
        </div>
        <div className="mt-s6 grid grid-cols-1 overflow-hidden rounded-md border border-border sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((spec) => (
            <Link
              key={spec.name}
              href={spec.href}
              className="block border-b border-r border-border bg-white px-s5 py-s4 no-underline transition-colors hover:bg-surface [&:nth-child(4n)]:lg:border-r-0"
            >
              <span className="mb-[3px] block text-base font-bold text-text group-hover:text-ocean">
                {spec.name}
              </span>
              <span className="text-sm font-light text-text-meta">
                {spec.desc}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-s6">
          <Button href="/conditions/epilepsy-in-children" variant="outline">
            View all conditions A–Z
          </Button>
        </div>
      </div>
    </section>
  );
}
