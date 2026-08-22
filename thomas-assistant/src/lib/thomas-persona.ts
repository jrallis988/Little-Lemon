export const suggestedPrompts = [
  "What beer pairs with grilled steak?",
  "Recommend a wine for salmon",
  "What's our best IPA for beginners?",
  "Something light for a summer cookout",
];

export const demoChatReplies: Record<string, string> = {
  greeting:
    "Good evening. I'm Thomas — your personal beverage butler. Whether you're selecting from our brewery lineup or pairing beer and wine with tonight's meal, I'm at your service. What may I recommend?",

  pairing:
    "For grilled steak, I'd suggest a malty amber ale or a bold Cabernet — the caramel notes complement char beautifully. From our taproom, our house Porter carries roasted malt that stands up to ribeye splendidly. Shall I suggest a specific pour size or a wine alternative?",

  wine:
    "For salmon, a crisp Sauvignon Blanc or a dry Rosé is classic — the acidity cuts through the richness. If your guest prefers beer, a Belgian-style witbier with citrus notes pairs elegantly. I can narrow this by preparation: grilled, cured, or sashimi?",

  beer:
    "For newcomers to craft beer, I'd start with our Golden Lager — approachable, clean, and lightly hopped. Our Session IPA is a fine second step: aromatic without overwhelming bitterness. Happy to walk through tasting notes for anything on today's board.",

  light:
    "For a summer cookout, may I suggest a Kölsch or a sparkling wine spritz? Both stay refreshing alongside burgers and salads. Our Pilsner is tapped fresh this week — bright, crisp, and crowd-pleasing.",

  inventory:
    "I've noted the back-room counts, sir. SKU-8842 shows a critical shortage — ten units shy. I'd recommend a recount before service. SKU-3310 is a minor variance; SKU-1104 is exact. Shall I flag the manager?",

  shift:
    "The register reconciliation is within tolerance — a $2.50 variance on REG-01. Back-room secured and logged. The floor is ready for the evening service.",

  audit:
    "Your audit trail is intact — three entries logged locally. Export whenever management requires a review; everything stays on-premise.",

  default:
    "A pleasure to assist. Ask me about beer and wine pairings, our brewery offerings, or what's suited to any meal. I can also keep an eye on inventory and shift counts behind the scenes.",
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

  if (lower.includes("wine") || lower.includes("rosé") || lower.includes("rose") || lower.includes("salmon")) {
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

  if (lower.includes("variance") || lower.includes("inventory") || lower.includes("sku") || lower.includes("stock")) {
    return demoChatReplies.inventory;
  }

  if (lower.includes("shift") || lower.includes("cash") || lower.includes("register") || lower.includes("close")) {
    return demoChatReplies.shift;
  }

  if (lower.includes("audit") || lower.includes("export") || lower.includes("log")) {
    return demoChatReplies.audit;
  }

  return demoChatReplies.default;
}
