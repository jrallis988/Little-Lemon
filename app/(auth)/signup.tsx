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
import type { AccountRole } from '@/types/models';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<AccountRole>('listener');
  const { signUp, isLoading, error, clearError } = useUserStore();

  const onSubmit = async () => {
    clearError();
    const ok = await signUp(email, password, displayName, role);
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
          <Text style={styles.brand}>JOIN THE SIGNAL</Text>
          <Text style={styles.sub}>
            Artist or listener — same platform, separate identity. No verified badges.
          </Text>

          <View style={styles.roleRow}>
            {(['listener', 'artist'] as AccountRole[]).map((option) => {
              const active = role === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setRole(option)}
                  style={[styles.roleChip, active && styles.roleChipActive]}
                >
                  <Text style={[styles.roleText, active && styles.roleTextActive]}>
                    {option.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>DISPLAY NAME</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder={role === 'artist' ? 'Band / project name' : 'Handle'}
              placeholderTextColor={colors.textDim}
            />

            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
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
              placeholder="min 6 characters"
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
                <Text style={styles.ctaText}>CREATE ACCOUNT</Text>
              )}
            </Pressable>
          </View>

          <Link href="/(auth)/login" style={styles.link}>
            <Text style={styles.linkText}>Already tuned in? Sign in →</Text>
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
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  brand: {
    ...typography.headline,
    color: colors.phosphor,
    letterSpacing: 2,
  },
  sub: {
    ...typography.body,
    color: colors.textMuted,
  },
  roleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  roleChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  roleChipActive: {
    borderColor: colors.phosphor,
    backgroundColor: colors.surfaceRaised,
  },
  roleText: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  roleTextActive: {
    color: colors.phosphor,
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
