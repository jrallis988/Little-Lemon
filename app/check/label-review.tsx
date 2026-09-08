import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  InfoCallout,
  LoadingState,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { SUPPLEMENT_CATALOG } from '../../src/domain/fixtures';
import type { Ingredient, Supplement } from '../../src/domain/models';

/**
 * Label / Supplement Facts review — mock OCR with editable fields before confirm.
 */
export default function LabelReviewScreen() {
  const router = useRouter();
  const { supplementId, mode } = useLocalSearchParams<{
    supplementId?: string;
    mode?: string;
  }>();
  const [confirming, setConfirming] = useState(false);

  const base = useMemo(
    () => SUPPLEMENT_CATALOG.find((s) => s.id === supplementId) ?? SUPPLEMENT_CATALOG[4],
    [supplementId],
  );

  const incomplete = mode === 'incomplete';
  const seed = incomplete ? base.ingredients.slice(0, 1) : base.ingredients;

  const [productName, setProductName] = useState(base.name);
  const [brand, setBrand] = useState(base.brand ?? '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(seed);

  const updateIngredient = (id: string, patch: Partial<Ingredient>) => {
    setIngredients((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const addIngredient = () => {
    setIngredients((list) => [
      ...list,
      { id: `ing-new-${Date.now()}`, name: '', amount: '', isActive: true },
    ]);
  };

  const buildSupplement = (): Supplement => ({
    ...base,
    name: productName.trim() || base.name,
    brand: brand.trim() || base.brand,
    ingredients,
  });

  const handleConfirm = () => {
    setConfirming(true);
    const supplement = buildSupplement();
    const active = supplement.ingredients.filter((i) => i.isActive && i.name.trim());
    if (incomplete || active.length === 0) {
      router.replace({
        pathname: '/check/issue',
        params: { kind: 'incomplete_label', supplementId: base.id },
      });
      setConfirming(false);
      return;
    }
    router.push({
      pathname: '/check/confirm',
      params: { supplementId: supplement.id, source: 'label', customName: supplement.name },
    });
    setConfirming(false);
  };

  if (confirming) {
    return (
      <SafeAreaView style={styles.safe}>
        <LoadingState message="Reading Supplement Facts…" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Review label details</Text>
        <Text style={styles.subtitle}>
          Edit anything the mock OCR got wrong before BioCross analyzes the formulation.
        </Text>

        <InfoCallout
          tone="info"
          title="Confidence: demo OCR"
          body="Production would show per-field confidence scores. Low-confidence fields would be highlighted for review."
        />

        <HealthCard style={styles.card}>
          <Text style={styles.fieldLabel}>Product name</Text>
          <TextInput value={productName} onChangeText={setProductName} style={styles.input} />
          <Text style={styles.fieldLabel}>Brand</Text>
          <TextInput value={brand} onChangeText={setBrand} style={styles.input} />
        </HealthCard>

        <HealthCard style={styles.card}>
          <Text style={styles.sectionTitle}>Ingredients from label</Text>
          {ingredients.map((ing) => (
            <View key={ing.id} style={styles.row}>
              <TextInput
                value={ing.name}
                onChangeText={(t) => updateIngredient(ing.id, { name: t })}
                placeholder="Ingredient name"
                placeholderTextColor={colors.text.tertiary}
                style={[styles.input, { flex: 1 }]}
              />
              <TextInput
                value={ing.amount ?? ''}
                onChangeText={(t) => updateIngredient(ing.id, { amount: t })}
                placeholder="Amount"
                placeholderTextColor={colors.text.tertiary}
                style={[styles.input, styles.amountInput]}
              />
            </View>
          ))}
          <Pressable onPress={addIngredient} style={styles.addRow} accessibilityRole="button">
            <Ionicons name="add-circle-outline" size={18} color={colors.brand.blue} />
            <Text style={styles.addText}>Add ingredient line</Text>
          </Pressable>
        </HealthCard>

        <BioCrossButton
          label={incomplete ? 'Need clearer label photo' : 'Confirm formulation'}
          onPress={handleConfirm}
          icon="checkmark-circle-outline"
        />
        <BioCrossButton
          label="This isn’t the right product"
          variant="outline"
          onPress={() => router.replace({ pathname: '/check/issue', params: { kind: 'unknown_product' } })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { padding: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  title: { fontSize: typography.size.xxl, fontWeight: '800', color: colors.text.primary },
  subtitle: { color: colors.text.secondary, fontSize: typography.size.md, lineHeight: 22 },
  card: { marginTop: spacing.xs },
  fieldLabel: { fontWeight: '600', color: colors.text.secondary, fontSize: typography.size.xs, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: radii.md,
    padding: spacing.sm,
    color: colors.text.primary,
    fontSize: typography.size.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface.input,
  },
  sectionTitle: { fontWeight: '700', color: colors.text.primary, marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' },
  amountInput: { width: 88 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: spacing.sm },
  addText: { color: colors.brand.blue, fontWeight: '700' },
});
