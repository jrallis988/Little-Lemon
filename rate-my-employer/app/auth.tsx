import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { DEMO_ACCOUNT } from '../src/data/demo';
import { colors, radii, spacing, typography } from '../src/theme';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp, signInDemo, continueAsGuest } = useApp();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const emailRef = useRef(email);
  const passwordRef = useRef(password);
  const displayNameRef = useRef(displayName);
  const usernameRef = useRef(username);
  emailRef.current = email;
  passwordRef.current = password;
  displayNameRef.current = displayName;
  usernameRef.current = username;

  const finish = () => router.replace('/(tabs)/home');

  const onSubmit = async () => {
    setBusy(true);
    setError(null);
    const payload = {
      email: emailRef.current.trim(),
      password: passwordRef.current,
      displayName: displayNameRef.current,
      username: usernameRef.current,
    };
    const result =
      mode === 'signin'
        ? await signIn({ email: payload.email, password: payload.password })
        : await signUp(payload);
    setBusy(false);
    if (result) {
      setError(result);
      return;
    }
    finish();
  };

  const enterDemo = async () => {
    setBusy(true);
    setError(null);
    const result = await signInDemo();
    setBusy(false);
    if (result) {
      setError(result);
      return;
    }
    finish();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>RME</Text>
        <View style={styles.demoBanner}>
          <Text style={styles.demoBannerTitle}>Portfolio demo</Text>
          <Text style={styles.demoBannerCopy}>
            Not a live product. Tap Try demo to explore signed-in reviews as {DEMO_ACCOUNT.displayName}.
          </Text>
        </View>
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
          autoComplete="email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.inkSoft}
          secureTextEntry
          autoComplete={mode === 'signin' ? 'password' : 'new-password'}
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {mode === 'signin' ? (
          <Pressable onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>
        ) : null}

        <PrimaryButton
          label={busy ? 'Working…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          onPress={onSubmit}
          disabled={busy}
        />

        <PrimaryButton
          label={busy ? 'Working…' : 'Try demo account'}
          variant="secondary"
          disabled={busy}
          onPress={enterDemo}
        />

        <Pressable
          onPress={() => {
            setMode((m) => (m === 'signin' ? 'register' : 'signin'));
            setError(null);
          }}
        >
          <Text style={styles.switch}>
            {mode === 'signin' ? 'Need an account? Create Account' : 'Have an account? Sign In'}
          </Text>
        </Pressable>

        <View style={styles.oauthRow}>
          <Pressable style={styles.oauth} onPress={enterDemo} disabled={busy}>
            <Ionicons name="logo-apple" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Apple</Text>
          </Pressable>
          <Pressable style={styles.oauth} onPress={enterDemo} disabled={busy}>
            <Ionicons name="logo-google" size={18} color={colors.ink} />
            <Text style={styles.oauthText}>Google</Text>
          </Pressable>
        </View>
        <Text style={styles.oauthHint}>Apple & Google are simulated in this demo.</Text>

        <PrimaryButton
          label="Continue as Guest"
          variant="ghost"
          onPress={async () => {
            await continueAsGuest();
            finish();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  brand: { fontFamily: typography.bodyBold, fontSize: 16, color: colors.navy },
  demoBanner: {
    backgroundColor: colors.navy,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: 4,
  },
  demoBannerTitle: {
    fontFamily: typography.bodyBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: '#8EB4FF',
  },
  demoBannerCopy: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
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
  error: {
    fontFamily: typography.bodyMedium,
    fontSize: 14,
    color: colors.danger,
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
  oauthHint: {
    textAlign: 'center',
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
});
