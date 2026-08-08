import OpenAI from 'openai';
import type { AiProvider, StreamParams } from './types.js';

export function createGrokProvider(apiKey = process.env.XAI_API_KEY): AiProvider | null {
  if (!apiKey) return null;
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.x.ai/v1',
  });

  return {
    id: 'grok',
    async *streamCompletion({ systemPrompt, messages, model, signal }: StreamParams) {
      const stream = await client.chat.completions.create(
        {
          model: model ?? 'grok-2-latest',
          stream: true,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        },
        { signal },
      );

      for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content;
        if (token) yield token;
      }
    },
  };
}
