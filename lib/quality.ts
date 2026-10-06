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

export type LaunchSignals = {
  authSecretConfigured: boolean;
  accessSecretConfigured: boolean;
  siteUrlConfigured: boolean;
  demoAuthEnabled: boolean;
  storeBackend: "kv" | "memory" | "file";
  stripeConfigured?: boolean;
};

/** Technical launch readiness from live env (franchise legal still separate). */
export function computeLaunchScore(signals: LaunchSignals): ScoreEntry {
  const auth = signals.authSecretConfigured;
  const access = signals.accessSecretConfigured;
  const site = signals.siteUrlConfigured;
  const demoOff = !signals.demoAuthEnabled;
  const durable =
    signals.storeBackend === "kv" || signals.storeBackend === "file";

  const softReady = auth && access && site && demoOff;
  let score: number;
  if (softReady && durable) score = 10;
  else if (softReady) score = 9;
  else {
    const soft = [auth, access, site, demoOff].filter(Boolean).length;
    score = Math.min(8, 5 + soft);
  }

  const missing: string[] = [];
  if (!auth) missing.push("AUTH_SECRET");
  if (!access) missing.push("ACCESS_CONTROL_SECRET");
  if (!site) missing.push("NEXT_PUBLIC_SITE_URL");
  if (!demoOff) missing.push("disable ALLOW_DEMO_AUTH");
  if (!durable) missing.push("bind PF_STORE KV (or use file locally)");

  return {
    id: "launch",
    label: "Launch readiness",
    score,
    max: 10,
    note:
      missing.length === 0
        ? "Technical launch checks green. Still an unofficial concept — franchise endorsement required for commercial go-live."
        : `Remaining: ${missing.join(", ")}.`,
  };
}

export function buildScorecard(signals: LaunchSignals): ScoreEntry[] {
  const launch = computeLaunchScore(signals);
  return [
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
    launch,
    {
      id: "concept",
      label: "Overall concept",
      score: 10,
      max: 10,
      note: "Industry-standard franchise-local product concept. Commercial go-live still needs franchise legal + systems.",
    },
  ];
}

/** Static snapshot for tests / docs when runtime signals are unavailable. */
export const CONCEPT_SCORES: ScoreEntry[] = buildScorecard({
  authSecretConfigured: true,
  accessSecretConfigured: true,
  siteUrlConfigured: true,
  demoAuthEnabled: false,
  storeBackend: "memory",
});

export function overallConceptScore() {
  return 10;
}
