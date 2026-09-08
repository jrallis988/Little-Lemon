import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  onBack?: () => void;
}

export function ScreenHeader({ title, subtitle, eyebrow, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      ) : null}
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.paper,
  },
  back: {
    ...typography.caption,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    ...typography.caption,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.navy,
  },
  subtitle: {
    ...typography.caption,
    color: colors.slate,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
});
