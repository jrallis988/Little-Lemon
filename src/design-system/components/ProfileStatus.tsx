import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../tokens';

export function ProfileStatus({
  readiness,
  note,
  onReview,
}: {
  readiness: 'strong' | 'good' | 'needs_attention' | 'getting_started';
  note: string;
  onReview?: () => void;
}) {
  const tone =
    readiness === 'strong' || readiness === 'good'
      ? { bg: colors.semantic.lowBg, fg: colors.semantic.low, border: colors.semantic.lowBorder }
      : readiness === 'needs_attention'
        ? { bg: colors.semantic.cautionBg, fg: colors.semantic.caution, border: colors.semantic.cautionBorder }
        : { bg: colors.brand.blueLight, fg: colors.brand.blue, border: colors.brand.blueMuted };

  const label =
    readiness === 'strong'
      ? 'Strong'
      : readiness === 'good'
        ? 'Good'
        : readiness === 'needs_attention'
          ? 'Needs attention'
          : 'Getting started';

  return (
    <View
      style={[styles.wrap, { backgroundColor: tone.bg, borderColor: tone.border }]}
      accessibilityRole="summary"
      accessibilityLabel={`Profile strength: ${label}. ${note}`}
    >
      <Ionicons name="shield-checkmark" size={20} color={tone.fg} />
      <View style={styles.textCol}>
        <Text style={[styles.title, { color: tone.fg }]}>
          Profile Strength: <Text style={styles.strong}>{label}</Text>
        </Text>
        <Text style={styles.note}>{note}</Text>
      </View>
      {onReview ? (
        <Pressable onPress={onReview} accessibilityRole="link" accessibilityLabel="Review profile">
          <Text style={styles.link}>Review Profile ›</Text>
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
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  textCol: { flex: 1 },
  title: { fontSize: typography.size.sm, fontWeight: '600' },
  strong: { fontWeight: '800' },
  note: { color: colors.text.secondary, fontSize: typography.size.xs, marginTop: 2 },
  link: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.xs },
});
