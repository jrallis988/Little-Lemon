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

import { colors, portalBox, spacing, typography, fonts } from '@/constants/theme';
import type { FeaturedSpotlight } from '@/lib/demoData';
import type { Track } from '@/types/models';

type FeaturedHeroProps = {
  spotlight: FeaturedSpotlight;
  track: Track;
};

/**
 * Large-format PureVolume-style cover banner — bordered portal box,
 * bold uppercase type, flat sharp-corner CTAs.
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
      <View style={styles.box}>
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
            <Text style={styles.blurb}>{spotlight.statusBlurb.toUpperCase()}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  box: {
    ...portalBox,
    borderColor: colors.accentLine,
    borderWidth: 1,
  },
  artPlane: {
    minHeight: 260,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  artWash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.backgroundElevated,
  },
  scanStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.accentLine,
  },
  grain: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.snow,
  },
  copy: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    gap: 6,
    backgroundColor: 'rgba(22, 19, 17, 0.82)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  badge: {
    ...typography.monoTiny,
    color: colors.accentLine,
    letterSpacing: 1.2,
  },
  headline: {
    fontFamily: fonts.sans,
    fontSize: 28,
    letterSpacing: 1,
    color: colors.text,
    textTransform: 'uppercase',
  },
  trackMeta: {
    ...typography.monoTiny,
    color: colors.copper,
    letterSpacing: 0.5,
  },
  blurb: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 0.3,
    lineHeight: 15,
    color: colors.phosphorDim,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 2,
  },
  stat: {
    ...typography.monoTiny,
    color: colors.copper,
    letterSpacing: 0.8,
  },
  statMuted: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 0.8,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 0,
    marginTop: spacing.sm,
  },
  ctaPrimary: {
    backgroundColor: colors.accentLine,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.accentLine,
    borderRadius: 0,
    marginRight: spacing.sm,
  },
  ctaPrimaryText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.background,
    textTransform: 'uppercase',
  },
  ctaGhost: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 0,
  },
  ctaGhostText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.phosphor,
    textTransform: 'uppercase',
  },
});
