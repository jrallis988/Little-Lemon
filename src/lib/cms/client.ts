/**
 * Sanity CMS client scaffolding.
 * Uses local TypeScript content when env vars are unset (default for demos).
 */
import { createClient, type SanityClient } from "@sanity/client";
import { contentApi } from "@/lib/content";
import type {
  ConditionDoc,
  ClinicalTrialDoc,
  LocationDoc,
  ProgramDoc,
  ProviderDoc,
  DepartmentDoc,
} from "@/content/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId);

export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
    token,
  });
}

/** GROQ-shaped document fetchers — fall back to local contentApi. */
export async function fetchProviders(): Promise<ProviderDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.providers;
  try {
    return await client.fetch(`*[_type == "provider"] | order(name asc)`);
  } catch {
    return contentApi.providers;
  }
}

export async function fetchConditions(): Promise<ConditionDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.conditions;
  try {
    return await client.fetch(`*[_type == "condition"] | order(name asc)`);
  } catch {
    return contentApi.conditions;
  }
}

export async function fetchPrograms(): Promise<ProgramDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.programs;
  try {
    return await client.fetch(`*[_type == "program"] | order(name asc)`);
  } catch {
    return contentApi.programs;
  }
}

export async function fetchLocations(): Promise<LocationDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.locations;
  try {
    return await client.fetch(`*[_type == "location"] | order(name asc)`);
  } catch {
    return contentApi.locations;
  }
}

export async function fetchDepartments(): Promise<DepartmentDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.departments;
  try {
    return await client.fetch(`*[_type == "department"] | order(name asc)`);
  } catch {
    return contentApi.departments;
  }
}

export async function fetchTrials(): Promise<ClinicalTrialDoc[]> {
  const client = getSanityClient();
  if (!client) return contentApi.clinicalTrials;
  try {
    return await client.fetch(`*[_type == "clinicalTrial"] | order(title asc)`);
  } catch {
    return contentApi.clinicalTrials;
  }
}
