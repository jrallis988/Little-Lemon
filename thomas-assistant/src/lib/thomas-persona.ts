import { productName } from "./product-catalog";

export const STAFF_FIRST_NAME = "James";

export const THOMAS_GREETING = `Good evening, ${STAFF_FIRST_NAME}. What shall we pour?`;

export const TAB_LABELS = {
  home: "Home",
  inventory: "Cellar Check",
  order: "Restock",
  shift: "Close the Night",
  audit: "The Record",
} as const;

/** Personal product positioning */
export const PERSONAL_TAGLINE = "YOUR OWN PERSONAL BARTENDER";
export const PERSONAL_POSITIONING = "Thomas knows you.";

/** Business product positioning — not “personal bartender” */
export const BUSINESS_TAGLINE = "THOMAS FOR BUSINESS";
export const BUSINESS_SUPPORTING = "Thomas knows the house.";
export const BUSINESS_PRODUCT_LINE = "Beverage Operations Intelligence";

/** @deprecated use PERSONAL_TAGLINE — kept for gradual migration */
export const THOMAS_TAGLINE = PERSONAL_TAGLINE;
export const THOMAS_POSITIONING = "Thomas is your own personal bartender";

export const suggestedPrompts = [
  "What pairs with grilled steak?",
  "Find me a wine for salmon",
  "Best IPA for a beginner?",
  "Something light for a cookout",
] as const;

export function butlerScanNote(
  sku: string,
  variance: number,
  level: "exact" | "minor" | "critical",
): string {
  const name = productName(sku);
  const n = Math.abs(variance);

  if (level === "exact") {
    return `Very good — ${name} is exactly where we expected.`;
  }
  if (level === "minor") {
    return `${name} is ${n} shy of what we should have. A second count before service might be wise.`;
  }
  return `We're ${n} short on ${name}. Worth flagging before the next round.`;
}

export function butlerShiftNote(registerId: string, variance: number): string {
  const till = registerId.replace(/^REG-?/i, "till ");
  const amount = Math.abs(variance).toFixed(2);

  if (Math.abs(variance) <= 5) {
    return `The ${till} is closed — nearly balanced, ${variance < 0 ? "short" : "over"} by $${amount}.`;
  }
  return `The ${till} is closed with a ${variance < 0 ? "shortfall" : "surplus"} of $${amount}. I've noted it in the record.`;
}

export function butlerSessionContext(parts: {
  totalScans?: number;
  needsAttention?: number;
  latestProduct?: string;
  latestCountGap?: number;
  latestTill?: string;
  latestTillGap?: number;
}): string {
  const notes: string[] = [];
  if (parts.totalScans != null && parts.totalScans > 0) {
    notes.push(
      `We've checked ${parts.totalScans} products in the cellar` +
        (parts.needsAttention
          ? `; ${parts.needsAttention} need attention`
          : "") +
        ".",
    );
  }
  if (parts.latestProduct != null && parts.latestCountGap != null) {
    const name = productName(parts.latestProduct);
    notes.push(
      `Most recently, ${name} was ${Math.abs(parts.latestCountGap)} ${parts.latestCountGap < 0 ? "shy" : "over"} what we expected.`,
    );
  }
  if (parts.latestTill != null && parts.latestTillGap != null) {
    notes.push(
      `${parts.latestTill} showed a ${parts.latestTillGap < 0 ? "shortfall" : "surplus"} of $${Math.abs(parts.latestTillGap).toFixed(2)} at close.`,
    );
  }
  return notes.join(" ");
}

const pairingReply =
  "With grilled steak, I'd reach for a bold IPA — roasted malts and bitterness that stand up to char. A Cabernet works if wine is preferred.";

const wineReply =
  "Salmon wants lift — a crisp Sauvignon Blanc or dry Rosé. A witbier with citrus can be elegant if beer suits better.";

const beerReply =
  "For someone new to craft, our Golden Lager is clean and welcoming. The Session IPA adds aroma without overwhelming the palate.";

const lightReply =
  "For summer, a Kölsch or bright Pilsner — effervescent, easy company with burgers and salads.";

export function matchBrowserReply(message: string, context: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("pair") ||
    lower.includes("goes well") ||
    lower.includes("steak") ||
    lower.includes("grill") ||
    lower.includes("meal")
  ) {
    return pairingReply;
  }

  if (lower.includes("wine") || lower.includes("salmon")) {
    return wineReply;
  }

  if (
    lower.includes("beer") ||
    lower.includes("ipa") ||
    lower.includes("lager") ||
    lower.includes("beginner")
  ) {
    return beerReply;
  }

  if (lower.includes("light") || lower.includes("summer") || lower.includes("cookout")) {
    return lightReply;
  }

  if (
    lower.includes("order") ||
    lower.includes("restock") ||
    lower.includes("bring in") ||
    lower.includes("reorder")
  ) {
    return "I’ve drafted a restock from today’s cellar picture. Open Restock to adjust quantities — nothing ships until you approve and your proprietor confirms.";
  }

  if (
    lower.includes("cellar") ||
    lower.includes("stock") ||
    lower.includes("short") ||
    lower.includes("porter") ||
    lower.includes("count")
  ) {
    if (context) return context;
    return "We haven't checked the cellar yet this evening.";
  }

  if (
    lower.includes("close") ||
    lower.includes("till") ||
    lower.includes("cash") ||
    lower.includes("night")
  ) {
    if (context.includes("Till") || context.includes("till")) return context;
    return "No closings recorded yet tonight.";
  }

  if (
    lower.includes("record") ||
    lower.includes("proprietor") ||
    lower.includes("note")
  ) {
    if (context) return `Here's where we stand. ${context}`;
    return "The record is empty so far — it will fill as you work.";
  }

  if (context) {
    return context;
  }

  return "Ask me about pairings, our brews, or how the house stands.";
}

/** @deprecated use matchBrowserReply */
export const matchDemoReply = (message: string) => matchBrowserReply(message, "");
