import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, PrimaryButton, ReviewCard, ScoreBars, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { formatMoney } from '../../src/lib/averages';
import { colors, radii, spacing, typography } from '../../src/theme';

type TabKey = 'reviews' | 'salaries' | 'qa';

export default function CompanyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    getCompany,
    getCompanyReviews,
    getCompanySalaries,
    getCompanyAverages,
    getEmployerResponse,
    savedCompanyIds,
    toggleSavedCompany,
    user,
  } = useApp();
  const [tab, setTab] = useState<TabKey>('reviews');
  const company = getCompany(id);
  const reviews = getCompanyReviews(id);
  const salaries = getCompanySalaries(id);
  const averages = getCompanyAverages(id);
  const saved = savedCompanyIds.includes(id);

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
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.name}>{company.name}</Text>
            <Text style={styles.meta}>
              {company.industry} · {company.headquarters ?? company.location} · {company.size}
            </Text>
            <Text style={styles.summary}>{company.summary}</Text>
            <View style={styles.scoreRow}>
              <StarRating value={averages.overall} size="lg" />
              <Text style={styles.recommend}>
                {averages.reviewCount
                  ? `${averages.recommendPercent}% recommend · ${averages.reviewCount} reviews`
                  : 'No reviews yet'}
              </Text>
            </View>
            <ScoreBars scores={averages} />
            <View style={styles.row}>
              <PrimaryButton
                label={saved ? 'Saved' : 'Save'}
                variant="ghost"
                style={{ flex: 1 }}
                onPress={() => toggleSavedCompany(company.id)}
              />
              <PrimaryButton
                label="Compare"
                variant="ghost"
                style={{ flex: 1 }}
                onPress={() => router.push('/(tabs)/compare')}
              />
            </View>
          </View>

          <View style={styles.tabs}>
            {(
              [
                ['reviews', 'Reviews'],
                ['salaries', 'Salaries'],
                ['qa', 'Q&A / Responses'],
              ] as [TabKey, string][]
            ).map(([key, label]) => (
              <Chip key={key} label={label} active={tab === key} onPress={() => setTab(key)} />
            ))}
          </View>

          {tab === 'reviews'
            ? reviews.map((review) => (
                <Pressable key={review.id} onPress={() => router.push(`/review/${review.id}`)}>
                  <ReviewCard review={review} />
                  <View style={{ height: spacing.md }} />
                </Pressable>
              ))
            : null}

          {tab === 'salaries' ? (
            salaries.length === 0 ? (
              <Text style={styles.empty}>No salary data yet.</Text>
            ) : (
              salaries.map((salary) => (
                <View key={salary.id} style={styles.salaryCard}>
                  <Text style={styles.salaryRole}>{salary.role}</Text>
                  <Text style={styles.salaryAmt}>
                    {formatMoney(salary.baseAnnual, salary.currency)}
                  </Text>
                  <Text style={styles.meta}>
                    {salary.yearsExperience ?? '—'} yrs · bonus{' '}
                    {salary.bonusAnnual
                      ? formatMoney(salary.bonusAnnual, salary.currency)
                      : '—'}
                  </Text>
                </View>
              ))
            )
          ) : null}

          {tab === 'qa' ? (
            reviews.filter((review) => getEmployerResponse(review.id)).length === 0 ? (
              <Text style={styles.empty}>No employer responses yet.</Text>
            ) : (
              reviews.map((review) => {
                const response = getEmployerResponse(review.id);
                if (!response) return null;
                return (
                  <View key={review.id} style={styles.qaCard}>
                    <Text style={styles.qaTitle}>{review.title}</Text>
                    <Text style={styles.meta}>Employer response · {response.responderName}</Text>
                    <Text style={styles.qaBody}>{response.body}</Text>
                  </View>
                );
              })
            )
          ) : null}
        </ScrollView>

        <Pressable
          style={styles.fab}
          onPress={() => router.push(user ? '/(tabs)/contribute' : '/auth')}
        >
          <Text style={styles.fabText}>Rate This Company</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: 120, gap: spacing.md },
  hero: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  name: { fontFamily: typography.display, fontSize: 32, color: colors.ink },
  meta: { fontFamily: typography.bodyMedium, fontSize: 13, color: colors.inkSoft },
  summary: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  scoreRow: { gap: spacing.sm },
  recommend: { fontFamily: typography.bodySemi, fontSize: 13, color: colors.inkMuted },
  row: { flexDirection: 'row', gap: spacing.sm },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  empty: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  salaryCard: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  salaryRole: { fontFamily: typography.bodySemi, fontSize: 15, color: colors.ink },
  salaryAmt: { fontFamily: typography.displaySemi, fontSize: 22, color: colors.ink },
  qaCard: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  qaTitle: { fontFamily: typography.displaySemi, fontSize: 17, color: colors.ink },
  qaBody: { fontFamily: typography.body, fontSize: 14, lineHeight: 21, color: colors.inkMuted },
  fab: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  fabText: { fontFamily: typography.bodyBold, fontSize: 15, color: colors.ink },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
