import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  InfoCallout,
  ProfileStatus,
  ProgressSegments,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { countByCategory } from '../../src/domain/analysis';
import { useBioCross } from '../../src/state/BioCrossContext';

/**
 * Mandatory onboarding step replacing wellness Preferences.
 * Confirms health-profile readiness without claiming medical completeness.
 */
export default function ProfileReadyScreen() {
  const router = useRouter();
  const { profile, documents } = useBioCross();

  const counts = useMemo(() => {
    if (!profile) {
      return {
        conditions: 0,
        medications: 0,
        supplements: 0,
        allergies: 0,
        surgeries: 0,
        testResults: 0,
      };
    }
    return countByCategory(profile);
  }, [profile]);

  const allergyStatus = useMemo(() => {
    if (!profile) return 'Missing';
    const items = profile.items.filter((i) => i.category === 'allergy');
    if (!items.length) return 'Missing';
    if (items.every((i) => i.status === 'confirmed')) return 'Reviewed';
    if (items.some((i) => i.status === 'pending_review' || i.status === 'not_reviewed')) {
      return 'Needs attention';
    }
    return 'Reviewed';
  }, [profile]);

  const rows = [
    { label: 'Medical Conditions', value: `${counts.conditions} confirmed`, ok: counts.conditions > 0 },
    { label: 'Medications', value: `${counts.medications} confirmed`, ok: counts.medications > 0 },
    { label: 'Supplements', value: `${counts.supplements} confirmed`, ok: counts.supplements > 0 },
    { label: 'Allergies & Reactions', value: allergyStatus, ok: allergyStatus === 'Reviewed' },
    { label: 'Surgeries & Procedures', value: `${counts.surgeries} confirmed`, ok: counts.surgeries > 0 },
    {
      label: 'Test Results',
      value: counts.testResults > 0 ? `${counts.testResults} added` : 'Not reviewed',
      ok: counts.testResults > 0,
    },
    {
      label: 'Uploaded Health Records',
      value: documents.length ? `${documents.length} processed` : 'None uploaded',
      ok: documents.length > 0,
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader onBack={() => router.back()} />
      <ProgressSegments total={6} current={5} label="Step 5 of 6" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title="Your Health Profile Is Ready"
          subtitle="Review what BioCross will use for supplement safety checks. This is not a complete medical history."
        />

        <ProfileStatus
          readiness={profile?.readiness ?? 'strong'}
          note={
            profile?.readinessNote ??
            "You've provided the key information BioCross uses for supplement safety checks."
          }
        />

        <HealthCard style={styles.card}>
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={[styles.rowValue, !row.ok && styles.needsAttention]}>{row.value}</Text>
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: row.ok ? colors.semantic.lowBg : colors.semantic.cautionBg,
                  },
                ]}
              >
                <Ionicons
                  name={row.ok ? 'checkmark-circle' : 'alert-circle'}
                  size={14}
                  color={row.ok ? colors.semantic.low : colors.semantic.caution}
                />
                <Text
                  style={[
                    styles.badgeText,
                    { color: row.ok ? colors.semantic.low : colors.semantic.caution },
                  ]}
                >
                  {row.ok ? 'Confirmed' : row.value === 'Needs attention' ? 'Needs attention' : 'Missing / not reviewed'}
                </Text>
              </View>
            </View>
          ))}
        </HealthCard>

        <InfoCallout
          tone="info"
          title="Missing information is not “none”"
          body="BioCross only uses confirmed items in safety checks. You can add or update details anytime from Profile."
        />

        <BioCrossButton
          label="Confirm & Continue"
          onPress={() => router.push('/onboarding/complete')}
          accessibilityHint="Confirm your health profile and finish onboarding"
        />
        <Pressable
          onPress={() => router.push('/onboarding/complete')}
          style={styles.later}
          accessibilityRole="link"
        >
          <Text style={styles.laterText}>I'll refine this later</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  card: { marginTop: spacing.xs },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface.border,
    minHeight: 56,
  },
  rowLabel: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  rowValue: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  needsAttention: { color: colors.semantic.caution },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    maxWidth: 140,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  later: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  laterText: { color: colors.brand.blue, fontWeight: '700' },
});
