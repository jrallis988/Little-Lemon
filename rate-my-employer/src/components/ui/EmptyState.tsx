import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

type Props = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, body, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel && onAction ? (
        <PrimaryButton label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  title: { fontFamily: typography.bodySemi, fontSize: 16, color: colors.ink },
  body: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.inkMuted,
    marginBottom: spacing.sm,
  },
});
