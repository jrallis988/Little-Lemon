import type {
  AcademicContentTier,
  AcademicSearchHit,
  AcademicSearchOptions,
  AcademicSearchResponse,
  GradeBandId,
  SearchResult,
  TrustedSourceBadge,
} from "@/types";
import { invokeCommand, isTauriRuntime } from "@/services/tauriBridge";
import { fetchOpenAlexHits } from "@/services/openAlex";
import { MAX_SEARCH_RESULTS } from "@/lib/constants";

type IndexedSource = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publisher: string;
  contentTier: AcademicContentTier;
  gradeMin: number;
  gradeMax: number;
  abstractText: string;
  vocabulary: string[];
  citation: string;
  topics: string[];
  keywords: string[];
  baseLegitimacy: number;
};

type TrustedDomain = { host: string; score: number; label: string };

const TRUSTED_DOMAINS: TrustedDomain[] = [
  { host: "usgs.gov", score: 98, label: "USGS" },
  { host: "pubs.usgs.gov", score: 98, label: "USGS Publications" },
  { host: "earthquake.usgs.gov", score: 98, label: "USGS Earthquake Hazards" },
  { host: "nationalgeographic.com", score: 92, label: "National Geographic" },
  { host: "kids.nationalgeographic.com", score: 90, label: "Nat Geo Kids" },
  {
    host: "education.nationalgeographic.org",
    score: 94,
    label: "Nat Geo Education",
  },
  { host: "nasa.gov", score: 97, label: "NASA" },
  { host: "science.nasa.gov", score: 97, label: "NASA Science" },
  { host: "spaceplace.nasa.gov", score: 93, label: "NASA Space Place" },
  { host: "britannica.com", score: 91, label: "Encyclopædia Britannica" },
  { host: "kids.britannica.com", score: 88, label: "Britannica Kids" },
  { host: "si.edu", score: 95, label: "Smithsonian" },
  { host: "amnh.org", score: 94, label: "American Museum of Natural History" },
  { host: "loc.gov", score: 96, label: "Library of Congress" },
  { host: "nature.com", score: 99, label: "Nature" },
  { host: "science.org", score: 99, label: "Science / AAAS" },
  { host: "nih.gov", score: 98, label: "NIH" },
  { host: "noaa.gov", score: 97, label: "NOAA" },
  { host: "oceanservice.noaa.gov", score: 96, label: "NOAA Ocean Service" },
  { host: "pbskids.org", score: 86, label: "PBS Kids" },
  { host: "pbs.org", score: 90, label: "PBS Learning" },
  { host: "khanacademy.org", score: 89, label: "Khan Academy" },
  { host: "ck12.org", score: 87, label: "CK-12" },
  { host: "openstax.org", score: 93, label: "OpenStax" },
];

const CONTENT_FARM_MARKERS = [
  "buzzfeed",
  "clickbait",
  "listicle",
  "viralnova",
  "content-farm",
];

const TIER_LABELS: Record<AcademicContentTier, string> = {
  peer_reviewed_journal: "Academic Journals",
  authoritative_research: "Research Papers",
  educational_magazine: "Magazines",
  verified_reference: "Reference Sources",
};

const GRADE_BANDS: Record<GradeBandId, [number, number]> = {
  grades_1_2: [1, 2],
  grades_3_5: [3, 5],
  grades_6_8: [6, 8],
  high_school: [9, 12],
};

/** Web-mode mirror of the Rust academic corpus (same structured sources). */
const ACADEMIC_CORPUS: IndexedSource[] = [
  {
    id: "nature-plate-tectonics-review",
    title: "Plate Tectonics and Mantle Dynamics — Research Overview",
    url: "https://www.nature.com/subjects/tectonics",
    domain: "nature.com",
    publisher: "Nature",
    contentTier: "peer_reviewed_journal",
    gradeMin: 9,
    gradeMax: 12,
    abstractText:
      "Peer-reviewed research on plate tectonics and mantle dynamics examines how convection, slab subduction, and plume activity drive long-term plate motion. Suitable for advanced high-school research with teacher guidance.",
    vocabulary: [
      "mantle dynamics",
      "plume",
      "subduction zone",
      "peer review",
    ],
    citation: 'Nature. "Tectonics / Earth science subject collection."',
    topics: ["plate tectonics", "geology", "mantle"],
    keywords: ["plates", "tectonics", "journal", "peer-reviewed"],
    baseLegitimacy: 99,
  },
  {
    id: "usgs-plate-tectonics-intro",
    title: "What is Plate Tectonics?",
    url: "https://www.usgs.gov/faqs/what-plate-tectonics",
    domain: "usgs.gov",
    publisher: "U.S. Geological Survey",
    contentTier: "verified_reference",
    gradeMin: 6,
    gradeMax: 12,
    abstractText:
      "Plate tectonics is the unifying theory that Earth’s outer shell is divided into several plates that glide over the mantle. Plate motion explains earthquakes, volcanoes, mountain building, and the slow reshaping of continents and ocean basins over geologic time.",
    vocabulary: [
      "lithosphere",
      "asthenosphere",
      "mantle",
      "convergent boundary",
      "divergent boundary",
      "transform boundary",
    ],
    citation: 'U.S. Geological Survey. "What is Plate Tectonics?" USGS FAQs.',
    topics: ["plate tectonics", "earth science", "geology"],
    keywords: ["plates", "earthquakes", "volcanoes", "continental drift"],
    baseLegitimacy: 96,
  },
  {
    id: "usgs-how-plates-move",
    title: "How Do Plates Move?",
    url: "https://www.usgs.gov/faqs/how-do-plates-move",
    domain: "usgs.gov",
    publisher: "U.S. Geological Survey",
    contentTier: "authoritative_research",
    gradeMin: 7,
    gradeMax: 12,
    abstractText:
      "Earth’s tectonic plates are driven by heat from the planet’s interior. Convection in the mantle, slab pull at subduction zones, and ridge push at mid-ocean ridges work together so plates creep a few centimeters each year—about as fast as fingernails grow.",
    vocabulary: [
      "convection",
      "subduction",
      "mid-ocean ridge",
      "slab pull",
      "ridge push",
    ],
    citation: 'U.S. Geological Survey. "How Do Plates Move?" USGS FAQs.',
    topics: ["plate tectonics", "mantle convection"],
    keywords: ["plates", "move", "convection", "subduction"],
    baseLegitimacy: 96,
  },
  {
    id: "natgeo-edu-plate-tectonics",
    title: "Plate Tectonics — National Geographic Education",
    url: "https://education.nationalgeographic.org/resource/plate-tectonics/",
    domain: "education.nationalgeographic.org",
    publisher: "National Geographic Society",
    contentTier: "educational_magazine",
    gradeMin: 5,
    gradeMax: 10,
    abstractText:
      "A classroom-ready overview of plate tectonics: how Earth’s crust is broken into plates, what happens at plate boundaries, and why the theory replaced earlier ideas about fixed continents. Includes maps and vocabulary suited for middle grades upward.",
    vocabulary: ["crust", "plate boundary", "Pangaea", "seafloor spreading"],
    citation:
      'National Geographic Society. "Plate Tectonics." National Geographic Education.',
    topics: ["plate tectonics", "earth science"],
    keywords: ["plates", "boundaries", "pangaea", "geology"],
    baseLegitimacy: 92,
  },
  {
    id: "britannica-plate-tectonics",
    title: "Plate Tectonics — Encyclopædia Britannica",
    url: "https://www.britannica.com/science/plate-tectonics",
    domain: "britannica.com",
    publisher: "Encyclopædia Britannica",
    contentTier: "verified_reference",
    gradeMin: 8,
    gradeMax: 12,
    abstractText:
      "Britannica’s reference article on plate tectonics covers the historical development of the theory, types of plate margins, and evidence from paleomagnetism, fossil distributions, and ocean-floor mapping that confirmed continental drift and seafloor spreading.",
    vocabulary: [
      "paleomagnetism",
      "continental drift",
      "Wilson cycle",
      "orogeny",
    ],
    citation: 'Encyclopædia Britannica. "Plate tectonics."',
    topics: ["plate tectonics", "geology"],
    keywords: [
      "plates",
      "continental drift",
      "seafloor spreading",
      "evidence",
    ],
    baseLegitimacy: 94,
  },
  {
    id: "amnh-plate-tectonics",
    title: "Plate Tectonics — American Museum of Natural History",
    url: "https://www.amnh.org/exhibitions/permanent/planet-earth/plate-tectonics",
    domain: "amnh.org",
    publisher: "American Museum of Natural History",
    contentTier: "educational_magazine",
    gradeMin: 4,
    gradeMax: 9,
    abstractText:
      "Museum educators explain how Earth’s plates collide, pull apart, and slide past each other—and how those motions build mountains, open oceans, and trigger earthquakes students can feel in science class.",
    vocabulary: ["collision", "rift", "fault", "earthquake"],
    citation: 'American Museum of Natural History. "Plate Tectonics."',
    topics: ["plate tectonics", "earthquakes"],
    keywords: ["plates", "mountains", "earthquakes", "museum"],
    baseLegitimacy: 93,
  },
  {
    id: "nasa-earth-dynamic",
    title: "Earth’s Dynamic Surface — NASA Science",
    url: "https://science.nasa.gov/earth/earth-observatory/",
    domain: "science.nasa.gov",
    publisher: "NASA",
    contentTier: "authoritative_research",
    gradeMin: 6,
    gradeMax: 12,
    abstractText:
      "NASA Earth science resources show how satellite observations track plate motion, volcanic ash, and crustal deformation—connecting classroom plate tectonics to real measurements of a living planet.",
    vocabulary: [
      "remote sensing",
      "deformation",
      "volcanic ash",
      "crustal motion",
    ],
    citation: 'NASA. "Earth Observatory / Earth Science."',
    topics: ["plate tectonics", "earth observation", "earth science"],
    keywords: ["earth", "plates", "satellite", "volcano"],
    baseLegitimacy: 95,
  },
  {
    id: "noaa-ocean-floor",
    title: "Exploring the Ocean Floor — NOAA",
    url: "https://oceanservice.noaa.gov/facts/plate-boundaries.html",
    domain: "oceanservice.noaa.gov",
    publisher: "NOAA Ocean Service",
    contentTier: "verified_reference",
    gradeMin: 5,
    gradeMax: 11,
    abstractText:
      "NOAA explains how mapping the ocean floor revealed mid-ocean ridges and trenches—key evidence that plates diverge and converge beneath the sea, powering much of Earth’s tectonic activity.",
    vocabulary: ["trench", "mid-ocean ridge", "bathymetry", "divergent"],
    citation: 'NOAA Ocean Service. "Plate Boundaries."',
    topics: ["plate tectonics", "oceanography"],
    keywords: ["ocean", "ridges", "trenches", "plates"],
    baseLegitimacy: 95,
  },
  {
    id: "ck12-plate-tectonics",
    title: "Plate Tectonics — CK-12 Earth Science",
    url: "https://www.ck12.org/earth-science/plate-tectonics/",
    domain: "ck12.org",
    publisher: "CK-12 Foundation",
    contentTier: "educational_magazine",
    gradeMin: 6,
    gradeMax: 10,
    abstractText:
      "A structured lesson on plate tectonics with diagrams of boundary types, practice questions, and vocabulary checks designed for middle and early high school earth science.",
    vocabulary: ["convergent", "divergent", "transform", "theory"],
    citation: 'CK-12 Foundation. "Plate Tectonics."',
    topics: ["plate tectonics", "earth science"],
    keywords: ["plates", "lesson", "boundaries", "classroom"],
    baseLegitimacy: 86,
  },
  {
    id: "noaa-coral-reefs",
    title: "Coral Reefs — NOAA Ocean Service",
    url: "https://oceanservice.noaa.gov/facts/coralreef.html",
    domain: "oceanservice.noaa.gov",
    publisher: "NOAA Ocean Service",
    contentTier: "verified_reference",
    gradeMin: 3,
    gradeMax: 10,
    abstractText:
      "Coral reefs are underwater ecosystems built by colonies of tiny animals. NOAA describes how reefs form, why they matter for biodiversity and coastal protection, and what threatens them today.",
    vocabulary: ["polyp", "symbiosis", "biodiversity", "bleaching"],
    citation: 'NOAA Ocean Service. "What is a Coral Reef?"',
    topics: ["coral reefs", "ocean", "ecology"],
    keywords: ["coral", "reef", "ocean", "habitat"],
    baseLegitimacy: 95,
  },
  {
    id: "natgeo-kids-coral",
    title: "Coral Reefs — Nat Geo Kids",
    url: "https://kids.nationalgeographic.com/nature/article/coral-reef",
    domain: "kids.nationalgeographic.com",
    publisher: "National Geographic Kids",
    contentTier: "educational_magazine",
    gradeMin: 2,
    gradeMax: 6,
    abstractText:
      "A kid-friendly tour of coral reef habitats: colorful fish, how polyps build reefs, and why scientists work hard to protect these underwater cities.",
    vocabulary: ["coral", "reef", "habitat", "protect"],
    citation: 'National Geographic Kids. "Coral Reef."',
    topics: ["coral reefs", "animals", "ocean"],
    keywords: ["coral", "reef", "fish", "kids"],
    baseLegitimacy: 90,
  },
  {
    id: "nasa-spaceplace-solar",
    title: "Our Solar System — NASA Space Place",
    url: "https://spaceplace.nasa.gov/menu/solar-system/",
    domain: "spaceplace.nasa.gov",
    publisher: "NASA Space Place",
    contentTier: "educational_magazine",
    gradeMin: 1,
    gradeMax: 8,
    abstractText:
      "NASA Space Place introduces the Sun, planets, moons, and small bodies with age-appropriate explanations so elementary and middle-grade students can explore astronomy without watered-down dead ends.",
    vocabulary: ["planet", "orbit", "moon", "asteroid", "gravity"],
    citation: 'NASA Space Place. "Solar System."',
    topics: ["solar system", "planets", "space"],
    keywords: ["planets", "sun", "space", "orbit"],
    baseLegitimacy: 94,
  },
  {
    id: "nasa-science-solar",
    title: "Solar System Exploration — NASA Science",
    url: "https://science.nasa.gov/solar-system/",
    domain: "science.nasa.gov",
    publisher: "NASA",
    contentTier: "authoritative_research",
    gradeMin: 6,
    gradeMax: 12,
    abstractText:
      "NASA’s solar system science portal summarizes missions, planetary geology, and current research questions for students ready for deeper space science reading.",
    vocabulary: ["heliosphere", "terrestrial planet", "gas giant", "mission"],
    citation: 'NASA Science. "Solar System Exploration."',
    topics: ["solar system", "planets", "space"],
    keywords: ["planets", "nasa", "exploration", "space"],
    baseLegitimacy: 97,
  },
  {
    id: "farm-tectonics-spam",
    title: "10 Crazy Plate Tectonics Facts That Will Shock You",
    url: "https://viralnova-clickbait.example/plate-tectonics",
    domain: "viralnova-clickbait.example",
    publisher: "Content Farm Demo",
    contentTier: "educational_magazine",
    gradeMin: 1,
    gradeMax: 12,
    abstractText:
      "Sensationalized non-academic filler designed to be rejected by Surf’s legitimacy filter.",
    vocabulary: ["shock"],
    citation: "Content Farm Demo.",
    topics: ["plate tectonics"],
    keywords: ["plate", "tectonics", "crazy"],
    baseLegitimacy: 10,
  },
];

type RustHit = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publisher: string;
  content_tier?: string;
  contentTier?: string;
  content_tier_label?: string;
  contentTierLabel?: string;
  grade_min?: number;
  gradeMin?: number;
  grade_max?: number;
  gradeMax?: number;
  recommended_grades?: string;
  recommendedGrades?: string;
  abstract_text?: string;
  abstractText?: string;
  vocabulary: string[];
  citation: string;
  legitimacy_score?: number;
  legitimacyScore?: number;
  match_score?: number;
  matchScore?: number;
  reading_minutes?: number;
  readingMinutes?: number;
};

type RustResponse = {
  query: string;
  abstract_summary?: string;
  abstractSummary?: string;
  key_vocabulary?: string[];
  keyVocabulary?: string[];
  recommended_grade_levels?: string[];
  recommendedGradeLevels?: string[];
  available_tiers?: string[];
  availableTiers?: string[];
  filtered_out_farms?: number;
  filteredOutFarms?: number;
  results: RustHit[];
};

function normalizeHost(host: string): string {
  return host.trim().replace(/^www\./i, "").toLowerCase();
}

function isContentFarm(host: string): boolean {
  const normalized = normalizeHost(host);
  return CONTENT_FARM_MARKERS.some((marker) => normalized.includes(marker));
}

function scoreDomain(host: string): number {
  const normalized = normalizeHost(host);
  if (!normalized || isContentFarm(normalized)) return 0;
  let best: TrustedDomain | null = null;
  for (const entry of TRUSTED_DOMAINS) {
    if (
      normalized === entry.host ||
      normalized.endsWith(`.${entry.host}`)
    ) {
      if (!best || entry.host.length >= best.host.length) best = entry;
    }
  }
  return best?.score ?? 0;
}

function combineLegitimacy(base: number, domainScore: number): number {
  if (domainScore === 0) return 0;
  return Math.min(100, Math.round((domainScore * 7 + base * 3) / 10));
}

function scoreQueryMatch(query: string, source: IndexedSource): number {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter((token) => token.length > 2);
  if (!tokens.length) return 0;

  const haystacks = [
    source.title.toLowerCase(),
    source.abstractText.toLowerCase(),
    source.topics.join(" ").toLowerCase(),
    source.keywords.join(" ").toLowerCase(),
    source.vocabulary.join(" ").toLowerCase(),
  ];

  let hits = 0;
  for (const token of tokens) {
    let tokenHit = 0;
    haystacks.forEach((hay, index) => {
      if (!hay.includes(token)) return;
      const boost = index === 0 ? 1.4 : index === 2 || index === 3 ? 1.2 : 1;
      tokenHit = Math.max(tokenHit, boost);
    });
    hits += tokenHit;
  }
  return Math.min(1.6, hits / tokens.length);
}

function bandSpan(band: string): [number, number] | null {
  if (band in GRADE_BANDS) return GRADE_BANDS[band as GradeBandId];
  return null;
}

function formatGradeRange(min: number, max: number): string {
  if (min === max) return `Grade ${min}`;
  if (min >= 9) return "High School";
  return `Grades ${min}–${max}`;
}

function estimateMinutes(text: string): number {
  const words = Math.max(40, text.split(/\s+/).length);
  return Math.min(12, Math.max(2, Math.ceil(words / 140)));
}

function localAcademicSearch(
  query: string,
  options: AcademicSearchOptions = {},
): AcademicSearchResponse {
  const trimmed = query.trim();
  const limit = Math.min(12, Math.max(1, options.limit ?? MAX_SEARCH_RESULTS));
  const allowedTiers = options.tiers ?? [];
  const band = options.gradeBand ? bandSpan(options.gradeBand) : null;

  let filteredOutFarms = 0;
  const candidates: Array<{
    source: IndexedSource;
    legitimacyScore: number;
    matchScore: number;
  }> = [];

  for (const source of ACADEMIC_CORPUS) {
    if (isContentFarm(source.domain)) {
      filteredOutFarms += 1;
      continue;
    }
    if (
      allowedTiers.length &&
      !allowedTiers.includes(source.contentTier)
    ) {
      continue;
    }
    if (
      typeof options.grade === "number" &&
      (options.grade < source.gradeMin || options.grade > source.gradeMax)
    ) {
      continue;
    }
    if (band) {
      const [lo, hi] = band;
      if (source.gradeMax < lo || source.gradeMin > hi) continue;
    }

    const legitimacyScore = combineLegitimacy(
      source.baseLegitimacy,
      scoreDomain(source.domain),
    );
    if (legitimacyScore < 55) {
      filteredOutFarms += 1;
      continue;
    }

    const matchScore = scoreQueryMatch(trimmed, source);
    if (matchScore < 0.35) continue;

    candidates.push({ source, legitimacyScore, matchScore });
  }

  candidates.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return b.legitimacyScore - a.legitimacyScore;
  });

  const results: AcademicSearchHit[] = candidates.slice(0, limit).map((c) => ({
    id: c.source.id,
    title: c.source.title,
    url: c.source.url,
    domain: c.source.domain,
    publisher: c.source.publisher,
    contentTier: c.source.contentTier,
    contentTierLabel: TIER_LABELS[c.source.contentTier],
    gradeMin: c.source.gradeMin,
    gradeMax: c.source.gradeMax,
    recommendedGrades: formatGradeRange(c.source.gradeMin, c.source.gradeMax),
    abstractText: c.source.abstractText,
    vocabulary: c.source.vocabulary,
    citation: c.source.citation,
    legitimacyScore: c.legitimacyScore,
    matchScore: Math.round(c.matchScore * 100) / 100,
    readingMinutes: estimateMinutes(c.source.abstractText),
  }));

  const keyVocabulary: string[] = [];
  const seen = new Set<string>();
  for (const hit of results) {
    for (const term of hit.vocabulary) {
      const key = term.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      keyVocabulary.push(term);
      if (keyVocabulary.length >= 10) break;
    }
    if (keyVocabulary.length >= 10) break;
  }

  const recommendedGradeLevels = Array.from(
    new Set(results.map((hit) => formatGradeRange(hit.gradeMin, hit.gradeMax))),
  );
  const availableTiers = Array.from(
    new Set(results.map((hit) => hit.contentTier)),
  );

  const abstractSummary = results.length
    ? `Research briefing for “${trimmed}”: ${truncate(results[0]!.abstractText, 280)} Surf ranked ${results.length} verified source(s) by academic tier and legitimacy—not by ads or SEO spam.`
    : `No verified academic sources matched “${trimmed}” after tier, grade, and legitimacy filtering.`;

  return {
    query: trimmed,
    abstractSummary,
    keyVocabulary,
    recommendedGradeLevels,
    availableTiers,
    filteredOutFarms,
    results,
  };
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function normalizeRustHit(hit: RustHit): AcademicSearchHit {
  const contentTier = (hit.contentTier ??
    hit.content_tier ??
    "verified_reference") as AcademicContentTier;
  const gradeMin = hit.gradeMin ?? hit.grade_min ?? 1;
  const gradeMax = hit.gradeMax ?? hit.grade_max ?? 12;
  return {
    id: hit.id,
    title: hit.title,
    url: hit.url,
    domain: hit.domain,
    publisher: hit.publisher,
    contentTier,
    contentTierLabel:
      hit.contentTierLabel ??
      hit.content_tier_label ??
      TIER_LABELS[contentTier] ??
      contentTier,
    gradeMin,
    gradeMax,
    recommendedGrades:
      hit.recommendedGrades ??
      hit.recommended_grades ??
      formatGradeRange(gradeMin, gradeMax),
    abstractText: hit.abstractText ?? hit.abstract_text ?? "",
    vocabulary: hit.vocabulary ?? [],
    citation: hit.citation,
    legitimacyScore: hit.legitimacyScore ?? hit.legitimacy_score ?? 0,
    matchScore: hit.matchScore ?? hit.match_score ?? 0,
    readingMinutes: hit.readingMinutes ?? hit.reading_minutes ?? 3,
  };
}

function normalizeRustResponse(raw: RustResponse): AcademicSearchResponse {
  return {
    query: raw.query,
    abstractSummary: raw.abstractSummary ?? raw.abstract_summary ?? "",
    keyVocabulary: raw.keyVocabulary ?? raw.key_vocabulary ?? [],
    recommendedGradeLevels:
      raw.recommendedGradeLevels ?? raw.recommended_grade_levels ?? [],
    availableTiers: raw.availableTiers ?? raw.available_tiers ?? [],
    filteredOutFarms: raw.filteredOutFarms ?? raw.filtered_out_farms ?? 0,
    results: (raw.results ?? []).map(normalizeRustHit),
  };
}

function badgeForDomain(domain: string, publisher: string): TrustedSourceBadge {
  const host = normalizeHost(domain);
  if (host.includes("usgs.gov")) return "USGS";
  if (host.includes("noaa.gov")) return "NOAA";
  if (host.includes("nationalgeographic")) return "Nat Geo Kids";
  if (host.includes("britannica")) return "Britannica";
  if (host.includes("amnh.org")) return "AMNH";
  if (host.includes("ck12.org")) return "CK-12";
  if (host.includes("nasa.gov") || host.includes("spaceplace")) return "NASA Kids";
  if (host.includes("si.edu")) return "Smithsonian";
  if (host.includes("loc.gov")) return "Library of Congress";
  if (host.includes("pbs")) return "PBS Kids";
  if (host.includes("openalex.org") || publisher.toLowerCase().includes("openalex")) {
    return "OpenAlex";
  }
  if (publisher.toLowerCase().includes("usgs")) return "USGS";
  if (host.includes("doi.org") || host.includes("nature.com") || host.includes("science.org")) {
    return "OpenAlex";
  }
  return "Curated";
}

function mergeHits(
  curated: AcademicSearchHit[],
  live: AcademicSearchHit[],
  options: AcademicSearchOptions,
): AcademicSearchHit[] {
  const seen = new Set<string>();
  const merged: AcademicSearchHit[] = [];
  for (const hit of [...curated, ...live]) {
    const key = hit.url.toLowerCase();
    if (seen.has(key)) continue;
    if (
      typeof options.grade === "number" &&
      (options.grade < hit.gradeMin || options.grade > hit.gradeMax)
    ) {
      // Keep high-school OpenAlex for grade 9+; curated still grade-filtered upstream.
      if (!(hit.id.startsWith("openalex-") && options.grade >= 9)) continue;
    }
    if (options.tiers?.length && !options.tiers.includes(hit.contentTier)) {
      continue;
    }
    seen.add(key);
    merged.push(hit);
  }
  merged.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return b.legitimacyScore - a.legitimacyScore;
  });
  return merged.slice(0, options.limit ?? MAX_SEARCH_RESULTS);
}

function rebuildSummary(
  query: string,
  results: AcademicSearchHit[],
  sourcesUsed: string[],
): AcademicSearchResponse {
  const keyVocabulary: string[] = [];
  const seen = new Set<string>();
  for (const hit of results) {
    for (const term of hit.vocabulary) {
      const key = term.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      keyVocabulary.push(term);
      if (keyVocabulary.length >= 10) break;
    }
    if (keyVocabulary.length >= 10) break;
  }
  const abstractSummary = results.length
    ? `Research briefing for “${query}”: ${results[0]!.abstractText.slice(0, 280)}${results[0]!.abstractText.length > 280 ? "…" : ""} Surf ranked ${results.length} verified source(s) from ${sourcesUsed.join(" + ")} — not ads or SEO spam.`
    : `No verified academic sources matched “${query}” after tier, grade, and legitimacy filtering.`;

  return {
    query,
    abstractSummary,
    keyVocabulary,
    recommendedGradeLevels: Array.from(
      new Set(results.map((hit) => hit.recommendedGrades)),
    ),
    availableTiers: Array.from(new Set(results.map((hit) => hit.contentTier))),
    filteredOutFarms: 0,
    results,
    sourcesUsed: sourcesUsed as AcademicSearchResponse["sourcesUsed"],
  };
}

export function academicHitsToSearchResults(
  hits: AcademicSearchHit[],
): SearchResult[] {
  return hits.map((hit) => ({
    id: hit.id,
    title: hit.title,
    url: hit.url,
    domain: hit.domain,
    sourceBadge: badgeForDomain(hit.domain, hit.publisher),
    description: hit.abstractText,
    readingMinutes: hit.readingMinutes,
    contentTier: hit.contentTier,
    contentTierLabel: hit.contentTierLabel,
    gradeMin: hit.gradeMin,
    gradeMax: hit.gradeMax,
    recommendedGrades: hit.recommendedGrades,
    vocabulary: hit.vocabulary,
    citation: hit.citation,
    legitimacyScore: hit.legitimacyScore,
    publisher: hit.publisher,
  }));
}

/**
 * Academic research search API.
 * Merges curated educational corpus + live OpenAlex peer-reviewed works,
 * then applies Surf legitimacy / grade / tier filters.
 */
export async function runAcademicSearch(
  query: string,
  options: AcademicSearchOptions = {},
): Promise<AcademicSearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: "",
      abstractSummary: "Please enter a research query.",
      keyVocabulary: [],
      recommendedGradeLevels: [],
      availableTiers: [],
      filteredOutFarms: 0,
      results: [],
      sourcesUsed: [],
    };
  }

  const limit = options.limit ?? MAX_SEARCH_RESULTS;
  let curated: AcademicSearchHit[] = [];
  let curatedFarms = 0;

  if (await isTauriRuntime()) {
    const raw = await invokeCommand<RustResponse>("academic_search", {
      query: trimmed,
      grade: options.grade ?? null,
      gradeBand: options.gradeBand ?? null,
      tiers: null,
      limit: 12,
    });
    if (raw) {
      const normalized = normalizeRustResponse(raw);
      curated = normalized.results;
      curatedFarms = normalized.filteredOutFarms;
    }
  }
  if (!curated.length) {
    const local = localAcademicSearch(trimmed, {
      ...options,
      tiers: undefined,
      limit: 12,
    });
    curated = local.results;
    curatedFarms = local.filteredOutFarms;
  }

  const live = await fetchOpenAlexHits(trimmed, Math.max(6, limit));
  const merged = mergeHits(curated, live, { ...options, limit });
  const sourcesUsed: Array<"curated" | "openalex"> = [];
  if (curated.length) sourcesUsed.push("curated");
  if (live.length) sourcesUsed.push("openalex");

  const response = rebuildSummary(trimmed, merged, sourcesUsed);
  response.filteredOutFarms = curatedFarms;
  return response;
}
