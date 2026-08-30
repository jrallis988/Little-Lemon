import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, PrimaryButton, ReviewCard, ScoreBars, StarRating } from '../../../src/components';
import { useApp } from '../../../src/context/AppContext';
import { formatMoney } from '../../../src/lib/averages';
import { colors, radii, spacing, typography } from '../../../src/theme';

type TabKey = 'overview' | 'reviews' | 'interviews' | 'salaries';

export default function WorkplaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    getWorkplace,
    getCompany,
    getCompanyReviews,
    getCompanyInterviews,
    getCompanySalaries,
    getCompanyAverages,
    user,
  } = useApp();
  const [tab, setTab] = useState<TabKey>('overview');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const workplace = getWorkplace(id);
  const company = workplace ? getCompany(workplace.companyId) : undefined;

  if (!workplace || !company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Workplace not found.</Text>
      </View>
    );
  }

  const reviews = getCompanyReviews(company.id, workplace.id).filter((review) =>
    roleFilter ? review.role === roleFilter || review.department === roleFilter : true,
  );
  const interviews = getCompanyInterviews(company.id, workplace.id);
  const salaries = getCompanySalaries(company.id, workplace.id);
  const averages = getCompanyAverages(company.id, workplace.id);
  const roles = Array.from(
    new Set(
      getCompanyReviews(company.id, workplace.id).flatMap((review) =>
        [review.role, review.department].filter(Boolean) as string[],
      ),
    ),
  );

  const averageHourly = (() => {
    const hourly = salaries.filter((s) => s.hourlyRate);
    if (hourly.length === 0) return null;
    return hourly.reduce((sum, s) => sum + (s.hourlyRate ?? 0), 0) / hourly.length;
  })();

  return (
    <>
      <Stack.Screen options={{ title: workplace.storeCode ?? workplace.city }} />
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.company}>{company.name}</Text>
            <Text style={styles.name}>{workplace.name}</Text>
            <Text style={styles.meta}>
              {workplace.address}, {workplace.city}, {workplace.state} {workplace.zip}
            </Text>
            <StarRating value={averages.overall} size="lg" />
            <Text style={styles.meta}>
              {averages.overall.toFixed(1)} · {averages.experienceCount ?? averages.reviewCount}{' '}
              experiences
            </Text>
            <ScoreBars scores={averages} />
          </View>

          <View style={styles.tabs}>
            {(
              [
                ['overview', 'Overview'],
                ['reviews', 'Reviews'],
                ['interviews', 'Interviews'],
                ['salaries', 'Salaries'],
              ] as [TabKey, string][]
            ).map(([key, label]) => (
              <Chip key={key} label={label} active={tab === key} onPress={() => setTab(key)} />
            ))}
          </View>

          {tab === 'overview' ? (
            <View style={styles.card}>
              <Text style={styles.section}>About this location</Text>
              <Text style={styles.body}>
                {workplace.summary ??
                  `${workplace.name} is a ${company.industry.toLowerCase()} location for ${company.name}.`}
              </Text>
              {roles.length > 0 ? (
                <>
                  <Text style={[styles.section, { marginTop: spacing.md }]}>Filter by role</Text>
                  <View style={styles.wrap}>
                    <Chip
                      label="All"
                      active={!roleFilter}
                      onPress={() => setRoleFilter(null)}
                    />
                    {roles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        active={roleFilter === role}
                        onPress={() => setRoleFilter(role)}
                      />
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          ) : null}

          {tab === 'reviews'
            ? reviews.map((review) => (
                <Pressable key={review.id} onPress={() => router.push(`/review/${review.id}`)}>
                  <ReviewCard review={review} />
                  <View style={{ height: spacing.md }} />
                </Pressable>
              ))
            : null}

          {tab === 'interviews'
            ? interviews.map((interview) => (
                <Pressable
                  key={interview.id}
                  style={styles.card}
                  onPress={() => router.push(`/interview/${interview.id}`)}
                >
                  <Text style={styles.cardTitle}>{interview.role}</Text>
                  <StarRating value={interview.rating} size="sm" />
                  <Text style={styles.meta}>{interview.outcome}</Text>
                  <Text style={styles.body} numberOfLines={2}>
                    {interview.body}
                  </Text>
                </Pressable>
              ))
            : null}

          {tab === 'salaries' ? (
            salaries.length === 0 ? (
              <Text style={styles.empty}>No salary data yet.</Text>
            ) : (
              <>
                <View style={styles.card}>
                  <Text style={styles.section}>Average pay</Text>
                  <Text style={styles.avg}>
                    {averageHourly == null
                      ? '—'
                      : '$' + averageHourly.toFixed(2) + '/hr'}
                  </Text>
                  <Text style={styles.meta}>Based on {salaries.length} salaries</Text>
                </View>
                {salaries.map((salary) => (
                  <View key={salary.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{salary.role}</Text>
                    <Text style={styles.avg}>
                      {salary.hourlyRate
                        ? '$' + salary.hourlyRate.toFixed(2) + '/hr'
                        : formatMoney(salary.baseAnnual, salary.currency)}
                    </Text>
                  </View>
                ))}
              </>
            )
          ) : null}
        </ScrollView>

        <Pressable
          style={styles.fab}
          onPress={() => router.push(user ? '/(tabs)/write' : '/auth')}
        >
          <Text style={styles.fabText}>Write a Review</Text>
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
    gap: spacing.sm,
  },
  company: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.blue,
    textTransform: 'uppercase',
  },
  name: { fontFamily: typography.display, fontSize: 24, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  body: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  cardTitle: { fontFamily: typography.bodySemi, fontSize: 16, color: colors.ink },
  avg: { fontFamily: typography.display, fontSize: 24, color: colors.ink },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  empty: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  fab: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.blue,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  fabText: { fontFamily: typography.bodyBold, fontSize: 15, color: '#FFFFFF' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
