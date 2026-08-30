import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';

interface ListRowProps {
  title: string;
  subtitle?: string | null;
  meta?: string | null;
  onPress?: () => void;
}

export function ListRow({ title, subtitle, meta, onPress }: ListRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress} disabled={!onPress}>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      {onPress ? <Text style={styles.chevron}>›</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.paper,
  },
  body: { flex: 1 },
  title: {
    ...typography.body,
    fontWeight: '700',
    color: colors.navy,
  },
  subtitle: {
    ...typography.caption,
    color: colors.slate,
    marginTop: 3,
  },
  meta: {
    ...typography.caption,
    color: colors.accent,
    marginRight: spacing.sm,
  },
  chevron: {
    fontSize: 22,
    color: colors.slate,
    lineHeight: 24,
  },
});
