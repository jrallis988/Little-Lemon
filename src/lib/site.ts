/**
 * Site identity and production configuration.
 * Override via env for staging/production deployments.
 */

export const siteConfig = {
  name:
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Boston Children's Hospital",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Where the world comes for answers",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** informational | staging | production */
  mode: (process.env.NEXT_PUBLIC_SITE_MODE || "staging") as
    | "informational"
    | "staging"
    | "production",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "care-intake@example.com",
  intakeEmail: process.env.INTAKE_TO_EMAIL || "intake@example.com",
  /** When true, show staging banner and non-clinical disclaimers */
  showStagingBanner:
    (process.env.NEXT_PUBLIC_SITE_MODE || "staging") !== "production",
};

export function isProductionMode() {
  return siteConfig.mode === "production";
}
