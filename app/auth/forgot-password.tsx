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
import {
  AppHeader,
  BioCrossButton,
  InfoCallout,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
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
            title="Reset password"
            subtitle="Enter the email for your BioCross account. We'll send a reset link when email is configured."
          />

          {sent ? (
            <InfoCallout
              tone="info"
              title="Check your email"
              body={`If an account exists for ${email.trim()}, a reset link would be sent. In this demo build, no email is delivered — use demo@biocross.app / demo1234 to sign in.`}
            />
          ) : (
            <>
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
              <BioCrossButton label="Send reset link" loading={loading} onPress={submit} />
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
