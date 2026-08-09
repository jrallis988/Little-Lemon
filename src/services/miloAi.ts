import type { AcademicSearchResponse, SanitizedArticle } from "@/types";
import { MILO_NAME, MILO_SHORT_NAME } from "@/brand/identity";

export type MiloMessage = {
  role: "user" | "assistant";
  content: string;
};

type MiloContext = {
  query?: string;
  academic?: AcademicSearchResponse | null;
  article?: SanitizedArticle | null;
  grade?: number;
};

const TUTOR_SYSTEM = `You are Milo, Surf’s AI learning aide for students (grades 1–12).
Rules:
- Help students learn: explain ideas in clear language, build vocabulary, and point to trusted sources.
- Never write a full homework answer or essay the student can turn in as their own work.
- Prefer questions, guided steps, and short explanations.
- When sources are provided, cite them by title/publisher — do not invent URLs.
- Match the student’s grade level when given.
- Keep replies concise (under ~180 words) unless asked for more.
- Tone: calm, encouraging, academic — never cartoonish or condescending.`;

function providerConfig() {
  const key =
    import.meta.env.VITE_SURF_AI_API_KEY?.trim() ||
    import.meta.env.VITE_ANTHROPIC_API_KEY?.trim() ||
    "";
  const provider = (
    import.meta.env.VITE_SURF_AI_PROVIDER?.trim() ||
    (import.meta.env.VITE_ANTHROPIC_API_KEY ? "anthropic" : "openai")
  ).toLowerCase();
  const model =
    import.meta.env.VITE_SURF_AI_MODEL?.trim() ||
    (provider === "anthropic" ? "claude-sonnet-4-6" : "gpt-4o-mini");
  return { key, provider, model };
}

export function isMiloConfigured(): boolean {
  return Boolean(providerConfig().key);
}

export async function askMilo(
  prompt: string,
  context: MiloContext = {},
): Promise<{ reply: string; live: boolean }> {
  const question = prompt.trim();
  if (!question) {
    return {
      reply: `${MILO_SHORT_NAME} is ready — ask about a word, idea, or source on this page.`,
      live: false,
    };
  }

  const { key, provider, model } = providerConfig();
  if (!key) {
    return { reply: buildLocalTutorReply(question, context), live: false };
  }

  try {
    if (provider === "anthropic") {
      const reply = await callAnthropic(key, model, question, context);
      return { reply, live: true };
    }
    const reply = await callOpenAI(key, model, question, context);
    return { reply, live: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Milo could not reach the AI service.";
    return {
      reply: `${buildLocalTutorReply(question, context)}\n\n(Live ${MILO_NAME} unavailable: ${message})`,
      live: false,
    };
  }
}

function contextBlock(context: MiloContext): string {
  const parts: string[] = [];
  if (context.grade) parts.push(`Student grade: ${context.grade}`);
  if (context.query) parts.push(`Current research topic: ${context.query}`);
  if (context.academic?.abstractSummary) {
    parts.push(`Research briefing: ${context.academic.abstractSummary}`);
  }
  if (context.academic?.keyVocabulary?.length) {
    parts.push(
      `Key vocabulary: ${context.academic.keyVocabulary.slice(0, 8).join(", ")}`,
    );
  }
  if (context.academic?.results?.length) {
    const top = context.academic.results
      .slice(0, 3)
      .map(
        (hit, index) =>
          `${index + 1}. ${hit.title} (${hit.publisher}) — ${hit.citation}`,
      )
      .join("\n");
    parts.push(`Trusted sources:\n${top}`);
  }
  if (context.article) {
    parts.push(
      `Open article: ${context.article.title} (${context.article.source}) ${context.article.url}`,
    );
    if (context.article.citation) {
      parts.push(`Article citation: ${context.article.citation}`);
    }
  }
  return parts.join("\n\n");
}

async function callAnthropic(
  key: string,
  model: string,
  question: string,
  context: MiloContext,
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      system: `${TUTOR_SYSTEM}\n\n${contextBlock(context)}`,
      messages: [{ role: "user", content: question }],
    }),
  });
  if (!response.ok) {
    throw new Error(`Anthropic HTTP ${response.status}`);
  }
  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((part) => part.type === "text")?.text?.trim();
  if (!text) throw new Error("Empty Anthropic response");
  return text;
}

async function callOpenAI(
  key: string,
  model: string,
  question: string,
  context: MiloContext,
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `${TUTOR_SYSTEM}\n\n${contextBlock(context)}`,
        },
        { role: "user", content: question },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI HTTP ${response.status}`);
  }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty OpenAI response");
  return text;
}

function buildLocalTutorReply(question: string, context: MiloContext): string {
  const academic = context.academic;
  const vocab = academic?.keyVocabulary?.slice(0, 5) ?? [];
  const top = academic?.results?.[0];
  const gradeHint = context.grade
    ? `I’ll keep this around grade ${context.grade}.`
    : "I’ll keep this age-appropriate.";

  return [
    `${MILO_SHORT_NAME} here — ${gradeHint} I’ll help you learn, not just finish the work.`,
    "",
    academic?.abstractSummary
      ? `Plain-language start: ${academic.abstractSummary}`
      : `You’re asking: “${question}”. Start by naming one idea you already know, then one thing you’re unsure about.`,
    vocab.length ? `Watch these words: ${vocab.join(", ")}.` : null,
    top
      ? `Strong next read: “${top.title}” (${top.recommendedGrades}). Citation: ${top.citation}`
      : null,
    "",
    "Try this: write one sentence in your own words, then list two facts you can cite.",
    "",
    `(Offline tutor mode — set VITE_SURF_AI_API_KEY to enable live ${MILO_NAME}.)`,
  ]
    .filter(Boolean)
    .join("\n");
}
