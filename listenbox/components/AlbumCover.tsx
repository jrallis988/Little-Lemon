import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { fonts, palette, radii } from '@/constants/theme';
import type { Album } from '@/types/models';

type Props = {
  album: Album;
  size?: number;
  style?: ViewStyle;
};

export function AlbumCover({ album, size = 72, style }: Props) {
  const initials = album.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <View style={[{ width: size, height: size }, styles.shadow, style]}>
      <LinearGradient
        colors={[album.coverColor, shade(album.coverColor)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cover, { width: size, height: size, borderRadius: Math.max(8, size * 0.12) }]}>
        <View pointerEvents="none" style={styles.groove} />
        <Text style={[styles.initials, { fontSize: size * 0.28 }]}>{initials}</Text>
      </LinearGradient>
    </View>
  );
}

/** Darken a hex color slightly for gradient depth. */
function shade(hex: string): string {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return palette.ink;
  const n = parseInt(cleaned, 16);
  const r = Math.max(0, ((n >> 16) & 255) - 40);
  const g = Math.max(0, ((n >> 8) & 255) - 40);
  const b = Math.max(0, (n & 255) - 40);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: palette.ink,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  groove: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 42, 0.12)',
  },
  initials: {
    fontFamily: fonts.display,
    color: palette.ink,
    opacity: 0.55,
  },
});
