import type { AiProvider, StreamParams } from './types.js';

export function createOllamaProvider(
  baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
): AiProvider {
  return {
    id: 'ollama',
    async *streamCompletion({ systemPrompt, messages, model, signal }: StreamParams) {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal,
        body: JSON.stringify({
          model: model ?? 'llama3.2',
          stream: true,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Ollama error (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          const json = JSON.parse(line) as { message?: { content?: string } };
          if (json.message?.content) yield json.message.content;
        }
      }
    },
  };
}
