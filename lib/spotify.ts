import { Linking, Platform } from 'react-native';

/**
 * Spotify outbound + catalog sync contract.
 *
 * Phase 1 (this module): hand listening off to Spotify via deep links /
 * open.spotify.com. No embeds, no in-app player, no audio proxy.
 *
 * Later: Web API metadata sync + optional PKCE “Add to library” once a
 * backend token route exists. Never ship a client secret in the app.
 */

export type SpotifyCatalogConfig = {
  enabled: boolean;
  /** Public client id only — tokens come from your backend */
  clientId: string | null;
  coverageNote: string;
};

export type SpotifyEntityKind = 'artist' | 'track' | 'album' | 'search';

export type SpotifyOutboundTarget = {
  kind: SpotifyEntityKind;
  /** Spotify base62 id when known */
  id?: string | null;
  /** Free-text search when id is missing */
  query?: string | null;
  label: string;
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

/** HTTPS URL that works in browsers and usually opens the Spotify app on mobile. */
export function spotifyWebUrl(target: SpotifyOutboundTarget): string | null {
  if (target.id && (target.kind === 'artist' || target.kind === 'track' || target.kind === 'album')) {
    return `https://open.spotify.com/${target.kind}/${target.id}`;
  }
  const q = target.query?.trim();
  if (q) {
    return `https://open.spotify.com/search/${encodeURIComponent(q)}`;
  }
  return null;
}

/** Native Spotify URI scheme (preferred on device when the app is installed). */
export function spotifyAppUri(target: SpotifyOutboundTarget): string | null {
  if (target.id && (target.kind === 'artist' || target.kind === 'track' || target.kind === 'album')) {
    return `spotify:${target.kind}:${target.id}`;
  }
  const q = target.query?.trim();
  if (q) {
    return `spotify:search:${encodeURIComponent(q)}`;
  }
  return null;
}

export function canOpenOnSpotify(target: SpotifyOutboundTarget): boolean {
  return Boolean(spotifyWebUrl(target));
}

/**
 * Open Spotify for listening / discovery.
 * Tries the app URI first on native; falls back to https open.spotify.com.
 */
export async function openOnSpotify(target: SpotifyOutboundTarget): Promise<boolean> {
  const web = spotifyWebUrl(target);
  if (!web) return false;

  if (Platform.OS !== 'web') {
    const app = spotifyAppUri(target);
    if (app) {
      try {
        const supported = await Linking.canOpenURL(app);
        if (supported) {
          await Linking.openURL(app);
          return true;
        }
      } catch {
        // Fall through to HTTPS.
      }
    }
  }

  await Linking.openURL(web);
  return true;
}

/**
 * “Add to Spotify” without OAuth: open the track in Spotify so the listener
 * can Save / Add to Liked Songs in-app (one tap in Spotify).
 *
 * True one-tap library write requires Spotify Authorization Code + PKCE and
 * `PUT /v1/me/tracks` — only when EXPO_PUBLIC_SPOTIFY_CLIENT_ID + backend
 * token exchange are wired. Until then this hand-off is the supported path.
 */
export async function addToSpotify(target: SpotifyOutboundTarget): Promise<{
  opened: boolean;
  mode: 'handoff' | 'api-pending';
  message: string;
}> {
  const cfg = getSpotifyCatalogConfig();
  const opened = await openOnSpotify(target);
  if (!opened) {
    return {
      opened: false,
      mode: 'handoff',
      message: 'No Spotify link available for this item.',
    };
  }
  if (cfg.enabled && target.kind === 'track' && target.id) {
    return {
      opened: true,
      mode: 'api-pending',
      message:
        'Opened in Spotify. Connect Spotify OAuth to save directly to Your Library from StaticVolume.',
    };
  }
  return {
    opened: true,
    mode: 'handoff',
    message: 'Opened in Spotify — tap Save / Liked Songs there to add it.',
  };
}

export function artistSpotifyTarget(input: {
  spotifyArtistId?: string | null;
  displayName: string;
}): SpotifyOutboundTarget {
  return {
    kind: input.spotifyArtistId ? 'artist' : 'search',
    id: input.spotifyArtistId,
    query: input.displayName,
    label: input.displayName,
  };
}

export function trackSpotifyTarget(input: {
  spotifyTrackId?: string | null;
  title: string;
  artistName: string;
}): SpotifyOutboundTarget {
  if (input.spotifyTrackId) {
    return {
      kind: 'track',
      id: input.spotifyTrackId,
      query: `${input.artistName} ${input.title}`,
      label: input.title,
    };
  }
  return {
    kind: 'search',
    query: `track:${input.title} artist:${input.artistName}`,
    label: input.title,
  };
}
