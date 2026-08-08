import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AiProvider, StreamParams } from './types.js';

export function createGeminiProvider(apiKey = process.env.GOOGLE_AI_API_KEY): AiProvider | null {
  if (!apiKey) return null;
  const client = new GoogleGenerativeAI(apiKey);

  return {
    id: 'gemini',
    async *streamCompletion({ systemPrompt, messages, model }: StreamParams) {
      const generativeModel = client.getGenerativeModel({
        model: model ?? 'gemini-2.0-flash',
        systemInstruction: systemPrompt,
      });

      const history = messages.slice(0, -1).map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      }));
      const last = messages[messages.length - 1]?.content ?? '';

      const chat = generativeModel.startChat({ history });
      const result = await chat.sendMessageStream(last);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) yield text;
      }
    },
  };
}
