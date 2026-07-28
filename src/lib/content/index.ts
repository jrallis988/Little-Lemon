import { conditions, getConditionDoc } from "@/content/data/conditions";
import { programs, getProgramDoc } from "@/content/data/programs";
import { providers, getProviderDoc } from "@/content/data/providers";
import { locations, getLocation } from "@/content/data/locations";
import {
  clinicalTrials,
  departments,
  getDepartment,
  getTrial,
} from "@/content/data/departments";
import type { ConditionDoc, ProgramDoc, ProviderDoc } from "@/content/types";
import { getLocation as getLoc } from "@/content/data/locations";

/** Compatibility shape used by existing UI components. */
export type LegacyDoctor = {
  id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  specialty: string;
  tags: string[];
  location: string;
  locationSlugs: string[];
  locationNames: string[];
  languages: string[];
  acceptingNewPatients: boolean;
  featured?: boolean;
  phone: string;
  bio: string;
  education: string[];
  certifications: string[];
  clinicalInterests: string[];
  programSlug?: string;
  conditionSlugs?: string[];
};

export type LegacyCondition = {
  slug: string;
  name: string;
  specialty: string;
  specialtySlug: string;
  lead: string;
  lastUpdated: string;
  keyFacts: { label: string; value: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  edCallout: { title: string; body: string };
  appointment: { blurb: string; phone: string };
  careTeam: { name: string; title: string; doctorSlug: string };
  resources: { label: string; href: string }[];
  trials: { label: string; href: string }[];
  relatedProgramSlug: string;
};

function toLegacyDoctor(p: ProviderDoc): LegacyDoctor {
  const primaryLoc = getLoc(p.locationSlugs[0]);
  const providerLocations = p.locationSlugs.map(
    (slug) => getLoc(slug)?.name ?? slug,
  );
  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    title: p.title,
    specialty: p.specialty,
    tags: p.tags,
    location: primaryLoc?.name ?? p.locationSlugs[0],
    locationSlugs: p.locationSlugs,
    locationNames: providerLocations,
    languages: p.languages,
    acceptingNewPatients: p.acceptingNewPatients,
    featured: p.featured,
    phone: p.phone,
    bio: p.bio,
    education: p.education,
    certifications: p.certifications,
    clinicalInterests: p.clinicalInterests,
    programSlug: p.programSlugs[0],
    conditionSlugs: p.conditionSlugs,
  };
}

function toLegacyCondition(c: ConditionDoc): LegacyCondition {
  const care = getProviderDoc(c.careTeamDoctorSlug);
  return {
    slug: c.slug,
    name: c.name,
    specialty: c.specialty,
    specialtySlug: c.departmentSlug,
    lead: c.lead,
    lastUpdated: c.lastUpdated,
    keyFacts: c.keyFacts,
    sections: c.sections,
    edCallout: c.edCallout,
    appointment: c.appointment,
    careTeam: {
      name: care ? `Dr. ${care.name}` : "Care team",
      title: care?.title ?? c.specialty,
      doctorSlug: c.careTeamDoctorSlug,
    },
    resources: c.resources,
    trials: c.relatedTrialSlugs.map((slug) => {
      const trial = getTrial(slug);
      return {
        label: trial?.title ?? slug,
        href: `/research?trial=${slug}`,
      };
    }),
    relatedProgramSlug: c.relatedProgramSlugs[0],
  };
}

export const contentApi = {
  conditions,
  programs,
  providers,
  locations,
  departments,
  clinicalTrials,
  getCondition: getConditionDoc,
  getProgram: getProgramDoc,
  getProvider: getProviderDoc,
  getLocation,
  getDepartment,
  getTrial,
  doctorsLegacy: () => providers.map(toLegacyDoctor),
  getDoctorLegacy: (slug: string) => {
    const p = getProviderDoc(slug);
    return p ? toLegacyDoctor(p) : undefined;
  },
  conditionsLegacy: () => conditions.map(toLegacyCondition),
  getConditionLegacy: (slug: string) => {
    const c = getConditionDoc(slug);
    return c ? toLegacyCondition(c) : undefined;
  },
  resolveProgramRelations: (program: ProgramDoc) => ({
    doctors: providers.filter((p) =>
      program.relatedDoctorSlugs.includes(p.slug),
    ),
    conditions: conditions.filter((c) =>
      program.relatedConditionSlugs.includes(c.slug),
    ),
    trials: clinicalTrials.filter((t) =>
      program.relatedTrialSlugs.includes(t.slug),
    ),
    locations: locations.filter((l) => program.locationSlugs.includes(l.slug)),
    department: getDepartment(program.departmentSlug),
  }),
  alphabetizeByName: <T extends { name: string }>(items: T[]) =>
    [...items].sort((a, b) => a.name.localeCompare(b.name)),
  groupByLetter: <T extends { name: string }>(items: T[]) => {
    const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
    const map = new Map<string, T[]>();
    for (const item of sorted) {
      const letter = item.name.charAt(0).toUpperCase();
      const list = map.get(letter) ?? [];
      list.push(item);
      map.set(letter, list);
    }
    return map;
  },
};
