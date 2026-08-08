import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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

import { Chip, FeedTicket, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import type { ExploreFilter } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

const FILTERS: { key: ExploreFilter; label: string }[] = [
  { key: 'trending', label: 'Trending' },
  { key: 'tech', label: 'Tech' },
  { key: 'retail', label: 'Retail' },
  { key: 'remote', label: 'Remote' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const { getFeed, getTrendingCompanies, getCompanyAverages, addRecentSearch } = useApp();
  const [filter, setFilter] = useState<ExploreFilter>('trending');
  const [query, setQuery] = useState('');
  const feed = useMemo(() => getFeed(filter), [getFeed, filter]);
  const trending = getTrendingCompanies();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>Rate My Employer</Text>
            <TextInput
              style={styles.search}
              placeholder="Search workplaces…"
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

            <Text style={styles.section}>Trending companies</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
              {trending.map((company) => {
                const avg = getCompanyAverages(company.id);
                return (
                  <Pressable
                    key={company.id}
                    style={styles.trendCard}
                    onPress={() => router.push(`/company/${company.id}`)}
                  >
                    <Text style={styles.trendName}>{company.name}</Text>
                    <Text style={styles.trendMeta}>{company.industry}</Text>
                    <StarRating value={avg.overall} size="sm" />
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.section}>Community feed</Text>
          </View>
        }
        renderItem={({ item }) => <FeedTicket item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.md, marginBottom: spacing.md },
  brand: {
    fontFamily: typography.display,
    fontSize: 28,
    color: colors.ink,
  },
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
  chips: { gap: spacing.sm, paddingRight: spacing.md },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  carousel: { gap: spacing.sm, paddingRight: spacing.md },
  trendCard: {
    width: 168,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  trendName: {
    fontFamily: typography.displaySemi,
    fontSize: 17,
    color: colors.ink,
  },
  trendMeta: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
});
