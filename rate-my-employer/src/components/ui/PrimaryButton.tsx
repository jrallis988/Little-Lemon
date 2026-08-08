import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, radii, typography } from '../../theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'accent' | 'ink' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'accent',
  disabled,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === 'accent' && styles.accent,
        variant === 'ink' && styles.ink,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'ink' && styles.labelOnInk,
          variant === 'ghost' && styles.labelGhost,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  accent: { backgroundColor: colors.accent },
  ink: { backgroundColor: colors.ink },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: { opacity: 0.55 },
  label: {
    fontFamily: typography.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  labelOnInk: { color: colors.accent },
  labelGhost: { color: colors.inkMuted },
});
