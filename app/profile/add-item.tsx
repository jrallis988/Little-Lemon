import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, BioCrossButton, HealthCard, InfoCallout, ScreenTitle } from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import type { HealthProfileItem } from '../../src/domain/models';
import {
  PROFILE_FORM_FIELDS,
  SECTION_TO_CATEGORY,
} from '../../src/features/profile/profileFormConfig';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function AddProfileItemScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams<{ section: string }>();
  const { addProfileItem } = useBioCross();
  const fields = section ? PROFILE_FORM_FIELDS[section] : undefined;
  const category = section ? SECTION_TO_CATEGORY[section] : undefined;
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const title = useMemo(() => {
    const labels: Record<string, string> = {
      conditions: 'Add condition',
      medications: 'Add medication',
      supplements: 'Add supplement',
      allergies: 'Add allergy',
      surgeries: 'Add procedure',
      testResults: 'Add test result',
      recentChanges: 'Add recent change',
    };
    return section ? labels[section] ?? 'Add item' : 'Add item';
  }, [section]);

  if (!fields || !category || !section) {
    return (
      <SafeAreaView style={styles.safe}>
        <AppHeader onBack={() => router.back()} />
        <ScreenTitle title="Unavailable" subtitle="This profile section does not support adding items." />
      </SafeAreaView>
    );
  }

  const setField = (key: string, text: string) => setValues((v) => ({ ...v, [key]: text }));

  const save = async () => {
    const missing = fields.filter((f) => f.required && !values[f.key]?.trim());
    if (missing.length) return;

    setSaving(true);
    const detailsParts: string[] = [];
    if (values.dosage) detailsParts.push(values.dosage);
    if (values.frequency) detailsParts.push(values.frequency);
    if (values.reaction) detailsParts.push(`Reaction: ${values.reaction}`);
    if (values.year) detailsParts.push(`Year: ${values.year}`);
    if (values.details) detailsParts.push(values.details);

    const item: HealthProfileItem = {
      id: `manual-${Date.now()}`,
      category,
      name: values.name?.trim() ?? values.details?.trim() ?? 'Untitled',
      details: detailsParts.join(' · ') || undefined,
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      extractedAt: new Date().toISOString(),
      metadata: {
        dosage: values.dosage,
        frequency: values.frequency,
        reaction: values.reaction,
        year: values.year,
      },
    };

    await addProfileItem(item);
    setSaving(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <ScreenTitle
          title={title}
          subtitle="Confirmed items are used in supplement safety checks. You can edit or remove them later."
        />
        <InfoCallout tone="info" body="BioCross never auto-confirms imported information without your review." />
        {fields.map((field) => (
          <HealthCard key={field.key} style={styles.fieldCard}>
            <Text style={styles.label}>
              {field.label}
              {field.required ? ' *' : ''}
            </Text>
            <TextInput
              value={values[field.key] ?? ''}
              onChangeText={(t) => setField(field.key, t)}
              placeholder={field.placeholder}
              placeholderTextColor={colors.text.tertiary}
              multiline={field.multiline}
              style={[styles.input, field.multiline && styles.multiline]}
              accessibilityLabel={field.label}
            />
          </HealthCard>
        ))}
        <BioCrossButton label="Save to profile" loading={saving} onPress={save} />
        <BioCrossButton label="Cancel" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.sm },
  fieldCard: { marginBottom: spacing.xs },
  label: { fontWeight: '700', color: colors.text.primary, marginBottom: spacing.xs, fontSize: typography.size.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: radii.md,
    padding: spacing.sm,
    color: colors.text.primary,
    fontSize: typography.size.md,
    backgroundColor: colors.surface.input,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
});
