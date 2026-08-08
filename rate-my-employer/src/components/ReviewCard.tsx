import { StyleSheet, Text, View } from 'react-native';

import type { Review } from '../types';
import { colors, radii, spacing } from '../theme';
import { StarRating } from './StarRating';

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{review.title}</Text>
        <StarRating value={review.scores.overall} size="sm" />
      </View>
      <Text style={styles.meta}>
        {review.authorName} · {review.role} ·{' '}
        {review.employmentStatus === 'current' ? 'Current' : 'Former'} ·{' '}
        {review.wouldRecommend ? 'Recommends' : 'Does not recommend'}
      </Text>
      <Text style={styles.body}>{review.body}</Text>
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
  header: {
    gap: spacing.xs,
  },
  title: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 18,
    color: colors.ink,
  },
  meta: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: colors.inkSoft,
  },
  body: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkMuted,
  },
});
