import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PlatformTimeline } from '@/components/history/PlatformTimeline';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { PLATFORM_TIMELINE } from '@/lib/timelineHistory';

/**
 * History — PureVolume founding era through StaticVolume present.
 * First-class portal archive, not a footer afterthought.
 */
export default function HistoryScreen() {
  const bottomInset = useBottomInset(spacing.tabBar);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>History</Text>
        <Text style={styles.lede}>
          PureVolume launched Thanksgiving Eve 2003 as a magazine with sound —
          human curation, artist pages, downloads, and a homepage that could
          change a band’s life. This timeline traces that portal from founding
          through shutdown, and into StaticVolume.
        </Text>

        <View style={styles.statBox}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>2003</Text>
            <Text style={styles.statLabel}>Founded</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>2018</Text>
            <Text style={styles.statLabel}>Shutdown</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>2026</Text>
            <Text style={styles.statLabel}>StaticVolume</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{PLATFORM_TIMELINE.length}</Text>
            <Text style={styles.statLabel}>Beats</Text>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Portal timeline</Text>
          </View>
          <View style={styles.panelBody}>
            <PlatformTimeline />
          </View>
        </View>

        <Text style={styles.footnote}>
          Historical beats are grounded in PureVolume’s public record (Unborn
          Media, PurePicks, SpinMedia, Hive Media, 2018 sunset). StaticVolume
          entries describe this product’s revival — discovery + taste logging,
          not another streaming player.
        </Text>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  headline: {
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
  statBox: {
    ...portalBox,
    flexDirection: 'row',
    paddingVertical: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: colors.text,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  panel: {
    ...portalBox,
    overflow: 'hidden',
  },
  panelHeader: {
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  panelTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  panelBody: {
    padding: spacing.sm,
    paddingBottom: 0,
  },
  footnote: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    lineHeight: 17,
  },
});
