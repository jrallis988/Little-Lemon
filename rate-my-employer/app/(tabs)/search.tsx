import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompanyCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function SearchScreen() {
  const { ready, searchCompanies, getCompanyReviews } = useApp();
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => setDeferredQuery(query), 140);
    return () => clearTimeout(handle);
  }, [query]);

  const results = searchCompanies(deferredQuery);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.ink} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Search</Text>
            <Text style={styles.copy}>Find employers by name, industry, or city.</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="e.g. Northwind, Fintech, Austin"
              placeholderTextColor={colors.inkSoft}
              style={styles.search}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            <Text style={styles.meta}>
              {results.length} result{results.length === 1 ? '' : 's'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <CompanyCard company={item} reviews={getCompanyReviews(item.id)} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={<Text style={styles.empty}>No employers match that search.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg, gap: spacing.sm },
  title: {
    fontFamily: typography.display,
    fontSize: 32,
    color: colors.ink,
  },
  copy: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkMuted,
  },
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
  meta: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  empty: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
    paddingVertical: spacing.lg,
  },
});
