export type ProviderId = 'openai' | 'anthropic' | 'gemini' | 'grok' | 'ollama' | 'demo';

export interface ChatMessageInput {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamParams {
  systemPrompt: string;
  messages: ChatMessageInput[];
  model?: string;
  signal?: AbortSignal;
}

export interface AiProvider {
  id: ProviderId;
  streamCompletion(params: StreamParams): AsyncGenerator<string, void, unknown>;
}
