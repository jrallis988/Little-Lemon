import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle title="Privacy Policy" subtitle="Last updated: August 2026 (demo template)" />
        <Text style={styles.h}>What we collect</Text>
        <Text style={styles.p}>
          Account information (email, name), health profile items you enter or confirm, supplement check
          history, and uploaded document metadata. Demo builds use fictional data only.
        </Text>
        <Text style={styles.h}>How we use it</Text>
        <Text style={styles.p}>
          To personalize supplement safety checks, maintain your history, and improve the product. We do
          not sell your health information.
        </Text>
        <Text style={styles.h}>Your choices</Text>
        <Text style={styles.p}>
          Export your data from Privacy & Security, delete your account, or contact support. Production
          deployments require a lawyer-reviewed policy before launch.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  h: { fontWeight: '800', color: colors.text.primary, fontSize: typography.size.lg, marginTop: spacing.md, marginBottom: spacing.xs },
  p: { color: colors.text.secondary, fontSize: typography.size.md, lineHeight: 24, marginBottom: spacing.sm },
});
