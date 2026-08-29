import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, BioCrossButton, InfoCallout, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import { useAuth } from '../../src/state/AuthContext';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const confirmDelete = () => {
    Alert.alert(
      'Delete BioCross account?',
      'This permanently removes your account and health profile from this demo environment. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            await signOut();
            setLoading(false);
            router.replace('/onboarding/welcome');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <View style={styles.body}>
        <ScreenTitle
          title="Delete account"
          subtitle="Remove your BioCross account and associated health data from this device and demo server."
        />
        <InfoCallout
          tone="warning"
          title="Permanent action"
          body="Production deletion would remove server-side data within 30 days per privacy policy. Demo mode clears local and mock API state immediately."
        />
        <Text style={styles.note}>
          You may export your data first from Privacy & Security before deleting your account.
        </Text>
        <BioCrossButton label="Delete my account" variant="danger" loading={loading} onPress={confirmDelete} />
        <BioCrossButton label="Cancel" variant="ghost" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  note: { color: colors.text.secondary, fontSize: typography.size.sm, lineHeight: 20 },
});
