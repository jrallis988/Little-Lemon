import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, typography } from '../../theme';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
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
    backgroundColor: colors.blueSoft,
    borderColor: colors.blue,
  },
  text: {
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.inkMuted,
  },
  activeText: { color: colors.blue },
});
