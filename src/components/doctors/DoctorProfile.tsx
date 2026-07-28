import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Callout";
import { IconPhone, IconUser } from "@/components/ui/Icons";
import type { Doctor } from "@/lib/data/doctors";
import { doctors } from "@/lib/data/doctors";
import { conditions } from "@/lib/data/conditions";
import { getProgram } from "@/lib/data/programs";
import { cn } from "@/lib/cn";

export function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const program = doctor.programSlug
    ? getProgram(doctor.programSlug)
    : undefined;
  const relatedConditions = conditions.filter((c) =>
    doctor.conditionSlugs?.includes(c.slug),
  );
  const relatedDoctors = doctors
    .filter(
      (d) =>
        d.slug !== doctor.slug &&
        (d.specialty === doctor.specialty ||
          d.programSlug === doctor.programSlug),
    )
    .slice(0, 2);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Find a Doctor", href: "/find-a-doctor" },
          { label: doctor.specialty, href: `/find-a-doctor?specialty=${encodeURIComponent(doctor.specialty)}` },
          { label: doctor.name },
        ]}
      />

      <PageHero
        id="doc-heading"
        eyebrow={doctor.specialty}
        title={doctor.name}
        lead={doctor.title}
        actions={
          <>
            {doctor.acceptingNewPatients ? (
              <Button href="#request-appointment" variant="ocean">
                Request an Appointment
              </Button>
            ) : (
              <Button href="#request-appointment" variant="ghost-white">
                Join Waitlist
              </Button>
            )}
            <Button
              href={`/find-a-doctor?specialty=${encodeURIComponent(doctor.specialty)}`}
              variant="ghost-white"
            >
              More in {doctor.specialty}
            </Button>
          </>
        }
      />

      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-s7 py-s7 pb-s10 lg:grid-cols-[1fr_300px]">
          <article aria-label={`Profile for ${doctor.name}`}>
            <div className="mb-s6 flex flex-wrap items-start gap-s4">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface-2"
                aria-hidden="true"
              >
                <IconUser className="h-10 w-10 text-text-meta" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-s3 flex flex-wrap gap-1">
                  {doctor.tags.map((tag, i) => (
                    <Badge
                      key={tag}
                      variant={i === doctor.tags.length - 1 ? "gray" : "ocean"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-[5px]">
                  <span
                    className={cn(
                      "h-[7px] w-[7px] shrink-0 rounded-full",
                      doctor.acceptingNewPatients ? "bg-green" : "bg-text-meta",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      doctor.acceptingNewPatients
                        ? "text-success-text"
                        : "text-text-meta",
                    )}
                  >
                    {doctor.acceptingNewPatients
                      ? "Accepting new patients"
                      : "Not currently accepting new patients"}
                  </span>
                </div>
                <p className="mt-s2 text-sm font-light text-text-body">
                  {doctor.location} · Speaks {doctor.languages.join(", ")}
                </p>
              </div>
            </div>

            <section className="mb-s7" aria-labelledby="about-doc">
              <h2
                id="about-doc"
                className="mb-s4 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean"
              >
                About
              </h2>
              <p className="text-md font-light leading-[1.8] text-text-body">
                {doctor.bio}
              </p>
            </section>

            <section className="mb-s7" aria-labelledby="interests-doc">
              <h2
                id="interests-doc"
                className="mb-s4 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean"
              >
                Clinical interests
              </h2>
              <ul className="ml-s5 flex flex-col gap-1.5">
                {doctor.clinicalInterests.map((item) => (
                  <li
                    key={item}
                    className="relative pl-s3 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-s7" aria-labelledby="edu-doc">
              <h2
                id="edu-doc"
                className="mb-s4 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean"
              >
                Education & training
              </h2>
              <ul className="ml-s5 flex flex-col gap-1.5">
                {doctor.education.map((item) => (
                  <li
                    key={item}
                    className="relative pl-s3 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-s7" aria-labelledby="cert-doc">
              <h2
                id="cert-doc"
                className="mb-s4 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean"
              >
                Board certifications
              </h2>
              <ul className="ml-s5 flex flex-col gap-1.5">
                {doctor.certifications.map((item) => (
                  <li
                    key={item}
                    className="relative pl-s3 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {relatedConditions.length > 0 ? (
              <section className="mb-s7" aria-labelledby="cond-doc">
                <h2
                  id="cond-doc"
                  className="mb-s4 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean"
                >
                  Related conditions
                </h2>
                <div className="flex flex-col gap-s3">
                  {relatedConditions.map((cond) => (
                    <Link
                      key={cond.slug}
                      href={`/conditions/${cond.slug}`}
                      className="rounded-md border border-border bg-white p-s4 no-underline transition-all hover:border-border-strong hover:shadow-sm"
                    >
                      <span className="eyebrow">{cond.specialty}</span>
                      <span className="mt-1 block text-base font-bold text-text">
                        {cond.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm font-light text-text-body">
                        {cond.lead}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside
            className="sticky top-[108px] flex flex-col gap-s4 max-lg:static"
            aria-label="Appointment and related links"
          >
            <div
              id="request-appointment"
              className="rounded-md bg-blue p-s5 scroll-mt-[120px]"
            >
              <h4 className="mb-s2 text-base font-bold text-white">
                {doctor.acceptingNewPatients
                  ? "Request an appointment"
                  : "Join the waitlist"}
              </h4>
              <p className="mb-s4 text-sm font-light text-white/60">
                {doctor.acceptingNewPatients
                  ? `Schedule with ${doctor.name.split(",")[0]} at ${doctor.location}.`
                  : `${doctor.name.split(",")[0]} is not accepting new patients right now. You can join the waitlist or browse other ${doctor.specialty} specialists.`}
              </p>
              <Button href="#request-appointment" variant="ocean" fullWidth>
                {doctor.acceptingNewPatients
                  ? "Request an Appointment"
                  : "Join Waitlist"}
              </Button>
              <div className="mt-s3 flex items-center gap-1.5">
                <IconPhone className="text-white/50" />
                <a
                  href={`tel:${doctor.phone.replace(/\D/g, "")}`}
                  className="text-sm font-semibold text-white/75 no-underline hover:text-white"
                >
                  {doctor.phone}
                </a>
              </div>
            </div>

            {!doctor.acceptingNewPatients ? (
              <Notice>
                <p>
                  Looking for care sooner?{" "}
                  <Link
                    href={`/find-a-doctor?specialty=${encodeURIComponent(doctor.specialty)}&availability=${encodeURIComponent("Accepting new patients")}`}
                    className="font-bold text-blue"
                  >
                    See {doctor.specialty} doctors accepting patients
                  </Link>
                  .
                </p>
              </Notice>
            ) : null}

            {program ? (
              <div className="rounded-md border border-border bg-white p-s4">
                <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                  Clinical program
                </h5>
                <Link
                  href={`/programs/${program.slug}`}
                  className="text-sm font-semibold text-ocean no-underline hover:text-blue"
                >
                  {program.name}
                </Link>
                <p className="mt-2 text-sm font-light text-text-body">
                  {program.description}
                </p>
              </div>
            ) : null}

            <div className="rounded-md border border-border bg-white p-s4">
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                Location
              </h5>
              <p className="text-sm font-light text-text-body">
                {doctor.location}
              </p>
              <Link
                href={`/find-a-doctor?location=${encodeURIComponent(doctor.location)}`}
                className="mt-2 inline-block text-sm font-semibold text-ocean no-underline hover:text-blue"
              >
                Doctors at this location
              </Link>
            </div>

            {relatedDoctors.length > 0 ? (
              <div className="rounded-md border border-border bg-surface p-s4">
                <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                  Related specialists
                </h5>
                <ul className="flex flex-col gap-s3">
                  {relatedDoctors.map((peer) => (
                    <li key={peer.slug}>
                      <Link
                        href={`/find-a-doctor/${peer.slug}`}
                        className="block no-underline"
                      >
                        <span className="block text-sm font-bold text-text">
                          {peer.name}
                        </span>
                        <span className="block text-xs font-light text-text-meta">
                          {peer.specialty}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  );
}
