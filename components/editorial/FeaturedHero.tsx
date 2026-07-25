import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors, spacing, typography } from '@/constants/theme';
import type { FeaturedSpotlight } from '@/lib/demoData';
import type { Track } from '@/types/models';

type FeaturedHeroProps = {
  spotlight: FeaturedSpotlight;
  track: Track;
};

/**
 * Large-format PureVolume-style cover banner — high contrast art plane,
 * bold artist name, editorial status blurb. Full-bleed within the feed.
 */
export function FeaturedHero({ spotlight, track }: FeaturedHeroProps) {
  const grain = useSharedValue(0.04);

  useEffect(() => {
    grain.value = withRepeat(
      withTiming(0.1, { duration: 220, easing: Easing.linear }),
      -1,
      true,
    );
  }, [grain]);

  const grainStyle = useAnimatedStyle(() => ({
    opacity: grain.value,
  }));

  return (
    <View style={styles.root}>
      <View style={styles.artPlane}>
        <View style={styles.artWash} />
        <View style={styles.scanStrip} />
        <Animated.View pointerEvents="none" style={[styles.grain, grainStyle]} />
        <View style={styles.copy}>
          <Text style={styles.badge}>{spotlight.badge}</Text>
          <Text style={styles.headline}>{spotlight.headline}</Text>
          <Text style={styles.trackMeta}>
            “{track.title}” · {track.scene} · {track.geography}
          </Text>
          <Text style={styles.blurb}>{spotlight.statusBlurb}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>
              {track.downloadCount.toLocaleString()} DOWNLOADS
            </Text>
            <Text style={styles.statMuted}>
              {track.repostCount.toLocaleString()} REPOSTS
            </Text>
          </View>
          <View style={styles.ctaRow}>
            <Link href={`/track/${track.id}`} asChild>
              <Pressable style={styles.ctaPrimary}>
                <Text style={styles.ctaPrimaryText}>LISTEN NOW</Text>
              </Pressable>
            </Link>
            <Link href={`/artist/${track.artistId}`} asChild>
              <Pressable style={styles.ctaGhost}>
                <Text style={styles.ctaGhostText}>ARTIST PAGE</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 0,
  },
  artPlane: {
    minHeight: 280,
    backgroundColor: colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: colors.phosphorDim,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  artWash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.backgroundElevated,
    // High-contrast diagonal wash — CRT phosphor heat
    borderLeftWidth: 0,
    opacity: 1,
  },
  scanStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: colors.phosphor,
    opacity: 0.55,
  },
  grain: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.snow,
  },
  copy: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
    backgroundColor: 'rgba(22, 19, 17, 0.72)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  badge: {
    ...typography.monoTiny,
    color: colors.phosphor,
    letterSpacing: 2,
  },
  headline: {
    fontFamily: 'SpaceMono',
    fontSize: 32,
    letterSpacing: 3,
    color: colors.text,
    textTransform: 'uppercase',
  },
  trackMeta: {
    ...typography.caption,
    color: colors.copper,
    textTransform: 'uppercase',
  },
  blurb: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  stat: {
    ...typography.monoTiny,
    color: colors.copper,
  },
  statMuted: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  ctaPrimary: {
    backgroundColor: colors.phosphor,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  ctaPrimaryText: {
    ...typography.monoTiny,
    color: colors.background,
    letterSpacing: 1.5,
  },
  ctaGhost: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    backgroundColor: colors.surface,
  },
  ctaGhostText: {
    ...typography.monoTiny,
    color: colors.phosphor,
    letterSpacing: 1.5,
  },
});
