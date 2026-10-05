import pairings from "./data/culinary-pairings.json";
import type { ChatMessage } from "./types";

export type CulinaryFocus = "wine" | "beer" | "sides" | "vegetables" | "all";

export interface PairingEntry {
  id: string;
  names: string[];
  dish: string;
  wines: string[];
  beers: string[];
  sides: string[];
  vegetables: string[];
  notes: string;
}

export interface CulinaryHit {
  entry: PairingEntry;
  focus: CulinaryFocus;
  fromHistory: boolean;
  webNotes: string[];
}

const ENTRIES = pairings.entries as PairingEntry[];

const FOLLOW_UP =
  /^(and |what about|how about|also |or |something |anything |another |more |yes|yeah|yep|ok|okay|sure|that |those |the wine|a wine|wine\b|beer\b|side|veg)/i;

export function isCulinaryIntent(message: string): boolean {
  const lower = message.toLowerCase();
  if (
    lower.includes("pair") ||
    lower.includes("goes with") ||
    lower.includes("go with") ||
    lower.includes("serve with") ||
    lower.includes("sommelier") ||
    lower.includes("what wine") ||
    lower.includes("which wine") ||
    lower.includes("what beer") ||
    lower.includes("side dish") ||
    lower.includes("vegetable") ||
    lower.includes("accompan") ||
    lower.includes("dinner") ||
    lower.includes("recipe") ||
    lower.includes("cook")
  ) {
    return true;
  }
  return ENTRIES.some((e) => e.names.some((n) => lower.includes(n)));
}

export function detectCulinaryFocus(message: string): CulinaryFocus {
  const lower = message.toLowerCase();
  if (
    lower.includes("veg") ||
    lower.includes("green") ||
    lower.includes("asparagus") ||
    lower.includes("spinach") ||
    lower.includes("fennel")
  ) {
    return "vegetables";
  }
  if (
    lower.includes("side") ||
    lower.includes("accompan") ||
    lower.includes("potato") ||
    lower.includes("what else to serve")
  ) {
    return "sides";
  }
  if (
    lower.includes("beer") ||
    lower.includes("ale") ||
    lower.includes("lager") ||
    lower.includes("porter") ||
    lower.includes("ipa") ||
    lower.includes("tap")
  ) {
    return "beer";
  }
  if (
    lower.includes("wine") ||
    lower.includes("red") ||
    lower.includes("white") ||
    lower.includes("rosé") ||
    lower.includes("rose") ||
    lower.includes("cabernet") ||
    lower.includes("chardonnay") ||
    lower.includes("pinot")
  ) {
    return "wine";
  }
  return "all";
}

export function findEntry(text: string): PairingEntry | null {
  const lower = text.toLowerCase();
  let best: PairingEntry | null = null;
  let bestLen = 0;
  for (const entry of ENTRIES) {
    for (const name of entry.names) {
      if (lower.includes(name) && name.length > bestLen) {
        best = entry;
        bestLen = name.length;
      }
    }
  }
  return best;
}

export function resolveDishFromHistory(
  latest: string,
  history: Pick<ChatMessage, "role" | "content">[],
): { entry: PairingEntry; fromHistory: boolean } | null {
  const direct = findEntry(latest);
  if (direct) return { entry: direct, fromHistory: false };

  const follow =
    FOLLOW_UP.test(latest.trim()) || isCulinaryIntent(latest);
  if (!follow) return null;

  for (let i = history.length - 1; i >= 0; i--) {
    const hit = findEntry(history[i].content);
    if (hit) return { entry: hit, fromHistory: true };
  }
  return null;
}

export function formatPairingNotes(
  entry: PairingEntry,
  focus: CulinaryFocus,
): string {
  const lines = [`Dish in play: ${entry.dish}. ${entry.notes}`];
  const wantWine = focus === "all" || focus === "wine";
  const wantBeer = focus === "all" || focus === "beer";
  const wantSides = focus === "all" || focus === "sides";
  const wantVeg = focus === "all" || focus === "vegetables";
  if (wantWine) lines.push(`Wine: ${entry.wines.join("; ")}`);
  if (wantBeer) lines.push(`Beer: ${entry.beers.join("; ")}`);
  if (wantSides) lines.push(`Sides: ${entry.sides.join("; ")}`);
  if (wantVeg) lines.push(`Vegetables: ${entry.vegetables.join("; ")}`);
  return lines.join("\n");
}

export function composeCulinaryReply(
  entry: PairingEntry,
  focus: CulinaryFocus,
  fromHistory: boolean,
): string {
  const dish = entry.dish;
  const recall = fromHistory ? `Still with the ${dish} — ` : "";

  if (focus === "wine") {
    return `${recall}I'd pour ${entry.wines[0]}. ${entry.wines[1] ? `A second glass if they hesitate: ${entry.wines[1]}.` : ""} ${entry.notes}`;
  }
  if (focus === "beer") {
    return `${recall}From the taps, ${entry.beers[0]}. ${entry.beers[1] ? `Otherwise ${entry.beers[1]}.` : ""}`;
  }
  if (focus === "vegetables") {
    return `${recall}For the plate, ${entry.vegetables[0]}. ${entry.vegetables[1] ?? ""} Keep the seasoning light so the ${dish} stays the point.`;
  }
  if (focus === "sides") {
    return `${recall}Alongside, ${entry.sides[0]}. ${entry.sides[1] ?? ""} ${entry.vegetables[0] ? `Vegetable: ${entry.vegetables[0]}.` : ""}`;
  }

  return `${recall}With ${dish}, ${entry.wines[0]} If they'd rather beer, ${entry.beers[0]} On the plate: ${entry.sides[0]}, and ${entry.vegetables[0]}. ${entry.notes} Ask if you'd like the pour, the vegetable, or the starch taken further.`;
}

export async function searchCulinaryWeb(query: string): Promise<string[]> {
  const q = query.trim();
  if (!q) return [];
  try {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: `${q} wine pairing`,
      srlimit: "3",
      format: "json",
      origin: "*",
      utf8: "1",
    });
    const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return [];
    const body = (await res.json()) as {
      query?: { search?: { title: string; snippet: string }[] };
    };
    const rows = body.query?.search ?? [];
    return rows.map((row) => {
      const snippet = row.snippet
        .replace(/<[^>]+>/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      return `${row.title}: ${snippet}`;
    });
  } catch {
    return [];
  }
}

export function retrieveCulinaryLocal(
  latest: string,
  history: Pick<ChatMessage, "role" | "content">[],
): CulinaryHit | null {
  const resolved = resolveDishFromHistory(latest, history);
  if (!resolved) return null;
  return {
    entry: resolved.entry,
    focus: detectCulinaryFocus(latest),
    fromHistory: resolved.fromHistory,
    webNotes: [],
  };
}

export async function retrieveCulinary(
  latest: string,
  history: Pick<ChatMessage, "role" | "content">[],
  options?: { web?: boolean },
): Promise<CulinaryHit | null> {
  const culinary =
    isCulinaryIntent(latest) ||
    Boolean(resolveDishFromHistory(latest, history));
  if (!culinary) return null;

  const resolved = resolveDishFromHistory(latest, history);
  const focus = detectCulinaryFocus(latest);
  const webNotes =
    options?.web === false
      ? []
      : await searchCulinaryWeb(
          resolved ? `${resolved.entry.dish} ${latest}` : latest,
        );

  if (!resolved && webNotes.length === 0) return null;

  if (!resolved) {
    return {
      entry: {
        id: "web",
        names: [],
        dish: latest,
        wines: [],
        beers: [],
        sides: [],
        vegetables: [],
        notes: webNotes.join(" "),
      },
      focus,
      fromHistory: false,
      webNotes,
    };
  }

  return {
    entry: resolved.entry,
    focus,
    fromHistory: resolved.fromHistory,
    webNotes,
  };
}

export const PAIRING_TOOL = {
  type: "function" as const,
  function: {
    name: "search_pairings",
    description:
      "Look up wine, beer, vegetable, and side-dish pairings for a dish. Use when the guest asks what to pour or serve with food.",
    parameters: {
      type: "object",
      properties: {
        dish: {
          type: "string",
          description: "The dish or ingredient, e.g. baked flounder",
        },
        focus: {
          type: "string",
          enum: ["wine", "beer", "sides", "vegetables", "all"],
        },
      },
      required: ["dish"],
    },
  },
};

export const WEB_TOOL = {
  type: "function" as const,
  function: {
    name: "search_web",
    description:
      "Search culinary references (Wikipedia) for a dish, pairing, or beverage question.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
};

export async function runCulinaryTool(
  name: string,
  args: { dish?: string; focus?: CulinaryFocus; query?: string },
): Promise<string> {
  if (name === "search_pairings") {
    const dish = args.dish ?? "";
    const focus = args.focus ?? "all";
    const entry = findEntry(dish);
    if (!entry) {
      const web = await searchCulinaryWeb(dish);
      return web.length
        ? `No house card for ${dish}. References:\n${web.join("\n")}`
        : `No pairing card for ${dish}. Speak from classic sommelier knowledge; do not invent addresses.`;
    }
    return formatPairingNotes(entry, focus);
  }
  if (name === "search_web") {
    const web = await searchCulinaryWeb(args.query ?? args.dish ?? "");
    return web.length
      ? web.join("\n")
      : "No web snippets. Use your own pairing knowledge; do not invent street addresses.";
  }
  return `Unknown tool ${name}`;
}
