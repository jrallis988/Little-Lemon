import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramLanding } from "@/components/programs/ProgramLanding";
import { getProgram, programs } from "@/lib/data/programs";

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
    title: program.name,
    description: program.description,
  };
}

export default function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getProgram(params.slug);
  if (!program) notFound();
  return <ProgramLanding program={program} />;
}
