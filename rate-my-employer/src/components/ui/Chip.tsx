import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '../../theme';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  tone?: 'default' | 'positive' | 'negative';
};

export function Chip({ label, active, onPress, tone = 'default' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.active,
        tone === 'positive' && styles.positive,
        tone === 'negative' && styles.negative,
      ]}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  active: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  positive: { borderColor: colors.accentDeep },
  negative: { borderColor: colors.danger },
  text: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  activeText: { color: colors.accent },
});
