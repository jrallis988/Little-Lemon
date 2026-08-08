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
  const necessity = employee.humanNecessityExamples[0];
  return [
    `Got it — as **${employee.name}**, ${employee.jobTitle}, I'll treat this as work to complete, not a FAQ.`,
    '',
    `### Immediate next steps`,
    `1. Investigate the relevant records for **${focus[0]}**.`,
    `2. Act inside policy on **${focus[1] ?? focus[0]}** using connected systems.`,
    `3. Document, notify, and escalate only if human judgment is required for **${focus[2] ?? focus[0]}**.`,
    '',
    necessity
      ? `Human Necessity signal: **${necessity.classification.replace('_', ' + ')}** for “${necessity.task}”.`
      : employee.personality,
    '',
    prompt
      ? `Based on your note — “${prompt.slice(0, 160)}${prompt.length > 160 ? '…' : ''}” — I can continue the workflow or prepare an approval action.`
      : 'Tell me the outcome you need and I’ll run the workflow within my job boundaries.',
    '',
    `_Working Intelligence · demo · ${employee.department}_`,
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
