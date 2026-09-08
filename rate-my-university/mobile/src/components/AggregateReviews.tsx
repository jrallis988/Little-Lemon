import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { api } from '../api/client';
import { colors, spacing, typography } from '../constants/theme';
import type { Review, ReviewAggregate, ReviewTargetType } from '../types';

interface AggregateReviewsProps {
  targetType: ReviewTargetType;
  targetId: string;
}

export function AggregateReviews({ targetType, targetId }: AggregateReviewsProps) {
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [rev, agg] = await Promise.all([
          api.listReviews(targetType, targetId),
          api.getAggregate(targetType, targetId).catch(() => null),
        ]);
        if (cancelled) return;
        setReviews(rev.items);
        setAggregate(agg);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load reviews');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetType, targetId]);

  if (loading) {
    return <ActivityIndicator color={colors.accent} style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Ratings</Text>
      {aggregate ? (
        <>
          <Text style={styles.count}>{aggregate.review_count} reviews</Text>
          <View style={styles.metrics}>
            {Object.entries(aggregate.avg_ratings).map(([key, value]) => (
              <View key={key} style={styles.metric}>
                <Text style={styles.metricKey}>{key.replace(/_/g, ' ')}</Text>
                <Text style={styles.metricVal}>{value.toFixed(1)}</Text>
              </View>
            ))}
          </View>
          {aggregate.top_tags.length > 0 ? (
            <View style={styles.tags}>
              {aggregate.top_tags.map((tag) => (
                <Text key={tag} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          ) : null}
        </>
      ) : (
        <Text style={styles.empty}>No reviews yet — be the first.</Text>
      )}

      <Text style={[styles.heading, styles.reviewHeading]}>Recent reviews</Text>
      {reviews.length === 0 ? (
        <Text style={styles.empty}>Nothing here yet.</Text>
      ) : (
        reviews.slice(0, 8).map((review) => (
          <View key={review.id} style={styles.review}>
            <Text style={styles.reviewScores}>
              {Object.entries(review.ratings)
                .map(([k, v]) => `${k.replace(/_/g, ' ')} ${v}`)
                .join(' · ')}
            </Text>
            {review.comment ? (
              <Text style={styles.comment}>{review.comment}</Text>
            ) : null}
            {review.qualitative_tags.length > 0 ? (
              <Text style={styles.reviewTags}>
                {review.qualitative_tags.join(' · ')}
              </Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loader: { marginVertical: spacing.lg },
  error: {
    ...typography.caption,
    color: colors.accent,
    paddingHorizontal: spacing.lg,
  },
  heading: {
    ...typography.body,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  reviewHeading: { marginTop: spacing.lg },
  count: {
    ...typography.caption,
    color: colors.slate,
    marginBottom: spacing.sm,
  },
  metrics: { gap: spacing.sm },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  metricKey: {
    ...typography.body,
    color: colors.slate,
    textTransform: 'capitalize',
  },
  metricVal: {
    ...typography.body,
    fontWeight: '700',
    color: colors.accent,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  tag: {
    ...typography.caption,
    backgroundColor: colors.mist,
    color: colors.navy,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    overflow: 'hidden',
  },
  empty: {
    ...typography.caption,
    color: colors.slate,
  },
  review: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  reviewScores: {
    ...typography.caption,
    color: colors.slate,
  },
  comment: {
    ...typography.body,
    color: colors.ink,
    marginTop: spacing.xs,
  },
  reviewTags: {
    ...typography.caption,
    color: colors.accent,
    marginTop: spacing.xs,
  },
});
