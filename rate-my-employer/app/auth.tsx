import { Ionicons } from '@expo/vector-icons';
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

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp, continueAsGuest } = useApp();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const error =
      mode === 'signin'
        ? await signIn({ email, password })
        : await signUp({ email, password, displayName, username });
    setBusy(false);
    if (error) {
      Alert.alert('Account', error);
      return;
    }
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.brand}>RME</Text>
        <Text style={styles.title}>
          {mode === 'signin' ? 'Welcome back!' : 'Create Account'}
        </Text>
        <Text style={styles.copy}>
          {mode === 'signin'
            ? 'Sign in to share experiences and save employers.'
            : 'Join to post reviews, interviews, and salary signals.'}
        </Text>

        {mode === 'register' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Display name"
              placeholderTextColor={colors.inkSoft}
              value={displayName}
              onChangeText={setDisplayName}
            />
            <TextInput
              style={styles.input}
              placeholder="Username (e.g. PurpleBunny75)"
              placeholderTextColor={colors.inkSoft}
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.inkSoft}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.inkSoft}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {mode === 'signin' ? (
          <Pressable onPress={() => Alert.alert('Reset', 'Password reset will plug in here.')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>
        ) : null}

        <PrimaryButton
          label={busy ? 'Working…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          onPress={onSubmit}
          disabled={busy}
        />

        <Pressable onPress={() => setMode((m) => (m === 'signin' ? 'register' : 'signin'))}>
          <Text style={styles.switch}>
            {mode === 'signin' ? 'Need an account? Create Account' : 'Have an account? Sign In'}
          </Text>
        </Pressable>

        <View style={styles.oauthRow}>
          <Pressable style={styles.oauth} onPress={() => Alert.alert('Coming soon', 'Apple Sign In')}>
            <Ionicons name="logo-apple" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Apple</Text>
          </Pressable>
          <Pressable style={styles.oauth} onPress={() => Alert.alert('Coming soon', 'Google Sign In')}>
            <Ionicons name="logo-google" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Google</Text>
          </Pressable>
        </View>

        <PrimaryButton
          label="Continue as Guest"
          variant="ghost"
          onPress={async () => {
            await continueAsGuest();
            router.replace('/(tabs)/home');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md },
  brand: { fontFamily: typography.bodyBold, fontSize: 16, color: colors.navy },
  title: { fontFamily: typography.display, fontSize: 30, color: colors.ink },
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
  forgot: {
    alignSelf: 'flex-end',
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    color: colors.blue,
  },
  switch: {
    textAlign: 'center',
    fontFamily: typography.bodyMedium,
    fontSize: 14,
    color: colors.inkMuted,
  },
  oauthRow: { flexDirection: 'row', gap: spacing.sm },
  oauth: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 12,
  },
  oauthText: { fontFamily: typography.bodySemi, fontSize: 14, color: colors.ink },
});
