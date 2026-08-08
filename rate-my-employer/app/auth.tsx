import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const error =
      mode === 'signin'
        ? await signIn({ email, password })
        : await signUp({ email, password, displayName });
    setBusy(false);

    if (error) {
      Alert.alert('Account', error);
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </Text>
        <Text style={styles.copy}>
          Accounts let you post, edit, and delete your employer reviews.
        </Text>

        {mode === 'signup' ? (
          <TextInput
            style={styles.input}
            placeholder="Display name"
            placeholderTextColor={colors.inkSoft}
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.inkSoft}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.inkSoft}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.primary, busy && styles.disabled]}
          onPress={onSubmit}
          disabled={busy}
        >
          <Text style={styles.primaryText}>
            {busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))}
        >
          <Text style={styles.switch}>
            {mode === 'signin'
              ? 'Need an account? Create one'
              : 'Already have an account? Sign in'}
          </Text>
        </Pressable>
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
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkMuted,
    marginBottom: spacing.sm,
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
  primary: {
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  disabled: { opacity: 0.6 },
  primaryText: {
    fontFamily: typography.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  switch: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontFamily: typography.bodyMedium,
    fontSize: 14,
    color: colors.inkMuted,
  },
});
