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

import { CompanyCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { INDUSTRY_CATEGORIES } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function SearchDirectoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();
  const { searchCompanies, getCompanyReviews, recentSearches, addRecentSearch } = useApp();
  const [query, setQuery] = useState(params.q ?? '');

  useEffect(() => {
    if (params.q) setQuery(params.q);
  }, [params.q]);

  const results = searchCompanies(query);
  const showDirectory = query.trim().length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={showDirectory ? [] : results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Search</Text>
            <Text style={styles.copy}>Directory lookup by company, industry, or city.</Text>
            <TextInput
              style={styles.search}
              placeholder="Type a company or industry"
              placeholderTextColor={colors.inkSoft}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => addRecentSearch(query)}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />

            {showDirectory ? (
              <>
                <Text style={styles.section}>Categories</Text>
                <View style={styles.grid}>
                  {INDUSTRY_CATEGORIES.map((category) => (
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
                    <Text style={styles.section}>Recent searches</Text>
                    {recentSearches.map((item) => (
                      <Pressable
                        key={item}
                        style={styles.recent}
                        onPress={() => setQuery(item)}
                      >
                        <Text style={styles.recentText}>{item}</Text>
                      </Pressable>
                    ))}
                  </>
                ) : null}
              </>
            ) : (
              <Text style={styles.section}>
                {results.length} match{results.length === 1 ? '' : 'es'}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <CompanyCard company={item} reviews={getCompanyReviews(item.id)} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          showDirectory ? null : <Text style={styles.empty}>No employers match that search.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.sm, marginBottom: spacing.md },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: {
    width: '48%',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  gridText: {
    fontFamily: typography.bodySemi,
    fontSize: 14,
    color: colors.ink,
  },
  recent: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentText: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkMuted,
  },
  empty: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
    paddingVertical: spacing.lg,
  },
});
