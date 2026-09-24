import React, { useEffect, useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  EmptyState,
  HealthCard,
  InfoCallout,
  LoadingState,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import type { ConfirmationStatus, ProfileItemCategory } from '../../src/domain/models';
import { useBioCross } from '../../src/state/BioCrossContext';
import { useAuth } from '../../src/state/AuthContext';

const SETTINGS_COPY: Record<
  string,
  { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  notifications: {
    title: 'Notifications',
    subtitle: 'Manage your alerts and reminders',
    icon: 'notifications-outline',
  },
  privacy: {
    title: 'Privacy & Security',
    subtitle: 'Control your data and privacy settings',
    icon: 'lock-closed-outline',
  },
  sharing: {
    title: 'Data Sharing',
    subtitle: 'Manage what you share and with whom',
    icon: 'shield-outline',
  },
  language: {
    title: 'Language',
    subtitle: 'English (US)',
    icon: 'language-outline',
  },
  appearance: {
    title: 'Appearance',
    subtitle: 'Light Mode',
    icon: 'color-palette-outline',
  },
  personalization: {
    title: 'Personalization',
    subtitle: 'Optional wellness goals and preferences',
    icon: 'heart-outline',
  },
  help: {
    title: 'Help & Support',
    subtitle: 'Get help and contact support',
    icon: 'help-circle-outline',
  },
};

const CATEGORY_META: Record<
  string,
  { title: string; category: ProfileItemCategory; empty: string; addLabel: string }
> = {
  conditions: {
    title: 'Medical Conditions',
    category: 'condition',
    empty: 'No confirmed conditions in your health profile yet.',
    addLabel: 'condition',
  },
  medications: {
    title: 'Medications',
    category: 'medication',
    empty: 'No confirmed medications in your health profile yet.',
    addLabel: 'medication',
  },
  supplements: {
    title: 'Supplements',
    category: 'supplement',
    empty: 'No confirmed supplements in your health profile yet.',
    addLabel: 'supplement',
  },
  allergies: {
    title: 'Allergies & Reactions',
    category: 'allergy',
    empty: 'No confirmed allergies in your health profile yet.',
    addLabel: 'allergy',
  },
  surgeries: {
    title: 'Surgeries & Procedures',
    category: 'procedure',
    empty: 'No confirmed procedures in your health profile yet.',
    addLabel: 'procedure',
  },
  testResults: {
    title: 'Test Results',
    category: 'lab_result',
    empty: 'No confirmed test results in your health profile yet.',
    addLabel: 'test result',
  },
  recentChanges: {
    title: 'Recent Changes',
    category: 'recent_change',
    empty: 'No recent health changes recorded yet.',
    addLabel: 'recent change',
  },
  records: {
    title: 'Uploaded Health Records',
    category: 'basic',
    empty: 'No uploaded health records yet.',
    addLabel: 'record',
  },
};

export default function ProfileSectionScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section: string }>();
  const {
    ready,
    preferences,
    updatePreferences,
    profile,
    documents,
    addProfileItem,
    removeProfileItem,
    confirmProfileItem,
  } = useBioCross();
  const { signOut } = useAuth();

  const settings = section ? SETTINGS_COPY[section] : undefined;
  const category = section ? CATEGORY_META[section] : undefined;

  useEffect(() => {
    if (section === 'personalization') {
      router.replace('/onboarding/preferences');
    }
  }, [section, router]);

  const items = useMemo(() => {
    if (!profile || !category || section === 'records') return [];
    return profile.items.filter((i) => i.category === category.category);
  }, [profile, category, section]);

  if (!ready) {
    return (
      <SafeAreaView style={styles.safe}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (section === 'signout') {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} />
        <View style={styles.pad}>
          <ScreenTitle
            title="Sign Out"
            subtitle="You'll need to sign in again to access your health profile on this device."
          />
          <InfoCallout
            tone="warning"
            body="Signing out does not delete your health profile. Use Privacy & Security to export or delete your data."
          />
          <BioCrossButton
            label="Sign Out"
            variant="danger"
            onPress={async () => {
              await signOut();
              router.replace('/onboarding/welcome');
            }}
            style={{ marginTop: spacing.lg }}
          />
          <BioCrossButton label="Cancel" variant="ghost" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  if (settings && section !== 'personalization') {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} />
        <ScrollView contentContainerStyle={styles.pad}>
          <ScreenTitle title={settings.title} subtitle={settings.subtitle} />

          {section === 'notifications' && preferences ? (
            <>
              <ToggleRow
                title="Safety alerts & important updates"
                subtitle="Get notified about recalls, new research, and safety information."
                value={preferences.safetyAlertsEnabled}
                onChange={(v) => updatePreferences({ ...preferences, safetyAlertsEnabled: v })}
              />
              <ToggleRow
                title="Health insights & tips"
                subtitle="Personalized tips based on your profile and goals."
                value={preferences.insightsEnabled}
                onChange={(v) => updatePreferences({ ...preferences, insightsEnabled: v })}
              />
            </>
          ) : null}

          {section === 'privacy' ? (
            <>
              <InfoCallout
                tone="privacy"
                title="Your data is private and secure."
                body="We never sell your data. You're always in control of your information."
              />
              <HealthCard style={styles.card}>
                <ActionRow label="Export my health data" onPress={() => router.push('/profile/export-data')} />
                <ActionRow label="Privacy Policy" onPress={() => router.push('/legal/privacy')} />
                <ActionRow label="Terms of Service" onPress={() => router.push('/legal/terms')} />
                <ActionRow label="Delete my BioCross account" destructive onPress={() => router.push('/profile/delete-account')} />
              </HealthCard>
            </>
          ) : null}

          {section === 'sharing' ? (
            <InfoCallout
              tone="info"
              title="You're in control"
              body="BioCross does not share your confirmed health profile with third parties without explicit consent. Future clinician-sharing features will require your approval each time."
            />
          ) : null}

          {section === 'language' && preferences ? (
            <HealthCard>
              <Text style={styles.rowTitle}>App language</Text>
              <Text style={styles.rowSub}>{preferences.language}</Text>
            </HealthCard>
          ) : null}

          {section === 'appearance' && preferences ? (
            <HealthCard>
              <Text style={styles.rowTitle}>Appearance</Text>
              <Text style={[styles.rowSub, { marginBottom: spacing.sm }]}>
                Risk colors stay consistent in both themes for clarity and trust.
              </Text>
              {(['light', 'dark', 'system'] as const).map((mode) => (
                <Pressable
                  key={mode}
                  onPress={() => updatePreferences({ ...preferences, appearance: mode })}
                  style={styles.appearanceRow}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: preferences.appearance === mode }}
                >
                  <Text style={styles.appearanceLabel}>
                    {mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'System'}
                  </Text>
                  {preferences.appearance === mode ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.brand.blue} />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color={colors.text.tertiary} />
                  )}
                </Pressable>
              ))}
            </HealthCard>
          ) : null}

          {section === 'help' ? (
            <HealthCard>
              <ActionRow label="How BioCross safety checks work" onPress={() => router.push('/legal/how-it-works')} />
              <ActionRow label="Contact support" onPress={() => router.push('/legal/support')} />
              <ActionRow label="Medical disclaimer" onPress={() => router.push('/legal/disclaimer')} />
              <ActionRow
                label="Restart onboarding demo"
                onPress={async () => {
                  router.replace('/onboarding/welcome');
                }}
              />
            </HealthCard>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (category) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} />
        <ScrollView contentContainerStyle={styles.pad}>
          <ScreenTitle
            title={category.title}
            subtitle="Confirmed items BioCross can use in safety checks. Missing information is not the same as “none.”"
          />

          {section === 'records' ? (
            documents.length === 0 ? (
              <EmptyState
                title="No uploaded records"
                body="Upload a PDF or image of a health record to review extracted information before adding it."
                actionLabel="Upload health record"
                onAction={() => router.push('/onboarding/health-profile')}
              />
            ) : (
              documents.map((doc) => (
                <HealthCard key={doc.id} style={styles.card}>
                  <Text style={styles.rowTitle}>{doc.fileName}</Text>
                  <Text style={styles.rowSub}>
                    Uploaded {new Date(doc.uploadedAt).toLocaleString()} · {doc.status}
                  </Text>
                  <Pressable
                    onPress={() =>
                      router.push(`/onboarding/review-import?documentId=${doc.id}`)
                    }
                    style={styles.linkBtn}
                  >
                    <Text style={styles.link}>Review imported information ›</Text>
                  </Pressable>
                </HealthCard>
              ))
            )
          ) : items.length === 0 ? (
            <EmptyState
              title={`No ${category.title.toLowerCase()}`}
              body={category.empty}
              actionLabel={`Add ${category.addLabel}`}
              onAction={() => router.push(`/profile/add-item?section=${section}`)}
            />
          ) : (
            <>
              {items.map((item) => (
                <HealthCard key={item.id} style={styles.card}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.rowTitle}>{item.name}</Text>
                    <StatusBadge status={item.status} />
                  </View>
                  {item.details ? <Text style={styles.rowSub}>{item.details}</Text> : null}
                  <Text style={styles.provenance}>
                    {item.sourceDocumentId
                      ? 'Imported from health record'
                      : 'Entered manually'}
                    {' · '}
                    Last updated{' '}
                    {item.confirmedAt
                      ? new Date(item.confirmedAt).toLocaleDateString()
                      : item.extractedAt
                        ? new Date(item.extractedAt).toLocaleDateString()
                        : '—'}
                  </Text>
                  <View style={styles.itemActions}>
                    {item.status === 'pending_review' || item.status === 'not_reviewed' ? (
                      <Pressable
                        onPress={() => confirmProfileItem(item.id)}
                        style={styles.actionBtn}
                        accessibilityRole="button"
                        accessibilityLabel={`Confirm ${item.name}`}
                      >
                        <Ionicons name="checkmark-circle-outline" size={16} color={colors.brand.blue} />
                        <Text style={styles.actionBtnText}>Confirm</Text>
                      </Pressable>
                    ) : null}
                    <Pressable
                      onPress={() => removeProfileItem(item.id)}
                      style={styles.actionBtn}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${item.name}`}
                    >
                      <Ionicons name="trash-outline" size={16} color={colors.semantic.high} />
                      <Text style={[styles.actionBtnText, { color: colors.semantic.high }]}>Remove</Text>
                    </Pressable>
                  </View>
                </HealthCard>
              ))}
            </>
          )}

          {section !== 'records' ? (
            <>
              <BioCrossButton
                label={`Add ${category.addLabel}`}
                variant="outline"
                size="md"
                onPress={() => router.push(`/profile/add-item?section=${section}`)}
              />
            </>
          ) : null}

          <InfoCallout
            tone="info"
            body="BioCross only uses confirmed health-profile items in safety analysis."
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <EmptyState title="Section not found" body="This profile section isn't available." />
    </SafeAreaView>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onChange,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <HealthCard style={styles.card}>
      <View style={styles.toggleRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowSub}>{subtitle}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ true: colors.brand.blue, false: colors.surface.borderStrong }}
          accessibilityLabel={title}
        />
      </View>
    </HealthCard>
  );
}

function ActionRow({
  label,
  onPress,
  destructive,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.actionRow} accessibilityRole="button">
      <Text style={[styles.actionLabel, destructive && { color: colors.semantic.high }]}>
        {label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={destructive ? colors.semantic.high : colors.text.tertiary}
      />
    </Pressable>
  );
}

function StatusBadge({ status }: { status: ConfirmationStatus }) {
  const tone =
    status === 'confirmed'
      ? { bg: colors.semantic.lowBg, fg: colors.semantic.low, label: 'Confirmed' }
      : status === 'missing'
        ? { bg: colors.semantic.unknownBg, fg: colors.semantic.unknown, label: 'Missing' }
        : status === 'not_reviewed'
          ? { bg: colors.surface.background, fg: colors.text.secondary, label: 'Not reviewed' }
          : status === 'pending_review'
            ? { bg: colors.semantic.cautionBg, fg: colors.semantic.caution, label: 'Needs attention' }
            : { bg: colors.surface.background, fg: colors.text.secondary, label: 'Not reviewed' };
  return (
    <View style={[styles.pill, { backgroundColor: tone.bg }]}>
      <Text style={[styles.pillText, { color: tone.fg }]}>{tone.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  pad: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.sm },
  card: { marginBottom: spacing.xs },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rowTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  rowSub: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 4, lineHeight: 18 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface.border,
    minHeight: 48,
  },
  actionLabel: { color: colors.text.primary, fontWeight: '600', flex: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radii.pill },
  pillText: { fontSize: 11, fontWeight: '700' },
  provenance: { marginTop: 8, color: colors.text.tertiary, fontSize: typography.size.xs },
  itemActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 36 },
  actionBtnText: { color: colors.brand.blue, fontWeight: '600', fontSize: typography.size.sm },
  linkBtn: { marginTop: spacing.sm },
  link: { color: colors.brand.blue, fontWeight: '700' },
  fieldLabel: { color: colors.text.secondary, fontSize: typography.size.xs, fontWeight: '600' },
  input: {
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: radii.md,
    padding: spacing.sm,
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surface.border,
    minHeight: 48,
  },
  appearanceLabel: { fontWeight: '600', color: colors.text.primary, fontSize: typography.size.md },
});
