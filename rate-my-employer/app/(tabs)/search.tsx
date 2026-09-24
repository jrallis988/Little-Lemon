import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompanyCard, PrimaryButton } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { POPULAR_SEARCHES } from '../../src/data/seed';
import { INDUSTRY_CATEGORIES as CATS } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();
  const { searchCompanies, getCompanyReviews, recentSearches, addRecentSearch } = useApp();
  const [query, setQuery] = useState(params.q ?? '');

  useEffect(() => {
    if (params.q) setQuery(params.q);
  }, [params.q]);

  const results = searchCompanies(query);
  const showHome = query.trim().length === 0;
  const topMatch = results[0];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={showHome ? [] : results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Find Employer</Text>
            <TextInput
              style={styles.search}
              placeholder="Search employers…"
              placeholderTextColor={colors.inkSoft}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => addRecentSearch(query)}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />

            {showHome ? (
              <>
                <Text style={styles.section}>Popular searches</Text>
                <View style={styles.wrap}>
                  {POPULAR_SEARCHES.map((item) => (
                    <Pressable key={item} style={styles.pill} onPress={() => setQuery(item)}>
                      <Text style={styles.pillText}>{item}</Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.section}>Browse by industry</Text>
                <View style={styles.grid}>
                  {CATS.map((category) => (
                    <Pressable
                      key={category}
                      style={styles.gridItem}
                      onPress={() => setQuery(category)}
                    >
                      <Text style={styles.gridText}>{category}</Text>
                    </Pressable>
                  ))}
                </View>

                {recentSearches.length > 0 ? (
                  <>
                    <Text style={styles.section}>Recent</Text>
                    {recentSearches.map((item) => (
                      <Pressable key={item} style={styles.recent} onPress={() => setQuery(item)}>
                        <Text style={styles.recentText}>{item}</Text>
                      </Pressable>
                    ))}
                  </>
                ) : null}
              </>
            ) : (
              <>
                <Text style={styles.section}>
                  {results.length} result{results.length === 1 ? '' : 's'}
                </Text>
                {topMatch ? (
                  <View style={styles.topMatch}>
                    <Text style={styles.topLabel}>Top employer match</Text>
                    <CompanyCard
                      company={topMatch}
                      reviews={getCompanyReviews(topMatch.id)}
                    />
                    <PrimaryButton
                      label="View workplaces"
                      variant="secondary"
                      style={{ marginTop: spacing.sm }}
                      onPress={() => router.push(`/company/${topMatch.id}/workplaces`)}
                    />
                  </View>
                ) : null}
                {results.length > 1 ? <Text style={styles.section}>Other employers</Text> : null}
              </>
            )}
          </View>
        }
        renderItem={({ item, index }) => {
          if (index === 0) return null;
          return <CompanyCard company={item} reviews={getCompanyReviews(item.id)} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          showHome ? null : <Text style={styles.empty}>No employers match that search.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.sm, marginBottom: spacing.md },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  search: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
  },
  section: {
    marginTop: spacing.md,
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pill: {
    backgroundColor: colors.blueSoft,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: { fontFamily: typography.bodySemi, fontSize: 13, color: colors.blue },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: {
    width: '48%',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  gridText: { fontFamily: typography.bodySemi, fontSize: 14, color: colors.ink },
  recent: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentText: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
  topMatch: { gap: spacing.sm },
  topLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.blue,
    textTransform: 'uppercase',
  },
  empty: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
    paddingVertical: spacing.lg,
  },
});
