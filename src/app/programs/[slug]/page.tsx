import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramLanding } from "@/components/programs/ProgramLanding";
import { getProgram, programs } from "@/lib/data/programs";
import {
  buildBreadcrumbList,
  buildHospital,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const program = getProgram(params.slug);
  if (!program) return { title: "Program" };
  return {
    title: `${program.name} — Pediatric ${program.specialty}`,
    description: `${program.description} Learn about our care team, locations, services, and research.`,
    alternates: { canonical: `/programs/${program.slug}` },
  };
}

export default function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getProgram(params.slug);
  if (!program) notFound();
  const structuredData = [
    buildHospital({
      name: program.name,
      description: program.description,
      path: `/programs/${program.slug}`,
      telephone: program.phone,
      medicalSpecialty: program.specialty,
      type: "MedicalClinic",
    }),
    buildBreadcrumbList([
      { name: "Home", path: "/" },
      { name: "Programs & Services", path: "/programs" },
      { name: program.name, path: `/programs/${program.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />
      <ProgramLanding program={program} />
    </>
  );
}
