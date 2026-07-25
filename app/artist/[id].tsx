import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ArtistArchiveMeta } from '@/components/artist/ArtistArchiveMeta';
import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, portalBox, spacing } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import { DEMO_ARTISTS, DEMO_TRACKS } from '@/lib/demoData';

/**
 * Artist archive page — terminal dossier + indexed tracks.
 */
export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useAudioBarInset();
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

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <View style={styles.headerBox}>
          <View style={styles.artwork}>
            <Text style={styles.artworkMark}>
              {artist.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.kicker}>ARTIST RECORD</Text>
            <Text style={styles.name}>{artist.displayName}</Text>
            <Text style={styles.rawStat}>
              STATUS: {artist.status ?? 'INDEPENDENT'}
            </Text>
            <Text style={styles.rawStat}>
              TOTAL DOWNLOADS: {totalDownloads.toLocaleString()}
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
            <Text style={styles.sectionTitle}>TRACKS INDEXED</Text>
            <Text style={styles.sectionCount}>{tracks.length}</Text>
          </View>
          <View style={styles.sectionBody}>
            {tracks.length === 0 ? (
              <Text style={styles.empty}>NO TRACKS IN ARCHIVE.</Text>
            ) : (
              tracks.map((track) => (
                <View key={track.id} style={styles.trackBlock}>
                  <WaveformPlayer track={track} />
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SHOWS</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.empty}>NO DATES LOADED.</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ARTIST WALL</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.empty}>WALL MODULE: READY / EMPTY.</Text>
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
    borderColor: colors.accentLine,
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
  artworkMark: {
    fontFamily: 'SpaceMono',
    fontSize: 28,
    color: colors.phosphorDim,
  },
  headerMeta: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  kicker: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.8,
    color: colors.phosphorDim,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    letterSpacing: 0.5,
    color: colors.text,
    textTransform: 'uppercase',
  },
  rawStat: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 0.4,
    color: colors.phosphor,
    textTransform: 'uppercase',
  },
  sectionBox: {
    ...portalBox,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.accentLine,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 0.8,
    color: colors.phosphor,
    textTransform: 'uppercase',
  },
  sectionCount: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    color: colors.textDim,
  },
  sectionBody: {
    padding: spacing.sm,
  },
  trackBlock: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  empty: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.3,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
});
