import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { TrackListing } from '@/components/tracks/TrackListing';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_TRACKS } from '@/lib/demoData';

/**
 * Chronological following feed — newest first, discovery only.
 */
export default function FollowingScreen() {
  const feed = [...DEMO_TRACKS].reverse();
  const bottomInset = useBottomInset(spacing.tabBar);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Following</Text>
        <Text style={styles.lede}>
          Chronological posts from artists you follow. No algorithmic reorder.
        </Text>

        {feed.map((track) => (
          <View key={track.id} style={styles.item}>
            <Text style={styles.stamp}>New transmission</Text>
            <TrackListing track={track} />
            <Link href={`/artist/${track.artistId}`}>
              <Text style={styles.artistLink}>
                Open {track.artistName} →
              </Text>
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
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  item: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  stamp: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  artistLink: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.link,
  },
});
