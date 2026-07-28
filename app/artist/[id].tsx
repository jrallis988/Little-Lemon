import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ArtistArchiveMeta } from '@/components/artist/ArtistArchiveMeta';
import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { TrackListing } from '@/components/tracks/TrackListing';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_ARTISTS, DEMO_TRACKS, isBrandNew } from '@/lib/demoData';

/**
 * Artist archive page — dossier + track listings (no player).
 * Emphasizes unsigned / brand-new friend-group discovery.
 */
export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const artist =
    DEMO_ARTISTS.find((a) => a.id === id) ??
    ({
      id: id ?? 'unknown',
      email: '',
      displayName: 'Unknown Artist',
      role: 'artist' as const,
      bio: 'NO RECORD IN ARCHIVE.',
      followerCount: 0,
      status: 'INDEPENDENT' as const,
      activeYears: 'N/A',
      genreTags: [],
      sceneDescription: 'UNINDEXED',
    });

  const tracks = DEMO_TRACKS.filter((t) => t.artistId === artist.id);
  const totalDownloads = tracks.reduce((sum, t) => sum + t.downloadCount, 0);
  const totalReposts = tracks.reduce((sum, t) => sum + t.repostCount, 0);
  const brandNew = isBrandNew(artist);

  const statusLabel =
    artist.status === 'UNSIGNED'
      ? 'Unsigned artist'
      : artist.status === 'INDEPENDENT'
        ? 'Independent artist'
        : 'Artist';

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
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
            <Text style={styles.rawStat}>
              Total downloads: {totalDownloads.toLocaleString()}
            </Text>
          </View>
        </View>

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
  headerBox: {
    ...portalBox,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.sm,
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
