import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { IconArrowRight } from "@/components/ui/Icons";
import { conditions } from "@/lib/data/conditions";
import { doctors } from "@/lib/data/doctors";
import type { Program } from "@/lib/data/programs";

export function ProgramLanding({ program }: { program: Program }) {
  const relatedDoctors = doctors.filter((d) =>
    program.relatedDoctorSlugs.includes(d.slug),
  );
  const relatedConditions = conditions.filter((c) =>
    program.relatedConditionSlugs.includes(c.slug),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs/epilepsy-program" },
          { label: program.name },
        ]}
      />

      <PageHero
        id="prog-heading"
        eyebrow={program.specialty}
        title={program.name}
        lead={program.lead}
        actions={
          <>
            <Button
              href={`/find-a-doctor?specialty=${encodeURIComponent(program.specialty)}`}
              variant="ocean"
            >
              Find a specialist
            </Button>
            <Button href={`tel:${program.phone.replace(/\D/g, "")}`} variant="ghost-white">
              Call {program.phone}
            </Button>
          </>
        }
      />

      <section className="bg-white py-s9">
        <div className="wrap grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
          <div>
            <span className="eyebrow">About this program</span>
            <h2 className="mt-s2 mb-s4 text-2xl font-bold text-ocean">
              Deep expertise, coordinated care
            </h2>
            <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
              {program.description}
            </p>
            <ul className="flex flex-col gap-2">
              {program.highlights.map((h) => (
                <li
                  key={h}
                  className="relative pl-s4 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`relative min-h-[320px] overflow-hidden rounded-lg ${program.photoClass}`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,15,40,.45)] to-transparent" />
          </div>
        </div>
      </section>

      {relatedConditions.length > 0 ? (
        <section className="bg-surface py-s9" aria-labelledby="related-cond">
          <div className="wrap">
            <div className="section-header">
              <span className="eyebrow">Conditions we treat</span>
              <h2 id="related-cond">Learn about related conditions</h2>
            </div>
            <div className="mt-s6 grid grid-cols-1 gap-s4 md:grid-cols-2">
              {relatedConditions.map((cond) => (
                <Link
                  key={cond.slug}
                  href={`/conditions/${cond.slug}`}
                  className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="eyebrow">{cond.specialty}</span>
                  <h3 className="mt-s2 mb-s2 text-xl font-bold text-ocean">
                    {cond.name}
                  </h3>
                  <p className="mb-s3 line-clamp-3 text-sm font-light text-text-body">
                    {cond.lead}
                  </p>
                  <span className="inline-flex items-center gap-[5px] text-sm font-bold text-ocean">
                    Read condition page
                    <IconArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-s9" aria-labelledby="team-heading">
        <div className="wrap">
          <div className="section-header">
            <span className="eyebrow">Care team</span>
            <h2 id="team-heading">Specialists in this program</h2>
            <p>
              Every doctor listed here sees patients at Boston Children&apos;s
              Hospital.
            </p>
          </div>
          <div className="mt-s6 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
            {relatedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-s6">
            <Button
              href={`/find-a-doctor?specialty=${encodeURIComponent(program.specialty)}`}
              variant="outline"
            >
              View all {program.specialty} doctors
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
