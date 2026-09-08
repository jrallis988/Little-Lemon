import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';

export function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.body}>
        Reviews are stored against an anonymous device token (SHA-256 hashed on the
        server). Sign-in and campus email verification can plug in here later.
      </Text>
      <View style={styles.block}>
        <Text style={styles.label}>Identity</Text>
        <Text style={styles.value}>Anonymous student</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Home campus</Text>
        <Text style={styles.value}>Not set</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.navy,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.slate,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  block: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    ...typography.caption,
    color: colors.slate,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    ...typography.body,
    color: colors.ink,
    fontWeight: '600',
  },
});
