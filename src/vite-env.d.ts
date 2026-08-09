/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SURF_AI_API_KEY?: string;
  readonly VITE_SURF_AI_PROVIDER?: "anthropic" | "openai" | string;
  readonly VITE_SURF_AI_MODEL?: string;
  readonly VITE_ANTHROPIC_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
