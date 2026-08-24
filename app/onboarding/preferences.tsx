import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
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
  ProgressSegments,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { DEMO_PREFERENCES } from '../../src/domain/fixtures';
import type { AppPreferences } from '../../src/domain/models';
import { useBioCross } from '../../src/state/BioCrossContext';

const GOAL_OPTIONS = [
  'General wellness',
  'Heart health',
  'Energy & focus',
  'Sleep support',
  'Immune support',
  'Stress management',
];

const DIETARY_OPTIONS = [
  'No restrictions',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Kosher',
  'Halal',
];

const LIFESTYLE_OPTIONS = [
  'Exercise regularly',
  'Athlete / Active',
  'Sedentary',
  'Pregnant / Nursing',
  'Smoker',
  'Occasional alcohol',
];

function toggleChip(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function PreferencesScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useBioCross();
  const [prefs, setPrefs] = useState<AppPreferences>(preferences ?? DEMO_PREFERENCES);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (preferences) setPrefs(preferences);
  }, [preferences]);

  const handleContinue = async () => {
    setSaving(true);
    try {
      await updatePreferences(prefs);
      router.push('/onboarding/complete');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader onBack={() => router.back()} />
      <ProgressSegments total={6} current={5} label="Step 5 of 6" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title="Set Your Preferences"
          subtitle="Tell us about your goals and lifestyle so BioCross can tailor insights to what matters most to you."
        />

        <PreferenceCard
          icon="flag-outline"
          title="Goals"
          subtitle="What are you hoping to support with supplements?"
        >
          <ChipRow
            options={GOAL_OPTIONS}
            selected={prefs.goals}
            onToggle={(v) => setPrefs((p) => ({ ...p, goals: toggleChip(p.goals, v) }))}
          />
        </PreferenceCard>

        <PreferenceCard
          icon="restaurant-outline"
          title="Dietary"
          subtitle="Any dietary patterns or restrictions we should know about?"
        >
          <ChipRow
            options={DIETARY_OPTIONS}
            selected={prefs.dietary}
            onToggle={(v) => setPrefs((p) => ({ ...p, dietary: toggleChip(p.dietary, v) }))}
          />
        </PreferenceCard>

        <PreferenceCard
          icon="fitness-outline"
          title="Lifestyle"
          subtitle="Help us understand your daily habits."
        >
          <ChipRow
            options={LIFESTYLE_OPTIONS}
            selected={prefs.lifestyle}
            onToggle={(v) => setPrefs((p) => ({ ...p, lifestyle: toggleChip(p.lifestyle, v) }))}
          />
        </PreferenceCard>

        <HealthCard style={styles.card}>
          <HealthCardHeader
            icon="notifications-outline"
            title="Notifications"
            subtitle="Choose what updates you receive."
          />
          <ToggleRow
            label="Safety alerts"
            description="Urgent recalls, interactions, and personalized warnings."
            value={prefs.safetyAlertsEnabled}
            onValueChange={(v) => setPrefs((p) => ({ ...p, safetyAlertsEnabled: v }))}
          />
          <View style={styles.toggleDivider} />
          <ToggleRow
            label="Insights & research"
            description="New studies and tips relevant to your profile."
            value={prefs.insightsEnabled}
            onValueChange={(v) => setPrefs((p) => ({ ...p, insightsEnabled: v }))}
          />
        </HealthCard>

        <HealthCard style={styles.card}>
          <HealthCardHeader
            icon="lock-closed-outline"
            title="Privacy"
            subtitle="Your data stays yours."
          />
          <View style={styles.privacyRow}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.brand.blue} />
            <Text style={styles.privacyText}>
              BioCross encrypts your health information and never sells your data. You control what&apos;s
              stored and can export or delete it anytime.
            </Text>
          </View>
        </HealthCard>

        <InfoCallout
          icon="heart"
          tone="success"
          title="Built on trust"
          body="BioCross is designed with clinicians and researchers. We show our sources, explain our reasoning, and never guess when information is missing."
        />

        <View style={styles.footer}>
          <BioCrossButton label="Continue" onPress={handleContinue} loading={saving} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PreferenceCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <HealthCard style={styles.card}>
      <HealthCardHeader icon={icon} title={title} subtitle={subtitle} />
      <View style={styles.chipWrap}>{children}</View>
    </HealthCard>
  );
}

function ChipRow({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <Pressable
            key={option}
            onPress={() => onToggle(option)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: active }}
          >
            {active ? (
              <Ionicons name="checkmark" size={14} color={colors.brand.blue} style={styles.chipIcon} />
            ) : null}
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleText}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surface.borderStrong, true: colors.brand.blueMuted }}
        thumbColor={value ? colors.brand.blue : colors.surface.card}
        accessibilityLabel={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingBottom: spacing.xxxl, gap: spacing.sm },
  card: { marginHorizontal: spacing.xl },
  chipWrap: { marginTop: spacing.md },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.surface.borderStrong,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface.card,
  },
  chipActive: {
    borderColor: colors.brand.blue,
    backgroundColor: colors.brand.blueLight,
  },
  chipIcon: { marginRight: 4 },
  chipText: { color: colors.text.primary, fontWeight: '600', fontSize: typography.size.sm },
  chipTextActive: { color: colors.brand.blue },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  toggleText: { flex: 1 },
  toggleLabel: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  toggleDescription: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: 2,
    lineHeight: 18,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginTop: spacing.md,
  },
  privacyRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, alignItems: 'flex-start' },
  privacyText: { flex: 1, color: colors.text.secondary, fontSize: typography.size.sm, lineHeight: 18 },
  footer: { marginHorizontal: spacing.xl, marginTop: spacing.lg },
});
