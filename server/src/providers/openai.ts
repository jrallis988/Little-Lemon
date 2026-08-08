import OpenAI from 'openai';
import type { AiProvider, StreamParams } from './types.js';

export function createOpenAiProvider(apiKey = process.env.OPENAI_API_KEY): AiProvider | null {
  if (!apiKey) return null;
  const client = new OpenAI({ apiKey });

  return {
    id: 'openai',
    async *streamCompletion({ systemPrompt, messages, model, signal }: StreamParams) {
      const stream = await client.chat.completions.create(
        {
          model: model ?? 'gpt-4o-mini',
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
