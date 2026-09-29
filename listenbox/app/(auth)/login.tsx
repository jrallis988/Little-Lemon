import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { fonts, palette, radii, spacing } from '@/constants/theme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleContinue() {
    setBusy(true);
    try {
      await signIn(email, displayName);
      router.replace('/(tabs)');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen scroll={false} contentStyle={styles.screenContent}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.hero}>
          <Animated.Text entering={FadeInDown.duration(500)} style={styles.brand}>
            Listenbox
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(80).duration(500)} style={styles.headline}>
            Your listening diary.
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(140).duration(500)} style={styles.sub}>
            Log albums, rate them, and follow what friends are spinning.
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(220).duration(450)} style={styles.form}>
          <Text style={styles.label}>Display name</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="e.g. Mira"
            placeholderTextColor={palette.inkFaint}
            autoCapitalize="words"
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            placeholderTextColor={palette.inkFaint}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enter Listenbox"
            onPress={handleContinue}
            disabled={busy}
            style={({ pressed }) => [
              styles.cta,
              pressed && styles.ctaPressed,
              busy && styles.ctaDisabled,
            ]}>
            <Text style={styles.ctaText}>{busy ? 'Signing in…' : 'Enter Listenbox'}</Text>
          </Pressable>

          <Text style={styles.hint}>
            Scaffold auth — no password yet. Your session is saved on this device.
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
  },
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.xl,
  },
  brand: {
    fontFamily: fonts.display,
    fontSize: 52,
    lineHeight: 56,
    letterSpacing: -1.5,
    color: palette.ink,
  },
  headline: {
    fontFamily: fonts.displaySoft,
    fontSize: 26,
    lineHeight: 32,
    color: palette.ink,
    marginTop: spacing.sm,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: palette.inkMuted,
    maxWidth: 320,
    marginTop: spacing.xs,
  },
  form: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: palette.inkMuted,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 42, 0.12)',
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
  },
  cta: {
    marginTop: spacing.md,
    backgroundColor: palette.accent,
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: palette.accentInk,
  },
  hint: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: palette.inkFaint,
  },
});
