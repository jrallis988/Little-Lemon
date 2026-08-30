import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, PrimaryButton, ScoreBars, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getReview, getCompany, getWorkplace, getTagsForReview, voteReview } = useApp();
  const review = getReview(id);
  const company = review ? getCompany(review.companyId) : undefined;
  const workplace = review?.workplaceId ? getWorkplace(review.workplaceId) : undefined;
  const tags = review ? getTagsForReview(review) : [];

  if (!review || !company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Review not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: company.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.company}>{company.name}</Text>
        {workplace ? <Text style={styles.meta}>{workplace.name}</Text> : null}
        <Text style={styles.title}>{review.title}</Text>
        <Text style={styles.meta}>
          {review.authorName} · {review.role} ·{' '}
          {review.employmentStatus === 'current' ? 'Current' : 'Former'}
        </Text>
        <StarRating value={review.scores.overall} size="lg" />
        <ScoreBars scores={review.scores} />
        {review.pros ? (
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Pros</Text>
            <Text style={styles.boxBody}>{review.pros}</Text>
          </View>
        ) : null}
        {review.cons ? (
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Cons</Text>
            <Text style={styles.boxBody}>{review.cons}</Text>
          </View>
        ) : null}
        <Text style={styles.body}>{review.body}</Text>
        <View style={styles.tags}>
          {tags.map((tag) => (
            <Chip key={tag.id} label={tag.label} />
          ))}
        </View>
        <View style={styles.voteRow}>
          <PrimaryButton
            label={`Helpful (${review.helpfulCount ?? 0})`}
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => voteReview(review.id, 'up')}
          />
          <PrimaryButton
            label={`Not helpful (${review.notHelpfulCount ?? 0})`}
            variant="ghost"
            style={{ flex: 1 }}
            onPress={() => voteReview(review.id, 'down')}
          />
        </View>
        <PrimaryButton
          label="Write a Review"
          onPress={() => router.push('/(tabs)/write')}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  company: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.blue,
    textTransform: 'uppercase',
  },
  title: { fontFamily: typography.display, fontSize: 26, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  body: { fontFamily: typography.body, fontSize: 16, lineHeight: 24, color: colors.inkMuted },
  box: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  boxLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  boxBody: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  voteRow: { flexDirection: 'row', gap: spacing.sm },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
