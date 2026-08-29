import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  ErrorState,
  HealthCard,
  InfoCallout,
  SupplementCard,
} from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import { SUPPLEMENT_CATALOG } from '../../src/domain/fixtures';

export default function ConfirmScreen() {
  const router = useRouter();
  const { supplementId, source } = useLocalSearchParams<{ supplementId: string; source?: string }>();

  const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === supplementId);
  const fromLabel = source === 'label';

  if (!supplement) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} showLogo={false} />
        <ErrorState
          title="Product not found"
          body="We couldn't find that supplement in our catalog. Try searching again or enter a different barcode."
          actionLabel="Search supplements"
          onAction={() => router.push('/check/search')}
        />
      </SafeAreaView>
    );
  }

  const serving = [supplement.dosage, supplement.form].filter(Boolean).join(' · ');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Confirm Product</Text>
          <Text style={styles.subtitle}>
            Make sure this matches the supplement you want to check
          </Text>
        </View>

        <View style={styles.section}>
          <SupplementCard supplement={supplement} />
        </View>

        <View style={styles.section}>
          <HealthCard>
            <Text style={styles.productName}>{supplement.name}</Text>
            {supplement.brand ? <Text style={styles.brand}>Brand: {supplement.brand}</Text> : null}
            {serving ? <Text style={styles.serving}>Serving / dosage: {serving}</Text> : null}

            <Text style={styles.ingredientsTitle}>Ingredient list</Text>
            {supplement.ingredients.length > 0 ? (
              supplement.ingredients.map((ing) => (
                <View key={ing.id} style={styles.ingredientRow}>
                  <Ionicons
                    name={ing.isActive ? 'leaf-outline' : 'ellipse-outline'}
                    size={16}
                    color={ing.isActive ? colors.brand.blue : colors.text.tertiary}
                  />
                  <Text style={styles.ingredientName}>
                    {ing.name}
                    {!ing.isActive ? ' (inactive)' : ''}
                  </Text>
                  {ing.amount ? <Text style={styles.ingredientAmt}>{ing.amount}</Text> : null}
                </View>
              ))
            ) : (
              <Text style={styles.noIngredients}>No ingredients listed for this product.</Text>
            )}
            {supplement.barcode ? (
              <Text style={styles.barcode}>Barcode: {supplement.barcode}</Text>
            ) : null}
          </HealthCard>
        </View>

        {fromLabel ? (
          <View style={styles.section}>
            <InfoCallout
              tone="success"
              icon="checkmark-circle"
              title="Formulation verified"
              body="Ingredient details were confirmed from the Supplement Facts panel you photographed."
            />
          </View>
        ) : null}

        <View style={styles.section}>
          <InfoCallout
            tone="info"
            title="What happens next?"
            body="When you tap Analyze Supplement, BioCross will check this product against your health profile using available safety evidence."
          />
        </View>

        <View style={styles.section}>
          <BioCrossButton
            label="Analyze Supplement"
            icon="shield-checkmark-outline"
            onPress={() =>
              router.push({
                pathname: '/check/analyzing',
                params: { supplementId: supplement.id },
              })
            }
            accessibilityHint="Run safety analysis against your health profile"
          />
          <BioCrossButton
            label="Not the right product?"
            variant="ghost"
            size="md"
            onPress={() => router.push('/check/search')}
            style={styles.secondaryBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingBottom: spacing.xxxl },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
  section: { marginHorizontal: spacing.xl, marginBottom: spacing.lg },
  productName: {
    fontWeight: '800',
    color: colors.text.primary,
    fontSize: typography.size.lg,
  },
  brand: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
  },
  serving: {
    marginTop: spacing.xs,
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  ingredientsTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  ingredientName: { flex: 1, color: colors.text.primary, fontSize: typography.size.sm },
  ingredientAmt: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  noIngredients: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontStyle: 'italic',
  },
  barcode: {
    marginTop: spacing.md,
    color: colors.text.tertiary,
    fontSize: typography.size.xs,
  },
  secondaryBtn: { marginTop: spacing.sm },
});
