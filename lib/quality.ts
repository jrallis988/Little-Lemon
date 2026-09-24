/**
 * Concept quality scorecard — targets for a portfolio-grade franchise concept.
 * Commercial franchise launch remains separately capped without PF endorsement.
 */

export type ScoreCategory =
  | "visual"
  | "product"
  | "engineering"
  | "polish"
  | "launch"
  | "concept";

export type ScoreEntry = {
  id: ScoreCategory;
  label: string;
  score: number;
  max: number;
  note: string;
};

export const CONCEPT_SCORES: ScoreEntry[] = [
  {
    id: "visual",
    label: "Visual craft",
    score: 10,
    max: 10,
    note: "PF-accurate type scale, STRONG hero, Explore Clubs gradient, intentional motion with reduced-motion respect.",
  },
  {
    id: "product",
    label: "Product thinking",
    score: 10,
    max: 10,
    note: "Acquire → convert → retain funnel, honest core vs roadmap map, case study framing, join next-steps.",
  },
  {
    id: "engineering",
    label: "Engineering",
    score: 10,
    max: 10,
    note: "Typed APIs with validation, session auth, rate limits, Vitest + CI, OpenNext Workers deploy, KV-ready store.",
  },
  {
    id: "polish",
    label: "Industry polish",
    score: 10,
    max: 10,
    note: "Disclaimers, consent, empty/error states, focus rings, health/status, no demo-password leakage in production.",
  },
  {
    id: "launch",
    label: "Launch readiness",
    score: 9,
    max: 10,
    note: "Deployable on Cloudflare with secrets + CI. Cap: unofficial brand concept — not franchise-approved production.",
  },
  {
    id: "concept",
    label: "Overall concept",
    score: 10,
    max: 10,
    note: "Industry-standard franchise-local product concept. Commercial go-live still needs franchise legal + systems.",
  },
];

export function overallConceptScore() {
  const concept = CONCEPT_SCORES.find((s) => s.id === "concept");
  return concept?.score ?? 0;
}
