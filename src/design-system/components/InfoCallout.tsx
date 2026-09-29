import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../tokens';

type Tone = 'info' | 'success' | 'warning' | 'privacy';

export function InfoCallout({
  title,
  body,
  tone = 'info',
  actionLabel,
  onAction,
  icon = 'information-circle',
}: {
  title?: string;
  body: string;
  tone?: Tone;
  actionLabel?: string;
  onAction?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const palette = {
    info: { bg: colors.brand.blueLight, fg: colors.brand.blue, border: colors.brand.blueMuted },
    success: { bg: colors.semantic.lowBg, fg: colors.semantic.low, border: colors.semantic.lowBorder },
    warning: { bg: colors.semantic.cautionBg, fg: colors.semantic.caution, border: colors.semantic.cautionBorder },
    privacy: { bg: colors.brand.blueLight, fg: colors.brand.blue, border: colors.brand.blueMuted },
  }[tone];

  return (
    <View
      style={[styles.wrap, { backgroundColor: palette.bg, borderColor: palette.border }]}
      accessibilityRole="text"
      accessibilityLabel={`${title ?? ''} ${body}`}
    >
      <View style={[styles.icon, { backgroundColor: '#fff' }]}>
        <Ionicons name={icon} size={18} color={palette.fg} />
      </View>
      <View style={styles.content}>
        {title ? <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text> : null}
        <Text style={styles.body}>{body}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="link" accessibilityLabel={actionLabel}>
          <Text style={[styles.action, { color: palette.fg }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  title: { fontWeight: '700', fontSize: typography.size.sm, marginBottom: 2 },
  body: { color: colors.text.secondary, fontSize: typography.size.sm, lineHeight: 18 },
  action: { fontWeight: '700', fontSize: typography.size.sm },
});
