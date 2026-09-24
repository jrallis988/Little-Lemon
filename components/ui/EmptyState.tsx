import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, portalBox, spacing } from '@/constants/theme';

type EmptyStateProps = {
  title: string;
  body: string;
  retryLabel?: string;
};

/**
 * Portal empty / soft-error block — never leave a blank section unexplained.
 */
export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.body}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...portalBox,
    padding: spacing.md,
    gap: 6,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
