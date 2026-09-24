import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  EmptyState,
  ErrorState,
  LoadingState,
  SupplementCard,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { POPULAR_SEARCHES } from '../../src/domain/fixtures';
import type { Supplement } from '../../src/domain/models';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const { searchSupplements } = useBioCross();
  const [query, setQuery] = useState(q ?? '');
  const [results, setResults] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const runSearch = useCallback(
    async (text: string) => {
      setLoading(true);
      setError(false);
      try {
        const items = await searchSupplements(text);
        setResults(items);
      } catch {
        setError(true);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [searchSupplements],
  );

  useEffect(() => {
    runSearch(query);
  }, [query, runSearch]);

  const handleSelect = (supplement: Supplement) => {
    router.push({
      pathname: '/check/confirm',
      params: { supplementId: supplement.id },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <View style={styles.header}>
        <Text style={styles.title}>Search Supplements</Text>
        <Text style={styles.subtitle}>Find a product by name, brand, or ingredient</Text>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.text.tertiary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="e.g. Vitamin D, Magnesium…"
          placeholderTextColor={colors.text.tertiary}
          style={styles.searchInput}
          autoFocus={!q}
          returnKeyType="search"
          accessibilityLabel="Search supplements"
          clearButtonMode="while-editing"
        />
      </View>

      {query.trim().length === 0 ? (
        <View style={styles.chipsSection}>
          <Text style={styles.chipsLabel}>Popular searches</Text>
          <View style={styles.chips}>
            {POPULAR_SEARCHES.map((term) => (
              <Pressable
                key={term}
                onPress={() => setQuery(term)}
                accessibilityRole="button"
                accessibilityLabel={`Search for ${term}`}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {loading ? (
        <LoadingState message="Searching catalog…" />
      ) : error ? (
        <ErrorState
          body="We couldn't search the supplement catalog. Please try again."
          onAction={() => runSearch(query)}
        />
      ) : results.length === 0 && query.trim().length > 0 ? (
        <EmptyState
          icon="search-outline"
          title="No products found"
          body={`No supplements match "${query}". Try a different name or scan the barcode.`}
          actionLabel="Enter barcode manually"
          onAction={() => router.push('/check/manual-barcode')}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View style={styles.cardGap}>
              <SupplementCard supplement={item} onPress={() => handleSelect(item)} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.md,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.surface.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    paddingHorizontal: spacing.sm,
    minHeight: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.size.md,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  chipsSection: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  chipsLabel: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    backgroundColor: colors.brand.blueLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  chipText: { color: colors.brand.blue, fontWeight: '600', fontSize: typography.size.sm },
  list: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  cardGap: { marginBottom: spacing.sm },
});
