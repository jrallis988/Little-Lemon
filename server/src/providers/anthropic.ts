import Anthropic from '@anthropic-ai/sdk';
import type { AiProvider, StreamParams } from './types.js';

export function createAnthropicProvider(
  apiKey = process.env.ANTHROPIC_API_KEY,
): AiProvider | null {
  if (!apiKey) return null;
  const client = new Anthropic({ apiKey });

  return {
    id: 'anthropic',
    async *streamCompletion({ systemPrompt, messages, model, signal }: StreamParams) {
      const stream = client.messages.stream(
        {
          model: model ?? 'claude-3-5-sonnet-latest',
          max_tokens: 1200,
          system: systemPrompt,
          messages: messages
            .filter((message) => message.role !== 'system')
            .map((message) => ({
              role: message.role === 'assistant' ? 'assistant' : 'user',
              content: message.content,
            })),
        },
        { signal },
      );

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta' &&
          event.delta.text
        ) {
          yield event.delta.text;
        }
      }
    },
  };
}
