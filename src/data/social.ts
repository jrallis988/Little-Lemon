export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@weightwatchers",
    href: "https://www.instagram.com/weightwatchers/",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "WeightWatchers",
    href: "https://www.facebook.com/weightwatchers/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@weightwatchers",
    href: "https://www.tiktok.com/@weightwatchers",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "WeightWatchers",
    href: "https://www.youtube.com/@WeightWatchers",
  },
  {
    id: "x",
    label: "X",
    handle: "@WeightWatchers",
    href: "https://x.com/WeightWatchers",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "weightwatchers",
    href: "https://www.pinterest.com/weightwatchers/",
  },
];
