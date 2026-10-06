import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { fonts, palette, radii } from '@/constants/theme';
import type { Album } from '@/types/models';

type Props = {
  album: Album;
  size?: number;
  style?: ViewStyle;
};

export function AlbumCover({ album, size = 72, style }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(album.coverUrl) && !imageFailed;
  const radius = radii.sleeve;
  const initials = album.title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <View style={[{ width: size, height: size }, styles.shadow, style]}>
      {showImage ? (
        <Image
          source={{ uri: album.coverUrl }}
          style={{ width: size, height: size, borderRadius: radius }}
          onError={() => setImageFailed(true)}
          accessibilityLabel={`${album.title} cover`}
        />
      ) : (
        <LinearGradient
          colors={[album.coverColor, shade(album.coverColor), palette.ink]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cover, { width: size, height: size, borderRadius: radius }]}>
          <View style={[styles.grooveOuter, { pointerEvents: 'none' }]} />
          <View style={[styles.grooveInner, { pointerEvents: 'none' }]} />
          <View style={[styles.hole, { pointerEvents: 'none' }]} />
          <Text style={[styles.initials, { fontSize: Math.max(14, size * 0.22) }]}>{initials}</Text>
        </LinearGradient>
      )}
    </View>
  );
}

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
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  cover: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  grooveOuter: {
    position: 'absolute',
    width: '82%',
    height: '82%',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  grooveInner: {
    position: 'absolute',
    width: '52%',
    height: '52%',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(7,21,28,0.2)',
  },
  hole: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(7,21,28,0.35)',
  },
  initials: {
    fontFamily: fonts.displayBlack,
    color: palette.white,
    opacity: 0.85,
    letterSpacing: -0.5,
  },
});
