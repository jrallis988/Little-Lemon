import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ContributeScreen() {
  const router = useRouter();
  const { user } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Contribute</Text>
        <Text style={styles.copy}>
          Share a review, salary signal, or workplace tag. Honest reports help the next hire.
        </Text>

        <Pressable
          style={styles.primary}
          onPress={() => {
            if (!user) {
              router.push('/auth');
              return;
            }
            router.push('/(tabs)/search');
          }}
        >
          <Text style={styles.primaryText}>
            {user ? 'Pick an employer to review' : 'Sign in to contribute'}
          </Text>
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you can add</Text>
          <Text style={styles.bullet}>• Workplace review with category scores</Text>
          <Text style={styles.bullet}>• Salary range for your role (coming with API)</Text>
          <Text style={styles.bullet}>• Tags that describe culture and process</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md },
  title: {
    fontFamily: typography.display,
    fontSize: 32,
    color: colors.ink,
  },
  copy: {
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.inkMuted,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryText: {
    fontFamily: typography.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  card: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: {
    fontFamily: typography.bodySemi,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 4,
  },
  bullet: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkMuted,
    lineHeight: 22,
  },
});
