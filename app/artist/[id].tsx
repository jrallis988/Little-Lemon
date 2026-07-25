import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography } from '@/constants/theme';
import { DEMO_ARTISTS, DEMO_TRACKS } from '@/lib/demoData';

/**
 * Artist EPK profile — tracks, shows placeholder, wall placeholder.
 */
export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artist =
    DEMO_ARTISTS.find((a) => a.id === id) ??
    ({
      id: id ?? 'unknown',
      email: '',
      displayName: 'Unknown Artist',
      role: 'artist' as const,
      bio: 'No demo data for this id yet.',
      followerCount: 0,
    });

  const tracks = DEMO_TRACKS.filter((t) => t.artistId === artist.id);

  return (
    <StaticBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sleeve}>
          <View style={styles.artwork}>
            <Text style={styles.artworkMark}>LP</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.name}>{artist.displayName}</Text>
            <Text style={styles.scene}>
              {[artist.scene, artist.geography].filter(Boolean).join(' · ') || 'Independent'}
            </Text>
            <Text style={styles.followers}>
              {(artist.followerCount ?? 0).toLocaleString()} followers
            </Text>
          </View>
        </View>

        {artist.bio ? <Text style={styles.bio}>{artist.bio}</Text> : null}

        <Text style={styles.section}>TRACKS</Text>
        {tracks.length === 0 ? (
          <Text style={styles.empty}>No tracks on the wire yet.</Text>
        ) : (
          tracks.map((track) => (
            <View key={track.id} style={styles.trackBlock}>
              <WaveformPlayer track={track} />
            </View>
          ))
        )}

        <Text style={styles.section}>SHOWS</Text>
        <Text style={styles.empty}>Tour dates land on the wall soon.</Text>

        <Text style={styles.section}>ARTIST WALL</Text>
        <Text style={styles.empty}>
          Public updates, photos, and toggleable comments — scaffold ready.
        </Text>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sleeve: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  artwork: {
    width: 112,
    height: 112,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkMark: {
    ...typography.caption,
    color: colors.phosphorDim,
  },
  meta: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  name: {
    ...typography.headline,
    color: colors.text,
  },
  scene: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  followers: {
    ...typography.monoTiny,
    color: colors.copper,
  },
  bio: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  section: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 2,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  trackBlock: {
    marginBottom: spacing.lg,
  },
  empty: {
    ...typography.body,
    color: colors.textDim,
  },
});
