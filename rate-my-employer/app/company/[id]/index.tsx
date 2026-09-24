import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  Chip,
  EmptyState,
  PrimaryButton,
  ReviewCard,
  RoleFilterModal,
  ScoreBars,
  StarRating,
} from '../../../src/components';
import { useApp } from '../../../src/context/AppContext';
import { formatMoney } from '../../../src/lib/averages';
import { colors, radii, spacing, typography } from '../../../src/theme';

type TabKey = 'overview' | 'workplaces' | 'salaries' | 'reviews' | 'interviews';

export default function CompanyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    getCompany,
    getCompanyReviews,
    getCompanyInterviews,
    getCompanySalaries,
    getCompanyAverages,
    getWorkplacesForCompany,
    savedCompanyIds,
    toggleSavedCompany,
  } = useApp();
  const [tab, setTab] = useState<TabKey>('overview');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const company = getCompany(id);
  const allReviews = getCompanyReviews(id);
  const allInterviews = getCompanyInterviews(id);
  const allSalaries = getCompanySalaries(id);
  const reviews = allReviews.filter((review) =>
    roleFilter ? review.role === roleFilter || review.department === roleFilter : true,
  );
  const interviews = allInterviews.filter((item) =>
    roleFilter ? item.role === roleFilter : true,
  );
  const salaries = allSalaries.filter((item) => (roleFilter ? item.role === roleFilter : true));
  const workplaces = getWorkplacesForCompany(id);
  const averages = getCompanyAverages(id);
  const saved = savedCompanyIds.includes(company?.id ?? id);
  const roles = Array.from(
    new Set(
      [
        ...allReviews.flatMap((review) =>
          [review.role, review.department].filter(Boolean) as string[],
        ),
        ...allInterviews.map((item) => item.role),
        ...allSalaries.map((item) => item.role),
      ].filter(Boolean),
    ),
  );

  const averagePayLabel = (() => {
    const hourly = salaries.filter((s) => s.hourlyRate);
    if (hourly.length > 0) {
      const avg = hourly.reduce((sum, s) => sum + (s.hourlyRate ?? 0), 0) / hourly.length;
      return `$${avg.toFixed(2)}/hr`;
    }
    if (salaries.length === 0) return '—';
    return formatMoney(salaries.reduce((sum, s) => sum + s.baseAnnual, 0) / salaries.length);
  })();

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
        <View style={styles.hero}>
          <View style={[styles.logo, { backgroundColor: company.logoColor ?? colors.navy }]}>
            <Text style={styles.logoText}>{company.name.slice(0, 1)}</Text>
          </View>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.meta}>
            {company.industry} · {company.headquarters ?? company.location}
          </Text>
          <StarRating value={averages.overall} size="lg" />
          <Text style={styles.recommend}>
            {averages.experienceCount ?? averages.reviewCount} experiences ·{' '}
            {averages.reviewCount} reviews · {averages.interviewCount ?? 0} interviews
          </Text>
          <ScoreBars scores={averages} />
          <View style={styles.row}>
            <PrimaryButton
              label={saved ? 'Saved' : 'Save'}
              variant="secondary"
              style={{ flex: 1 }}
              onPress={() => toggleSavedCompany(company.id)}
            />
            <PrimaryButton
              label={roleFilter ? `Role · ${roleFilter}` : 'Filter role'}
              variant="secondary"
              style={{ flex: 1 }}
              onPress={() => setRoleModalOpen(true)}
            />
          </View>
        </View>

        <View style={styles.tabs}>
          {(
            [
              ['overview', 'Overview'],
              ['workplaces', 'Workplaces'],
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
            <Text style={styles.section}>About</Text>
            <Text style={styles.body}>{company.summary}</Text>
            <PrimaryButton
              label="Browse workplaces"
              variant="ghost"
              onPress={() => router.push(`/company/${company.id}/workplaces`)}
            />
          </View>
        ) : null}

        {tab === 'workplaces' ? (
          workplaces.length === 0 ? (
            <EmptyState title="No workplaces yet" body="This employer has no locations listed." />
          ) : (
            workplaces.map((workplace) => (
              <Pressable
                key={workplace.id}
                style={styles.card}
                onPress={() => router.push(`/workplace/${workplace.id}`)}
              >
                <Text style={styles.cardTitle}>{workplace.name}</Text>
                <Text style={styles.meta}>
                  {workplace.storeCode ? `${workplace.storeCode} · ` : ''}
                  {workplace.city}, {workplace.state}
                </Text>
              </Pressable>
            ))
          )
        ) : null}

        {tab === 'reviews' ? (
          reviews.length === 0 ? (
            <EmptyState
              title="No reviews yet"
              body="Be the first to share a work experience here."
              actionLabel="Write a review"
              onAction={() => router.push('/(tabs)/write')}
            />
          ) : (
            reviews.map((review) => (
              <Pressable key={review.id} onPress={() => router.push(`/review/${review.id}`)}>
                <ReviewCard review={review} />
                <View style={{ height: spacing.md }} />
              </Pressable>
            ))
          )
        ) : null}

        {tab === 'interviews' ? (
          interviews.length === 0 ? (
            <EmptyState
              title="No interviews yet"
              body="Share how hiring felt at this employer."
              actionLabel="Write an interview"
              onAction={() => router.push('/(tabs)/write')}
            />
          ) : (
            interviews.map((interview) => (
              <Pressable
                key={interview.id}
                style={styles.card}
                onPress={() => router.push(`/interview/${interview.id}`)}
              >
                <Text style={styles.cardTitle}>{interview.role}</Text>
                <StarRating value={interview.rating} size="sm" />
                <Text style={styles.meta}>
                  {interview.outcome} · {interview.interviewDate ?? 'Recent'}
                </Text>
                <Text style={styles.body} numberOfLines={2}>
                  {interview.body}
                </Text>
              </Pressable>
            ))
          )
        ) : null}

        {tab === 'salaries' ? (
          salaries.length === 0 ? (
            <EmptyState
              title="No salary data yet"
              body="Pay signals will appear as people contribute."
            />
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.section}>Average pay</Text>
                <Text style={styles.avg}>{averagePayLabel}</Text>
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

      <RoleFilterModal
        visible={roleModalOpen}
        roles={roles}
        selected={roleFilter}
        onClose={() => setRoleModalOpen(false)}
        onSelect={(role) => {
          setRoleFilter(role);
          if (role && tab === 'overview') setTab('reviews');
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  hero: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#FFF', fontFamily: typography.bodyBold, fontSize: 22 },
  name: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  meta: { fontFamily: typography.bodyMedium, fontSize: 13, color: colors.inkSoft },
  recommend: { fontFamily: typography.bodySemi, fontSize: 13, color: colors.inkMuted },
  row: { flexDirection: 'row', gap: spacing.sm },
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
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
