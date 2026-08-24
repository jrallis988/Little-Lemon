import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BioCrossButton, BioCrossLogo, LogoMark } from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoBlock}>
          <BioCrossLogo size="lg" />
          <Text style={styles.healthcare}>HEALTHCARE</Text>
        </View>

        <Text style={styles.headline}>
          Check <Text style={styles.before}>before</Text> you take it.
        </Text>
        <Text style={styles.sub}>
          BioCross checks vitamins and supplements against your unique medical history and real scientific
          research to help keep you safe.
        </Text>

        <View style={styles.hero}>
          <View style={styles.platform}>
            <Bottle label="VITAMIN D3" color="#2F9E6B" />
            <Bottle label="MAGNESIUM" color={colors.brand.blue} tall />
            <Bottle label="OMEGA-3" color="#E8EEF8" darkText />
          </View>
          <View style={styles.shieldFloat}>
            <LogoMark size={36} />
          </View>
        </View>

        <Feature
          icon="shield-checkmark-outline"
          title="Personalized for you"
          body="We check against your medical history, medications, conditions, and more."
        />
        <Feature
          icon="search-outline"
          title="Backed by real research"
          body="We look at trusted scientific studies and interaction databases."
        />
        <Feature
          icon="heart-outline"
          title="Safety you can understand"
          body="Get clear answers in plain language before you take a supplement."
        />

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <BioCrossButton label="Get Started" onPress={() => router.push('/onboarding/create-profile')} />
        <Pressable
          onPress={() => router.replace('/(tabs)/home')}
          accessibilityRole="link"
          style={styles.accountLink}
        >
          <Text style={styles.accountText}>I already have an account</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Bottle({
  label,
  color,
  tall,
  darkText,
}: {
  label: string;
  color: string;
  tall?: boolean;
  darkText?: boolean;
}) {
  return (
    <View style={[styles.bottle, { backgroundColor: color, height: tall ? 110 : 88 }]}>
      <Text style={[styles.bottleText, darkText && { color: colors.text.primary }]}>{label}</Text>
    </View>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={18} color={colors.brand.blue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.card },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  logoBlock: { alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.xl },
  healthcare: {
    marginTop: 2,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  headline: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 36,
  },
  before: { color: colors.brand.blue },
  sub: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
  hero: {
    marginVertical: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    backgroundColor: colors.brand.blueLight,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 120,
  },
  bottle: {
    width: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  bottleText: { color: '#fff', fontSize: 8, fontWeight: '800', textAlign: 'center' },
  shieldFloat: {
    position: 'absolute',
    right: 24,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 4,
  },
  feature: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: { fontWeight: '700', color: colors.text.primary },
  featureBody: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2, lineHeight: 18 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.surface.borderStrong },
  dotActive: { backgroundColor: colors.brand.blue },
  accountLink: { marginTop: spacing.md, alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  accountText: { color: colors.brand.blue, fontWeight: '700' },
});
