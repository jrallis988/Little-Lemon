import { extractDomain } from "@/lib/utils";
import type { UrlCheckResult } from "@/types";

const ALWAYS_BLOCKED = [
  "tiktok.com",
  "instagram.com",
  "facebook.com",
  "x.com",
  "twitter.com",
  "reddit.com",
  "youtube.com",
  "youtu.be",
  "snapchat.com",
  "twitch.tv",
  "roblox.com",
];

const CONTENT_FARM_MARKERS = [
  "buzzfeed",
  "clickbait",
  "listicle",
  "viralnova",
  "content-farm",
  "essay-mill",
  "homework-help-cheap",
  "softonic",
];

export type FilterOptions = {
  whitelist: string[];
  allowlistOnly: boolean;
  blocklist?: string[];
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

  if (
    CONTENT_FARM_MARKERS.some((marker) => domain.toLowerCase().includes(marker))
  ) {
    return {
      allowed: false,
      url: normalized,
      domain,
      reason: "Surf blocked a low-quality content farm.",
    };
  }

  if (
    (options.blocklist ?? []).some((blocked) => matchesDomain(domain, blocked))
  ) {
    return {
      allowed: false,
      url: normalized,
      domain,
      reason: "A parent blocked this domain.",
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
    "education.nationalgeographic.org",
    "si.edu",
    "pbskids.org",
    "spaceplace.nasa.gov",
    "science.nasa.gov",
    "usgs.gov",
    "noaa.gov",
    "loc.gov",
    "kids.britannica.com",
    "britannica.com",
    "amnh.org",
    "ck12.org",
    "nature.com",
    "openalex.org",
  ];
  return trusted.some((entry) => matchesDomain(domain, entry));
}
