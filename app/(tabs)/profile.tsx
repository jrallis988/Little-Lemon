import React from 'react';
import {
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
  HealthCard,
  HealthRecordCard,
  LoadingState,
  ProfileStatus,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { countByCategory } from '../../src/domain/analysis';
import { useBioCross } from '../../src/state/BioCrossContext';

function calcAge(dateOfBirth?: string): number | null {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
}

function formatSex(sex?: string): string {
  if (!sex) return '';
  if (sex === 'female') return 'Female';
  if (sex === 'male') return 'Male';
  return 'Prefer not to say';
}

const HEALTH_GRID = [
  { key: 'conditions', label: 'Conditions', icon: 'heart-outline' as const },
  { key: 'medications', label: 'Medications', icon: 'medkit-outline' as const },
  { key: 'supplements', label: 'Supplements', icon: 'flask-outline' as const },
  { key: 'allergies', label: 'Allergies', icon: 'alert-circle-outline' as const },
  { key: 'surgeries', label: 'Surgeries', icon: 'cut-outline' as const },
  { key: 'testResults', label: 'Test Results', icon: 'analytics-outline' as const },
];

const SETTINGS = [
  { label: 'Notifications', subtitle: 'Manage your alerts and reminders', icon: 'notifications-outline' as const },
  { label: 'Privacy & Security', subtitle: 'Control your data and privacy settings', icon: 'lock-closed-outline' as const },
  { label: 'Data Sharing', subtitle: 'Manage what you share and with whom', icon: 'shield-outline' as const },
  { label: 'Language', subtitle: 'English (US)', icon: 'language-outline' as const },
  { label: 'Appearance', subtitle: 'Light Mode', icon: 'color-palette-outline' as const },
  { label: 'Help & Support', subtitle: 'Get help and contact support', icon: 'help-circle-outline' as const },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { ready, user, profile, documents } = useBioCross();

  if (!ready || !user || !profile) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading profile…" />
      </SafeAreaView>
    );
  }

  const counts = countByCategory(profile);
  const age = calcAge(user.dateOfBirth);
  const uploadedCount = documents.length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenTitle
        title="My Profile"
        subtitle="Manage your health profile and app settings."
        right={
          <Pressable
            onPress={() => router.push('/onboarding/create-profile')}
            accessibilityRole="button"
            accessibilityLabel="Edit Profile"
            style={styles.editBtn}
          >
            <Ionicons name="pencil" size={14} color={colors.brand.blue} />
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <HealthCard style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.brand.blue} />
          </View>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.userMeta}>
            {age !== null ? <MetaChip label={`Age ${age}`} /> : null}
            {user.biologicalSex ? <MetaChip label={formatSex(user.biologicalSex)} /> : null}
            <MetaChip label="Blood Type O+" />
          </View>
          <View style={styles.profileStatusWrap}>
            <ProfileStatus readiness={profile.readiness} note={profile.readinessNote} />
          </View>
        </HealthCard>

        <Text style={styles.sectionTitle}>Health Summary</Text>
        <View style={styles.healthGrid}>
          {HEALTH_GRID.map((item) => (
            <View
              key={item.key}
              style={styles.healthCell}
              accessibilityLabel={`${item.label}: ${counts[item.key as keyof typeof counts]}`}
            >
              <Ionicons name={item.icon} size={18} color={colors.brand.blue} />
              <Text style={styles.healthCount}>
                {counts[item.key as keyof typeof counts]}
              </Text>
              <Text style={styles.healthLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Uploaded Health Records</Text>
        <View style={styles.uploadBar}>
          <View style={styles.uploadProgress}>
            <View
              style={[
                styles.uploadFill,
                { width: `${Math.min(100, uploadedCount * 25)}%` },
              ]}
            />
          </View>
          <Text style={styles.uploadText}>
            {uploadedCount} record{uploadedCount !== 1 ? 's' : ''} uploaded
          </Text>
        </View>
        {documents.slice(0, 2).map((doc) => (
          <View key={doc.id} style={styles.docGap}>
            <HealthRecordCard document={doc} />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Settings</Text>
        {SETTINGS.map((s) => (
          <Pressable
            key={s.label}
            accessibilityRole="button"
            accessibilityLabel={`${s.label}. ${s.subtitle}`}
          >
            <HealthCard style={styles.settingCard}>
              <View style={styles.settingRow}>
                <Ionicons name={s.icon} size={20} color={colors.brand.navy} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>{s.label}</Text>
                  <Text style={styles.settingSubtitle}>{s.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
              </View>
            </HealthCard>
          </Pressable>
        ))}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign Out"
          style={styles.signOutWrap}
        >
          <HealthCard borderColor={colors.semantic.highBorder} backgroundColor={colors.semantic.highBg}>
            <View style={styles.settingRow}>
              <Ionicons name="log-out-outline" size={20} color={colors.semantic.high} />
              <Text style={styles.signOutLabel}>Sign Out</Text>
            </View>
          </HealthCard>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetaChip({ label }: { label: string }) {
  return (
    <View style={styles.metaChip}>
      <Text style={styles.metaChipText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
  },
  editText: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.sm },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  userCard: { alignItems: 'center', marginBottom: spacing.lg },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  userName: {
    fontSize: typography.size.xl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  userEmail: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
  },
  userMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
    justifyContent: 'center',
  },
  metaChip: {
    backgroundColor: colors.surface.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  metaChipText: {
    fontSize: typography.size.xs,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  profileStatusWrap: { marginTop: spacing.md, width: '100%' },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  healthCell: {
    width: '31%',
    backgroundColor: colors.surface.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  healthCount: {
    fontSize: typography.size.xl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  healthLabel: {
    fontSize: typography.size.xs,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  uploadBar: { marginBottom: spacing.md },
  uploadProgress: {
    height: 8,
    backgroundColor: colors.surface.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  uploadFill: {
    height: '100%',
    backgroundColor: colors.brand.blue,
    borderRadius: 4,
  },
  uploadText: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  docGap: { marginBottom: spacing.sm },
  settingCard: { marginBottom: spacing.sm },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingLabel: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  settingSubtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  settingValue: {
    color: colors.text.tertiary,
    fontSize: typography.size.sm,
    marginRight: spacing.xs,
  },
  signOutWrap: { marginTop: spacing.md },
  signOutLabel: {
    flex: 1,
    fontWeight: '700',
    color: colors.semantic.high,
    fontSize: typography.size.md,
  },
});
