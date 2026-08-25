import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import type { Ingredient } from '../../src/domain/models';

/**
 * Label / Supplement Facts review — related to but distinct from barcode scanning.
 * Barcode identifies the product; label photo verifies formulation.
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
  const ingredients: Ingredient[] = incomplete
    ? base.ingredients.slice(0, 1)
    : base.ingredients;

  const handleConfirm = () => {
    setConfirming(true);
    if (incomplete || ingredients.length === 0) {
      router.replace({
        pathname: '/check/issue',
        params: { kind: 'incomplete_label', supplementId: base.id },
      });
      setConfirming(false);
      return;
    }
    router.push({
      pathname: '/check/confirm',
      params: { supplementId: base.id, source: 'label' },
    });
    setConfirming(false);
  };

  const handleUnknown = () => {
    router.replace({
      pathname: '/check/issue',
      params: { kind: 'unknown_product' },
    });
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
          Confirm the Supplement Facts BioCross read from the label photo. This verifies formulation
          when product data is unavailable or needs a second look.
        </Text>

        <InfoCallout
          tone="info"
          title="Barcode vs label"
          body="A barcode identifies the product. Photographing the Supplement Facts panel captures ingredients and amounts for analysis."
        />

        <HealthCard style={styles.card}>
          <Text style={styles.product}>{base.name}</Text>
          <Text style={styles.meta}>
            {[base.dosage, base.form].filter(Boolean).join(' · ')}
          </Text>
          {base.brand ? <Text style={styles.meta}>Brand: {base.brand}</Text> : null}
        </HealthCard>

        <HealthCard style={styles.card}>
          <Text style={styles.sectionTitle}>Ingredients from label</Text>
          {ingredients.length === 0 ? (
            <Text style={styles.empty}>No ingredients could be read from this image.</Text>
          ) : (
            ingredients.map((ing) => (
              <View key={ing.id} style={styles.row}>
                <Ionicons
                  name={ing.isActive ? 'flask-outline' : 'ellipse-outline'}
                  size={16}
                  color={colors.brand.blue}
                />
                <Text style={styles.ingName}>{ing.name}</Text>
                {ing.amount ? <Text style={styles.amount}>{ing.amount}</Text> : null}
              </View>
            ))
          )}
          {incomplete ? (
            <View style={styles.warn}>
              <Ionicons name="warning" size={16} color={colors.semantic.caution} />
              <Text style={styles.warnText}>
                Some Supplement Facts lines look incomplete. You can retake the photo or continue to
                request more information.
              </Text>
            </View>
          ) : null}
        </HealthCard>

        <BioCrossButton
          label={incomplete ? 'Need clearer label photo' : 'Confirm formulation'}
          onPress={handleConfirm}
          icon="checkmark-circle-outline"
        />
        <BioCrossButton
          label="This isn’t the right product"
          variant="outline"
          onPress={handleUnknown}
          style={styles.gap}
        />
        <Pressable onPress={() => router.push('/check/search')} style={styles.linkWrap}>
          <Text style={styles.link}>Search by name instead</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { padding: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
  card: { marginTop: spacing.xs },
  product: { fontWeight: '800', fontSize: typography.size.lg, color: colors.text.primary },
  meta: { color: colors.text.secondary, marginTop: 4, fontSize: typography.size.sm },
  sectionTitle: { fontWeight: '700', color: colors.text.primary, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface.border,
  },
  ingName: { flex: 1, color: colors.text.primary, fontSize: typography.size.sm },
  amount: { color: colors.text.secondary, fontSize: typography.size.xs },
  empty: { color: colors.text.secondary, fontSize: typography.size.sm },
  warn: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
    backgroundColor: colors.semantic.cautionBg,
    padding: spacing.sm,
    borderRadius: radii.md,
  },
  warnText: { flex: 1, color: colors.semantic.caution, fontSize: typography.size.sm, lineHeight: 18 },
  gap: { marginTop: spacing.xs },
  linkWrap: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  link: { color: colors.brand.blue, fontWeight: '700' },
});
