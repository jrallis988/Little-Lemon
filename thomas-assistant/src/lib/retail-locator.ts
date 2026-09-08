/** Where to buy — category + area aware (demo; swap for Places API later). */

export type AlcoholCategory = "wine" | "beer" | "spirits" | "bubbles" | "general";

export interface RetailPick {
  label: string;
  why: string;
  mapsUrl: string;
}

export function detectAlcoholCategory(message: string): AlcoholCategory {
  const lower = message.toLowerCase();
  if (
    lower.includes("wine") ||
    lower.includes("cabernet") ||
    lower.includes("pinot") ||
    lower.includes("rosé") ||
    lower.includes("rose") ||
    lower.includes("sauvignon") ||
    lower.includes("red blend")
  ) {
    return "wine";
  }
  if (
    lower.includes("champagne") ||
    lower.includes("prosecco") ||
    lower.includes("sparkling") ||
    lower.includes("cava")
  ) {
    return "bubbles";
  }
  if (
    lower.includes("whiskey") ||
    lower.includes("whisky") ||
    lower.includes("bourbon") ||
    lower.includes("vodka") ||
    lower.includes("gin") ||
    lower.includes("tequila") ||
    lower.includes("rum") ||
    lower.includes("spirit") ||
    lower.includes("liquor")
  ) {
    return "spirits";
  }
  if (
    lower.includes("beer") ||
    lower.includes("ipa") ||
    lower.includes("lager") ||
    lower.includes("porter") ||
    lower.includes("pilsner") ||
    lower.includes("craft") ||
    lower.includes("brew")
  ) {
    return "beer";
  }
  return "general";
}

export function isRetailIntent(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("where can i buy") ||
    lower.includes("where to buy") ||
    lower.includes("where do i buy") ||
    lower.includes("where should i buy") ||
    lower.includes("find near") ||
    lower.includes("near me") ||
    lower.includes("in my area") ||
    lower.includes("local store") ||
    lower.includes("liquor store") ||
    lower.includes("bottle shop") ||
    lower.includes("pick up") ||
    lower.includes("buy a") ||
    lower.includes("buy some") ||
    (lower.includes("buy") &&
      (lower.includes("wine") ||
        lower.includes("beer") ||
        lower.includes("spirit") ||
        lower.includes("bourbon") ||
        lower.includes("vodka")))
  );
}

/** Pull "Austin, TX" / zip from natural language. */
export function extractAreaFromMessage(message: string): string | null {
  const lower = message.toLowerCase();
  const patterns = [
    /(?:i'?m in|i am in|we'?re in|located in|based in|my area is|near)\s+([a-z][a-z\s.,'-]{2,40})/i,
    /\b(\d{5})(?:\s|$)/,
    /(?:in|near)\s+([A-Z][a-zA-Z\s.,'-]{2,35})/,
  ];
  for (const re of patterns) {
    const m = message.match(re);
    if (m?.[1]) {
      return m[1].trim().replace(/\.$/, "");
    }
  }
  if (lower.startsWith("set area ") || lower.startsWith("my area ")) {
    return message.split(/\s+/).slice(2).join(" ").trim() || null;
  }
  return null;
}

function mapsSearch(query: string, area: string): string {
  const q = encodeURIComponent(`${query} near ${area}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const PICKS: Record<
  AlcoholCategory,
  (area: string, hint: string) => RetailPick[]
> = {
  wine: (area, hint) => [
    {
      label: "Wine shop or Total Wine",
      why: `Best selection for ${hint || "wine"} — staff can steer you by style and price.`,
      mapsUrl: mapsSearch("wine shop", area),
    },
    {
      label: "Upscale grocery (Whole Foods / regional equivalent)",
      why: "Solid everyday bottles and a few gems in the wine aisle.",
      mapsUrl: mapsSearch("grocery store wine", area),
    },
  ],
  beer: (area, hint) => [
    {
      label: "Craft bottle shop",
      why: `Singles, local cans, and staff picks for ${hint || "craft beer"}.`,
      mapsUrl: mapsSearch("craft beer bottle shop", area),
    },
    {
      label: "Large beverage retailer",
      why: "Cases and variety — good when you need volume or staples.",
      mapsUrl: mapsSearch("beer store", area),
    },
  ],
  spirits: (area, hint) => [
    {
      label: "Liquor store",
      why: `Widest spirits wall for ${hint || "what you're after"}.`,
      mapsUrl: mapsSearch("liquor store", area),
    },
    {
      label: "Warehouse club / big-box (where permitted)",
      why: "Value on popular labels when you don't need rare bottles.",
      mapsUrl: mapsSearch("liquor store spirits", area),
    },
  ],
  bubbles: (area, hint) => [
    {
      label: "Wine shop with sparkling section",
      why: `${hint || "Sparkling"} stays better when shops turn inventory — ask what's chilled.`,
      mapsUrl: mapsSearch("wine shop champagne", area),
    },
    {
      label: "Upscale grocery",
      why: "Prosecco, Cava, and entry Champagne for same-day plans.",
      mapsUrl: mapsSearch("grocery store champagne", area),
    },
  ],
  general: (area) => [
    {
      label: "Total Wine or regional superstore",
      why: "One stop for wine, beer, and spirits with decent guidance.",
      mapsUrl: mapsSearch("Total Wine", area),
    },
    {
      label: "Independent liquor store",
      why: "Often the best local knowledge and special orders.",
      mapsUrl: mapsSearch("liquor store", area),
    },
  ],
};

function productHint(message: string): string {
  const trimmed = message.trim();
  if (trimmed.length < 120) return trimmed;
  return trimmed.slice(0, 117) + "…";
}

export function buildRetailPicks(
  message: string,
  area: string,
): RetailPick[] {
  const category = detectAlcoholCategory(message);
  const hint = productHint(message);
  return PICKS[category](area, hint);
}

/** Plain-text reply for offline chat or LLM grounding. */
export function formatRetailReply(message: string, area: string): string {
  const category = detectAlcoholCategory(message);
  const picks = buildRetailPicks(message, area);
  const kind =
    category === "general"
      ? "what you're looking for"
      : category === "bubbles"
        ? "sparkling wine"
        : category;

  let text = `Near ${area}, for ${kind}, I'd start here:\n\n`;
  picks.forEach((p, i) => {
    text += `${i + 1}. **${p.label}** — ${p.why}\n   Maps: ${p.mapsUrl}\n\n`;
  });
  text +=
    "Tell me the style or budget and I can narrow this further — or name a store you prefer and I'll suggest what to grab.";
  return text.replace(/\*\*/g, "");
}

export async function reverseGeocodeArea(
  lat: number,
  lon: number,
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "ThomasAssistant/1.0 (beverage demo)",
        },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      address?: {
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        state?: string;
        postcode?: string;
      };
    };
    const a = data.address;
    if (!a) return null;
    const city = a.city ?? a.town ?? a.village ?? a.county;
    if (!city) return a.postcode ?? null;
    return a.state ? `${city}, ${a.state}` : city;
  } catch {
    return null;
  }
}

export function retailContextForLlm(area: string | null): string {
  if (!area) {
    return "Guest area: not set. If they ask where to buy alcohol, ask for city or ZIP first, then suggest retailer types (wine shop, liquor store, craft bottle shop) — never invent exact street addresses.";
  }
  return `Guest area: ${area}. When they ask where to buy wine, beer, or spirits, suggest 2–3 retailer types near ${area} (wine shop, liquor store, craft bottle shop, upscale grocery). Mention they can search maps for "${area}". Do not invent specific store street addresses unless naming common chains (Total Wine, etc.).`;
}
