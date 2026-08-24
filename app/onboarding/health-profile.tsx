import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  ProfileStatus,
  ProgressSegments,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { DEMO_HEALTH_PROFILE } from '../../src/domain/fixtures';
import { useBioCross } from '../../src/state/BioCrossContext';

const DEMO_FILE_NAME = 'Boston_Childrens_Visit_Summary.pdf';

const MANUAL_CATEGORIES = [
  { label: 'Medical Conditions', status: '2 added', added: true, icon: 'heart-outline' as const },
  { label: 'Medications', status: '4 added', added: true, icon: 'medical-outline' as const },
  { label: 'Supplements', status: '2 added', added: true, icon: 'leaf-outline' as const },
  { label: 'Allergies', status: '1 added', added: true, icon: 'warning-outline' as const },
  { label: 'Surgeries', status: '4 added', added: true, icon: 'cut-outline' as const },
  { label: 'Test Results', status: 'Not added', added: false, icon: 'flask-outline' as const },
  { label: 'Lifestyle', status: 'Not added', added: false, icon: 'fitness-outline' as const },
  { label: 'Recent Changes', status: 'Not added', added: false, icon: 'time-outline' as const },
];

export default function HealthProfileScreen() {
  const router = useRouter();
  const { profile, uploadDocument } = useBioCross();

  const handleUpload = async () => {
    setUploading(true);
    try {
      const doc = await uploadDocument(DEMO_FILE_NAME);
      router.push(`/onboarding/review-import?documentId=${doc.id}`);
    } finally {
      setUploading(false);
    }
  };

  const handleContinue = () => {
    router.push('/onboarding/review-import');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader onBack={() => router.back()} />
      <ProgressSegments total={3} current={2} label="Step 2 of 3" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title="Your Health Profile"
          subtitle="The more complete your profile, the more accurate BioCross can be when checking supplement safety."
        />

        <View style={styles.readinessWrap}>
          <ProfileStatus
            readiness={profile?.readiness ?? DEMO_HEALTH_PROFILE.readiness}
            note={
              profile?.readinessNote ??
              "You've provided the key information BioCross uses for supplement safety checks."
            }
          />
          <Pressable style={styles.viewSummaryLink} accessibilityRole="link">
            <Text style={styles.viewSummary}>View summary ›</Text>
          </Pressable>
        </View>

        <HealthCard style={styles.card}>
          <HealthCardHeader
            icon="cloud-upload-outline"
            title="Upload Health Records"
            subtitle="Import conditions, medications, and more from your medical documents."
            right={
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            }
          />

          <Pressable
            onPress={handleUpload}
            disabled={uploading}
            style={styles.uploadBox}
            accessibilityRole="button"
            accessibilityLabel="Upload a file"
          >
            {uploading ? (
              <ActivityIndicator color={colors.brand.blue} />
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={28} color={colors.brand.blue} />
                </View>
                <Text style={styles.uploadTitle}>Upload a file</Text>
                <Text style={styles.uploadHint}>PDF, JPG, PNG (Max 25MB)</Text>
              </>
            )}
          </Pressable>

          <View style={styles.privacyNote}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.text.tertiary} />
            <Text style={styles.privacyNoteText}>
              Your documents are encrypted and never shared without your permission.
            </Text>
          </View>
        </HealthCard>

        <Text style={styles.preImportNote}>
          We&apos;ll show you what we find before adding anything to your profile.
        </Text>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <HealthCard style={styles.card} padded={false}>
          <Pressable
            onPress={() => setManualExpanded((v) => !v)}
            style={styles.manualHeader}
            accessibilityRole="button"
            accessibilityState={{ expanded: manualExpanded }}
          >
            <View style={styles.manualHeaderLeft}>
              <View style={styles.manualIcon}>
                <Ionicons name="create-outline" size={18} color={colors.brand.blue} />
              </View>
              <Text style={styles.manualTitle}>Enter information manually</Text>
            </View>
            <Ionicons
              name={manualExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.text.tertiary}
            />
          </Pressable>

          {manualExpanded ? (
            <View style={styles.manualList}>
              {MANUAL_CATEGORIES.map((cat, index) => (
                <Pressable
                  key={cat.label}
                  style={[styles.manualRow, index < MANUAL_CATEGORIES.length - 1 && styles.manualRowBorder]}
                  accessibilityRole="button"
                >
                  <View style={styles.manualRowIcon}>
                    <Ionicons name={cat.icon} size={16} color={colors.brand.blue} />
                  </View>
                  <Text style={styles.manualRowLabel}>{cat.label}</Text>
                  <Text style={[styles.manualRowStatus, !cat.added && styles.manualRowStatusMuted]}>
                    {cat.status}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </HealthCard>

        <InfoCallout
          icon="information-circle"
          body="We never assume. Missing information is not the same as 'none.' You're always in control."
          tone="info"
        />

        <View style={styles.footer}>
          <BioCrossButton label="Continue" onPress={handleContinue} />
          <Pressable
            onPress={() => router.push('/onboarding/preferences')}
            style={styles.later}
            accessibilityRole="link"
          >
            <Text style={styles.laterText}>I&apos;ll do this later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingBottom: spacing.xxxl, gap: spacing.sm },
  card: { marginHorizontal: spacing.xl },
  readinessWrap: { marginHorizontal: spacing.xl, gap: spacing.xs },
  viewSummaryLink: { alignSelf: 'flex-end', paddingRight: spacing.xs },
  viewSummary: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.sm },
  recommendedBadge: {
    backgroundColor: colors.brand.blueLight,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  recommendedText: { color: colors.brand.blue, fontWeight: '700', fontSize: 11 },
  uploadBox: {
    marginTop: spacing.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.brand.blueMuted,
    borderRadius: radii.lg,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    minHeight: 140,
  },
  uploadIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  uploadTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  uploadHint: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 4 },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  privacyNoteText: { flex: 1, color: colors.text.tertiary, fontSize: typography.size.xs, lineHeight: 16 },
  preImportNote: {
    marginHorizontal: spacing.xl,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    textAlign: 'center',
    lineHeight: 18,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginVertical: spacing.xs,
    gap: spacing.sm,
  },
  orLine: { flex: 1, height: 1, backgroundColor: colors.surface.borderStrong },
  orText: { color: colors.text.tertiary, fontWeight: '700', fontSize: typography.size.xs },
  manualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  manualHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  manualIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  manualList: { borderTopWidth: 1, borderTopColor: colors.surface.border },
  manualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  manualRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.surface.border },
  manualRowIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualRowLabel: { flex: 1, fontWeight: '600', color: colors.text.primary, fontSize: typography.size.sm },
  manualRowStatus: { color: colors.semantic.low, fontWeight: '600', fontSize: typography.size.xs },
  manualRowStatusMuted: { color: colors.text.tertiary },
  footer: { marginHorizontal: spacing.xl, marginTop: spacing.lg, gap: spacing.sm },
  later: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  laterText: { color: colors.brand.blue, fontWeight: '700' },
});
