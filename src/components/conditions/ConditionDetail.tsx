import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { IconClock, IconPhone, IconUser } from "@/components/ui/Icons";
import type { Condition } from "@/lib/data/conditions";

export function ConditionDetail({ condition }: { condition: Condition }) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Conditions A–Z", href: "/search?q=condition" },
          { label: condition.specialty, href: `/programs/${condition.relatedProgramSlug}` },
          { label: condition.name },
        ]}
      />

      <PageHero
        id="cond-heading"
        eyebrow={condition.specialty}
        title={condition.name}
        lead={condition.lead}
        actions={
          <>
            <Button
              href={`/find-a-doctor?specialty=${encodeURIComponent(condition.specialty)}`}
              variant="ocean"
            >
              Find an {condition.specialty} Specialist
            </Button>
            <Button href="/find-a-doctor" variant="ghost-white">
              Request an Appointment
            </Button>
          </>
        }
      />

      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-s7 py-s7 pb-s10 lg:grid-cols-[1fr_300px]">
          <article aria-label="Condition information">
            <div className="mb-s5 flex items-center gap-[5px] text-xs text-text-meta">
              <IconClock />
              <span>
                Reviewed by Boston Children&apos;s clinical team · Last updated{" "}
                {condition.lastUpdated}
              </span>
            </div>

            <div
              className="mb-s7 rounded-md border-[1.5px] border-border bg-surface p-s5"
              role="region"
              aria-label={`Key facts about ${condition.name}`}
            >
              <div className="mb-s4 flex items-center gap-[7px] text-base font-bold text-blue">
                Key Facts
              </div>
              <div className="grid grid-cols-1 gap-s3 sm:grid-cols-2">
                {condition.keyFacts.map((fact) => (
                  <div key={fact.label}>
                    <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.07em] text-ocean">
                      {fact.label}
                    </div>
                    <div className="text-sm font-light leading-[1.6] text-text-body">
                      {fact.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="clinical-body">
              {condition.sections.map((section, idx) => (
                <div key={section.heading}>
                  <h2 className="mb-s4 mt-s7 border-l-[3px] border-ocean pl-s4 text-xl font-bold text-ocean first:mt-0">
                    {section.heading}
                  </h2>
                  {section.paragraphs.slice(0, section.bullets ? 1 : undefined).map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="text-md font-light leading-[1.8] text-text-body [&+p]:mt-s4"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="my-s3 mb-s4 ml-s5 flex flex-col gap-1.5">
                      {section.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-s3 text-base font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.bullets && section.paragraphs.length > 1
                    ? section.paragraphs.slice(1).map((p) => (
                        <p
                          key={p.slice(0, 40)}
                          className="mt-s4 text-md font-light leading-[1.8] text-text-body"
                        >
                          {p}
                        </p>
                      ))
                    : null}
                  {idx === 1 ? (
                    <Callout title={condition.edCallout.title} className="my-s5">
                      <p>{condition.edCallout.body}</p>
                    </Callout>
                  ) : null}
                </div>
              ))}
            </div>
          </article>

          <aside
            className="sticky top-[108px] flex flex-col gap-s4 max-lg:static"
            aria-label="Related actions and resources"
          >
            <div className="rounded-md bg-blue p-s5">
              <h4 className="mb-s2 text-base font-bold text-white">
                Make an appointment
              </h4>
              <p className="mb-s4 text-sm font-light text-white/60">
                {condition.appointment.blurb}
              </p>
              <Button href="/find-a-doctor" variant="ocean" fullWidth>
                Request an Appointment
              </Button>
              <div className="mt-s3 flex items-center gap-1.5">
                <IconPhone className="text-white/50" />
                <a
                  href={`tel:${condition.appointment.phone.replace(/\D/g, "")}`}
                  className="text-sm font-semibold text-white/75 no-underline hover:text-white"
                >
                  {condition.appointment.phone}
                </a>
              </div>
            </div>

            <div className="rounded-md border border-border bg-surface p-s4">
              <span className="eyebrow mb-s3">Your care team</span>
              <div className="mb-s3 flex items-center gap-s3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean">
                  <IconUser className="text-white/70" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-text">
                    {condition.careTeam.name}
                  </span>
                  <span className="block text-xs font-light text-text-meta">
                    {condition.careTeam.title}
                  </span>
                </div>
              </div>
              <Button
                href={`/find-a-doctor/${condition.careTeam.doctorSlug}`}
                variant="outline"
                size="sm"
                fullWidth
              >
                View full profile
              </Button>
            </div>

            <div className="rounded-md border border-border bg-white p-s4">
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                Related program
              </h5>
              <Link
                href={`/programs/${condition.relatedProgramSlug}`}
                className="text-sm font-semibold text-ocean no-underline hover:text-blue"
              >
                Explore the {condition.specialty} program
              </Link>
            </div>

            <div className="rounded-md border border-border bg-white p-s4">
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                Patient resources
              </h5>
              <ul className="flex flex-col gap-1.5">
                {condition.resources.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      className="text-sm font-semibold text-ocean no-underline hover:text-blue"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-border bg-white p-s4">
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-text-meta">
                Related clinical trials
              </h5>
              <ul className="flex flex-col gap-1.5">
                {condition.trials.map((t) => (
                  <li key={t.label}>
                    <a
                      href={t.href}
                      className="text-sm font-semibold text-ocean no-underline hover:text-blue"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
