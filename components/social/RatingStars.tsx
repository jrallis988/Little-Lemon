import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import type { RatingValue } from '@/types/models';

type RatingStarsProps = {
  value: RatingValue | number | null | undefined;
  size?: 'sm' | 'md';
};

/** Compact Letterboxd-style star row (supports half stars). */
export function RatingStars({ value, size = 'sm' }: RatingStarsProps) {
  if (value == null || value <= 0) {
    return null;
  }

  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const glyphs = '★'.repeat(full) + (half ? '½' : '');

  return (
    <View style={styles.row}>
      <Text style={[styles.stars, size === 'md' && styles.starsMd]}>{glyphs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.text,
  },
  starsMd: {
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
