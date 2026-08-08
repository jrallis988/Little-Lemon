import type { AiEmployee, AiProviderId, ChatMessage } from '@/types';

export interface StreamChatParams {
  employee: AiEmployee;
  messages: ChatMessage[];
  provider?: AiProviderId;
  signal?: AbortSignal;
  onToken: (token: string) => void;
}

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function streamChatCompletion(params: StreamChatParams): Promise<string> {
  const { employee, messages, provider, signal, onToken } = params;

  try {
    const response = await fetch(`${API_BASE}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        provider: provider ?? employee.provider,
        model: employee.model,
        systemPrompt: employee.systemPrompt,
        employee: {
          id: employee.id,
          name: employee.name,
          jobTitle: employee.jobTitle,
          department: employee.department,
          personality: employee.personality,
          responsibilities: employee.responsibilities,
          knowledgeBase: employee.knowledgeBase,
        },
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Chat API error (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let full = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      full += chunk;
      onToken(chunk);
    }

    return full;
  } catch (error) {
    if (signal?.aborted) throw error;
    return streamDemoCompletion(employee, messages, onToken, signal);
  }
}

async function streamDemoCompletion(
  employee: AiEmployee,
  messages: ChatMessage[],
  onToken: (token: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const lastUser = [...messages].reverse().find((message) => message.role === 'user');
  const prompt = lastUser?.content ?? '';
  const reply = buildDemoReply(employee, prompt);
  let full = '';

  for (const token of tokenize(reply)) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    full += token;
    onToken(token);
    await wait(16 + Math.random() * 28);
  }

  return full;
}

function buildDemoReply(employee: AiEmployee, prompt: string): string {
  const focus = employee.responsibilities.slice(0, 3);
  return [
    `Got it — as your **${employee.jobTitle}**, here's how I'd approach that.`,
    '',
    `### Immediate next steps`,
    `1. Clarify the outcome for **${focus[0]}**.`,
    `2. Draft a first pass related to **${focus[1] ?? focus[0]}**.`,
    `3. Check dependencies with **${focus[2] ?? focus[0]}**.`,
    '',
    `### Notes from my lane`,
    employee.personality,
    '',
    prompt
      ? `Based on your note — “${prompt.slice(0, 160)}${prompt.length > 160 ? '…' : ''}” — I can produce a polished draft, checklist, or briefing next.`
      : 'Tell me whether you want a draft, checklist, or briefing and I’ll produce it.',
    '',
    `_Provider: demo · ${employee.department}_`,
  ].join('\n');
}

function tokenize(text: string): string[] {
  return text.match(/\s+|\S+/g) ?? [text];
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
