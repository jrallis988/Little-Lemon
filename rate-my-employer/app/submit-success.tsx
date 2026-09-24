import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function SubmitSuccessScreen() {
  const router = useRouter();
  const { getCompany, getWorkplace } = useApp();
  const params = useLocalSearchParams<{
    type?: string;
    companyId?: string;
    workplaceId?: string;
  }>();

  const company = params.companyId ? getCompany(params.companyId) : undefined;
  const workplace = params.workplaceId ? getWorkplace(params.workplaceId) : undefined;
  const isInterview = params.type === 'interview';
  const destination = workplace
    ? `/workplace/${workplace.id}`
    : company
      ? `/company/${company.id}`
      : '/(tabs)/home';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>RME</Text>
          </View>
          <Text style={styles.title}>Thanks for sharing</Text>
          <Text style={styles.copy}>
            Your {isInterview ? 'interview' : 'work'} experience
            {company ? ` at ${company.name}` : ''}
            {workplace ? ` · ${workplace.name}` : ''} is live. Honest posts help others decide.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label={workplace || company ? 'View listing' : 'Back to Home'}
            onPress={() => router.replace(destination as never)}
          />
          <PrimaryButton
            label="Write another"
            variant="secondary"
            onPress={() => router.replace('/(tabs)/write')}
          />
          <PrimaryButton
            label="Go to Profile"
            variant="ghost"
            onPress={() => router.replace('/(tabs)/profile')}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  badgeText: {
    fontFamily: typography.bodyBold,
    fontSize: 14,
    letterSpacing: 1.2,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: typography.display,
    fontSize: 34,
    lineHeight: 40,
    color: colors.ink,
  },
  copy: {
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
    maxWidth: 360,
  },
  actions: { gap: spacing.sm, paddingBottom: spacing.lg },
});
