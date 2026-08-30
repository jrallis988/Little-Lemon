import { StyleSheet, Text, View } from 'react-native';

import type { Review } from '../../types';
import { colors, radii, spacing, typography } from '../../theme';
import { StarRating } from '../ui/StarRating';

type Props = { review: Review };

export function ReviewCard({ review }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{review.title}</Text>
        <StarRating value={review.scores.overall} size="sm" />
      </View>
      <Text style={styles.meta}>
        {review.authorName} · {review.role} ·{' '}
        {review.employmentStatus === 'current' ? 'Current' : 'Former'}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {review.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: { gap: spacing.xs },
  title: {
    fontFamily: typography.displaySemi,
    fontSize: 16,
    color: colors.ink,
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  body: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
  },
});
