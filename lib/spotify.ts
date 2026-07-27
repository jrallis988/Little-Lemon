/**
 * Spotify Web API catalog sync (stub).
 *
 * Product target: look up essentially anyone on Spotify from ~2010–present
 * (plus living catalog acts like Weird Al). Full ingest needs:
 * - Spotify Developer app (Client ID / Secret)
 * - Backend token exchange (never ship client secret in the app)
 * - Periodic sync into Supabase `artists` / `tracks` tables
 *
 * This module is the client-facing contract so Search UI can swap
 * demo seed → live catalog without rewriting screens.
 */

export type SpotifyCatalogConfig = {
  enabled: boolean;
  /** Public client id only — tokens come from your backend */
  clientId: string | null;
  coverageNote: string;
};

export function getSpotifyCatalogConfig(): SpotifyCatalogConfig {
  const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID?.trim() || null;
  return {
    enabled: Boolean(clientId),
    clientId,
    coverageNote:
      'Target catalog: contemporary Spotify-scale artists & songs (~2010–present), plus living catalog acts. Demo seed proves search UX until sync is live.',
  };
}

export type SpotifySyncStatus = {
  configured: boolean;
  message: string;
};

export function getSpotifySyncStatus(): SpotifySyncStatus {
  const cfg = getSpotifyCatalogConfig();
  if (!cfg.enabled) {
    return {
      configured: false,
      message:
        'Spotify sync not configured. Set EXPO_PUBLIC_SPOTIFY_CLIENT_ID and a backend token route to pull the full catalog.',
    };
  }
  return {
    configured: true,
    message:
      'Spotify client id present. Connect the sync Edge Function to replace demo catalog rows.',
  };
}
