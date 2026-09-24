import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { requestPasswordReset, resetPassword } = useApp();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [issuedToken, setIssuedToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [busy, setBusy] = useState(false);

  const onRequest = async () => {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await requestPasswordReset(email.trim().toLowerCase());
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage(result.message ?? 'Check your email for a reset code.');
    if (result.resetToken) {
      setIssuedToken(result.resetToken);
      setToken(result.resetToken);
    }
    setStep('reset');
  };

  const onReset = async () => {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await resetPassword({
      email: email.trim().toLowerCase(),
      token: token.trim(),
      password,
    });
    setBusy(false);
    if (result) {
      setError(result);
      return;
    }
    setMessage('Password updated. You can sign in now.');
    setTimeout(() => router.replace('/auth'), 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.brand}>RME</Text>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.copy}>
          {step === 'request'
            ? 'Enter your account email. In development, a reset code is shown here.'
            : 'Enter the reset code and choose a new password.'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.inkSoft}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={step === 'request'}
        />

        {step === 'reset' ? (
          <>
            {issuedToken ? (
              <Text style={styles.devToken}>Dev reset code: {issuedToken}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Reset code"
              placeholderTextColor={colors.inkSoft}
              autoCapitalize="none"
              value={token}
              onChangeText={setToken}
            />
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor={colors.inkSoft}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}

        <PrimaryButton
          label={
            busy
              ? 'Working…'
              : step === 'request'
                ? 'Send reset code'
                : 'Update password'
          }
          onPress={step === 'request' ? onRequest : onReset}
          disabled={busy}
        />
        <PrimaryButton label="Back to sign in" variant="ghost" onPress={() => router.replace('/auth')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, gap: spacing.md },
  brand: { fontFamily: typography.bodyBold, fontSize: 16, color: colors.navy },
  title: { fontFamily: typography.display, fontSize: 30, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
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
  devToken: {
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    color: colors.blue,
    backgroundColor: colors.blueSoft,
    padding: spacing.md,
    borderRadius: radii.md,
  },
  error: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.danger },
  success: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.success },
});
