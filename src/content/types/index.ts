/**
 * CMS-shaped content schemas (Sanity/Strapi-ready).
 * Documents use slug IDs and relational refs instead of nested copies.
 */

export type CmsSlugRef = string;

export type LocationDoc = {
  _type: "location";
  _id: string;
  slug: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours?: string;
  services: string[];
  hasEmergency?: boolean;
  hasUrgentCare?: boolean;
  hasTelehealth?: boolean;
};

export type DepartmentDoc = {
  _type: "department";
  _id: string;
  slug: string;
  name: string;
  summary: string;
  programSlugs: CmsSlugRef[];
};

export type ConditionDoc = {
  _type: "condition";
  _id: string;
  slug: string;
  name: string;
  specialty: string;
  departmentSlug: CmsSlugRef;
  lead: string;
  lastUpdated: string;
  keyFacts: { label: string; value: string }[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  edCallout: { title: string; body: string };
  appointment: { blurb: string; phone: string };
  careTeamDoctorSlug: CmsSlugRef;
  relatedProgramSlugs: CmsSlugRef[];
  relatedTrialSlugs: CmsSlugRef[];
  resources: { label: string; href: string }[];
};

export type ProgramDoc = {
  _type: "program";
  _id: string;
  slug: string;
  name: string;
  shortName: string;
  specialty: string;
  departmentSlug: CmsSlugRef;
  description: string;
  lead: string;
  photoClass: "photo-clinic" | "photo-lab" | "photo-family" | "photo-campus";
  highlights: string[];
  relatedConditionSlugs: CmsSlugRef[];
  relatedDoctorSlugs: CmsSlugRef[];
  relatedTrialSlugs: CmsSlugRef[];
  locationSlugs: CmsSlugRef[];
  phone: string;
};

export type ProviderDoc = {
  _type: "provider";
  _id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  departmentSlug: CmsSlugRef;
  tags: string[];
  locationSlugs: CmsSlugRef[];
  languages: string[];
  acceptingNewPatients: boolean;
  featured?: boolean;
  phone: string;
  bio: string;
  education: string[];
  certifications: string[];
  clinicalInterests: string[];
  programSlugs: CmsSlugRef[];
  conditionSlugs: CmsSlugRef[];
};

export type ClinicalTrialDoc = {
  _type: "clinicalTrial";
  _id: string;
  slug: string;
  title: string;
  status: "recruiting" | "active" | "completed";
  summary: string;
  conditionSlugs: CmsSlugRef[];
  programSlugs: CmsSlugRef[];
  phase?: string;
};

export type InsuranceCarrier = {
  id: string;
  name: string;
};

export type AppointmentDraft = {
  conditionOrDepartment: string;
  insuranceCarrierId: string;
  locationSlug: string;
  telehealth: boolean;
  patientName: string;
  phone: string;
  notes: string;
  referenceId?: string;
};
