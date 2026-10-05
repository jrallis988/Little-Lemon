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
    <Screen scroll={false} atmosphere="bold" contentStyle={styles.screenContent}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.hero}>
          <Animated.Text entering={FadeInDown.duration(550)} style={styles.brand}>
            Listenbox
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(60).duration(500)} style={styles.brandRule} />
          <Animated.Text entering={FadeInDown.delay(100).duration(500)} style={styles.headline}>
            Your listening diary.
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(160).duration(500)} style={styles.sub}>
            Log albums, rate them, and follow what friends are spinning.
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(240).duration(480)} style={styles.form}>
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
    paddingTop: spacing.xl,
    maxWidth: 360,
  },
  brand: {
    fontFamily: fonts.displayBlack,
    fontSize: 58,
    lineHeight: 58,
    letterSpacing: -2.2,
    color: palette.ink,
  },
  brandRule: {
    width: 72,
    height: 5,
    backgroundColor: palette.accent,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 2,
  },
  headline: {
    fontFamily: fonts.displayItalic,
    fontSize: 28,
    lineHeight: 34,
    color: palette.ink,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: palette.inkMuted,
    marginTop: spacing.sm,
  },
  form: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: palette.inkMuted,
    marginTop: spacing.sm,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1.5,
    borderColor: 'rgba(7, 21, 28, 0.14)',
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
  },
  cta: {
    marginTop: spacing.md,
    backgroundColor: palette.accent,
    borderRadius: radii.md,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: palette.ink,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: palette.accentDeep,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: palette.accentInk,
    letterSpacing: 0.2,
  },
  hint: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: palette.inkFaint,
  },
});
