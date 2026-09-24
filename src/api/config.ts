/**
 * API configuration — swap between mock (default) and remote backend via env.
 */
export type ApiMode = 'mock' | 'remote';

const rawMode = process.env.EXPO_PUBLIC_API_MODE as ApiMode | undefined;
const rawUrl = process.env.EXPO_PUBLIC_API_URL;

export const apiConfig = {
  /** mock = in-process demo server; remote = EXPO_PUBLIC_API_URL */
  mode: (rawMode === 'remote' && rawUrl ? 'remote' : 'mock') as ApiMode,
  baseUrl: rawUrl?.replace(/\/$/, '') ?? '',
  timeoutMs: 15_000,
  /** Demo credentials for QA / TestFlight */
  demoEmail: 'demo@biocross.app',
  demoPassword: 'demo1234',
} as const;

export function isRemoteApi(): boolean {
  return apiConfig.mode === 'remote' && apiConfig.baseUrl.length > 0;
}
