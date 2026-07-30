/**
 * Content repository — Sanity when configured, otherwise local catalog.
 * Server Components / route handlers should prefer these async helpers.
 */
import {
  fetchConditions,
  fetchDepartments,
  fetchLocations,
  fetchPrograms,
  fetchProviders,
  fetchTrials,
  isSanityConfigured,
} from "@/lib/cms/client";

export const contentRepository = {
  source: () => (isSanityConfigured ? ("sanity" as const) : ("local" as const)),
  providers: fetchProviders,
  conditions: fetchConditions,
  programs: fetchPrograms,
  locations: fetchLocations,
  departments: fetchDepartments,
  trials: fetchTrials,
};
