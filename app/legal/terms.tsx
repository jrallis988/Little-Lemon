import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

export default function TermsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle title="Terms of Service" subtitle="Last updated: August 2026 (demo template)" />
        <Text style={styles.h}>Using BioCross</Text>
        <Text style={styles.p}>
          BioCross provides educational information about dietary supplements in relation to your
          self-reported health profile. By using the app, you agree these insights are informational
          only and are not a substitute for professional medical care.
        </Text>
        <Text style={styles.h}>Accounts</Text>
        <Text style={styles.p}>
          You are responsible for keeping your login credentials secure and for the accuracy of
          information you confirm in your health profile.
        </Text>
        <Text style={styles.h}>Limitations</Text>
        <Text style={styles.p}>
          Results depend on the completeness of your profile and available reference data. Missing
          information is not the same as “no known conflict.” BioCross does not guarantee safety or
          efficacy of any product.
        </Text>
        <Text style={styles.h}>Before launch</Text>
        <Text style={styles.p}>
          This is a demo template. A production release requires a lawyer-reviewed Terms of Service
          tailored to your jurisdiction and product claims.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  h: {
    fontWeight: '800',
    color: colors.text.primary,
    fontSize: typography.size.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  p: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
});
