/**
 * API configuration — swap between mock (default) and remote backend via env.
 */
export type ApiMode = 'mock' | 'remote';

const PLACEHOLDER_HOST =
  /YOUR-API-HOST|example\.com|localhost\.invalid|changeme|your-api/i;

/** True when the URL is missing or still a template placeholder. */
export function isPlaceholderApiUrl(url: string | undefined | null): boolean {
  if (!url?.trim()) return true;
  return PLACEHOLDER_HOST.test(url);
}

function resolveMode(rawMode: string | undefined, rawUrl: string | undefined): ApiMode {
  if (rawMode !== 'remote') return 'mock';
  if (isPlaceholderApiUrl(rawUrl)) return 'mock';
  return 'remote';
}

const rawMode = process.env.EXPO_PUBLIC_API_MODE as ApiMode | undefined;
const rawUrl = process.env.EXPO_PUBLIC_API_URL;
const mode = resolveMode(rawMode, rawUrl);
const baseUrl = mode === 'remote' ? (rawUrl?.replace(/\/$/, '') ?? '') : '';

if (rawMode === 'remote' && isPlaceholderApiUrl(rawUrl)) {
  // Avoid shipping broken remote builds when EAS still has a template URL.
  console.warn(
    '[biocross] EXPO_PUBLIC_API_MODE=remote but EXPO_PUBLIC_API_URL is missing or a placeholder — using mock API.',
  );
}

export const apiConfig = {
  /** mock = in-process demo server; remote = EXPO_PUBLIC_API_URL */
  mode: mode as ApiMode,
  baseUrl,
  timeoutMs: 15_000,
  /** Demo credentials for QA / TestFlight */
  demoEmail: 'demo@biocross.app',
  demoPassword: 'demo1234',
} as const;

export function isRemoteApi(): boolean {
  return apiConfig.mode === 'remote' && apiConfig.baseUrl.length > 0;
}
