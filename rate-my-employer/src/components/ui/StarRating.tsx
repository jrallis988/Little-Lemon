import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';

type Props = {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

export function StarRating({ value, onChange, size = 'md', label }: Props) {
  const fontSize = size === 'sm' ? 16 : size === 'lg' ? 28 : 22;

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(value);
          const starEl = (
            <Text
              style={[styles.star, { fontSize, color: filled ? colors.star : colors.border }]}
            >
              ★
            </Text>
          );

          if (!onChange) {
            return <View key={star}>{starEl}</View>;
          }

          return (
            <Pressable
              key={star}
              onPress={() => onChange(star)}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel={`Rate ${star} out of 5`}
            >
              {starEl}
            </Pressable>
          );
        })}
        <Text style={styles.value}>{value ? value.toFixed(1) : '—'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  label: {
    color: colors.inkMuted,
    fontFamily: typography.bodyMedium,
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    lineHeight: 30,
  },
  value: {
    marginLeft: spacing.sm,
    color: colors.ink,
    fontFamily: typography.bodySemi,
    fontSize: 14,
  },
});
