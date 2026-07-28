import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoctorProfile } from "@/components/doctors/DoctorProfile";
import { doctors, getDoctor } from "@/lib/data/doctors";

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
    title: doctor.name,
    description: doctor.bio,
  };
}

export default function DoctorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const doctor = getDoctor(params.slug);
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}
