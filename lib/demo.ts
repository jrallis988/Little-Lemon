/**
 * This repo is a student / designer portfolio case study — not a live
 * campaign, store, or official filing surface.
 *
 * Forms may still persist locally when the environment is running.
 * Store checkout and chat “live support” remain simulated.
 */
export const PORTFOLIO_MODE = true as const;

/** @deprecated Use PORTFOLIO_MODE. Kept so remaining demo surfaces compile. */
export const DEMO_MODE = PORTFOLIO_MODE;

export const portfolioDisclaimer =
  "Portfolio case study — not an official campaign website.";

export const demoFormSuccess = {
  checkout:
    "Sample order captured for this case study. No payment was processed and nothing will ship.",
  chatLive:
    "Sample message captured for this case study. There is no live campaign staff behind this chat.",
} as const;

export const demoFormNote =
  "Portfolio demo: checkout is simulated. No payment is processed.";
