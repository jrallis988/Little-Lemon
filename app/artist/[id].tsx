import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ArtistArchiveMeta } from '@/components/artist/ArtistArchiveMeta';
import { SpotifyOutboundActions } from '@/components/spotify/SpotifyOutboundActions';
import { ReportButton } from '@/components/trust/ReportButton';
import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { EmptyState, LoadingState } from '@/components/ui/EmptyState';
import { TrackListing } from '@/components/tracks/TrackListing';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { fetchArtistById } from '@/lib/catalogQuery';
import { isBrandNew } from '@/lib/demoData';
import { artistSpotifyTarget } from '@/lib/spotify';
import { useTasteStore } from '@/store/useTasteStore';
import { useUserStore } from '@/store/useUserStore';
import type { Track, UserProfile } from '@/types/models';

/**
 * Artist archive page — dossier + track listings from DB when available.
 */
export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const session = useUserStore((s) => s.session);
  const [artist, setArtist] = useState<UserProfile | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [source, setSource] = useState<'db' | 'demo' | 'none'>('none');
  const [loading, setLoading] = useState(true);

  const following = useTasteStore((s) =>
    artist ? Boolean(s.followingIds[artist.id]) : false,
  );
  const toggleFollow = useTasteStore((s) => s.toggleFollow);
  const tasteError = useTasteStore((s) => s.error);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void fetchArtistById(id ?? '').then((res) => {
      if (cancelled) return;
      setArtist(res.artist);
      setTracks(res.tracks);
      setSource(res.source);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <LoadingState label="Loading artist archive…" />
        </View>
      </StaticBackground>
    );
  }

  if (!artist) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <EmptyState
            title="Artist not found"
            body="No archive row for this id yet. Uploaded artists appear here after Studio saves a profile."
          />
        </View>
      </StaticBackground>
    );
  }

  const isCatalog = artist.catalogKind === 'catalog';
  const totalDownloads = tracks.reduce((sum, t) => sum + t.downloadCount, 0);
  const totalReposts = tracks.reduce((sum, t) => sum + t.repostCount, 0);
  const brandNew = isBrandNew(artist);
  const spotifyTarget = artistSpotifyTarget({
    spotifyArtistId: artist.spotifyArtistId,
    displayName: artist.displayName,
  });

  const statusLabel = isCatalog
    ? 'Catalog artist'
    : artist.status === 'UNSIGNED'
      ? 'Unsigned artist'
      : artist.status === 'INDEPENDENT'
        ? 'Independent artist'
        : 'Artist';

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.sourceHint}>
          {source === 'db' ? 'Live archive' : 'Seed archive'}
        </Text>
        <View style={styles.headerBox}>
          <ArtworkImage
            uri={artist.avatarUrl}
            label={artist.displayName}
            monogram={artist.displayName}
            style={styles.artwork}
          />
          <View style={styles.headerMeta}>
            <Text style={styles.kicker}>
              {statusLabel}
              {brandNew ? ' · New on StaticVolume' : ''}
            </Text>
            <Text style={styles.name}>{artist.displayName}</Text>
            {artist.lineupNote ? (
              <Text style={styles.lineup}>{artist.lineupNote}</Text>
            ) : null}
            <Text style={styles.rawStat}>
              {[artist.scene, artist.geography].filter(Boolean).join(' · ') ||
                'Scene unlisted'}
            </Text>
            {!isCatalog ? (
              <Text style={styles.rawStat}>
                Total downloads: {totalDownloads.toLocaleString()}
              </Text>
            ) : (
              <Text style={styles.rawStat}>
                Metadata for discovery · listen on Spotify
              </Text>
            )}
            <Pressable
              style={[styles.followBtn, following && styles.followBtnOn]}
              onPress={() => {
                if (!session) return;
                void toggleFollow(artist.id, 'artist');
              }}
            >
              <Text
                style={[styles.followBtnText, following && styles.followBtnTextOn]}
              >
                {!session
                  ? 'Sign in to follow'
                  : following
                    ? 'Following'
                    : 'Follow'}
              </Text>
            </Pressable>
            {tasteError ? <Text style={styles.followError}>{tasteError}</Text> : null}
          </View>
        </View>

        {isCatalog ? (
          <View style={styles.spotifyBox}>
            <Text style={styles.spotifyLabel}>Listen</Text>
            <SpotifyOutboundActions target={spotifyTarget} showAdd={false} />
          </View>
        ) : null}

        <ArtistArchiveMeta
          artist={artist}
          totalDownloads={totalDownloads}
          totalReposts={totalReposts}
          trackCount={tracks.length}
        />

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tracks</Text>
            <Text style={styles.sectionCount}>{tracks.length}</Text>
          </View>
          {tracks.length === 0 ? (
            <Text style={styles.empty}>No tracks indexed.</Text>
          ) : (
            tracks.map((track) => (
              <TrackListing key={track.id} track={track} />
            ))
          )}
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shows</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.empty}>No dates loaded.</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Artist Wall</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.empty}>Wall module ready / empty.</Text>
          </View>
        </View>

        <ReportButton targetKind="artist" targetId={artist.id} label="Report artist" />
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  sourceHint: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  headerBox: {
    ...portalBox,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.sm,
  },
  spotifyBox: {
    ...portalBox,
    padding: spacing.sm,
    gap: 8,
  },
  spotifyLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  artwork: {
    width: 88,
    height: 88,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMeta: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  kicker: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  lineup: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginTop: 2,
  },
  rawStat: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  followBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.link,
    backgroundColor: colors.link,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  followBtnOn: {
    backgroundColor: colors.surface,
  },
  followBtnText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  followBtnTextOn: {
    color: colors.link,
  },
  followError: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
  },
  sectionBox: {
    ...portalBox,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
  },
  sectionBody: {
    padding: spacing.sm,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.sm,
  },
});
