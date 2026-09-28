import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, palette } from '@/constants/theme';
import type { ListenRating } from '@/types/models';

type Props = {
  value?: ListenRating;
  size?: 'sm' | 'md';
  editable?: boolean;
  onChange?: (value: ListenRating) => void;
};

const STEPS: ListenRating[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export function RatingStars({ value, size = 'sm', editable = false, onChange }: Props) {
  if (!editable) {
    if (value == null) return null;
    return (
      <Text style={[styles.readout, size === 'md' && styles.readoutMd]}>
        {'★'.repeat(Math.floor(value))}
        {value % 1 ? '½' : ''}
        <Text style={styles.muted}> {value.toFixed(1)}</Text>
      </Text>
    );
  }

  return (
    <View style={styles.row}>
      {STEPS.filter((s) => s % 1 === 0).map((star) => {
        const filled = (value ?? 0) >= star;
        const half = (value ?? 0) === star - 0.5;
        return (
          <Pressable
            key={star}
            onPress={() => {
              if (!onChange) return;
              // Tap cycles: empty → half → full for that star position
              if (value === star) onChange((star - 0.5) as ListenRating);
              else if (value === star - 0.5) onChange(star);
              else onChange(star);
            }}
            hitSlop={6}
            style={styles.starHit}>
            <Text style={[styles.star, filled && styles.starFilled, half && styles.starHalf]}>
              {filled ? '★' : half ? '★' : '☆'}
            </Text>
          </Pressable>
        );
      })}
      {value != null && <Text style={styles.valueLabel}>{value.toFixed(1)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  readout: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.star,
  },
  readoutMd: {
    fontSize: 16,
  },
  muted: {
    color: palette.inkMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starHit: {
    padding: 2,
  },
  star: {
    fontSize: 22,
    color: palette.inkFaint,
  },
  starFilled: {
    color: palette.star,
  },
  starHalf: {
    color: palette.star,
    opacity: 0.55,
  },
  valueLabel: {
    marginLeft: 8,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: palette.ink,
  },
});
