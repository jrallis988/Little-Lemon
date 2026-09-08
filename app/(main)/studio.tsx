import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { UploadProgressBar } from '@/components/studio/UploadProgressBar';
import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import {
  ArtistUploadError,
  createReleaseUpload,
  createTrackUpload,
  deleteOwnTrack,
  fetchMyArtistProfile,
  fetchMyReleases,
  fetchMyTracks,
  pickMediaFile,
  updateArtistProfile,
  uploadArtistImage,
  type UploadProgress,
} from '@/lib/artistUploads';
import type { ProfileRow, ReleaseRow, TrackRow } from '@/lib/dbTypes';
import { formatBytes, UPLOAD_LIMITS, type PickedFile } from '@/lib/uploadLimits';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';
import type { ArtistStatus } from '@/types/models';

const STATUS_OPTIONS: ArtistStatus[] = ['UNSIGNED', 'INDEPENDENT', 'LABEL', 'INACTIVE'];

/**
 * Artist Studio — upload & manage profile media, releases, and tracks.
 * Storage + Postgres are source of truth; ownership enforced by RLS.
 */
export default function StudioScreen() {
  const bottomInset = useBottomInset();
  const profile = useUserStore((s) => s.profile);
  const session = useUserStore((s) => s.session);

  const [artist, setArtist] = useState<ProfileRow | null>(null);
  const [tracks, setTracks] = useState<TrackRow[]>([]);
  const [releases, setReleases] = useState<ReleaseRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [scene, setScene] = useState('');
  const [geography, setGeography] = useState('');
  const [genreTags, setGenreTags] = useState('');
  const [lineupNote, setLineupNote] = useState('');
  const [status, setStatus] = useState<ArtistStatus>('UNSIGNED');
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  const [imageProgress, setImageProgress] = useState<UploadProgress | null>(null);
  const [imageErr, setImageErr] = useState<string | null>(null);

  const [trackTitle, setTrackTitle] = useState('');
  const [trackScene, setTrackScene] = useState('');
  const [audioFile, setAudioFile] = useState<PickedFile | null>(null);
  const [artworkFile, setArtworkFile] = useState<PickedFile | null>(null);
  const [copyrightOk, setCopyrightOk] = useState(false);
  const [trackProgress, setTrackProgress] = useState<UploadProgress | null>(null);
  const [trackErr, setTrackErr] = useState<string | null>(null);

  const [releaseTitle, setReleaseTitle] = useState('');
  const [releaseType, setReleaseType] = useState<'single' | 'ep' | 'album'>('ep');
  const [releaseArt, setReleaseArt] = useState<PickedFile | null>(null);
  const [releaseProgress, setReleaseProgress] = useState<UploadProgress | null>(null);
  const [releaseErr, setReleaseErr] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured || !session) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const [nextArtist, nextTracks, nextReleases] = await Promise.all([
        fetchMyArtistProfile(),
        fetchMyTracks(),
        fetchMyReleases(),
      ]);
      setArtist(nextArtist);
      setTracks(nextTracks.filter((t) => !t.disabled_at));
      setReleases(nextReleases.filter((r) => !r.disabled_at));
      if (nextArtist) {
        setDisplayName(nextArtist.display_name ?? '');
        setBio(nextArtist.bio ?? '');
        setScene(nextArtist.scene ?? '');
        setGeography(nextArtist.geography ?? '');
        setGenreTags((nextArtist.genre_tags ?? []).join(', '));
        setLineupNote(nextArtist.lineup_note ?? '');
        setStatus(nextArtist.status ?? 'UNSIGNED');
      }
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load studio.');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  if (!session || !profile) {
    return (
      <StaticBackground>
        <View style={styles.emptyPad}>
          <Text style={styles.emptyTitle}>Artist Studio</Text>
          <Text style={styles.emptyBody}>
            Sign in with an artist account to upload audio, artwork, and profile
            media.
          </Text>
        </View>
      </StaticBackground>
    );
  }

  if (profile.role !== 'artist') {
    return (
      <StaticBackground>
        <View style={styles.emptyPad}>
          <Text style={styles.emptyTitle}>Artists only</Text>
          <Text style={styles.emptyBody}>
            This studio is for artist accounts. Listener profiles use diary,
            reviews, and lists instead.
          </Text>
        </View>
      </StaticBackground>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <StaticBackground>
        <View style={styles.emptyPad}>
          <Text style={styles.emptyTitle}>Configure Supabase</Text>
          <Text style={styles.emptyBody}>
            Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY, then
            run supabase/migrations/20260328000000_phase2_artist_uploads.sql.
          </Text>
        </View>
      </StaticBackground>
    );
  }

  async function saveProfile() {
    setProfileMsg(null);
    setProfileErr(null);
    try {
      const tags = genreTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const updated = await updateArtistProfile({
        displayName,
        bio,
        scene,
        geography,
        genreTags: tags,
        lineupNote,
        status,
      });
      setArtist(updated);
      setProfileMsg('Profile saved.');
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : 'Save failed.');
    }
  }

  async function onUploadImage(kind: 'avatar' | 'header') {
    setImageErr(null);
    try {
      const updated = await uploadArtistImage(kind, setImageProgress);
      setArtist(updated);
    } catch (err) {
      if (err instanceof ArtistUploadError && err.message === 'No file selected.') {
        setImageProgress(null);
        return;
      }
      setImageErr(err instanceof Error ? err.message : 'Upload failed.');
      setImageProgress({ phase: 'error', message: 'Failed', percent: null });
    }
  }

  async function onPickAudio() {
    setTrackErr(null);
    try {
      const file = await pickMediaFile('track_audio');
      if (file) setAudioFile(file);
    } catch (err) {
      setTrackErr(err instanceof Error ? err.message : 'Could not pick audio.');
    }
  }

  async function onPickTrackArt() {
    setTrackErr(null);
    try {
      const file = await pickMediaFile('track_artwork');
      if (file) setArtworkFile(file);
    } catch (err) {
      setTrackErr(err instanceof Error ? err.message : 'Could not pick artwork.');
    }
  }

  async function onUploadTrack() {
    setTrackErr(null);
    if (!audioFile) {
      setTrackErr('Choose an audio file first.');
      return;
    }
    try {
      await createTrackUpload(
        {
          title: trackTitle,
          scene: trackScene || scene,
          geography,
          copyrightConfirmed: copyrightOk,
          audio: audioFile,
          artwork: artworkFile,
        },
        setTrackProgress,
      );
      setTrackTitle('');
      setTrackScene('');
      setAudioFile(null);
      setArtworkFile(null);
      setCopyrightOk(false);
      await refresh();
    } catch (err) {
      setTrackErr(err instanceof Error ? err.message : 'Track upload failed.');
      setTrackProgress({ phase: 'error', message: 'Failed', percent: null });
    }
  }

  async function onDeleteTrack(id: string) {
    setTrackErr(null);
    try {
      await deleteOwnTrack(id);
      await refresh();
    } catch (err) {
      setTrackErr(err instanceof Error ? err.message : 'Delete failed.');
    }
  }

  async function onPickReleaseArt() {
    setReleaseErr(null);
    try {
      const file = await pickMediaFile('release_artwork');
      if (file) setReleaseArt(file);
    } catch (err) {
      setReleaseErr(err instanceof Error ? err.message : 'Could not pick artwork.');
    }
  }

  async function onUploadRelease() {
    setReleaseErr(null);
    try {
      await createReleaseUpload(
        {
          title: releaseTitle,
          releaseType,
          artwork: releaseArt,
        },
        setReleaseProgress,
      );
      setReleaseTitle('');
      setReleaseArt(null);
      await refresh();
    } catch (err) {
      setReleaseErr(err instanceof Error ? err.message : 'Release save failed.');
      setReleaseProgress({ phase: 'error', message: 'Failed', percent: null });
    }
  }

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <View style={styles.intro}>
          <Text style={styles.kicker}>Artist studio</Text>
          <Text style={styles.title}>Upload & manage your music</Text>
          <Text style={styles.lede}>
            Audio, artwork, and profile media go to Supabase Storage. Metadata
            lives in Postgres with ownership rules — only you can edit your
            uploads. No in-app player; listeners download or open outbound
            catalog links.
          </Text>
        </View>

        {loading ? (
          <Text style={styles.muted}>Loading studio…</Text>
        ) : null}
        {loadError ? <Text style={styles.error}>{loadError}</Text> : null}

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Profile media</Text>
          </View>
          <View style={styles.boxBody}>
            <View style={styles.mediaRow}>
              <ArtworkImage
                uri={artist?.avatar_url}
                label={displayName || 'Avatar'}
                monogram={displayName || 'A'}
                style={styles.avatar}
              />
              <View style={styles.mediaActions}>
                <Pressable style={styles.secondaryBtn} onPress={() => void onUploadImage('avatar')}>
                  <Text style={styles.secondaryBtnText}>Upload profile image</Text>
                </Pressable>
                <Pressable style={styles.secondaryBtn} onPress={() => void onUploadImage('header')}>
                  <Text style={styles.secondaryBtnText}>Upload header / cover</Text>
                </Pressable>
                <Text style={styles.hint}>
                  Images ≤ {formatBytes(UPLOAD_LIMITS.avatar.maxBytes)} (header ≤{' '}
                  {formatBytes(UPLOAD_LIMITS.header.maxBytes)}). JPEG / PNG / WebP.
                </Text>
              </View>
            </View>
            <UploadProgressBar progress={imageProgress} error={imageErr} />
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Artist bio & metadata</Text>
          </View>
          <View style={styles.boxBody}>
            <Field label="Display name" value={displayName} onChangeText={setDisplayName} />
            <Field
              label="Bio"
              value={bio}
              onChangeText={setBio}
              multiline
              placeholder="Who you are — keep it human."
            />
            <Field
              label="Lineup note"
              value={lineupNote}
              onChangeText={setLineupNote}
              placeholder="Three friends + a practice space"
            />
            <Field label="Scene / genre" value={scene} onChangeText={setScene} />
            <Field label="Location" value={geography} onChangeText={setGeography} />
            <Field
              label="Genre tags (comma-separated)"
              value={genreTags}
              onChangeText={setGenreTags}
              placeholder="Indie, Shoegaze"
            />
            <Text style={styles.fieldLabel}>Status</Text>
            <View style={styles.chipRow}>
              {STATUS_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  style={[styles.chip, status === option && styles.chipActive]}
                  onPress={() => setStatus(option)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      status === option && styles.chipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.primaryBtn} onPress={() => void saveProfile()}>
              <Text style={styles.primaryBtnText}>Save profile</Text>
            </Pressable>
            {profileMsg ? <Text style={styles.success}>{profileMsg}</Text> : null}
            {profileErr ? <Text style={styles.error}>{profileErr}</Text> : null}
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Upload a track</Text>
          </View>
          <View style={styles.boxBody}>
            <Field
              label="Title"
              value={trackTitle}
              onChangeText={setTrackTitle}
              placeholder="Track title"
            />
            <Field
              label="Scene (optional)"
              value={trackScene}
              onChangeText={setTrackScene}
            />
            <Pressable style={styles.secondaryBtn} onPress={() => void onPickAudio()}>
              <Text style={styles.secondaryBtnText}>
                {audioFile
                  ? `Audio: ${audioFile.name} (${formatBytes(audioFile.size)})`
                  : `Choose audio (≤ ${formatBytes(UPLOAD_LIMITS.track_audio.maxBytes)})`}
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={() => void onPickTrackArt()}>
              <Text style={styles.secondaryBtnText}>
                {artworkFile
                  ? `Artwork: ${artworkFile.name}`
                  : 'Choose track artwork (optional)'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.checkRow}
              onPress={() => setCopyrightOk((v) => !v)}
            >
              <View style={[styles.checkbox, copyrightOk && styles.checkboxOn]} />
              <Text style={styles.checkText}>
                I own this recording or have permission to distribute it on
                StaticVolume.
              </Text>
            </Pressable>
            <Pressable style={styles.primaryBtn} onPress={() => void onUploadTrack()}>
              <Text style={styles.primaryBtnText}>Upload track</Text>
            </Pressable>
            <UploadProgressBar progress={trackProgress} error={trackErr} />
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Your tracks</Text>
            <Text style={styles.count}>{tracks.length}</Text>
          </View>
          {tracks.length === 0 ? (
            <Text style={styles.emptyInline}>No uploads yet.</Text>
          ) : (
            tracks.map((track) => (
              <View key={track.id} style={styles.trackRow}>
                <ArtworkImage
                  uri={track.artwork_url}
                  label={track.title}
                  monogram={track.title}
                  style={styles.trackArt}
                />
                <View style={styles.trackMeta}>
                  <Text style={styles.trackTitle} numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text style={styles.trackSub} numberOfLines={1}>
                    {track.scene ?? 'Scene unlisted'}
                    {track.audio_url ? ' · audio ready' : ' · missing audio'}
                  </Text>
                </View>
                <Pressable onPress={() => void onDeleteTrack(track.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Album / EP</Text>
          </View>
          <View style={styles.boxBody}>
            <Field
              label="Release title"
              value={releaseTitle}
              onChangeText={setReleaseTitle}
              placeholder="EP or album name"
            />
            <Text style={styles.fieldLabel}>Type</Text>
            <View style={styles.chipRow}>
              {(['single', 'ep', 'album'] as const).map((option) => (
                <Pressable
                  key={option}
                  style={[styles.chip, releaseType === option && styles.chipActive]}
                  onPress={() => setReleaseType(option)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      releaseType === option && styles.chipTextActive,
                    ]}
                  >
                    {option.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.secondaryBtn} onPress={() => void onPickReleaseArt()}>
              <Text style={styles.secondaryBtnText}>
                {releaseArt
                  ? `Artwork: ${releaseArt.name}`
                  : 'Choose album / EP artwork (optional)'}
              </Text>
            </Pressable>
            <Pressable style={styles.primaryBtn} onPress={() => void onUploadRelease()}>
              <Text style={styles.primaryBtnText}>Save release</Text>
            </Pressable>
            <UploadProgressBar progress={releaseProgress} error={releaseErr} />
            {releases.length > 0 ? (
              <View style={styles.releaseList}>
                {releases.map((release) => (
                  <Text key={release.id} style={styles.releaseItem}>
                    {release.title} · {release.release_type.toUpperCase()}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </StaticBackground>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textDim}
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMulti]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  intro: {
    gap: 6,
    marginBottom: spacing.sm,
  },
  kicker: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  emptyPad: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    color: colors.text,
  },
  emptyBody: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  muted: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
  },
  error: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.danger,
    lineHeight: 18,
  },
  success: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.success,
  },
  box: {
    ...portalBox,
    overflow: 'hidden',
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  boxTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  count: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
  },
  boxBody: {
    padding: spacing.sm,
    gap: 10,
  },
  mediaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
  },
  mediaActions: {
    flex: 1,
    gap: 8,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    lineHeight: 16,
  },
  field: {
    gap: 4,
  },
  fieldLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
  },
  inputMulti: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  chipActive: {
    borderColor: colors.link,
    backgroundColor: colors.link,
  },
  chipText: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.text,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  primaryBtn: {
    backgroundColor: colors.link,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
    textAlign: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    marginTop: 2,
  },
  checkboxOn: {
    backgroundColor: colors.link,
    borderColor: colors.link,
  },
  checkText: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  emptyInline: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.sm,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  trackArt: {
    width: 44,
    height: 44,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trackMeta: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  trackTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
  trackSub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  deleteText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.danger,
  },
  releaseList: {
    gap: 4,
    marginTop: 4,
  },
  releaseItem: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
});
