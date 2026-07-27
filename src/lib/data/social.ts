export type SocialNetwork =
  | "facebook"
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube";

export interface SocialLink {
  id: SocialNetwork;
  name: string;
  href: string;
  label: string;
}

/** Official Walgreens public profiles (shared destinations for Walgreens RX). */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/Walgreens",
    label: "Walgreens on Facebook",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/walgreens",
    label: "Walgreens on Instagram",
  },
  {
    id: "x",
    name: "X",
    href: "https://x.com/walgreens",
    label: "Walgreens on X",
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/@walgreens",
    label: "Walgreens on TikTok",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/@Walgreens",
    label: "Walgreens on YouTube",
  },
];
