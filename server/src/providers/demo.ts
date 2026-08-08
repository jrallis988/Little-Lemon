import type { AiProvider, StreamParams } from './types.js';

export const demoProvider: AiProvider = {
  id: 'demo',
  async *streamCompletion({ systemPrompt, messages }: StreamParams) {
    const lastUser = [...messages].reverse().find((message) => message.role === 'user');
    const identity = systemPrompt.split('\n')[0] ?? 'You are an AI employee.';
    const reply = [
      `${identity}`,
      '',
      '### Recommended approach',
      '1. Clarify the desired outcome and constraints.',
      '2. Produce a concrete first draft or checklist.',
      '3. Call out risks, owners, and next review points.',
      '',
      lastUser
        ? `You asked: “${lastUser.content.slice(0, 220)}${lastUser.content.length > 220 ? '…' : ''}”`
        : 'Share a goal and I’ll draft the next artifact.',
      '',
      '_Streaming via demo provider — connect OpenAI, Anthropic, Gemini, Grok, or Ollama for live models._',
    ].join('\n');

    for (const token of reply.match(/\s+|\S+/g) ?? [reply]) {
      yield token;
      await new Promise((resolve) => setTimeout(resolve, 12));
    }
  },
};
