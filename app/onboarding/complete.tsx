import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  InfoCallout,
  ProgressSegments,
} from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import { useBioCross } from '../../src/state/BioCrossContext';

const WHATS_NEXT = [
  {
    icon: 'scan-outline' as const,
    title: 'Check your first supplement',
    body: 'Scan a barcode or search by name to get a personalized safety check.',
  },
  {
    icon: 'person-outline' as const,
    title: 'Review your health profile',
    body: 'Add or update conditions, medications, and records anytime.',
  },
  {
    icon: 'notifications-outline' as const,
    title: 'Stay informed',
    body: 'Get alerts about recalls, interactions, and research relevant to you.',
  },
];

export default function CompleteScreen() {
  const router = useRouter();
  const { completeOnboarding } = useBioCross();
  const [finishing, setFinishing] = useState(false);

  const finish = async (dest: '/(tabs)/home' | '/(tabs)/check') => {
    setFinishing(true);
    try {
      await completeOnboarding();
      router.replace(dest);
    } finally {
      setFinishing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader showLogo={false} />
      <ProgressSegments total={6} current={6} label="Step 6 of 6" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={40} color={colors.semantic.low} />
          </View>
          <Text style={styles.title}>You&apos;re All Set!</Text>
          <Text style={styles.subtitle}>
            Your health profile is ready. BioCross will use your confirmed information to help you
            check supplements for safety.
          </Text>
        </View>

        <InfoCallout
          icon="lock-closed"
          tone="privacy"
          title="Your data is private and secure."
          body="We never sell your data. You're always in control of your information."
        />

        <HealthCard style={styles.card}>
          <Text style={styles.sectionTitle}>What&apos;s Next</Text>
          {WHATS_NEXT.map((item, index) => (
            <View
              key={item.title}
              style={[styles.nextRow, index < WHATS_NEXT.length - 1 && styles.nextRowBorder]}
            >
              <View style={styles.nextIcon}>
                <Ionicons name={item.icon} size={18} color={colors.brand.blue} />
              </View>
              <View style={styles.nextText}>
                <Text style={styles.nextTitle}>{item.title}</Text>
                <Text style={styles.nextBody}>{item.body}</Text>
              </View>
            </View>
          ))}
        </HealthCard>

        <View style={styles.footer}>
          <BioCrossButton
            label="Start Checking Supplements"
            onPress={() => finish('/(tabs)/check')}
            loading={finishing}
            icon="scan-outline"
          />
          <Pressable
            onPress={() => finish('/(tabs)/home')}
            style={styles.dashboardLink}
            accessibilityRole="link"
            disabled={finishing}
          >
            <Text style={styles.dashboardLinkText}>Go to Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingBottom: spacing.xxxl, paddingHorizontal: spacing.xl, gap: spacing.md },
  hero: { alignItems: 'center', marginBottom: spacing.sm },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.semantic.lowBg,
    borderWidth: 2,
    borderColor: colors.semantic.lowBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
    fontSize: typography.size.md,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  card: { marginTop: spacing.xs },
  sectionTitle: {
    fontWeight: '800',
    color: colors.text.primary,
    fontSize: typography.size.lg,
    marginBottom: spacing.sm,
  },
  nextRow: { flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.sm },
  nextRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.surface.border },
  nextIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { flex: 1 },
  nextTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  nextBody: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2, lineHeight: 18 },
  footer: { marginTop: spacing.lg, gap: spacing.sm },
  dashboardLink: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  dashboardLinkText: { color: colors.brand.blue, fontWeight: '700' },
});
