import type { ChatMessage } from "./types";
import { matchBrowserReply } from "./thomas-persona";
import {
  PAIRING_TOOL,
  WEB_TOOL,
  composeCulinaryReply,
  formatPairingNotes,
  retrieveCulinary,
  runCulinaryTool,
} from "./culinary-knowledge";

/** Same-origin proxy → local Ollama (see vite.config.js). */
const OLLAMA_CHAT = "/api/ollama/api/chat";
const DEFAULT_MODEL = import.meta.env.VITE_OLLAMA_MODEL ?? "llama3.2:1b";
const MAX_TURNS = 24;

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  messages: ChatTurn[];
  context?: string;
}

export interface ChatCompletionResponse {
  role: "assistant";
  content: string;
  sources?: string[];
}

export const THOMAS_SYSTEM_BUSINESS = `You are Thomas: expert personal bartender and beverage operations intelligence for the house.
You are a sommelier-level pairing authority — wine, beer, spirits, sides, and vegetables — who also quietly keeps the cellar and the night in order.

VOICE:
- Warm, professional, unhurried hospitality. Speak with authority, never like IT support.
- Open with grace when natural: "Certainly", "If I may", "Might I suggest", "At your service".
- Describe drinks through the senses: aroma, body, finish, how they companion a dish.
- Keep answers concise: two to four sentences unless asked for more.
- Remember the full conversation. Follow-ups ("what wine?", "and a vegetable?") stay on the same dish. Never restart as if the guest said nothing.

NEVER SAY: SKU, variance, critical, audit, CSV, JSON, database, system, operator, panel, reconcile.

INSTEAD SAY:
- Stock: "we're short on the house Porter", "the cellar count for the IPA looks right".
- Till: "the register is nearly balanced", "a small discrepancy in the drawer".
- Records: "I've made a careful note for the proprietor".

PAIRINGS:
Use culinary notes and tool results when present. Prefer the house lineup when it fits. Name grapes, styles, and vegetables with confidence. Do not invent street addresses.

LOCAL PICKS: When asked where to buy wine, beer, or spirits, suggest retailer types near their area. Name common chains when helpful. If area is unknown, ask for city or ZIP first.

You may call search_pairings and search_web when you need a dish card or a culinary reference.`;

export const THOMAS_SYSTEM_PERSONAL = `You are Thomas: the guest's own personal bartender and sommelier at home.
You speak with warm, professional, unhurried hospitality — expert on pairings, never robotic.

VOICE:
- Open with grace when natural: "Certainly", "If I may", "Might I suggest".
- Describe drinks through the senses: aroma, body, finish, how they companion a dish.
- Keep answers concise: two to four sentences unless asked for more.
- Remember the full conversation. Follow-ups stay on the same dish, wine, or side.

If their home bar is listed in the notes, prefer those bottles when suggesting a pour.
Use culinary notes and tool results for food pairings (wine, beer, vegetables, sides). Do not invent street addresses.
LOCAL PICKS: Suggest retailer types near their area. If area is unknown, ask for city or ZIP first.

You may call search_pairings and search_web when you need a dish card or a culinary reference.`;

function systemForContext(context: string): string {
  return context.includes("PRODUCT_MODE=personal")
    ? THOMAS_SYSTEM_PERSONAL
    : THOMAS_SYSTEM_BUSINESS;
}

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

export function toChatTurns(
  messages: Pick<ChatMessage, "role" | "content">[],
): ChatTurn[] {
  return messages
    .filter((m) => m.content.trim().length > 0)
    .slice(-MAX_TURNS)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));
}

function latestUserMessage(turns: ChatTurn[]): string {
  for (let i = turns.length - 1; i >= 0; i--) {
    if (turns[i].role === "user") return turns[i].content;
  }
  return "";
}

type WireMessage = {
  role: string;
  content: string;
  tool_calls?: unknown;
};

function buildWireMessages(
  turns: ChatTurn[],
  context: string,
  culinaryNotes: string,
): WireMessage[] {
  const systemPrompt = systemForContext(context);
  const extras: string[] = [];
  if (context.trim()) {
    extras.push(`House notes (speak naturally, not technically):\n${context}`);
  }
  if (culinaryNotes.trim()) {
    extras.push(
      `Culinary briefing (use this; keep Thomas's voice; do not invent addresses):\n${culinaryNotes}`,
    );
  }
  const system =
    extras.length > 0
      ? `${systemPrompt}\n\n${extras.join("\n\n")}`
      : systemPrompt;

  return [
    { role: "system", content: system },
    ...turns.map((t) => ({ role: t.role, content: t.content })),
  ];
}

interface OllamaToolCall {
  function?: { name?: string; arguments?: string | Record<string, unknown> };
}

interface OllamaChatBody {
  message?: {
    content?: string;
    tool_calls?: OllamaToolCall[];
  };
}

function parseToolArgs(
  raw: string | Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function ollamaChat(
  messages: WireMessage[],
  withTools: boolean,
): Promise<OllamaChatBody | null> {
  const payload: Record<string, unknown> = {
    model: DEFAULT_MODEL,
    messages,
    stream: false,
  };
  if (withTools) {
    payload.tools = [PAIRING_TOOL, WEB_TOOL];
  }

  const res = await fetch(OLLAMA_CHAT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    ollamaAvailable = false;
    return null;
  }
  ollamaAvailable = true;
  return (await res.json()) as OllamaChatBody;
}

/**
 * Full multi-turn completion: culinary retrieval, optional tool loop, Ollama.
 * Used by /api/chat and by the browser when that route is unavailable.
 */
export async function runChatCompletion(
  request: ChatCompletionRequest,
): Promise<ChatCompletionResponse> {
  const turns = toChatTurns(request.messages ?? []);
  const context = request.context ?? "";
  const latest = latestUserMessage(turns);
  const sources: string[] = [];

  const hit = latest
    ? await retrieveCulinary(latest, turns, { web: true })
    : null;

  let culinaryNotes = "";
  if (hit) {
    if (hit.entry.id !== "web") {
      culinaryNotes = formatPairingNotes(hit.entry, hit.focus);
      sources.push(`pairings:${hit.entry.id}`);
    }
    if (hit.webNotes.length) {
      culinaryNotes += `\nWeb references:\n${hit.webNotes.join("\n")}`;
      sources.push("wikipedia");
    }
  }

  const wire = buildWireMessages(turns, context, culinaryNotes);

  try {
    let body = await ollamaChat(wire, true);
    if (body?.message?.tool_calls?.length) {
      const toolMsgs: WireMessage[] = [...wire];
      toolMsgs.push({
        role: "assistant",
        content: body.message.content ?? "",
        tool_calls: body.message.tool_calls,
      });
      for (const call of body.message.tool_calls) {
        const name = call.function?.name ?? "";
        const args = parseToolArgs(call.function?.arguments);
        const result = await runCulinaryTool(name, {
          dish: typeof args.dish === "string" ? args.dish : undefined,
          focus:
            args.focus === "wine" ||
            args.focus === "beer" ||
            args.focus === "sides" ||
            args.focus === "vegetables"
              ? args.focus
              : "all",
          query: typeof args.query === "string" ? args.query : undefined,
        });
        sources.push(`tool:${name}`);
        toolMsgs.push({ role: "tool", content: result });
      }
      body = await ollamaChat(toolMsgs, false);
    }

    const text = body?.message?.content?.trim();
    if (text) {
      return { role: "assistant", content: text, sources };
    }
  } catch {
    ollamaAvailable = false;
  }

  return {
    role: "assistant",
    content: offlineCompletion(latest, context, turns, hit),
    sources,
  };
}

function offlineCompletion(
  latest: string,
  context: string,
  turns: ChatTurn[],
  hit: Awaited<ReturnType<typeof retrieveCulinary>>,
): string {
  if (hit && hit.entry.id !== "web") {
    return composeCulinaryReply(hit.entry, hit.focus, hit.fromHistory);
  }
  if (hit?.webNotes.length) {
    const snippet = hit.webNotes[0];
    return `If I may — ${snippet} I'd still keep the glass light if the dish is delicate, and ask whether you want wine, beer, or a vegetable on the plate next.`;
  }

  return matchBrowserReply(latest, context, turns as ChatMessage[], null);
}

/** Browser entry: prefer the stateful /api/chat route, then run locally. */
export async function completeChat(
  request: ChatCompletionRequest,
): Promise<string> {
  if (typeof fetch === "function") {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (res.ok) {
        const data = (await res.json()) as ChatCompletionResponse & {
          error?: string;
        };
        if (data.content?.trim()) return data.content.trim();
      }
    } catch {
      /* static hosts have no /api/chat — fall through */
    }
  }
  const local = await runChatCompletion(request);
  return local.content;
}

/** @deprecated use runChatCompletion */
export async function chatViaOllama(
  userMessage: string,
  context: string,
  history: ChatMessage[],
): Promise<string | null> {
  const turns = toChatTurns(history);
  const last = turns[turns.length - 1];
  if (!last || last.role !== "user" || last.content !== userMessage) {
    turns.push({ role: "user", content: userMessage });
  }
  const result = await runChatCompletion({ messages: turns, context });
  const live = ollamaAvailable === true;
  return live ? result.content : null;
}
