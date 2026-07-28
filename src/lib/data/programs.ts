import { programs as programDocs, getProgramDoc } from "@/content/data/programs";

export type Program = {
  slug: string;
  name: string;
  shortName: string;
  specialty: string;
  description: string;
  lead: string;
  imageUrl?: string;
  photoClass: "photo-clinic" | "photo-lab" | "photo-family" | "photo-campus";
  highlights: string[];
  relatedConditionSlugs: string[];
  relatedDoctorSlugs: string[];
  phone: string;
};

export const programs: Program[] = programDocs.map((p) => ({
  slug: p.slug,
  name: p.name,
  shortName: p.shortName,
  specialty: p.specialty,
  description: p.description,
  lead: p.lead,
  imageUrl: p.imageUrl,
  photoClass: p.photoClass,
  highlights: p.highlights,
  relatedConditionSlugs: p.relatedConditionSlugs,
  relatedDoctorSlugs: p.relatedDoctorSlugs,
  phone: p.phone,
}));

export function getProgram(slug: string) {
  const p = getProgramDoc(slug);
  if (!p) return undefined;
  return programs.find((x) => x.slug === p.slug);
}
