import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, radii, typography } from '../../theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'secondary' && styles.labelSecondary,
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
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: 'center',
    cursor: 'pointer',
  },
  primary: { backgroundColor: colors.blue },
  secondary: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.88 },
  label: {
    fontFamily: typography.bodyBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  labelSecondary: { color: colors.ink },
  labelGhost: { color: colors.inkMuted },
});
