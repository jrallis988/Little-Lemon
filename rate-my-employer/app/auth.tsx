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
    router.replace(mode === 'register' ? '/verify-work' : '/(tabs)/explore');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.brand}>Rate My Employer</Text>
        <Text style={styles.title}>
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </Text>
        <Text style={styles.copy}>
          Sign in to contribute reviews and salary signals — or browse as a guest.
        </Text>

        {mode === 'register' ? (
          <TextInput
            style={styles.input}
            placeholder="Display name"
            placeholderTextColor={colors.inkSoft}
            value={displayName}
            onChangeText={setDisplayName}
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.inkSoft}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PrimaryButton
          label={busy ? 'Working…' : mode === 'signin' ? 'Sign In' : 'Register'}
          onPress={onSubmit}
          disabled={busy}
        />

        <Pressable onPress={() => setMode((m) => (m === 'signin' ? 'register' : 'signin'))}>
          <Text style={styles.switch}>
            {mode === 'signin' ? 'Need an account? Register' : 'Have an account? Sign In'}
          </Text>
        </Pressable>

        <View style={styles.oauthRow}>
          <Pressable
            style={styles.oauth}
            onPress={() => Alert.alert('Coming soon', 'Apple Sign In will plug in here.')}
          >
            <Ionicons name="logo-apple" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Apple</Text>
          </Pressable>
          <Pressable
            style={styles.oauth}
            onPress={() => Alert.alert('Coming soon', 'Google Sign In will plug in here.')}
          >
            <Ionicons name="logo-google" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Google</Text>
          </Pressable>
        </View>

        <PrimaryButton
          label="Continue as Guest"
          variant="ghost"
          onPress={async () => {
            await continueAsGuest();
            router.replace('/(tabs)/explore');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md },
  brand: {
    fontFamily: typography.displaySemi,
    fontSize: 16,
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
    marginBottom: spacing.xs,
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
    borderRadius: radii.sm,
    paddingVertical: 12,
  },
  oauthText: {
    fontFamily: typography.bodySemi,
    fontSize: 14,
    color: colors.ink,
  },
});
