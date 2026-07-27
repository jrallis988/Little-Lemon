import type { AiAction, AiActionResult } from "@/types";
import type { PageContext } from "@/services/browserBridge";

export const AI_ACTIONS: AiAction[] = [
  {
    id: "summarize",
    label: "Summarize page",
    description: "Create a short study summary from the current page.",
  },
  {
    id: "define",
    label: "Explain key terms",
    description: "Find important vocabulary and explain it simply.",
  },
  {
    id: "quiz",
    label: "Make practice questions",
    description: "Turn the page into a few review questions.",
  },
  {
    id: "citations",
    label: "Prepare citation",
    description: "Create citation details from the page metadata.",
  },
];

function hasAiProviderKey(): boolean {
  const env = import.meta.env as Record<string, string | undefined>;
  return Boolean(env.VITE_SURF_AI_API_KEY || env.SURF_AI_API_KEY);
}

export async function runAiAction(
  action: AiAction,
  context: PageContext | null,
  prompt?: string,
): Promise<AiActionResult> {
  if (!context && !prompt) {
    return {
      status: "unavailable",
      title: "Ask a question or open a page",
      message: "AI actions need a prompt from the address bar or a current page.",
    };
  }

  if (!hasAiProviderKey()) {
    return {
      status: "unavailable",
      title: `${action.label} unavailable`,
      message:
        "Surf AI is not configured. Set VITE_SURF_AI_API_KEY to enable page-aware assistance.",
    };
  }

  const subject = context
    ? `${context.title} (${context.url})`
    : "your learning question";

  return {
    status: "unavailable",
    title: `${action.label} not connected`,
    message: `Surf captured context for ${subject}${prompt ? ` with prompt “${prompt}”` : ""}, but the production AI provider bridge is not wired yet.`,
  };
}
