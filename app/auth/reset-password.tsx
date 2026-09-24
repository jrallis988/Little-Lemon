import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppHeader,
  BioCrossButton,
  InfoCallout,
  ScreenTitle,
} from '../../src/design-system';
import { biocrossApi } from '../../src/api';
import { formatAuthError } from '../../src/state/AuthContext';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ token?: string | string[] }>();
  const tokenFromLink = useMemo(() => firstParam(params.token).trim(), [params.token]);

  const [token, setToken] = useState(tokenFromLink);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (tokenFromLink) setToken(tokenFromLink);
  }, [tokenFromLink]);

  const submit = async () => {
    setError(null);
    if (!token.trim()) {
      setError('Reset token is required. Open the link from your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await biocrossApi.resetPassword(token.trim(), password);
      setDone(true);
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ScreenTitle
            title="Choose a new password"
            subtitle="Use the link from your reset email, then set a new password for your BioCross account."
          />

          {done ? (
            <InfoCallout
              tone="info"
              title="Password updated"
              body="You can sign in with your new password."
            />
          ) : (
            <>
              {!tokenFromLink ? (
                <View style={styles.field}>
                  <Text style={styles.label}>Reset token</Text>
                  <TextInput
                    value={token}
                    onChangeText={setToken}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    accessibilityLabel="Password reset token"
                  />
                </View>
              ) : null}

              <View style={styles.field}>
                <Text style={styles.label}>New password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  accessibilityLabel="New password"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry
                  style={styles.input}
                  accessibilityLabel="Confirm new password"
                />
              </View>

              {error ? (
                <InfoCallout tone="warning" title="Couldn’t reset password" body={error} />
              ) : null}

              <BioCrossButton label="Update password" loading={loading} onPress={submit} />
            </>
          )}

          <BioCrossButton
            label="Back to Sign In"
            variant="ghost"
            onPress={() => router.replace('/auth/sign-in')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  field: { marginBottom: spacing.sm },
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
});
