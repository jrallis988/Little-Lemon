import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { ReviewCard, ScoreBars, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function CompanyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getCompany, getCompanyReviews, getCompanyAverages, user } = useApp();
  const company = getCompany(id);
  const reviews = getCompanyReviews(id);
  const averages = getCompanyAverages(id);

  if (!company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Employer not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: company.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeIn.duration(350)} style={styles.hero}>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.meta}>
            {company.industry} · {company.location} · {company.size}
          </Text>
          <Text style={styles.summary}>{company.summary}</Text>
          <View style={styles.scoreRow}>
            <StarRating value={averages.overall} size="lg" />
            <View>
              <Text style={styles.recommend}>
                {averages.reviewCount
                  ? `${averages.recommendPercent}% would recommend`
                  : 'Be the first to review'}
              </Text>
              <Text style={styles.count}>
                {averages.reviewCount} review{averages.reviewCount === 1 ? '' : 's'}
              </Text>
            </View>
          </View>
          {averages.reviewCount > 0 ? <ScoreBars scores={averages} /> : null}
          <Pressable
            style={styles.cta}
            onPress={() => router.push(user ? `/review/${company.id}` : '/auth')}
          >
            <Text style={styles.ctaText}>
              {user ? 'Write a review' : 'Sign in to write a review'}
            </Text>
          </Pressable>
        </Animated.View>

        <Text style={styles.section}>Reviews</Text>
        <View style={styles.reviewList}>
          {reviews.length === 0 ? (
            <Text style={styles.empty}>No reviews yet. Share what it was really like.</Text>
          ) : (
            reviews.map((review, index) => (
              <Animated.View
                key={review.id}
                entering={FadeInUp.delay(Math.min(index, 5) * 60).springify()}
              >
                <ReviewCard review={review} />
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  name: {
    fontFamily: typography.display,
    fontSize: 34,
    lineHeight: 38,
    color: colors.ink,
  },
  meta: {
    fontFamily: typography.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
  },
  summary: {
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  recommend: {
    fontFamily: typography.bodySemi,
    fontSize: 14,
    color: colors.ink,
    textAlign: 'right',
  },
  count: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
    textAlign: 'right',
  },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: typography.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  reviewList: { gap: spacing.md },
  empty: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  missingText: {
    fontFamily: typography.bodyMedium,
    fontSize: 16,
    color: colors.inkMuted,
  },
});
