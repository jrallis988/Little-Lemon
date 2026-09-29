/** Curated @smuttynosebeer posts — images use campus photos as stable fallbacks. */
export type InstagramPost = {
  id: string;
  href: string;
  caption: string;
  image: string; // CampusImage name under public/images/
};

export const instagramPosts: InstagramPost[] = [
  {
    id: "blackberry",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Blackberry Ale season at Towle Farm.",
    image: "campus-patio",
  },
  {
    id: "backyard",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Backyard hangs all summer long.",
    image: "campus-day",
  },
  {
    id: "pours",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Cold pours from the red brewery.",
    image: "campus-silos",
  },
  {
    id: "patio",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Golden-hour patio seats.",
    image: "campus-dusk",
  },
  {
    id: "food",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Hayseed plate + a campus pint.",
    image: "hayseed-plate",
  },
  {
    id: "campus",
    href: "https://www.instagram.com/smuttynosebeer/",
    caption: "Towle Farm — just inland from the beach.",
    image: "campus-entrance",
  },
];
