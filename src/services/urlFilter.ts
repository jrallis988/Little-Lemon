import { extractDomain } from "@/lib/utils";
import type { UrlCheckResult } from "@/types";

const ALWAYS_BLOCKED = [
  "tiktok.com",
  "www.tiktok.com",
  "instagram.com",
  "www.instagram.com",
  "facebook.com",
  "www.facebook.com",
  "x.com",
  "twitter.com",
  "reddit.com",
  "www.reddit.com",
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
];

export type FilterOptions = {
  whitelist: string[];
  allowlistOnly: boolean;
};

function matchesDomain(hostname: string, allowed: string): boolean {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  const rule = allowed.replace(/^www\./, "").toLowerCase();
  return host === rule || host.endsWith(`.${rule}`);
}

/**
 * URL interceptor / filter middleware.
 * Runs before content navigation and rejects non-approved destinations.
 */
export function checkUrlAgainstWhitelist(
  rawUrl: string,
  options: FilterOptions,
): UrlCheckResult {
  const domain = extractDomain(rawUrl);
  let normalized = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  if (ALWAYS_BLOCKED.some((blocked) => matchesDomain(domain, blocked))) {
    return {
      allowed: false,
      url: normalized,
      domain,
      reason: "This site isn’t part of Surf’s calm learning spaces.",
    };
  }

  if (!options.allowlistOnly) {
    return { allowed: true, url: normalized, domain };
  }

  const allowed = options.whitelist.some((entry) =>
    matchesDomain(domain, entry),
  );

  if (!allowed) {
    return {
      allowed: false,
      url: normalized,
      domain,
      reason:
        "Only parent-approved educational sites can open in Surf right now.",
    };
  }

  return { allowed: true, url: normalized, domain };
}

export function isTrustedEducationalDomain(domain: string): boolean {
  const trusted = [
    "kids.nationalgeographic.com",
    "si.edu",
    "pbskids.org",
    "spaceplace.nasa.gov",
    "loc.gov",
    "kids.britannica.com",
  ];
  return trusted.some((entry) => matchesDomain(domain, entry));
}
