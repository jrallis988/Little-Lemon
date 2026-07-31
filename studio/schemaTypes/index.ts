import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortName", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "state", type: "string" }),
    defineField({ name: "zip", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "hours", type: "string" }),
    defineField({ name: "clinicHours", type: "string" }),
    defineField({ name: "parking", type: "text" }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({ name: "mapEmbedUrl", type: "url" }),
    defineField({ name: "directionsUrl", type: "url" }),
    defineField({ name: "hasEmergency", type: "boolean" }),
    defineField({ name: "hasUrgentCare", type: "boolean" }),
    defineField({ name: "hasTelehealth", type: "boolean" }),
  ],
});

export const provider = defineType({
  name: "provider",
  title: "Provider",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "specialty", type: "string" }),
    defineField({ name: "departmentSlug", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "locationSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "languages", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "acceptingNewPatients", type: "boolean" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "education", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "certifications", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "clinicalInterests", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "programSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "conditionSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({ name: "imageAlt", type: "string" }),
  ],
});

export const condition = defineType({
  name: "condition",
  title: "Condition",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "specialty", type: "string" }),
    defineField({ name: "departmentSlug", type: "string" }),
    defineField({ name: "lead", type: "text" }),
    defineField({ name: "lastUpdated", type: "date" }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({
      name: "keyFacts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "careTeamDoctorSlug", type: "string" }),
    defineField({ name: "relatedProgramSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "relatedTrialSlugs", type: "array", of: [{ type: "string" }] }),
  ],
});

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortName", type: "string" }),
    defineField({ name: "specialty", type: "string" }),
    defineField({ name: "departmentSlug", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "lead", type: "text" }),
    defineField({ name: "imageUrl", type: "url" }),
    defineField({ name: "photoClass", type: "string" }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "relatedConditionSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "relatedDoctorSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "relatedTrialSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "locationSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "phone", type: "string" }),
  ],
});

export const clinicalTrial = defineType({
  name: "clinicalTrial",
  title: "Clinical Trial",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Recruiting", value: "recruiting" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
      },
    }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "conditionSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "programSlugs", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "phase", type: "string" }),
    defineField({ name: "principalInvestigator", type: "string" }),
    defineField({ name: "enrollmentTarget", type: "number" }),
  ],
});

export const schemaTypes = [location, provider, condition, program, clinicalTrial];
