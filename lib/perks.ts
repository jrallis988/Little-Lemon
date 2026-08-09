export type Perk = {
  id: string;
  partner: string;
  title: string;
  summary: string;
  code: string;
  href: string;
};

export const PERKS: Perk[] = [
  {
    id: "gymshark",
    partner: "Gymshark",
    title: "Member apparel offer",
    summary: "Seasonal discount on training essentials.",
    code: "PFMOVE10",
    href: "https://www.gymshark.com/",
  },
  {
    id: "apple-music",
    partner: "Apple Music",
    title: "Student/member promo",
    summary: "Limited-time trial messaging for members.",
    code: "PFBEATS",
    href: "https://www.apple.com/apple-music/",
  },
  {
    id: "partner-rewards",
    partner: "Partner Rewards",
    title: "Local partner savings",
    summary: "Rotating club-area offers for Black Card & Classic.",
    code: "PFLOCAL",
    href: "/app/perks",
  },
];

export function getPerk(id: string) {
  return PERKS.find((item) => item.id === id) ?? null;
}

export function referralCodeFor(membershipId: string) {
  return `PF-${membershipId.replace("PF-", "").slice(0, 6)}`;
}
