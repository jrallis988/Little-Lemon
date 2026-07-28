/** Campaign homepage routes that share the same HomePage experience. */
export const CAMPAIGN_HOME_PATHS = ["/", "/63"] as const;

export type CampaignHomePath = (typeof CAMPAIGN_HOME_PATHS)[number];

export function isCampaignHome(pathname: string): boolean {
  return CAMPAIGN_HOME_PATHS.includes(pathname as CampaignHomePath);
}

/** Prefer `/` for outbound home hash links; `/63` remains a supported alias. */
export function campaignHomePath(pathname?: string): CampaignHomePath {
  return pathname === "/63" ? "/63" : "/";
}

export function campaignHash(hash: string, pathname?: string): string {
  const clean = hash.startsWith("#") ? hash : `#${hash}`;
  return `${campaignHomePath(pathname)}${clean}`;
}
