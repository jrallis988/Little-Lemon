import React, { useMemo } from 'react';
import { Alert, Platform, ScrollView, Share, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, BioCrossButton, InfoCallout, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function ExportDataScreen() {
  const router = useRouter();
  const { user, profile, checks, documents, preferences } = useBioCross();

  const payload = useMemo(
    () => ({
      exportedAt: new Date().toISOString(),
      user,
      profile,
      checks,
      documents: documents.map(({ id, fileName, uploadedAt, status }) => ({
        id,
        fileName,
        uploadedAt,
        status,
      })),
      preferences,
    }),
    [user, profile, checks, documents, preferences],
  );

  const json = useMemo(() => JSON.stringify(payload, null, 2), [payload]);

  const handleExport = async () => {
    try {
      if (Platform.OS === 'web') {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `biocross-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        await Share.share({ message: json, title: 'BioCross health data export' });
      }
    } catch {
      Alert.alert('Export failed', 'Could not export your data. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle
          title="Export health data"
          subtitle="Download a JSON copy of your profile, check history, and preferences."
        />
        <InfoCallout
          tone="privacy"
          body="Exports exclude raw uploaded file bytes in this demo. Production would offer encrypted archive download."
        />
        <Text style={styles.meta}>
          Includes {profile?.items.length ?? 0} profile items and {checks.length} checks.
        </Text>
        <BioCrossButton label="Export JSON" icon="download-outline" onPress={handleExport} />
        <BioCrossButton label="Cancel" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  meta: { color: colors.text.secondary, fontSize: typography.size.sm },
});
