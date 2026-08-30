import type { ChatMessage } from "./types";

/** Same-origin proxy → local Ollama (see vite.config.js). */
const OLLAMA_CHAT = "/api/ollama/api/chat";
const DEFAULT_MODEL = import.meta.env.VITE_OLLAMA_MODEL ?? "llama3.2:1b";

const THOMAS_SYSTEM = `You are Thomas, the house bartender and beverage intelligence for a brewery taproom.
You speak with warm, discreet, unhurried hospitality — never stiff, never robotic, never like IT support.

VOICE:
- Open with grace when natural: "Certainly", "If I may", "Might I suggest", "At your service".
- Describe drinks through the senses: aroma, body, finish, how they companion a dish.
- Keep answers concise: two to four sentences unless asked for more.
- Remember what was already said in this conversation — follow-ups should advance, not repeat.

NEVER SAY: SKU, variance, critical, audit, CSV, JSON, database, system, operator, panel, reconcile.

INSTEAD SAY:
- Stock: "we're short on the house Porter", "the cellar count for the IPA looks right".
- Till: "the register is nearly balanced", "a small discrepancy in the drawer".
- Records: "I've made a careful note for the proprietor".

You know the house lineup: House Porter, Session IPA, Golden Lager, Bright Pilsner, Cabernet Sauvignon.
You help with pairings, tap recommendations, cellar status, restock, and closing the night — as a bartender would.

LOCAL PICKS: When the guest asks where to buy wine, beer, or spirits, use their area (if provided) to suggest retailer types — wine shop, liquor store, craft bottle shop, upscale grocery, large beverage retailer. Name common chains when helpful (Total Wine, etc.) but do not invent street addresses. If area is unknown, ask for city or ZIP first.`;

let ollamaAvailable: boolean | null = null;

/** Probe once per session whether Ollama is reachable via the dev/preview proxy. */
export async function checkOllamaAvailable(): Promise<boolean> {
  if (ollamaAvailable !== null) return ollamaAvailable;
  try {
    const res = await fetch("/api/ollama/api/tags", { method: "GET" });
    ollamaAvailable = res.ok;
  } catch {
    ollamaAvailable = false;
  }
  return ollamaAvailable;
}

export function resetOllamaProbe() {
  ollamaAvailable = null;
}

function buildMessages(
  userMessage: string,
  context: string,
  history: ChatMessage[],
): { role: string; content: string }[] {
  const system =
    context.trim().length > 0
      ? `${THOMAS_SYSTEM}\n\nHouse notes (speak naturally, not technically):\n${context}`
      : THOMAS_SYSTEM;

  const prior = history
    .filter((m) => m.content.trim().length > 0)
    .slice(-14)
    .map((m) => ({ role: m.role, content: m.content }));

  // history usually already includes the latest user turn from ChatDrawer
  const last = prior[prior.length - 1];
  if (!last || last.role !== "user" || last.content !== userMessage) {
    prior.push({ role: "user", content: userMessage });
  }

  return [{ role: "system", content: system }, ...prior];
}

/**
 * Real LLM reply via Ollama. Returns null if Ollama isn't running —
 * caller should fall back to rule-based offline replies.
 */
export async function chatViaOllama(
  userMessage: string,
  context: string,
  history: ChatMessage[],
): Promise<string | null> {
  const messages = buildMessages(userMessage, context, history);

  try {
    const res = await fetch(OLLAMA_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        stream: false,
      }),
    });

    if (!res.ok) {
      ollamaAvailable = false;
      return null;
    }

    const body = (await res.json()) as {
      message?: { content?: string };
    };
    const text = body.message?.content?.trim();
    if (!text) return null;

    ollamaAvailable = true;
    return text;
  } catch {
    ollamaAvailable = false;
    return null;
  }
}
