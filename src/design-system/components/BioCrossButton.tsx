import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, touchTargets, typography } from '../tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'md' | 'lg' | 'sm';

export interface BioCrossButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  accessibilityHint?: string;
}

export function BioCrossButton({
  label,
  variant = 'primary',
  size = 'lg',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  disabled,
  accessibilityHint,
  style,
  ...rest
}: BioCrossButtonProps) {
  const isDisabled = disabled || loading;
  const palette = variantStyles[variant];
  const sizing = sizeStyles[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        palette.container,
        sizing.container,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={palette.text.color as string} />
      ) : (
        <>
          {icon && iconPosition === 'left' ? (
            <Ionicons name={icon} size={sizing.icon} color={palette.text.color as string} style={styles.iconLeft} />
          ) : null}
          <Text style={[styles.label, palette.text, sizing.text]}>{label}</Text>
          {icon && iconPosition === 'right' ? (
            <Ionicons name={icon} size={sizing.icon} color={palette.text.color as string} style={styles.iconRight} />
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: touchTargets.min,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.5 },
  label: {
    fontWeight: '700',
    fontSize: typography.size.md,
  },
  iconLeft: { marginRight: spacing.xs },
  iconRight: { marginLeft: spacing.xs },
});

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: colors.brand.blue },
    text: { color: colors.text.inverse },
  },
  secondary: {
    container: { backgroundColor: colors.brand.blueLight },
    text: { color: colors.brand.blue },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.brand.blue },
  },
  danger: {
    container: { backgroundColor: colors.semantic.highBg, borderWidth: 1, borderColor: colors.semantic.highBorder },
    text: { color: colors.semantic.high },
  },
  outline: {
    container: {
      backgroundColor: colors.surface.card,
      borderWidth: 1.5,
      borderColor: colors.brand.blue,
    },
    text: { color: colors.brand.blue },
  },
};

const sizeStyles: Record<Size, { container: ViewStyle; text: TextStyle; icon: number }> = {
  sm: { container: { minHeight: 40, paddingHorizontal: spacing.md }, text: { fontSize: 14 }, icon: 16 },
  md: { container: { minHeight: 44 }, text: { fontSize: 15 }, icon: 18 },
  lg: { container: { minHeight: 52 }, text: { fontSize: 16 }, icon: 20 },
};
