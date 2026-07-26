import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '@/constants/theme';
import type { FeatureTile } from '@/lib/demoData';

const TONE_COLORS: Record<FeatureTile['tone'], [string, string, string]> = {
  ash: ['#2A2420', '#1A1614', '#0E0C0B'],
  rust: ['#3A2218', '#241610', '#120C0A'],
  slate: ['#22262A', '#16181C', '#0C0E10'],
  ember: ['#3A2810', '#24180A', '#120C06'],
  ink: ['#1A1A1E', '#121214', '#08080A'],
  steel: ['#1E2428', '#14181C', '#0A0C0E'],
};

type FeatureCardProps = {
  tile: FeatureTile;
  style?: ViewStyle;
  minHeight?: number;
};

/**
 * PureVolume mosaic tile — full-bleed visual plane, bottom text overlay.
 */
export function FeatureCard({ tile, style, minHeight = 140 }: FeatureCardProps) {
  const tones = TONE_COLORS[tile.tone];
  const href = (
    tile.trackId ? `/track/${tile.trackId}` : `/artist/${tile.artistId}`
  ) as Href;

  const cardStyle = StyleSheet.flatten([styles.card, { minHeight }, style]);

  return (
    <Link href={href} asChild>
      <Pressable style={cardStyle}>
        <LinearGradient colors={tones} style={StyleSheet.absoluteFill} />
        <View style={styles.scan} />
        <View style={styles.monogramWrap}>
          <Text style={styles.monogram}>{tile.title.charAt(0)}</Text>
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.92)']}
          style={styles.overlay}
        >
          <Text style={styles.title} numberOfLines={2}>
            {tile.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {tile.subtitle}
          </Text>
        </LinearGradient>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    position: 'relative',
  },
  scan: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.phosphor,
    opacity: 0.35,
  },
  monogramWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogram: {
    fontFamily: 'SpaceMono',
    fontSize: 72,
    color: 'rgba(255,176,0,0.08)',
    letterSpacing: 4,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 28,
    paddingBottom: 10,
    gap: 3,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'none',
    fontWeight: '700',
  },
  subtitle: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.2,
    color: colors.phosphor,
    fontStyle: 'italic',
  },
});
