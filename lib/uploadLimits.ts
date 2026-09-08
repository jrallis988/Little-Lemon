/** Upload limits + MIME allowlists for artist media (Phase 2). */

export type MediaKind =
  | 'avatar'
  | 'header'
  | 'track_audio'
  | 'track_artwork'
  | 'release_artwork';

export type StorageBucket =
  | 'artist-avatars'
  | 'artist-headers'
  | 'track-audio'
  | 'track-artwork'
  | 'release-artwork';

export const UPLOAD_LIMITS = {
  avatar: {
    bucket: 'artist-avatars' as const,
    maxBytes: 5 * 1024 * 1024,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
    extensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
    label: 'Artist profile image',
  },
  header: {
    bucket: 'artist-headers' as const,
    maxBytes: 8 * 1024 * 1024,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
    extensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
    label: 'Header / cover media',
  },
  track_artwork: {
    bucket: 'track-artwork' as const,
    maxBytes: 5 * 1024 * 1024,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
    extensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
    label: 'Track artwork',
  },
  release_artwork: {
    bucket: 'release-artwork' as const,
    maxBytes: 5 * 1024 * 1024,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
    extensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
    label: 'Album / EP artwork',
  },
  track_audio: {
    bucket: 'track-audio' as const,
    maxBytes: 50 * 1024 * 1024,
    mimeTypes: [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/flac',
      'audio/mp4',
      'audio/m4a',
      'audio/aac',
      'audio/x-m4a',
    ] as const,
    extensions: ['.mp3', '.wav', '.flac', '.m4a', '.aac'] as const,
    label: 'Audio file',
  },
} satisfies Record<
  MediaKind,
  {
    bucket: StorageBucket;
    maxBytes: number;
    mimeTypes: readonly string[];
    extensions: readonly string[];
    label: string;
  }
>;

export type PickedFile = {
  uri: string;
  name: string;
  mimeType: string;
  size: number;
};

export type UploadValidationError = {
  code: 'too_large' | 'bad_type' | 'missing';
  message: string;
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateUpload(
  kind: MediaKind,
  file: PickedFile | null | undefined,
): UploadValidationError | null {
  const limits = UPLOAD_LIMITS[kind];
  if (!file) {
    return { code: 'missing', message: `Choose a ${limits.label.toLowerCase()}.` };
  }
  const mime = (file.mimeType || '').toLowerCase();
  const name = file.name.toLowerCase();
  const mimeOk =
    limits.mimeTypes.some((t) => t === mime) ||
    limits.extensions.some((ext) => name.endsWith(ext));
  if (!mimeOk) {
    return {
      code: 'bad_type',
      message: `${limits.label}: use ${limits.extensions.join(', ')}.`,
    };
  }
  if (file.size > limits.maxBytes) {
    return {
      code: 'too_large',
      message: `${limits.label} must be under ${formatBytes(limits.maxBytes)} (got ${formatBytes(file.size)}).`,
    };
  }
  return null;
}

export function extensionForFile(file: PickedFile): string {
  const fromName = file.name.includes('.')
    ? `.${file.name.split('.').pop()!.toLowerCase()}`
    : '';
  if (fromName && fromName.length <= 5) return fromName;
  if (file.mimeType.includes('png')) return '.png';
  if (file.mimeType.includes('webp')) return '.webp';
  if (file.mimeType.includes('wav')) return '.wav';
  if (file.mimeType.includes('flac')) return '.flac';
  if (file.mimeType.includes('m4a') || file.mimeType.includes('mp4')) return '.m4a';
  if (file.mimeType.includes('aac')) return '.aac';
  if (file.mimeType.startsWith('image/')) return '.jpg';
  return '.mp3';
}

export function storagePathFor(
  userId: string,
  kind: MediaKind,
  file: PickedFile,
  entityId?: string,
): string {
  const ext = extensionForFile(file);
  const stamp = Date.now();
  switch (kind) {
    case 'avatar':
      return `${userId}/avatar-${stamp}${ext}`;
    case 'header':
      return `${userId}/header-${stamp}${ext}`;
    case 'track_audio':
      return `${userId}/tracks/${entityId ?? 'draft'}/audio-${stamp}${ext}`;
    case 'track_artwork':
      return `${userId}/tracks/${entityId ?? 'draft'}/art-${stamp}${ext}`;
    case 'release_artwork':
      return `${userId}/releases/${entityId ?? 'draft'}/art-${stamp}${ext}`;
  }
}
