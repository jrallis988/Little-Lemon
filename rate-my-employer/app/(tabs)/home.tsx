import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

const FILTERS = [
  { key: 'trending', label: 'Trending' },
  { key: 'Retail', label: 'Retail' },
  { key: 'Healthcare', label: 'Healthcare' },
  { key: 'Technology', label: 'Technology' },
  { key: 'Education', label: 'Education' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const {
    companies,
    getTrendingCompanies,
    getCompanyReviews,
    getCompanyAverages,
    reviews,
    interviews,
    salaries,
    addRecentSearch,
  } = useApp();
  const [filter, setFilter] = useState<string>('trending');
  const [query, setQuery] = useState('');
  const trending = getTrendingCompanies();

  const feedCompanies =
    filter === 'trending'
      ? trending
      : companies.filter((company) => company.industry === filter);

  const recent = [
    ...reviews.slice(0, 3).map((review) => ({
      id: `r-${review.id}`,
      kind: 'review' as const,
      companyId: review.companyId,
      title: review.title,
      meta: review.role,
      score: review.scores.overall,
    })),
    ...salaries.slice(0, 2).map((salary) => ({
      id: `s-${salary.id}`,
      kind: 'salary' as const,
      companyId: salary.companyId,
      title: salary.role,
      meta: salary.hourlyRate
        ? `$${salary.hourlyRate.toFixed(2)}/hr`
        : `$${Math.round(salary.baseAnnual).toLocaleString()}`,
      score: 0,
    })),
    ...interviews.slice(0, 2).map((interview) => ({
      id: `i-${interview.id}`,
      kind: 'interview' as const,
      companyId: interview.companyId,
      title: `${interview.role} interview`,
      meta: interview.outcome,
      score: interview.rating,
    })),
  ].slice(0, 6);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>RME</Text>
            <Text style={styles.title}>Home</Text>
            <TextInput
              style={styles.search}
              placeholder="Search employers…"
              placeholderTextColor={colors.inkSoft}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={async () => {
                await addRecentSearch(query);
                router.push({ pathname: '/(tabs)/search', params: { q: query } });
              }}
              returnKeyType="search"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
              {FILTERS.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  active={filter === item.key}
                  onPress={() => setFilter(item.key)}
                />
              ))}
            </ScrollView>

            <Text style={styles.section}>Top employers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
              {feedCompanies.map((company) => {
                const avg = getCompanyAverages(company.id);
                return (
                  <Pressable
                    key={company.id}
                    style={styles.trendCard}
                    onPress={() => router.push(`/company/${company.id}`)}
                  >
                    <View style={[styles.logo, { backgroundColor: company.logoColor ?? colors.navy }]}>
                      <Text style={styles.logoText}>{company.name.slice(0, 1)}</Text>
                    </View>
                    <Text style={styles.trendName} numberOfLines={1}>
                      {company.name}
                    </Text>
                    <StarRating value={avg.overall} size="sm" />
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.section}>Recent activity</Text>
          </View>
        }
        renderItem={({ item }) => {
          const company = companies.find((c) => c.id === item.companyId);
          return (
            <Pressable
              style={styles.feedCard}
              onPress={() => router.push(`/company/${item.companyId}`)}
            >
              <Text style={styles.kicker}>{item.kind.toUpperCase()}</Text>
              <Text style={styles.feedTitle}>{company?.name}</Text>
              <Text style={styles.feedBody}>{item.title}</Text>
              <Text style={styles.meta}>{item.meta}</Text>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.md, marginBottom: spacing.md },
  brand: { fontFamily: typography.bodyBold, fontSize: 14, color: colors.blue },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  search: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
  },
  chips: { gap: spacing.sm },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  carousel: { gap: spacing.sm },
  trendCard: {
    width: 140,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#FFF', fontFamily: typography.bodyBold, fontSize: 16 },
  trendName: { fontFamily: typography.bodySemi, fontSize: 14, color: colors.ink },
  feedCard: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  kicker: {
    fontFamily: typography.bodySemi,
    fontSize: 11,
    color: colors.blue,
    letterSpacing: 0.4,
  },
  feedTitle: { fontFamily: typography.displaySemi, fontSize: 17, color: colors.ink },
  feedBody: { fontFamily: typography.body, fontSize: 14, color: colors.inkMuted },
  meta: { fontFamily: typography.body, fontSize: 12, color: colors.inkSoft },
});
