import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../tokens';

export interface HealthCardProps extends ViewProps {
  children: React.ReactNode;
  padded?: boolean;
  elevated?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

export function HealthCard({
  children,
  padded = true,
  elevated = true,
  backgroundColor = colors.surface.card,
  borderColor = colors.surface.border,
  style,
  ...rest
}: HealthCardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && shadows.card,
        padded && styles.padded,
        { backgroundColor, borderColor },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export function HealthCardHeader({
  icon,
  iconColor = colors.brand.blue,
  iconBg = colors.brand.blueLight,
  title,
  subtitle,
  right,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.header}>
      {icon ? (
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>
      ) : null}
      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1 },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: 2,
    lineHeight: 18,
  },
});
