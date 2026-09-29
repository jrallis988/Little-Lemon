import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

const STEPS = [
  {
    title: '1. Confirm your health profile',
    body: 'BioCross only uses items you confirm — medications, conditions, allergies, supplements, and more.',
  },
  {
    title: '2. Identify the product',
    body: 'Scan a barcode, search by name, or photograph Supplement Facts when barcode data is incomplete.',
  },
  {
    title: '3. Analyze ingredients',
    body: 'We map supplement → active ingredients → potential issues → your profile items → evidence sources.',
  },
  {
    title: '4. Understand the result',
    body: 'Results use four states: no known conflicts, use caution, high risk, and more information needed.',
  },
  {
    title: '5. Re-check when things change',
    body: 'Update your profile or recheck a product when medications change or newer evidence is available.',
  },
];

export default function HowItWorksScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle
          title="How safety checks work"
          subtitle="Structured reasoning — never a guarantee of safety."
        />
        {STEPS.map((s) => (
          <Text key={s.title} style={styles.block}>
            <Text style={styles.stepTitle}>{s.title}{'\n'}</Text>
            <Text style={styles.stepBody}>{s.body}</Text>
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  block: { marginBottom: spacing.lg },
  stepTitle: { fontWeight: '800', color: colors.text.primary, fontSize: typography.size.md, lineHeight: 22 },
  stepBody: { color: colors.text.secondary, fontSize: typography.size.md, lineHeight: 24 },
});
