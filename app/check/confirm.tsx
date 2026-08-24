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
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { SUPPLEMENT_CATALOG } from '../../src/domain/fixtures';

export default function ConfirmScreen() {
  const router = useRouter();
  const { supplementId } = useLocalSearchParams<{ supplementId: string }>();

  const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === supplementId);

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

  const activeIngredients = supplement.ingredients.filter((i) => i.isActive);

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
            <Text style={styles.ingredientsTitle}>Active ingredients</Text>
            {activeIngredients.map((ing) => (
              <View key={ing.id} style={styles.ingredientRow}>
                <Ionicons name="leaf-outline" size={16} color={colors.brand.blue} />
                <Text style={styles.ingredientName}>{ing.name}</Text>
                {ing.amount ? <Text style={styles.ingredientAmt}>{ing.amount}</Text> : null}
              </View>
            ))}
            {supplement.barcode ? (
              <Text style={styles.barcode}>Barcode: {supplement.barcode}</Text>
            ) : null}
          </HealthCard>
        </View>

        <View style={styles.section}>
          <InfoCallout
            tone="info"
            title="What happens next?"
            body="BioCross will analyze this product against your health profile — medications, conditions, allergies, and supplements — using trusted evidence sources."
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
  ingredientsTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
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
  barcode: {
    marginTop: spacing.md,
    color: colors.text.tertiary,
    fontSize: typography.size.xs,
  },
  secondaryBtn: { marginTop: spacing.sm },
});
