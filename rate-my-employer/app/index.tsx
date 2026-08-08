import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompanyCard } from '../src/components/CompanyCard';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing } from '../src/theme';

export default function HomeScreen() {
  const { ready, user, searchCompanies, getCompanyReviews } = useApp();
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');

  useEffect(() => {
    const handle = setTimeout(() => setDeferredQuery(query), 160);
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
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.brand}>Rate My Employer</Text>
            <Text style={styles.tagline}>
              Real workplace ratings before you accept the offer.
            </Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search companies, industries, cities"
              placeholderTextColor={colors.inkSoft}
              style={styles.search}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            <View style={styles.actions}>
              {user ? (
                <Link href="/profile" asChild>
                  <Pressable style={styles.secondaryBtn}>
                    <Text style={styles.secondaryText}>Hi, {user.displayName}</Text>
                  </Pressable>
                </Link>
              ) : (
                <Link href="/auth" asChild>
                  <Pressable style={styles.primaryBtn}>
                    <Text style={styles.primaryText}>Sign in to review</Text>
                  </Pressable>
                </Link>
              )}
            </View>
            <Text style={styles.sectionLabel}>
              {deferredQuery.trim()
                ? `${results.length} match${results.length === 1 ? '' : 'es'}`
                : 'Browse employers'}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(Math.min(index, 6) * 50).springify()}>
            <CompanyCard company={item} reviews={getCompanyReviews(item.id)} />
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No employers match that search.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  hero: {
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  brand: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 40,
    lineHeight: 44,
    color: colors.ink,
  },
  tagline: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
    maxWidth: 340,
  },
  search: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: colors.ink,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.sm,
  },
  primaryText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: colors.ink,
  },
  secondaryBtn: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.sm,
  },
  secondaryText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    color: colors.surface,
  },
  sectionLabel: {
    marginTop: spacing.sm,
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  empty: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: colors.inkSoft,
    paddingVertical: spacing.lg,
  },
});
