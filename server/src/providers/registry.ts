import { createAnthropicProvider } from './anthropic.js';
import { demoProvider } from './demo.js';
import { createGeminiProvider } from './gemini.js';
import { createGrokProvider } from './grok.js';
import { createOllamaProvider } from './ollama.js';
import { createOpenAiProvider } from './openai.js';
import type { AiProvider, ProviderId } from './types.js';

export function getProvider(id: ProviderId): AiProvider {
  const map: Partial<Record<ProviderId, AiProvider | null>> = {
    openai: createOpenAiProvider(),
    anthropic: createAnthropicProvider(),
    gemini: createGeminiProvider(),
    grok: createGrokProvider(),
    ollama: createOllamaProvider(),
    demo: demoProvider,
  };

  const selected = map[id];
  if (selected) return selected;

  const fallback = process.env.DEFAULT_AI_PROVIDER as ProviderId | undefined;
  if (fallback && fallback !== id && map[fallback]) {
    return map[fallback]!;
  }

  return demoProvider;
}

export function listProviders() {
  return [
    { id: 'demo', available: true },
    { id: 'openai', available: Boolean(process.env.OPENAI_API_KEY) },
    { id: 'anthropic', available: Boolean(process.env.ANTHROPIC_API_KEY) },
    { id: 'gemini', available: Boolean(process.env.GOOGLE_AI_API_KEY) },
    { id: 'grok', available: Boolean(process.env.XAI_API_KEY) },
    { id: 'ollama', available: true },
  ];
}
