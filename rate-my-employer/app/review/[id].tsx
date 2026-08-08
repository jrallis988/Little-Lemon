import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { Chip, PrimaryButton, ScoreBars, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getReview, getCompany, getTagsForReview, getEmployerResponse, voteReview } = useApp();
  const review = getReview(id);
  const company = review ? getCompany(review.companyId) : undefined;
  const tags = review ? getTagsForReview(review) : [];
  const response = review ? getEmployerResponse(review.id) : undefined;

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
        <Text style={styles.company} onPress={() => router.push(`/company/${company.id}`)}>
          {company.name}
        </Text>
        <Text style={styles.title}>{review.title}</Text>
        <Text style={styles.meta}>
          {review.authorName} · {review.role} ·{' '}
          {review.employmentStatus === 'current' ? 'Current' : 'Former'}
          {review.isAnonymous ? ' · Anonymous' : ''}
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
            <Chip
              key={tag.id}
              label={tag.label}
              tone={tag.sentiment === 'negative' ? 'negative' : 'positive'}
            />
          ))}
        </View>

        <View style={styles.voteRow}>
          <PrimaryButton
            label={`Upvote (${review.helpfulCount ?? 0})`}
            variant="ghost"
            style={{ flex: 1 }}
            onPress={() => voteReview(review.id, 'up')}
          />
          <PrimaryButton
            label={`Downvote (${review.notHelpfulCount ?? 0})`}
            variant="ghost"
            style={{ flex: 1 }}
            onPress={() => voteReview(review.id, 'down')}
          />
        </View>

        {response ? (
          <View style={styles.response}>
            <Text style={styles.boxLabel}>Employer response · {response.responderName}</Text>
            <Text style={styles.boxBody}>{response.body}</Text>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  company: {
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: { fontFamily: typography.display, fontSize: 30, color: colors.ink },
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
  response: {
    backgroundColor: colors.mist,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: 6,
  },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
