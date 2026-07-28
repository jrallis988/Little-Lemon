export type SocialLink = {
  id: "facebook" | "x" | "youtube" | "pinterest" | "instagram" | "linkedin";
  label: string;
  handle: string;
  href: string;
};

/** Official WeightWatchers social profiles from weightwatchers.com schema/sameAs + footer order. */
export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    handle: "WeightWatchers",
    href: "https://www.facebook.com/weightwatchers/",
  },
  {
    id: "x",
    label: "X",
    handle: "@ww_us",
    href: "https://twitter.com/ww_us",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "WeightWatchers",
    href: "https://www.youtube.com/user/WeightWatchers/",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "weightwatchers",
    href: "https://www.pinterest.com/weightwatchers/",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@weightwatchers",
    href: "https://www.instagram.com/weightwatchers/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "WW International",
    href: "https://www.linkedin.com/company/wwinternational/",
  },
];

/** Legal / policy links from the live WeightWatchers US footer. */
export const legalLinks = [
  {
    label: "Terms and Conditions",
    href: "https://www.weightwatchers.com/us/termsandconditions",
  },
  {
    label: "Notice of Privacy Practices",
    href: "https://www.weightwatchers.com/us/npp",
  },
  {
    label: "Privacy Policy",
    href: "https://www.weightwatchers.com/us/privacy/policy",
  },
  {
    label: "Do Not Sell My Personal Info",
    href: "https://www.weightwatchers.com/us/en/preferences/donotsell-update",
  },
  {
    label: "Ad Choices",
    href: "https://www.weightwatchers.com/us/privacy/policy",
  },
] as const;

export const trademarkNotice =
  "The WeightWatchers® Logo, WeightWatchers®, Points, and ZeroPoint are trademarks of WW International, Inc. ©2026 WW International, Inc. All rights reserved.";

export const trustBadges = {
  truste: {
    href: "https://privacy.trustarc.com/privacy-seal/validation?rid=6795df1e-a4fe-4256-bc2f-9645fa063e8c",
    seal: "/images/badges/truste.svg",
    label: "TRUSTe Verified Privacy",
  },
  legitScript: {
    href: "https://www.legitscript.com/websites/?checker_keywords=weightwatchers.com",
    label: "LegitScript Certified",
  },
} as const;
