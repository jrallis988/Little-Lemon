import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  RecentCheckCard,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { ready, checks, refresh } = useBioCross();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return checks;
    return checks.filter(
      (c) =>
        c.supplement.name.toLowerCase().includes(q) ||
        c.supplement.brand?.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.riskLevel.includes(q),
    );
  }, [checks, searchQuery]);

  const handleRetry = async () => {
    setError(false);
    try {
      await refresh();
    } catch {
      setError(true);
    }
  };

  if (!ready) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading check history…" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenTitle title="Check History" subtitle="Your past supplement safety checks" />
        <ErrorState
          body="We couldn't load your check history. Check your connection and try again."
          onAction={handleRetry}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenTitle
        title="Check History"
        subtitle="Your past supplement safety checks are saved here"
      />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.text.tertiary} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, brand, or risk level…"
          placeholderTextColor={colors.text.tertiary}
          style={styles.searchInput}
          accessibilityLabel="Search check history"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 ? (
          <Pressable
            onPress={() => setSearchQuery('')}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={8}
          >
            <Ionicons name="close-circle" size={18} color={colors.text.tertiary} />
          </Pressable>
        ) : null}
      </View>

      {checks.length === 0 ? (
        <EmptyState
          icon="time-outline"
          title="No checks yet"
          body="When you scan or search a supplement, your results will appear here so you can review them anytime."
          actionLabel="Check a supplement"
          onAction={() => router.push('/(tabs)/check')}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No matching checks"
          body={`No results for "${searchQuery}". Try a different search term.`}
          actionLabel="Clear search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.count}>
            {filtered.length} check{filtered.length !== 1 ? 's' : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </Text>
          {filtered.map((check) => (
            <View key={check.id} style={styles.cardWrap}>
              <RecentCheckCard
                check={check}
                onPress={() => router.push(`/result/${check.id}`)}
              />
              {check.newerInfoAvailable ? (
                <Pressable
                  onPress={() => router.push(`/result/${check.id}`)}
                  accessibilityRole="button"
                  accessibilityLabel="Newer information available for this check"
                  style={styles.newerBanner}
                >
                  <Ionicons name="refresh-circle" size={16} color={colors.semantic.caution} />
                  <Text style={styles.newerText}>Newer information available</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.semantic.caution} />
                </Pressable>
              ) : null}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
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
  list: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  count: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginBottom: spacing.sm,
  },
  cardWrap: { marginBottom: spacing.sm },
  newerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: -4,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.semantic.cautionBg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.semantic.cautionBorder,
  },
  newerText: {
    flex: 1,
    color: colors.semantic.caution,
    fontWeight: '600',
    fontSize: typography.size.sm,
  },
});
