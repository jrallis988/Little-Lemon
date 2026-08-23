import { productName } from "./product-catalog";

export const STAFF_FIRST_NAME = "James";

export const THOMAS_GREETING = `Good evening, ${STAFF_FIRST_NAME}. I'm here to help with the cellar, closing the night, pairings, and whatever the house needs. What shall we pour?`;

export const TAB_LABELS = {
  inventory: "Cellar Check",
  shift: "Close the Night",
  audit: "The Record",
} as const;

export const suggestedPrompts = [
  "What beer pairs with grilled steak?",
  "Recommend a wine for salmon",
  "What's our best IPA for beginners?",
  "Something light for a summer cookout",
];

export function butlerScanNote(
  sku: string,
  variance: number,
  level: "exact" | "minor" | "critical",
): string {
  const name = productName(sku);
  const n = Math.abs(variance);

  if (level === "exact") {
    return `Very good — ${name} is exactly where we expected. We're well stocked for service.`;
  }
  if (level === "minor") {
    return `If I may — ${name} is ${n} shy of what we should have. A quick second count before the rush might be wise. I've made a note.`;
  }
  return `Forgive me for troubling you — we're ${n} short on ${name}. I'd bring this to the proprietor's attention before we pour another round. Shall I flag it?`;
}

export function butlerShiftNote(registerId: string, variance: number): string {
  const till = registerId.replace(/^REG-?/i, "till ");
  const amount = Math.abs(variance).toFixed(2);

  if (Math.abs(variance) <= 5) {
    return `The ${till} is closed — nearly balanced, with only a modest ${variance < 0 ? "shortfall" : "surplus"} of $${amount}. The cellar is secured. A quiet close.`;
  }
  return `The ${till} is closed, though there's a ${variance < 0 ? "shortfall" : "surplus"} of $${amount} worth mentioning to the proprietor. I've added it to the record.`;
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
      `We've checked ${parts.totalScans} products in the cellar today` +
        (parts.needsAttention
          ? `; ${parts.needsAttention} need particular attention`
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

const demoChatReplies: Record<string, string> = {
  pairing:
    "A fine question. With grilled steak, I might suggest a bold India Pale Ale — roasted malts and a bright bitterness that stands up beautifully to char. If wine is your preference, a Cabernet Sauvignon will do nicely. Shall I recommend something specific from our list?",

  wine:
    "Salmon calls for something with lift — a crisp Sauvignon Blanc, or perhaps a dry Rosé. If your guest leans toward beer, a witbier with a whisper of citrus can be quite elegant. How is the fish prepared, if I may ask?",

  beer:
    "For someone new to craft beer, I'd begin gently — our Golden Lager is clean and welcoming. When they're ready for a little more character, the Session IPA offers aroma without overwhelming the palate.",

  light:
    "For a summer gathering, might I suggest a Kölsch or a bright Pilsner from the tap? Something effervescent and easy — it keeps good company with burgers and salads.",

  cellar:
    "I've been through the cellar this evening. We're rather short on House Porter — ten shy of what we should have. Session IPA wants a double-check. Golden Lager is all set. Would you like the particulars?",

  shift:
    "The evening's accounts are nearly settled — the till is balanced to within a few dollars, and the cellar is secured.",

  record:
    "I've kept careful note of everything this shift. Should the proprietor wish to review, the record is ready at hand.",

  default:
    "A pleasure. Ask me what to pour, what suits a meal, or how the house stands this evening.",
};

export function matchDemoReply(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("pair") ||
    lower.includes("goes well") ||
    lower.includes("steak") ||
    lower.includes("grill") ||
    lower.includes("meal")
  ) {
    return demoChatReplies.pairing;
  }

  if (lower.includes("wine") || lower.includes("salmon")) {
    return demoChatReplies.wine;
  }

  if (
    lower.includes("beer") ||
    lower.includes("ipa") ||
    lower.includes("lager") ||
    lower.includes("beginner")
  ) {
    return demoChatReplies.beer;
  }

  if (lower.includes("light") || lower.includes("summer") || lower.includes("cookout")) {
    return demoChatReplies.light;
  }

  if (
    lower.includes("cellar") ||
    lower.includes("stock") ||
    lower.includes("short") ||
    lower.includes("porter") ||
    lower.includes("count")
  ) {
    return demoChatReplies.cellar;
  }

  if (
    lower.includes("close") ||
    lower.includes("till") ||
    lower.includes("cash") ||
    lower.includes("night")
  ) {
    return demoChatReplies.shift;
  }

  if (
    lower.includes("record") ||
    lower.includes("proprietor") ||
    lower.includes("note")
  ) {
    return demoChatReplies.record;
  }

  return demoChatReplies.default;
}
