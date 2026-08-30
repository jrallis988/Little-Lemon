import { productName } from "./product-catalog";
import type { ChatMessage } from "./types";

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

type Topic =
  | "steak"
  | "salmon"
  | "beer"
  | "light"
  | "restock"
  | "cellar"
  | "close"
  | "record"
  | "house"
  | "general";

/** Multi-turn replies so follow-ups advance instead of looping the doorbell. */
const THREADS: Record<Topic, string[]> = {
  steak: [
    "With grilled steak, I'd reach for a bold house IPA — roasted malts and bitterness that stand up to char. A Cabernet works if wine is preferred.",
    "From the taps, our House Porter loves a sear — rich, slightly chocolatey. Session IPA if your guest wants something brighter alongside the steak.",
    "If you'd rather stay on wine, pour the Cabernet a touch warmer than cellar temp so the fruit opens. Want a lighter backup for someone who won't do red?",
    "A Golden Lager is a polite backup for guests who skip big beers and reds — clean enough not to fight the grill. Anything else for that table?",
  ],
  salmon: [
    "Salmon wants lift — a crisp Sauvignon Blanc or dry Rosé. A witbier with citrus can be elegant if beer suits better.",
    "On draft, Bright Pilsner stays out of the way of the fish; Session IPA only if they like hop aroma with citrus sides.",
    "If it's glazed or spicy salmon, Rosé keeps pace better than oaky white. Shall I think about a non-alcoholic option for the table as well?",
  ],
  beer: [
    "For someone new to craft, our Golden Lager is clean and welcoming. The Session IPA adds aroma without overwhelming the palate.",
    "If they like the lager, nudge them toward Bright Pilsner next — same easy body, a little more snap. House Porter only if they ask for something darker.",
    "For a flight: Golden Lager, Session IPA, then House Porter — light to rich. Keeps the story simple for the guest.",
  ],
  light: [
    "For summer, a Kölsch-style pour or our Bright Pilsner — effervescent, easy company with burgers and salads.",
    "Session IPA works outdoors if you want aroma without heaviness. Skip the Porter until the evening cools off.",
    "Rosé or a light lager in a chilled glass for the heat — I'll keep the heavy reds for after sundown unless someone insists.",
  ],
  restock: [
    "I’ve drafted a restock from today’s cellar picture. Open Restock to adjust quantities — nothing ships until you approve and your proprietor confirms.",
    "You can trim or bump any line on Restock, then approve it for the record. Export the CSV when you're ready to hand it over.",
    "Once approved, it sits in The Record as pending proprietor — Thomas won't place a vendor order on his own.",
  ],
  cellar: [
    "Let me pull from today’s cellar picture.",
    "If something still looks off, run Cellar Check again and I’ll refresh what I’ve noticed.",
    "Restock is ready when you want to act on the shorts — or ask me about a specific product.",
  ],
  close: [
    "Here’s where we stand on closings.",
    "REG-01 is ready whenever you are — Count the till, secure the cellar, then sign off.",
    "After you close, it’ll land in The Record. Ask if you want help reading a shortfall.",
  ],
  record: [
    "The Record keeps cellar checks, closes, and approved restocks for the proprietor.",
    "Export CSV or JSON from The Record when you need a copy for the books.",
    "Anything specific you want me to look for in tonight’s notes?",
  ],
  house: [
    "Here’s how the house stands from what we’ve logged.",
    "Home shows what I’ve noticed; Restock and Cellar Check are where we act. What should we tackle first?",
    "I can talk pairings, counts, restock, or tonight’s close — your call.",
  ],
  general: [
    "Ask me about pairings, our brews, the cellar, restock, or tonight’s close — I’m with you.",
    "Happy to go deeper on any of that. What matters most right now on the floor?",
    "I’m still here — pairings, stock, or closing up. Which would help?",
  ],
};

function detectTopic(message: string): Topic {
  const lower = message.toLowerCase();

  if (
    lower.includes("pair") ||
    lower.includes("goes well") ||
    lower.includes("steak") ||
    lower.includes("grill") ||
    lower.includes("sear") ||
    lower.includes("char")
  ) {
    return "steak";
  }
  if (lower.includes("salmon") || (lower.includes("wine") && lower.includes("find"))) {
    return "salmon";
  }
  if (lower.includes("wine") && (lower.includes("salmon") || lower.includes("fish"))) {
    return "salmon";
  }
  if (lower.includes("salmon") || lower.includes("rosé") || lower.includes("rose")) {
    return "salmon";
  }
  if (
    lower.includes("beer") ||
    lower.includes("ipa") ||
    lower.includes("lager") ||
    lower.includes("beginner") ||
    lower.includes("porter") ||
    lower.includes("pilsner") ||
    lower.includes("tap")
  ) {
    return "beer";
  }
  if (
    lower.includes("light") ||
    lower.includes("summer") ||
    lower.includes("cookout") ||
    lower.includes("outdoor")
  ) {
    return "light";
  }
  if (
    lower.includes("order") ||
    lower.includes("restock") ||
    lower.includes("bring in") ||
    lower.includes("reorder")
  ) {
    return "restock";
  }
  if (
    lower.includes("cellar") ||
    lower.includes("stock") ||
    lower.includes("short") ||
    lower.includes("count") ||
    lower.includes("inventory")
  ) {
    return "cellar";
  }
  if (
    lower.includes("close") ||
    lower.includes("till") ||
    lower.includes("cash") ||
    lower.includes("night")
  ) {
    return "close";
  }
  if (
    lower.includes("record") ||
    lower.includes("proprietor") ||
    lower.includes("export") ||
    lower.includes("audit")
  ) {
    return "record";
  }
  if (
    lower.includes("house") ||
    lower.includes("status") ||
    lower.includes("how are we") ||
    lower.includes("what's up") ||
    lower.includes("whats up")
  ) {
    return "house";
  }
  return "general";
}

function isFollowUp(message: string): boolean {
  const lower = message.toLowerCase().trim();
  if (
    /^(and |what about|how about|also |or |from (our|the) |something |anything |another |more |yes|yeah|yep|ok|okay|sure)/i.test(
      lower,
    )
  ) {
    return true;
  }
  if (
    lower.includes("tap list") ||
    lower.includes("from our tap") ||
    lower.includes("instead") ||
    lower.includes("other option") ||
    lower.includes("what else") ||
    lower.includes("anything else")
  ) {
    return true;
  }
  return lower.split(/\s+/).length <= 6 && !lower.includes("?");
}

function lastAssistantTopic(history: ChatMessage[]): Topic | null {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role !== "assistant") continue;
    const c = msg.content.toLowerCase();
    if (c.includes("steak") || c.includes("sear") || c.includes("cabernet")) return "steak";
    if (c.includes("salmon") || c.includes("sauvignon") || c.includes("rosé") || c.includes("rose"))
      return "salmon";
    if (c.includes("lager") || c.includes("ipa") || c.includes("porter") || c.includes("flight"))
      return "beer";
    if (c.includes("cookout") || c.includes("summer") || c.includes("pilsner")) return "light";
    if (c.includes("restock") || c.includes("proprietor")) return "restock";
    if (c.includes("cellar")) return "cellar";
    if (c.includes("till") || c.includes("close")) return "close";
    if (c.includes("record")) return "record";
    if (c.includes("house stands") || c.includes("noticed")) return "house";
  }
  return null;
}

function countTopicTurns(history: ChatMessage[], topic: Topic): number {
  let n = 0;
  for (const msg of history) {
    if (msg.role !== "assistant") continue;
    const c = msg.content.toLowerCase();
    if (THREADS[topic].some((line) => c.includes(line.slice(0, 32).toLowerCase()))) {
      n += 1;
    }
  }
  return n;
}

function pickUnused(lines: string[], history: ChatMessage[], startIndex: number): string {
  const used = new Set(
    history.filter((m) => m.role === "assistant").map((m) => m.content.trim()),
  );
  for (let i = 0; i < lines.length; i++) {
    const idx = (startIndex + i) % lines.length;
    const candidate = lines[idx];
    if (!used.has(candidate)) return candidate;
  }
  // All used — paraphrase last resort instead of identical doorbell
  const base = lines[Math.min(startIndex, lines.length - 1)];
  return `${base} (Happy to take another angle if that didn’t land.)`;
}

function cellarOrCloseReply(
  topic: "cellar" | "close" | "record" | "house",
  context: string,
  history: ChatMessage[],
): string {
  const turn = countTopicTurns(history, topic);
  if (topic === "cellar" && context) {
    if (turn === 0) return `${THREADS.cellar[0]} ${context}`;
    return pickUnused(THREADS.cellar.slice(1), history, turn - 1);
  }
  if (topic === "close") {
    if (turn === 0 && (context.includes("Till") || context.includes("till"))) {
      return `${THREADS.close[0]} ${context}`;
    }
    if (turn === 0 && !context) return "No closings recorded yet tonight.";
    return pickUnused(THREADS.close, history, Math.max(turn, 0));
  }
  if (topic === "record") {
    if (turn === 0 && context) return `Here's where we stand. ${context}`;
    if (turn === 0) return "The record is empty so far — it will fill as you work.";
    return pickUnused(THREADS.record, history, turn);
  }
  if (topic === "house") {
    if (turn === 0 && context) return `${THREADS.house[0]} ${context}`;
    return pickUnused(THREADS.house, history, turn);
  }
  return pickUnused(THREADS[topic], history, turn);
}

/**
 * Conversation-aware browser replies.
 * Follow-ups continue the thread; never repeats the last assistant line verbatim.
 */
export function matchBrowserReply(
  message: string,
  context: string,
  history: ChatMessage[] = [],
): string {
  const lower = message.toLowerCase();
  let topic = detectTopic(message);

  // Follow-ups like "Something from our tap list?" stay on the prior thread
  // unless they clearly change subject.
  if (isFollowUp(message)) {
    const prior = lastAssistantTopic(history);
    if (prior && topic === "general") topic = prior;
    if (prior === "steak" && (topic === "beer" || lower.includes("tap"))) topic = "steak";
    if (prior === "steak" && lower.includes("wine")) topic = "steak";
  }

  let reply: string;
  if (topic === "cellar" || topic === "close" || topic === "record" || topic === "house") {
    reply = cellarOrCloseReply(topic, context, history);
  } else {
    const turn = countTopicTurns(history, topic);
    reply = pickUnused(THREADS[topic], history, turn);
  }

  const lastAssistant = [...history].reverse().find((m) => m.role === "assistant");
  if (lastAssistant && lastAssistant.content.trim() === reply.trim()) {
    const lines = THREADS[topic];
    reply = pickUnused(lines, history, countTopicTurns(history, topic) + 1);
  }

  return reply;
}

/** @deprecated use matchBrowserReply */
export const matchDemoReply = (message: string) => matchBrowserReply(message, "");
