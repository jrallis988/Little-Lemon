import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoctorProfile } from "@/components/doctors/DoctorProfile";
import { doctors, getDoctor } from "@/lib/data/doctors";
import {
  buildBreadcrumbList,
  buildPhysician,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doctor = getDoctor(params.slug);
  if (!doctor) return { title: "Doctor" };
  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: `${doctor.bio} View specialties, training, locations, and appointment information.`,
    alternates: { canonical: `/find-a-doctor/${doctor.slug}` },
  };
}

export default function DoctorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const doctor = getDoctor(params.slug);
  if (!doctor) notFound();
  const structuredData = [
    buildPhysician({
      name: doctor.name,
      description: doctor.bio,
      path: `/find-a-doctor/${doctor.slug}`,
      medicalSpecialty: doctor.specialty,
      telephone: doctor.phone,
    }),
    buildBreadcrumbList([
      { name: "Home", path: "/" },
      { name: "Find a Doctor", path: "/find-a-doctor" },
      { name: doctor.name, path: `/find-a-doctor/${doctor.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />
      <DoctorProfile doctor={doctor} />
    </>
  );
}
