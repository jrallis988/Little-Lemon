import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BioCrossButton, BioCrossLogo, InfoCallout, ScreenTitle } from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { formatAuthError, getDemoCredentials, useAuth } from '../../src/state/AuthContext';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const demo = getDemoCredentials();
  const [email, setEmail] = useState<string>(demo.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail(demo.email);
    setPassword(demo.password);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.logoWrap}>
            <BioCrossLogo size="md" />
          </View>
          <ScreenTitle
            title="Welcome back"
            subtitle="Sign in to access your health profile and safety checks."
          />

          {error ? (
            <InfoCallout tone="warning" title="Could not sign in" body={error} />
          ) : null}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.input}
              accessibilityLabel="Email address"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                textContentType="password"
                style={[styles.input, { flex: 1 }]}
                accessibilityLabel="Password"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                style={styles.showBtn}
              >
                <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
          </View>

          <BioCrossButton label="Sign In" loading={loading} onPress={submit} />
          <Pressable onPress={fillDemo} style={styles.demoLink} accessibilityRole="button">
            <Text style={styles.demoText}>Fill demo credentials</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/auth/sign-up')}
            style={styles.linkWrap}
            accessibilityRole="link"
          >
            <Text style={styles.linkText}>Create an account</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} style={styles.linkWrap} accessibilityRole="link">
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  logoWrap: { alignItems: 'center', marginVertical: spacing.lg },
  field: { marginBottom: spacing.md },
  label: {
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontSize: typography.size.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: typography.size.md,
    backgroundColor: colors.surface.card,
    color: colors.text.primary,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  showBtn: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  showText: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.sm },
  demoLink: { alignItems: 'center', marginTop: spacing.sm },
  demoText: { color: colors.text.tertiary, fontSize: typography.size.xs },
  linkWrap: { alignItems: 'center', marginTop: spacing.lg },
  linkText: { color: colors.brand.blue, fontWeight: '700' },
  backText: { color: colors.text.secondary },
});
