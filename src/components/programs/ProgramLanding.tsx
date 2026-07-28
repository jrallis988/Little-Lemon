import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { IconArrowRight } from "@/components/ui/Icons";
import { contentApi } from "@/lib/content";
import type { Program } from "@/lib/data/programs";

export function ProgramLanding({ program }: { program: Program }) {
  const full = contentApi.getProgram(program.slug);
  const relations = full
    ? contentApi.resolveProgramRelations(full)
    : {
        doctors: [],
        conditions: [],
        trials: [],
        locations: [],
        department: undefined,
      };
  const relatedDoctors = contentApi
    .doctorsLegacy()
    .filter((d) => program.relatedDoctorSlugs.includes(d.slug));
  const relatedConditions = relations.conditions;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
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
            <Button href="/appointments/request" variant="ghost-white">
              Request an Appointment
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
          >
            {program.imageUrl ? (
              <Image
                src={program.imageUrl}
                alt={`${program.name} care team and facilities`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,15,40,.45)] to-transparent" />
          </div>
        </div>
      </section>

      {relations.locations.length > 0 ? (
        <section className="border-y border-border bg-surface py-s6">
          <div className="wrap flex flex-wrap items-center gap-s3">
            <span className="text-sm font-extrabold uppercase tracking-wide text-text-meta">
              Locations
            </span>
            {relations.locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="rounded-sm border border-border bg-white px-3 py-1.5 text-sm font-bold text-blue no-underline hover:border-ocean"
              >
                {loc.shortName}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

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

      {relations.trials.length > 0 ? (
        <section className="bg-white py-s9" aria-labelledby="trials-heading">
          <div className="wrap">
            <div className="section-header">
              <span className="eyebrow">Research</span>
              <h2 id="trials-heading">Related clinical trials</h2>
            </div>
            <div className="mt-s6 grid grid-cols-1 gap-s4 md:grid-cols-2">
              {relations.trials.map((trial) => (
                <Link
                  key={trial.slug}
                  href={`/research?trial=${trial.slug}`}
                  className="block rounded-md border border-border p-s5 no-underline hover:shadow-sm"
                >
                  <Badge
                    variant={
                      trial.status === "recruiting" ? "green" : "ocean"
                    }
                  >
                    {trial.status}
                  </Badge>
                  <span className="mt-s2 block text-base font-bold text-text">
                    {trial.title}
                  </span>
                  <span className="mt-1 block text-sm font-light text-text-body">
                    {trial.summary}
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
