import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';

interface RatingSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

/**
 * Structured 1–5 rating control used across professor / course / dorm / university forms.
 * Tap a segment to set the score (no third-party slider dependency).
 */
export function RatingSlider({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
}: RatingSliderProps) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.track}>
        {steps.map((step) => {
          const active = step <= value;
          return (
            <Text
              key={step}
              accessibilityRole="button"
              accessibilityLabel={`${label} ${step}`}
              onPress={() => onChange(step)}
              style={[styles.segment, active && styles.segmentActive]}
            >
              {step}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.ink,
    fontWeight: '600',
  },
  value: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '700',
  },
  track: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  segment: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: 8,
    backgroundColor: colors.mist,
    color: colors.slate,
    overflow: 'hidden',
    fontWeight: '600',
  },
  segmentActive: {
    backgroundColor: colors.accent,
    color: colors.white,
  },
});
