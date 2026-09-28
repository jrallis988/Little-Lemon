import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fonts, palette, radii } from '@/constants/theme';
import type { ListenRating } from '@/types/models';

type Props = {
  value?: ListenRating;
  size?: 'sm' | 'md';
  editable?: boolean;
  onChange?: (value: ListenRating) => void;
};

const WHOLE_STARS: ListenRating[] = [1, 2, 3, 4, 5];

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
    <View style={styles.row} accessibilityRole="radiogroup">
      {WHOLE_STARS.map((star) => {
        const filled = (value ?? 0) >= star;
        return (
          <Pressable
            key={star}
            accessibilityRole="radio"
            accessibilityState={{ selected: value === star }}
            accessibilityLabel={`Rate ${star} stars`}
            testID={`rating-${star}`}
            onPress={() => onChange?.(star)}
            style={[styles.starHit, filled && styles.starHitFilled]}>
            <Text style={[styles.star, filled && styles.starFilled]}>{filled ? '★' : '☆'}</Text>
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
    gap: 6,
  },
  starHit: {
    minWidth: 40,
    minHeight: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 31, 42, 0.04)',
  },
  starHitFilled: {
    backgroundColor: 'rgba(232, 163, 23, 0.16)',
  },
  star: {
    fontSize: 22,
    color: palette.inkFaint,
  },
  starFilled: {
    color: palette.star,
  },
  valueLabel: {
    marginLeft: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: palette.ink,
  },
});
