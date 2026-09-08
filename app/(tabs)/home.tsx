import React, { useState } from 'react';
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
  AppHeader,
  BioCrossButton,
  HealthCard,
  HealthCardHeader,
  InfoCallout,
  LoadingState,
  OfflineBanner,
  RecentCheckCard,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { POPULAR_SEARCHES } from '../../src/domain/fixtures';
import { useBioCross } from '../../src/state/BioCrossContext';
import { useAuth } from '../../src/state/AuthContext';

const FEATURES = [
  {
    icon: 'shield-checkmark-outline' as const,
    title: 'Science-Backed',
    body: 'Trusted research and interaction databases.',
  },
  {
    icon: 'person-outline' as const,
    title: 'Personalized',
    body: 'Matched to your unique health profile.',
  },
  {
    icon: 'lock-closed-outline' as const,
    title: 'Private & Secure',
    body: 'Your data stays under your control.',
  },
  {
    icon: 'heart-outline' as const,
    title: "You're in Control",
    body: 'Nothing is added without your confirmation.',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { ready, checks, alerts, user, profile, refresh } = useBioCross();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = alerts.filter((a) => !a.isRead).length;
  const recentChecks = checks.slice(0, 5);
  const firstName = user?.fullName?.split(' ')[0] ?? 'there';
  const needsProfileAttention =
    profile?.readiness === 'needs_attention' ||
    profile?.readiness === 'getting_started' ||
    profile?.items.some((i) => i.status === 'not_reviewed' || i.status === 'pending_review');

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      router.push({ pathname: '/check/search', params: { q } });
    } else {
      router.push('/check/search');
    }
  };

  if (!ready) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading your dashboard…" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader
        onNotifications={() => router.push('/(tabs)/updates')}
        notificationCount={unreadCount}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OfflineBanner onRetry={() => refresh()} />

        {!isAuthenticated ? (
          <Pressable
            onPress={() => router.push('/auth/sign-in')}
            accessibilityRole="button"
            accessibilityLabel="Sign in to sync your health profile"
            style={{ marginBottom: spacing.sm }}
          >
            <InfoCallout
              tone="info"
              title="Browsing as a guest"
              body="Sign in to sync your health profile and check history across devices."
            />
          </Pressable>
        ) : null}

        {needsProfileAttention ? (
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            accessibilityRole="button"
            accessibilityLabel="Update health profile"
            style={{ marginBottom: spacing.sm }}
          >
            <InfoCallout
              tone="warning"
              title="Profile needs attention"
              body="Confirm pending items so BioCross can give more accurate safety checks."
            />
          </Pressable>
        ) : null}

        <View style={styles.hero}>
          <Text style={styles.welcome}>Welcome, {firstName}</Text>
          <Text style={styles.tagline}>
            Check before you take it. Your safety. Your health. Your control.
          </Text>
          <BioCrossButton
            label="View My Profile"
            variant="outline"
            size="md"
            fullWidth={false}
            icon="person-outline"
            onPress={() => router.push('/(tabs)/profile')}
            accessibilityLabel="View My Profile"
            style={styles.profileBtn}
          />
        </View>

        <HealthCard style={styles.section}>
          <HealthCardHeader
            icon="search-outline"
            title="Check a Supplement"
            subtitle="Search by name, ingredient, or brand."
          />
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrap}>
              <Ionicons name="search" size={18} color={colors.text.tertiary} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search any supplement or ingredient..."
                placeholderTextColor={colors.text.tertiary}
                style={styles.searchInput}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                accessibilityLabel="Search supplements"
                accessibilityHint="Enter a supplement name to search"
              />
            </View>
            <Pressable
              onPress={() => router.push('/(tabs)/check')}
              accessibilityRole="button"
              accessibilityLabel="Scan supplement barcode"
              style={styles.scanBtn}
            >
              <Ionicons name="scan-outline" size={22} color={colors.text.inverse} />
            </Pressable>
          </View>

          <Text style={styles.chipsLabel}>Popular searches</Text>
          <View style={styles.chips}>
            {POPULAR_SEARCHES.map((term) => (
              <Pressable
                key={term}
                onPress={() =>
                  router.push({ pathname: '/check/search', params: { q: term } })
                }
                accessibilityRole="button"
                accessibilityLabel={`Search for ${term}`}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{term}</Text>
              </Pressable>
            ))}
          </View>
        </HealthCard>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Checks</Text>
            {recentChecks.length > 0 ? (
              <Pressable
                onPress={() => router.push('/(tabs)/history')}
                accessibilityRole="link"
                accessibilityLabel="View all check history"
              >
                <Text style={styles.sectionLink}>View all</Text>
              </Pressable>
            ) : null}
          </View>
          {recentChecks.length === 0 ? (
            <HealthCard>
              <Text style={styles.emptyText}>
                No checks yet. Scan or search a supplement to get started.
              </Text>
            </HealthCard>
          ) : (
            recentChecks.map((check) => (
              <View key={check.id} style={styles.cardGap}>
                <RecentCheckCard
                  check={check}
                  onPress={() => router.push(`/result/${check.id}`)}
                />
              </View>
            ))
          )}
        </View>

        <Pressable
          onPress={() => router.push('/(tabs)/updates')}
          accessibilityRole="button"
          accessibilityLabel="Research and Safety Updates"
        >
          <HealthCard style={styles.section}>
            <HealthCardHeader
              icon="newspaper-outline"
              title="Research & Safety Updates"
              subtitle="Recalls, interactions, and new research for your health"
              right={
                <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
              }
            />
            {unreadCount > 0 ? (
              <View style={styles.updateBadge}>
                <Text style={styles.updateBadgeText}>
                  {unreadCount} new update{unreadCount !== 1 ? 's' : ''}
                </Text>
              </View>
            ) : null}
          </HealthCard>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About BioCross</Text>
          <View style={styles.featureGrid}>
            {FEATURES.map((f) => (
              <View key={f.title} style={styles.featureCell}>
                <View style={styles.featureIcon}>
                  <Ionicons name={f.icon} size={18} color={colors.brand.blue} />
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureBody}>{f.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.disclaimer}>
          <InfoCallout
            tone="warning"
            icon="medical-outline"
            title="Medical disclaimer"
            body="BioCross provides informational insights, not medical advice. Always talk to your healthcare provider before starting, stopping, or changing supplements or medications."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingBottom: spacing.xxxl },
  hero: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  welcome: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  tagline: {
    marginTop: spacing.sm,
    fontSize: typography.size.md,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  profileBtn: { marginTop: spacing.md, alignSelf: 'flex-start' },
  section: { marginHorizontal: spacing.xl, marginBottom: spacing.lg },
  searchRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface.background,
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
  scanBtn: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.brand.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsLabel: {
    marginTop: spacing.md,
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    backgroundColor: colors.brand.blueLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  chipText: {
    color: colors.brand.blue,
    fontWeight: '600',
    fontSize: typography.size.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionLink: {
    color: colors.brand.blue,
    fontWeight: '700',
    fontSize: typography.size.sm,
  },
  cardGap: { marginHorizontal: spacing.xl, marginBottom: spacing.sm },
  emptyText: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  updateBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.brand.blueLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  updateBadgeText: {
    color: colors.brand.blue,
    fontWeight: '700',
    fontSize: typography.size.xs,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  featureCell: {
    width: '47%',
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surface.border,
    padding: spacing.md,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  featureTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.sm,
  },
  featureBody: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    lineHeight: 16,
  },
  disclaimer: { marginHorizontal: spacing.xl, marginBottom: spacing.xl },
});
