import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function WorkVerificationScreen() {
  const router = useRouter();
  const { verifyWorkEmail, user } = useApp();
  const [workEmail, setWorkEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const sendLink = async () => {
    setBusy(true);
    const error = await verifyWorkEmail(workEmail);
    setBusy(false);
    if (error) {
      Alert.alert('Verification', error);
      return;
    }
    Alert.alert(
      'Magic link sent (demo)',
      'In production this would email a magic link. Your work domain is marked verified — it is never shown publicly on reviews.',
      [{ text: 'Continue', onPress: () => router.replace('/(tabs)/explore') }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.kicker}>Optional</Text>
        <Text style={styles.title}>Verify your workplace</Text>
        <Text style={styles.copy}>
          Earn a Verified Employee badge by confirming a corporate email domain.
          {user ? ` Signed in as ${user.displayName}.` : ''}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="you@company.com"
          placeholderTextColor={colors.inkSoft}
          autoCapitalize="none"
          keyboardType="email-address"
          value={workEmail}
          onChangeText={setWorkEmail}
        />

        <View style={styles.note}>
          <Text style={styles.noteText}>
            Your email is never linked publicly to your reviews. We only store the domain for the
            badge.
          </Text>
        </View>

        <PrimaryButton
          label={busy ? 'Sending…' : 'Send Magic Link'}
          onPress={sendLink}
          disabled={busy}
        />
        <PrimaryButton
          label="Skip for now"
          variant="ghost"
          onPress={() => router.replace('/(tabs)/explore')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md },
  kicker: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  title: {
    fontFamily: typography.display,
    fontSize: 32,
    color: colors.ink,
  },
  copy: {
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
  },
  note: {
    backgroundColor: colors.mist,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  noteText: {
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
  },
});
