export {
  APP_NAME_DISPLAY as APP_NAME,
  APP_TAGLINE,
  APP_BIOGRAPHY,
  APP_BIOGRAPHY_SHORT,
  APP_POSITIONING,
  BRAND_PALETTE,
} from "@/brand/identity";

import type { GradeBandId } from "@/types";

export const STORAGE_KEYS = {
  profiles: "surf.profiles.v1",
  activeProfileId: "surf.activeProfileId.v1",
  parentControls: "surf.parentControls.v1",
  session: "surf.session.v1",
  history: "surf.history.v1",
  usage: "surf.usage.v1",
  projects: "surf.projects.v1",
} as const;

export const DEFAULT_WHITELIST = [
  "kids.nationalgeographic.com",
  "nationalgeographic.com",
  "education.nationalgeographic.org",
  "www.si.edu",
  "si.edu",
  "pbskids.org",
  "www.pbskids.org",
  "pbs.org",
  "spaceplace.nasa.gov",
  "science.nasa.gov",
  "nasa.gov",
  "www.loc.gov",
  "kids.britannica.com",
  "britannica.com",
  "www.amnh.org",
  "amnh.org",
  "usgs.gov",
  "pubs.usgs.gov",
  "earthquake.usgs.gov",
  "noaa.gov",
  "oceanservice.noaa.gov",
  "ck12.org",
  "www.ck12.org",
  "khanacademy.org",
  "openstax.org",
  "nature.com",
  "www.nature.com",
  "science.org",
  "www.bbc.co.uk",
  "nps.gov",
  "climatekids.nasa.gov",
  "pbslearningmedia.org",
  "ocean.si.edu",
  "www.dkfindout.com",
] as const;

/** EBSCO-style source-type facets shown in Refine Results */
export const ACADEMIC_TIERS = [
  {
    id: "peer_reviewed_journal",
    label: "Academic Journals",
    shortLabel: "Articles",
    description: "Peer-reviewed journal articles",
  },
  {
    id: "authoritative_research",
    label: "Research Papers",
    shortLabel: "Research",
    description: "Authoritative research reports & papers",
  },
  {
    id: "educational_magazine",
    label: "Magazines",
    shortLabel: "Magazines",
    description: "Educational magazine publications",
  },
  {
    id: "verified_reference",
    label: "Reference Sources",
    shortLabel: "Reference",
    description: "Verified reference & primary sources",
  },
] as const;

export const GRADE_BANDS = [
  { id: "grades_1_2", label: "Grades 1–2" },
  { id: "grades_3_5", label: "Grades 3–5" },
  { id: "grades_6_8", label: "Grades 6–8" },
  { id: "high_school", label: "High School" },
] as const;

/** Map exact grade 1–12 → academic band id */
export function gradeToBand(grade: number): GradeBandId {
  if (grade <= 2) return "grades_1_2";
  if (grade <= 5) return "grades_3_5";
  if (grade <= 8) return "grades_6_8";
  return "high_school";
}

export function bandLabelForGrade(grade: number): string {
  const id = gradeToBand(grade);
  return GRADE_BANDS.find((band) => band.id === id)?.label ?? `Grade ${grade}`;
}

/** Default daily quota in minutes */
export const DEFAULT_DAILY_LIMIT_MINUTES = 60;

/** How long the Learning Mode frosted overlay stays full-screen before settling */
export const LEARNING_MODE_OVERLAY_MS = 2800;

/** Session timer tick interval */
export const SESSION_TICK_MS = 1000;

/** Max curated search results shown */
export const MAX_SEARCH_RESULTS = 8;
