import { decode } from 'base64-arraybuffer';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

import type { ArtistProfileUpdate, ProfileRow, ReleaseRow, TrackRow } from '@/lib/dbTypes';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import {
  type MediaKind,
  type PickedFile,
  storagePathFor,
  UPLOAD_LIMITS,
  validateUpload,
} from '@/lib/uploadLimits';

export type UploadPhase =
  | 'idle'
  | 'picking'
  | 'uploading'
  | 'saving'
  | 'done'
  | 'error';

export type UploadProgress = {
  phase: UploadPhase;
  message: string;
  percent: number | null;
};

export class ArtistUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArtistUploadError';
  }
}

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new ArtistUploadError(
      'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY, then run the Phase 2 migration.',
    );
  }
}

async function requireSessionUserId(): Promise<string> {
  requireConfigured();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new ArtistUploadError(error.message);
  const id = data.session?.user?.id;
  if (!id) throw new ArtistUploadError('Sign in as an artist to manage uploads.');
  return id;
}

async function requireArtistProfile(userId: string): Promise<ProfileRow> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw new ArtistUploadError(error.message);
  if (!data) {
    throw new ArtistUploadError(
      'Artist profile missing. Re-run the Phase 2 migration so signup creates a profiles row.',
    );
  }
  if (data.role !== 'artist') {
    throw new ArtistUploadError('Only artist accounts can upload music and media.');
  }
  return data as ProfileRow;
}

export async function fetchMyArtistProfile(): Promise<ProfileRow | null> {
  if (!isSupabaseConfigured) return null;
  const { data: sessionData } = await supabase.auth.getSession();
  const id = sessionData.session?.user?.id;
  if (!id) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new ArtistUploadError(error.message);
  return (data as ProfileRow | null) ?? null;
}

export async function fetchMyTracks(): Promise<TrackRow[]> {
  if (!isSupabaseConfigured) return [];
  const userId = await requireSessionUserId();
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('artist_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new ArtistUploadError(error.message);
  return (data as TrackRow[]) ?? [];
}

export async function fetchMyReleases(): Promise<ReleaseRow[]> {
  if (!isSupabaseConfigured) return [];
  const userId = await requireSessionUserId();
  const { data, error } = await supabase
    .from('releases')
    .select('*')
    .eq('artist_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new ArtistUploadError(error.message);
  return (data as ReleaseRow[]) ?? [];
}

export async function updateArtistProfile(
  patch: ArtistProfileUpdate,
): Promise<ProfileRow> {
  const userId = await requireSessionUserId();
  await requireArtistProfile(userId);

  const row: Record<string, unknown> = {};
  if (patch.displayName !== undefined) row.display_name = patch.displayName.trim();
  if (patch.bio !== undefined) row.bio = patch.bio;
  if (patch.scene !== undefined) row.scene = patch.scene;
  if (patch.geography !== undefined) row.geography = patch.geography;
  if (patch.genreTags !== undefined) row.genre_tags = patch.genreTags;
  if (patch.lineupNote !== undefined) row.lineup_note = patch.lineupNote;
  if (patch.sceneDescription !== undefined) {
    row.scene_description = patch.sceneDescription;
  }
  if (patch.activeYears !== undefined) row.active_years = patch.activeYears;
  if (patch.status !== undefined) row.status = patch.status;

  const { data, error } = await supabase
    .from('profiles')
    .update(row)
    .eq('id', userId)
    .select('*')
    .single();

  if (error) throw new ArtistUploadError(error.message);
  return data as ProfileRow;
}

async function pickImage(): Promise<PickedFile | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new ArtistUploadError('Photo library permission is required for artwork.');
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.9,
    allowsMultipleSelection: false,
  });
  if (result.canceled || !result.assets[0]) return null;
  const asset = result.assets[0];
  const name =
    asset.fileName ??
    `image-${Date.now()}.${(asset.mimeType ?? 'image/jpeg').split('/')[1] ?? 'jpg'}`;
  return {
    uri: asset.uri,
    name,
    mimeType: asset.mimeType ?? 'image/jpeg',
    size: asset.fileSize ?? 0,
  };
}

async function pickAudio(): Promise<PickedFile | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['audio/*', 'audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp4'],
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (result.canceled || !result.assets?.[0]) return null;
  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType ?? 'audio/mpeg',
    size: asset.size ?? 0,
  };
}

export async function pickMediaFile(kind: MediaKind): Promise<PickedFile | null> {
  if (kind === 'track_audio') return pickAudio();
  return pickImage();
}

async function readFileBody(uri: string): Promise<ArrayBuffer | Blob> {
  if (Platform.OS === 'web') {
    const response = await fetch(uri);
    return response.blob();
  }
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return decode(base64);
}

async function uploadFileToBucket(
  kind: MediaKind,
  file: PickedFile,
  userId: string,
  entityId?: string,
): Promise<{ bucket: string; path: string; publicUrl: string }> {
  const limits = UPLOAD_LIMITS[kind];
  const validation = validateUpload(kind, file);
  if (validation) throw new ArtistUploadError(validation.message);
  if (file.size <= 0 && Platform.OS !== 'web') {
    // Some pickers omit size on native; re-stat when possible.
    try {
      const info = await FileSystem.getInfoAsync(file.uri);
      if (info.exists && 'size' in info && typeof info.size === 'number') {
        file = { ...file, size: info.size };
        const again = validateUpload(kind, file);
        if (again) throw new ArtistUploadError(again.message);
      }
    } catch (err) {
      if (err instanceof ArtistUploadError) throw err;
    }
  }

  const path = storagePathFor(userId, kind, file, entityId);
  const body = await readFileBody(file.uri);
  const { error } = await supabase.storage.from(limits.bucket).upload(path, body, {
    contentType: file.mimeType,
    upsert: false,
  });
  if (error) throw new ArtistUploadError(error.message);

  const { data } = supabase.storage.from(limits.bucket).getPublicUrl(path);
  return { bucket: limits.bucket, path, publicUrl: data.publicUrl };
}

async function recordMediaAsset(input: {
  ownerId: string;
  kind: MediaKind;
  bucket: string;
  path: string;
  mimeType: string;
  byteSize: number;
  publicUrl: string;
  trackId?: string | null;
  releaseId?: string | null;
}) {
  const { error } = await supabase.from('media_assets').insert({
    owner_id: input.ownerId,
    kind: input.kind,
    bucket: input.bucket,
    storage_path: input.path,
    mime_type: input.mimeType,
    byte_size: input.byteSize,
    public_url: input.publicUrl,
    track_id: input.trackId ?? null,
    release_id: input.releaseId ?? null,
  });
  if (error) throw new ArtistUploadError(error.message);
}

export async function uploadArtistImage(
  kind: 'avatar' | 'header',
  onProgress?: (p: UploadProgress) => void,
): Promise<ProfileRow> {
  const userId = await requireSessionUserId();
  await requireArtistProfile(userId);

  onProgress?.({ phase: 'picking', message: 'Choose an image…', percent: null });
  const file = await pickMediaFile(kind);
  if (!file) {
    onProgress?.({ phase: 'idle', message: 'Cancelled', percent: null });
    throw new ArtistUploadError('No file selected.');
  }

  onProgress?.({
    phase: 'uploading',
    message: `Uploading ${UPLOAD_LIMITS[kind].label.toLowerCase()}…`,
    percent: 35,
  });
  const uploaded = await uploadFileToBucket(kind, file, userId);

  onProgress?.({ phase: 'saving', message: 'Saving profile…', percent: 75 });
  await recordMediaAsset({
    ownerId: userId,
    kind,
    bucket: uploaded.bucket,
    path: uploaded.path,
    mimeType: file.mimeType,
    byteSize: file.size,
    publicUrl: uploaded.publicUrl,
  });

  const column = kind === 'avatar' ? 'avatar_url' : 'header_url';
  const { data, error } = await supabase
    .from('profiles')
    .update({ [column]: uploaded.publicUrl })
    .eq('id', userId)
    .select('*')
    .single();
  if (error) throw new ArtistUploadError(error.message);

  onProgress?.({ phase: 'done', message: 'Saved', percent: 100 });
  return data as ProfileRow;
}

export type CreateTrackInput = {
  title: string;
  scene?: string;
  geography?: string;
  releaseYear?: number | null;
  releaseId?: string | null;
  durationMs?: number;
  copyrightConfirmed: boolean;
  audio: PickedFile;
  artwork?: PickedFile | null;
};

export async function createTrackUpload(
  input: CreateTrackInput,
  onProgress?: (p: UploadProgress) => void,
): Promise<TrackRow> {
  const userId = await requireSessionUserId();
  const profile = await requireArtistProfile(userId);

  if (!input.copyrightConfirmed) {
    throw new ArtistUploadError(
      'Confirm you own this recording or have permission to distribute it.',
    );
  }
  const title = input.title.trim();
  if (!title) throw new ArtistUploadError('Track title is required.');

  const audioErr = validateUpload('track_audio', input.audio);
  if (audioErr) throw new ArtistUploadError(audioErr.message);
  if (input.artwork) {
    const artErr = validateUpload('track_artwork', input.artwork);
    if (artErr) throw new ArtistUploadError(artErr.message);
  }

  onProgress?.({ phase: 'saving', message: 'Creating track record…', percent: 10 });
  const { data: track, error: insertError } = await supabase
    .from('tracks')
    .insert({
      artist_id: userId,
      release_id: input.releaseId ?? null,
      title,
      scene: input.scene?.trim() || profile.scene,
      geography: input.geography?.trim() || profile.geography,
      release_year: input.releaseYear ?? new Date().getFullYear(),
      duration_ms: input.durationMs ?? 0,
      catalog_kind: 'emerging',
      copyright_confirmed_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (insertError || !track) {
    throw new ArtistUploadError(insertError?.message ?? 'Could not create track.');
  }

  const trackId = (track as TrackRow).id;

  try {
    onProgress?.({
      phase: 'uploading',
      message: 'Uploading audio…',
      percent: 30,
    });
    const audioUp = await uploadFileToBucket(
      'track_audio',
      input.audio,
      userId,
      trackId,
    );
    await recordMediaAsset({
      ownerId: userId,
      kind: 'track_audio',
      bucket: audioUp.bucket,
      path: audioUp.path,
      mimeType: input.audio.mimeType,
      byteSize: input.audio.size,
      publicUrl: audioUp.publicUrl,
      trackId,
    });

    let artworkUrl: string | null = null;
    let artworkPath: string | null = null;
    if (input.artwork) {
      onProgress?.({
        phase: 'uploading',
        message: 'Uploading artwork…',
        percent: 60,
      });
      const artUp = await uploadFileToBucket(
        'track_artwork',
        input.artwork,
        userId,
        trackId,
      );
      artworkUrl = artUp.publicUrl;
      artworkPath = artUp.path;
      await recordMediaAsset({
        ownerId: userId,
        kind: 'track_artwork',
        bucket: artUp.bucket,
        path: artUp.path,
        mimeType: input.artwork.mimeType,
        byteSize: input.artwork.size,
        publicUrl: artUp.publicUrl,
        trackId,
      });
    }

    onProgress?.({ phase: 'saving', message: 'Finalizing…', percent: 85 });
    const { data: updated, error: updateError } = await supabase
      .from('tracks')
      .update({
        audio_url: audioUp.publicUrl,
        audio_path: audioUp.path,
        artwork_url: artworkUrl,
        artwork_path: artworkPath,
      })
      .eq('id', trackId)
      .eq('artist_id', userId)
      .select('*')
      .single();

    if (updateError || !updated) {
      throw new ArtistUploadError(updateError?.message ?? 'Could not finalize track.');
    }

    onProgress?.({ phase: 'done', message: 'Track uploaded', percent: 100 });
    return updated as TrackRow;
  } catch (err) {
    // Soft-disable orphaned row so public never sees a broken upload.
    await supabase
      .from('tracks')
      .update({ disabled_at: new Date().toISOString() })
      .eq('id', trackId)
      .eq('artist_id', userId);
    throw err;
  }
}

export async function deleteOwnTrack(trackId: string): Promise<void> {
  const userId = await requireSessionUserId();
  await requireArtistProfile(userId);

  const { data: track, error: fetchError } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', trackId)
    .eq('artist_id', userId)
    .maybeSingle();
  if (fetchError) throw new ArtistUploadError(fetchError.message);
  if (!track) throw new ArtistUploadError('Track not found or not yours.');

  const paths: { bucket: string; path: string }[] = [];
  if (track.audio_path) paths.push({ bucket: 'track-audio', path: track.audio_path });
  if (track.artwork_path) {
    paths.push({ bucket: 'track-artwork', path: track.artwork_path });
  }

  for (const item of paths) {
    await supabase.storage.from(item.bucket).remove([item.path]);
  }

  await supabase.from('media_assets').delete().eq('track_id', trackId).eq('owner_id', userId);

  const { error } = await supabase
    .from('tracks')
    .delete()
    .eq('id', trackId)
    .eq('artist_id', userId);
  if (error) throw new ArtistUploadError(error.message);
}

export type CreateReleaseInput = {
  title: string;
  releaseType: 'single' | 'ep' | 'album';
  releaseDate?: string | null;
  notes?: string | null;
  artwork?: PickedFile | null;
};

export async function createReleaseUpload(
  input: CreateReleaseInput,
  onProgress?: (p: UploadProgress) => void,
): Promise<ReleaseRow> {
  const userId = await requireSessionUserId();
  await requireArtistProfile(userId);

  const title = input.title.trim();
  if (!title) throw new ArtistUploadError('Release title is required.');
  if (input.artwork) {
    const artErr = validateUpload('release_artwork', input.artwork);
    if (artErr) throw new ArtistUploadError(artErr.message);
  }

  onProgress?.({ phase: 'saving', message: 'Creating release…', percent: 15 });
  const { data: release, error } = await supabase
    .from('releases')
    .insert({
      artist_id: userId,
      title,
      release_type: input.releaseType,
      release_date: input.releaseDate || null,
      notes: input.notes?.trim() || null,
    })
    .select('*')
    .single();
  if (error || !release) {
    throw new ArtistUploadError(error?.message ?? 'Could not create release.');
  }

  const releaseId = (release as ReleaseRow).id;
  if (!input.artwork) {
    onProgress?.({ phase: 'done', message: 'Release saved', percent: 100 });
    return release as ReleaseRow;
  }

  try {
    onProgress?.({
      phase: 'uploading',
      message: 'Uploading release artwork…',
      percent: 50,
    });
    const artUp = await uploadFileToBucket(
      'release_artwork',
      input.artwork,
      userId,
      releaseId,
    );
    await recordMediaAsset({
      ownerId: userId,
      kind: 'release_artwork',
      bucket: artUp.bucket,
      path: artUp.path,
      mimeType: input.artwork.mimeType,
      byteSize: input.artwork.size,
      publicUrl: artUp.publicUrl,
      releaseId,
    });

    const { data: updated, error: updateError } = await supabase
      .from('releases')
      .update({
        artwork_url: artUp.publicUrl,
        artwork_path: artUp.path,
      })
      .eq('id', releaseId)
      .eq('artist_id', userId)
      .select('*')
      .single();

    if (updateError || !updated) {
      throw new ArtistUploadError(
        updateError?.message ?? 'Could not finalize release artwork.',
      );
    }

    onProgress?.({ phase: 'done', message: 'Release saved', percent: 100 });
    return updated as ReleaseRow;
  } catch (err) {
    await supabase
      .from('releases')
      .update({ disabled_at: new Date().toISOString() })
      .eq('id', releaseId)
      .eq('artist_id', userId);
    throw err;
  }
}

