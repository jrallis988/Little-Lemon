import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BioCrossButton, InfoCallout, ScreenTitle } from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { formatAuthError, useAuth } from '../../src/state/AuthContext';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, fullName);
      router.replace('/onboarding/create-profile');
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ScreenTitle
            title="Create your account"
            subtitle="Your health profile stays private and is used only for personalized supplement safety checks."
          />

          {error ? <InfoCallout tone="warning" title="Could not create account" body={error} /> : null}

          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              style={styles.input}
              accessibilityLabel="Full name"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              accessibilityLabel="Email address"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              accessibilityLabel="Password"
            />
            <Text style={styles.hint}>At least 8 characters</Text>
          </View>

          <BioCrossButton label="Create Account" loading={loading} onPress={submit} />
          <BioCrossButton label="Back to Sign In" variant="ghost" onPress={() => router.back()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
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
  hint: { marginTop: 4, color: colors.text.tertiary, fontSize: typography.size.xs },
});
