export const STAFF_FIRST_NAME = "James";

export const THOMAS_GREETING = `Good evening, ${STAFF_FIRST_NAME}. I'm here to help with inventory, shifts, recipes, and pairings. What shall we pour?`;

export const suggestedPrompts = [
  "What beer pairs with grilled steak?",
  "Recommend a wine for salmon",
  "What's our best IPA for beginners?",
  "Something light for a summer cookout",
];

/** Voice rules echoed in the Ollama system prompt (kept in sync conceptually). */
export const BUTLER_VOICE_RULES = `
Speak as a seasoned beverage butler — warm, discreet, unhurried.
Use: "Certainly", "If I may", "Might I suggest", "A fine choice", "At your service".
Describe drinks with the senses — aroma, body, finish, how they sit with food.
Never sound like software: no SKU, variance, critical, tolerance, audit, export, logged, on-premise, system, database, operator, or PIN.
For stock matters, speak of bottles, kegs, and what's on hand for guests.
For the till, speak delicately — "nearly balanced", "a small discrepancy".
For records, say "I've made a note" rather than "logged" or "exported".
`;

export function butlerScanNote(
  label: string,
  variance: number,
  level: "exact" | "minor" | "critical",
): string {
  if (level === "exact") {
    return `Very good — our count for ${label} is precisely as expected. We're well stocked for service.`;
  }
  if (level === "minor") {
    const n = Math.abs(variance);
    return `If I may mention it — ${label} is short by ${n}, though only slightly. A second look in the back might be wise before the evening rush.`;
  }
  const n = Math.abs(variance);
  return `Forgive me for troubling you — ${label} appears to be ${n} below what we expected. I should think the proprietor ought to know before we commit to another round.`;
}

export function butlerShiftNote(registerLabel: string, variance: number): string {
  const amount = Math.abs(variance).toFixed(2);
  if (Math.abs(variance) <= 5) {
    return `The ${registerLabel} till is closed for the evening — nearly balanced, with only a modest ${variance < 0 ? "shortfall" : "surplus"} of $${amount}. The house is ready for tomorrow.`;
  }
  return `The ${registerLabel} till is closed, though there's a ${variance < 0 ? "shortfall" : "surplus"} of $${amount} that strikes me as worth bringing to the proprietor's attention.`;
}

export function butlerSessionContext(parts: {
  totalScans?: number;
  critical?: number;
  minor?: number;
  latestItem?: string;
  latestCountGap?: number;
  latestRegister?: string;
  latestTillGap?: number;
}): string {
  const notes: string[] = [];
  if (parts.totalScans != null && parts.totalScans > 0) {
    notes.push(
      `We've checked ${parts.totalScans} items in the back today` +
        (parts.critical
          ? `; ${parts.critical} need particular attention`
          : "") +
        ".",
    );
  }
  if (parts.latestItem != null && parts.latestCountGap != null) {
    notes.push(
      `Most recently, ${parts.latestItem} was ${Math.abs(parts.latestCountGap)} ${parts.latestCountGap < 0 ? "shy" : "over"} what we expected.`,
    );
  }
  if (parts.latestRegister != null && parts.latestTillGap != null) {
    notes.push(
      `The ${parts.latestRegister} till showed a ${parts.latestTillGap < 0 ? "shortfall" : "surplus"} of $${Math.abs(parts.latestTillGap).toFixed(2)} at close.`,
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

  inventory:
    "I've been through the back room this evening. One item wants a closer look before service — we're rather short on a popular line. The rest is in good order.",

  shift:
    "The evening's accounts are nearly settled — the till is balanced to within a few dollars, and the cellar is secured.",

  audit:
    "I've kept careful note of everything this shift. Should the proprietor wish to review, the records are ready at hand.",

  default:
    "A pleasure. Ask me what to pour, what suits a meal, or what's worth trying from the brewery.",
};

export function matchDemoReply(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("pair") ||
    lower.includes("goes well") ||
    lower.includes("go well") ||
    lower.includes("meal") ||
    lower.includes("dinner") ||
    lower.includes("food") ||
    lower.includes("steak") ||
    lower.includes("grill")
  ) {
    return demoChatReplies.pairing;
  }

  if (
    lower.includes("wine") ||
    lower.includes("rosé") ||
    lower.includes("rose") ||
    lower.includes("salmon")
  ) {
    return demoChatReplies.wine;
  }

  if (
    lower.includes("beer") ||
    lower.includes("brew") ||
    lower.includes("ipa") ||
    lower.includes("lager") ||
    lower.includes("beginner")
  ) {
    return demoChatReplies.beer;
  }

  if (
    lower.includes("light") ||
    lower.includes("summer") ||
    lower.includes("cookout") ||
    lower.includes("refresh")
  ) {
    return demoChatReplies.light;
  }

  if (
    lower.includes("variance") ||
    lower.includes("inventory") ||
    lower.includes("sku") ||
    lower.includes("stock") ||
    lower.includes("count") ||
    lower.includes("short")
  ) {
    return demoChatReplies.inventory;
  }

  if (
    lower.includes("shift") ||
    lower.includes("cash") ||
    lower.includes("register") ||
    lower.includes("close") ||
    lower.includes("till")
  ) {
    return demoChatReplies.shift;
  }

  if (
    lower.includes("audit") ||
    lower.includes("export") ||
    lower.includes("log") ||
    lower.includes("record")
  ) {
    return demoChatReplies.audit;
  }

  return demoChatReplies.default;
}
