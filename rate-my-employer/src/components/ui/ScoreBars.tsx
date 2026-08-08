import { StyleSheet, Text, View } from 'react-native';

import type { ReviewScores } from '../../types';
import { colors, radii, spacing, typography } from '../../theme';

const LABELS: { key: keyof ReviewScores; label: string }[] = [
  { key: 'culture', label: 'Culture' },
  { key: 'pay', label: 'Pay & benefits' },
  { key: 'management', label: 'Management' },
  { key: 'workLife', label: 'Work-life balance' },
];

type Props = {
  scores: ReviewScores;
};

export function ScoreBars({ scores }: Props) {
  return (
    <View style={styles.wrap}>
      {LABELS.map(({ key, label }) => {
        const value = scores[key] ?? 0;
        const pct = Math.max(0, Math.min(5, value)) * 20;
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.value}>{value ? Number(value).toFixed(1) : '—'}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    width: 120,
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    color: colors.inkMuted,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: radii.sm,
    backgroundColor: colors.mist,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.ink,
    borderRadius: radii.sm,
  },
  value: {
    width: 32,
    textAlign: 'right',
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.ink,
  },
});
