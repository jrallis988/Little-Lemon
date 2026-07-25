import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography } from '@/constants/theme';
import { DEMO_TRACKS } from '@/lib/demoData';

/**
 * Chronological following feed — newest first, no algorithmic reorder.
 */
export default function FollowingScreen() {
  const feed = [...DEMO_TRACKS].reverse();

  return (
    <StaticBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headline}>FOLLOWING</Text>
        <Text style={styles.lede}>
          Strictly chronological. What your artists posted, in the order it hit the wire.
        </Text>

        {feed.map((track) => (
          <View key={track.id} style={styles.item}>
            <Text style={styles.stamp}>NEW TRANSMISSION</Text>
            <WaveformPlayer track={track} />
            <Link href={`/artist/${track.artistId}`}>
              <Text style={styles.artistLink}>Open {track.artistName} →</Text>
            </Link>
          </View>
        ))}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl + spacing.audioBar,
  },
  headline: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  item: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
    gap: spacing.sm,
  },
  stamp: {
    ...typography.monoTiny,
    color: colors.copper,
  },
  artistLink: {
    ...typography.caption,
    color: colors.phosphorDim,
  },
});
