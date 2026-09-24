import type { RewardsAccount } from "@/lib/types";
import { REWARDS } from "@/lib/data/catalog";

export interface RewardsLedgerEntry {
  id: string;
  label: string;
  points: number;
  at: string;
  kind: "earn" | "redeem" | "bonus" | "expire";
}

export interface MemberExclusiveOffer {
  id: string;
  title: string;
  detail: string;
  pointsCost?: number;
  code?: string;
  href: string;
}

export const REWARDS_LEDGER: RewardsLedgerEntry[] = [
  {
    id: "led-1",
    label: "Pickup order #WG-448821",
    points: 120,
    at: "2026-09-18",
    kind: "earn",
  },
  {
    id: "led-2",
    label: "Weekly ad bonus — beauty aisle",
    points: 200,
    at: "2026-09-14",
    kind: "bonus",
  },
  {
    id: "led-3",
    label: "Redeemed $5 reward",
    points: -500,
    at: "2026-09-08",
    kind: "redeem",
  },
  {
    id: "led-4",
    label: "Pharmacy refill bonus",
    points: 75,
    at: "2026-09-02",
    kind: "earn",
  },
  {
    id: "led-5",
    label: "Points expiring soon",
    points: -(REWARDS.expiringPoints ?? 500),
    at: REWARDS.expiringOn ?? "2026-08-31",
    kind: "expire",
  },
];

export const MEMBER_EXCLUSIVE_OFFERS: MemberExclusiveOffer[] = [
  {
    id: "mx-1",
    title: "$5 off $25 drugstore",
    detail: "Exclusive for Plus members — auto-applies at checkout when clipped.",
    pointsCost: 500,
    code: "PLUS5",
    href: "/deals",
  },
  {
    id: "mx-2",
    title: "2× points on vitamins",
    detail: "Earn double myWalgreens points on vitamins this week.",
    href: "/shop?category=vitamins",
  },
  {
    id: "mx-3",
    title: "Free same-day photo prints",
    detail: "Member perk: 4×6 prints same day with any $10 photo order.",
    href: "/photo",
  },
];

export function rewardsSummary(account: RewardsAccount = REWARDS) {
  return {
    ...account,
    ledger: REWARDS_LEDGER,
    exclusives: MEMBER_EXCLUSIVE_OFFERS,
  };
}
