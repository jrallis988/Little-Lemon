import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography, fonts } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, clearError } = useUserStore();

  const onSubmit = async () => {
    clearError();
    const ok = await signIn(email, password);
    if (ok) {
      router.replace('/(main)/profile');
    }
  };

  return (
    <StaticBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.brand}>STATICVOLUME</Text>
          <Text style={styles.sub}>
            Standalone artist discovery. No likes. Downloads count.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@scene.local"
              placeholderTextColor={colors.textDim}
            />

            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textDim}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
              onPress={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={styles.ctaText}>TUNE IN</Text>
              )}
            </Pressable>
          </View>

          <Link href="/(auth)/signup" style={styles.link}>
            <Text style={styles.linkText}>New here? Create an account →</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    gap: spacing.md,
  },
  brand: {
    ...typography.brand,
    color: colors.phosphor,
  },
  sub: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    ...typography.monoTiny,
    color: colors.textDim,
    marginTop: spacing.sm,
  },
  input: {
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.phosphor,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: {
    ...typography.caption,
    color: colors.background,
    letterSpacing: 2,
  },
  link: { marginTop: spacing.lg },
  linkText: {
    ...typography.caption,
    color: colors.copper,
  },
});
