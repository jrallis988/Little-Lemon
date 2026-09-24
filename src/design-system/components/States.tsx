import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BioCrossButton } from './BioCrossButton';
import { colors, spacing, typography } from '../tokens';

export function EmptyState({
  title,
  body,
  icon = 'file-tray-outline',
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.brand.blue} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel && onAction ? (
        <View style={{ marginTop: spacing.md, alignSelf: 'stretch' }}>
          <BioCrossButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel={message}>
      <ActivityIndicator size="large" color={colors.brand.blue} />
      <Text style={[styles.body, { marginTop: spacing.md }]}>{message}</Text>
    </View>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  body,
  actionLabel = 'Try again',
  onAction,
}: {
  title?: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.wrap} accessibilityRole="alert">
      <View style={[styles.iconWrap, { backgroundColor: colors.semantic.highBg }]}>
        <Ionicons name="cloud-offline-outline" size={28} color={colors.semantic.high} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {onAction ? (
        <View style={{ marginTop: spacing.md, alignSelf: 'stretch' }}>
          <BioCrossButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.xs,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    textAlign: 'center',
  },
  body: {
    fontSize: typography.size.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
