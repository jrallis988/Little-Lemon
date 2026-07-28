import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { contentApi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find Boston Children's Hospital locations across Greater Boston — Longwood, Waltham, Needham, Lexington, and Peabody.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        id="locations-heading"
        eyebrow="Find a location"
        title="Locations"
        lead="Care across Greater Boston — specialty clinics, urgent care, and our Level 1 pediatric trauma center at the Longwood main campus."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Request an Appointment
            </Button>
            <Button href="/find-a-doctor" variant="ghost-white">
              Find a Doctor
            </Button>
          </>
        }
      />

      <div className="wrap grid grid-cols-1 gap-s5 py-s7 pb-s10 lg:grid-cols-2">
        {contentApi.locations.map((loc) => (
          <article
            key={loc.slug}
            id={loc.slug}
            className="scroll-mt-[120px] rounded-md border border-border bg-white p-s5"
          >
            <div className="mb-s3 flex flex-wrap gap-1">
              {loc.hasEmergency ? <Badge variant="blue">Emergency</Badge> : null}
              {loc.hasUrgentCare ? <Badge variant="ocean">Urgent care</Badge> : null}
              {loc.hasTelehealth ? <Badge variant="green">Telehealth</Badge> : null}
            </div>
            <h2 className="mb-s2 text-xl font-bold text-ocean">{loc.name}</h2>
            <p className="mb-1 text-base font-light text-text-body">
              {loc.address}
              <br />
              {loc.city}, {loc.state} {loc.zip}
            </p>
            <p className="mb-s3 text-sm font-semibold text-text">
              <a href={`tel:${loc.phone.replace(/\D/g, "")}`} className="text-ocean">
                {loc.phone}
              </a>
            </p>
            {loc.hours ? (
              <p className="mb-s3 text-sm font-light text-text-meta">{loc.hours}</p>
            ) : null}
            <ul className="mb-s4 flex flex-col gap-1">
              {loc.services.map((s) => (
                <li
                  key={s}
                  className="relative pl-s3 text-sm font-light text-text-body before:absolute before:left-0 before:top-2.5 before:h-[1.5px] before:w-[5px] before:bg-ocean"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-s2">
              <Button
                href={`/find-a-doctor?location=${encodeURIComponent(loc.name)}`}
                variant="outline"
                size="sm"
              >
                Doctors here
              </Button>
              {loc.hasEmergency ? (
                <Button href="/emergency" variant="outline-ocean" size="sm">
                  ED info
                </Button>
              ) : null}
              <Link
                href="/appointments/request"
                className="inline-flex items-center text-sm font-bold text-ocean no-underline hover:underline"
              >
                Book at this location
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
