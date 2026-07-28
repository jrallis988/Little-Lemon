import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActivityEntry } from '@/components/social/ActivityEntry';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_ACTIVITY } from '@/lib/demoData';

/**
 * Letterboxd-style activity feed — friends logging, reviewing, listing.
 * Chronological only. Not an artist broadcast feed. Not a player queue.
 */
export default function ActivityScreen() {
  const bottomInset = useBottomInset(spacing.tabBar);
  const feed = [...DEMO_ACTIVITY].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Activity</Text>
        <Text style={styles.lede}>
          People you follow logging tracks, writing reviews, and building lists.
          Chronological — no algorithmic reorder. No in-app player.
        </Text>

        {feed.map((item) => (
          <ActivityEntry key={item.id} item={item} />
        ))}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
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
});
