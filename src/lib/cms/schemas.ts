/**
 * Sanity schema definitions (portable to a sanity studio package).
 * These mirror src/content/types and document the CMS contract.
 */

export const locationSchema = {
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "name", type: "string" },
    { name: "shortName", type: "string" },
    { name: "address", type: "string" },
    { name: "city", type: "string" },
    { name: "state", type: "string" },
    { name: "zip", type: "string" },
    { name: "phone", type: "string" },
    { name: "hours", type: "string" },
    { name: "clinicHours", type: "string" },
    { name: "parking", type: "text" },
    { name: "services", type: "array", of: [{ type: "string" }] },
    { name: "imageUrl", type: "url" },
    { name: "mapEmbedUrl", type: "url" },
    { name: "directionsUrl", type: "url" },
    { name: "hasEmergency", type: "boolean" },
    { name: "hasUrgentCare", type: "boolean" },
    { name: "hasTelehealth", type: "boolean" },
  ],
};

export const providerSchema = {
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "name", type: "string" },
    { name: "title", type: "string" },
    { name: "specialty", type: "string" },
    { name: "departmentSlug", type: "string" },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "locationSlugs", type: "array", of: [{ type: "string" }] },
    { name: "languages", type: "array", of: [{ type: "string" }] },
    { name: "acceptingNewPatients", type: "boolean" },
    { name: "featured", type: "boolean" },
    { name: "phone", type: "string" },
    { name: "bio", type: "text" },
    { name: "education", type: "array", of: [{ type: "string" }] },
    { name: "certifications", type: "array", of: [{ type: "string" }] },
    { name: "clinicalInterests", type: "array", of: [{ type: "string" }] },
    { name: "programSlugs", type: "array", of: [{ type: "string" }] },
    { name: "conditionSlugs", type: "array", of: [{ type: "string" }] },
    { name: "imageUrl", type: "url" },
    { name: "imageAlt", type: "string" },
  ],
};

export const conditionSchema = {
  name: "condition",
  title: "Condition",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "name", type: "string" },
    { name: "specialty", type: "string" },
    { name: "departmentSlug", type: "string" },
    { name: "lead", type: "text" },
    { name: "lastUpdated", type: "date" },
    { name: "imageUrl", type: "url" },
  ],
};

export const programSchema = {
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "name", type: "string" },
    { name: "shortName", type: "string" },
    { name: "specialty", type: "string" },
    { name: "departmentSlug", type: "string" },
    { name: "description", type: "text" },
    { name: "lead", type: "text" },
    { name: "imageUrl", type: "url" },
    { name: "photoClass", type: "string" },
    { name: "highlights", type: "array", of: [{ type: "string" }] },
    { name: "relatedConditionSlugs", type: "array", of: [{ type: "string" }] },
    { name: "relatedDoctorSlugs", type: "array", of: [{ type: "string" }] },
    { name: "relatedTrialSlugs", type: "array", of: [{ type: "string" }] },
    { name: "locationSlugs", type: "array", of: [{ type: "string" }] },
    { name: "phone", type: "string" },
  ],
};

export const sanitySchemas = [
  locationSchema,
  providerSchema,
  conditionSchema,
  programSchema,
];
