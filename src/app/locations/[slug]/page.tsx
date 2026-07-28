import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Notice } from "@/components/ui/Callout";
import { contentApi } from "@/lib/content";
import { buildBreadcrumbList, buildHospital, jsonLdScript } from "@/lib/seo";

export function generateStaticParams() {
  return contentApi.locations.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const location = contentApi.getLocation(params.slug);
  if (!location) return { title: "Location" };
  return {
    title: `${location.name} — Hours and Directions`,
    description: `Hours, parking, directions, services, and contact information for ${location.name} in ${location.city}, Massachusetts.`,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

export default function LocationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const location = contentApi.getLocation(params.slug);
  if (!location) notFound();

  const programs = contentApi.programs.filter((program) =>
    program.locationSlugs.includes(location.slug),
  );
  const structuredData = [
    buildHospital({
      name: location.name,
      description: `Boston Children's pediatric services in ${location.city}, Massachusetts.`,
      path: `/locations/${location.slug}`,
      telephone: location.phone,
      type: location.hasEmergency ? "Hospital" : "MedicalClinic",
      address: {
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.zip,
      },
    }),
    buildBreadcrumbList([
      { name: "Home", path: "/" },
      { name: "Locations", path: "/locations" },
      { name: location.name, path: `/locations/${location.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: location.shortName },
        ]}
      />
      <PageHero
        id="location-heading"
        eyebrow="Boston Children's location"
        title={location.name}
        lead={`${location.address}, ${location.city}, ${location.state} ${location.zip}`}
        actions={
          <>
            {location.directionsUrl ? (
              <Button href={location.directionsUrl} variant="ocean">
                Get directions
              </Button>
            ) : null}
            <Button href={`tel:${location.phone.replace(/\D/g, "")}`} variant="ghost-white">
              Call {location.phone}
            </Button>
          </>
        }
      />

      <div
        className={`h-[260px] bg-cover bg-center md:h-[360px] ${
          location.imageUrl ? "" : "photo-campus"
        }`}
        style={
          location.imageUrl
            ? { backgroundImage: `linear-gradient(rgba(0,48,135,.12), rgba(0,48,135,.12)), url("${location.imageUrl}")` }
            : undefined
        }
        role="img"
        aria-label={`${location.name} exterior`}
      />

      <div className="wrap py-s7 pb-s10">
        <div className="grid grid-cols-1 items-start gap-s7 lg:grid-cols-[1fr_320px]">
          <div>
            <section aria-labelledby="hours-heading">
              <h2 id="hours-heading" className="mb-s4 text-2xl font-bold text-ocean">
                Hours and arrival
              </h2>
              <div className="grid grid-cols-1 gap-s4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-white p-s5">
                  <h3 className="mb-s2 text-base font-bold text-blue">Clinic hours</h3>
                  <p className="text-sm font-light text-text-body">
                    {location.clinicHours ?? location.hours ?? "Hours vary by service. Call before visiting."}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-white p-s5">
                  <h3 className="mb-s2 text-base font-bold text-blue">Parking and drop-off</h3>
                  <p className="text-sm font-light text-text-body">
                    {location.parking ?? "Call the location for current parking and drop-off guidance."}
                  </p>
                </div>
              </div>
              <Notice className="mt-s4">
                <p>
                  Confirm the building, floor, and clinic in your appointment
                  message. Specialty and holiday hours may differ from general
                  building hours.
                </p>
              </Notice>
            </section>

            <section className="mt-s7" aria-labelledby="services-heading">
              <h2 id="services-heading" className="mb-s4 text-2xl font-bold text-ocean">
                Services at {location.shortName}
              </h2>
              <ul className="grid grid-cols-1 gap-s3 sm:grid-cols-2">
                {location.services.map((service) => (
                  <li key={service} className="rounded-sm bg-surface px-s4 py-s3 text-base font-semibold text-text">
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            {programs.length > 0 ? (
              <section className="mt-s7" aria-labelledby="programs-heading">
                <h2 id="programs-heading" className="mb-s4 text-2xl font-bold text-ocean">
                  Programs at this location
                </h2>
                <div className="grid grid-cols-1 gap-s3 sm:grid-cols-2">
                  {programs.map((program) => (
                    <Link
                      key={program.slug}
                      href={`/programs/${program.slug}`}
                      className="rounded-md border border-border bg-white p-s4 font-bold text-blue no-underline hover:border-ocean"
                    >
                      {program.name}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="rounded-md bg-blue p-s5 text-white" aria-labelledby="directions-heading">
            <h2 id="directions-heading" className="mb-s3 text-xl font-bold text-white">
              Directions and contact
            </h2>
            <address className="mb-s4 not-italic text-sm font-light text-white/75">
              {location.address}
              <br />
              {location.city}, {location.state} {location.zip}
            </address>
            <div className="mb-s4 flex flex-wrap gap-1">
              {location.hasEmergency ? <Badge variant="blue">Emergency Department</Badge> : null}
              {location.hasUrgentCare ? <Badge variant="green">Urgent care</Badge> : null}
              {location.hasTelehealth ? <Badge variant="ocean">Telehealth</Badge> : null}
            </div>
            <div className="flex flex-col gap-s3">
              {location.directionsUrl ? (
                <Button href={location.directionsUrl} variant="ocean" fullWidth>
                  Open turn-by-turn directions
                </Button>
              ) : null}
              <Button
                href={`/find-a-doctor?location=${encodeURIComponent(location.name)}`}
                variant="ghost-white"
                fullWidth
              >
                Find a doctor here
              </Button>
              <Button href="/appointments/request" variant="ghost-white" fullWidth>
                Request an appointment
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
