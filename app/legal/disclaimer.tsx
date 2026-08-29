import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

export default function MedicalDisclaimerScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle title="Medical disclaimer" subtitle="Please read carefully before using BioCross." />
        <Text style={styles.p}>
          BioCross provides educational information about dietary supplements and how they may relate to
          your self-reported health profile. BioCross is not a medical device and does not provide medical
          advice, diagnosis, or treatment.
        </Text>
        <Text style={styles.p}>
          Safety checks are based on the information you confirm in your profile and available reference
          sources at the time of analysis. Missing information is not the same as “no known conflict.”
        </Text>
        <Text style={styles.p}>
          Always consult a qualified healthcare professional before starting, stopping, or changing any
          supplement, medication, or treatment plan — especially if you are pregnant, nursing, have a
          medical condition, or take prescription drugs.
        </Text>
        <Text style={styles.p}>
          In an emergency, call your local emergency number. Do not rely on BioCross for urgent medical
          decisions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  p: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
});
