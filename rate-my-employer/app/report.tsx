import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip, PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import type { ContentReport, ReportReason } from '../src/types';
import { colors, radii, spacing, typography } from '../src/theme';

const REASONS: { key: ReportReason; label: string }[] = [
  { key: 'spam', label: 'Spam or advertising' },
  { key: 'harassment', label: 'Harassment or hate' },
  { key: 'fake', label: 'Fake or misleading' },
  { key: 'privacy', label: 'Privacy / personal info' },
  { key: 'other', label: 'Other' },
];

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    targetType?: string;
    targetId?: string;
  }>();
  const { submitReport } = useApp();
  const [reason, setReason] = useState<ReportReason>('spam');
  const [details, setDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const targetType = (params.targetType as ContentReport['targetType'] | undefined) ?? 'other';
  const targetId = params.targetId ?? 'unspecified';

  const onSubmit = async () => {
    setBusy(true);
    setError(null);
    const result = await submitReport({
      targetType,
      targetId,
      reason,
      details,
    });
    setBusy(false);
    if (result) {
      setError(result);
      return;
    }
    setDone(true);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Report content' }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {done ? (
          <>
            <Text style={styles.title}>Report received</Text>
            <Text style={styles.copy}>
              Thanks. Our moderation queue will review this report. We do not share your identity
              with the reported party.
            </Text>
            <PrimaryButton label="Done" onPress={() => router.back()} />
          </>
        ) : (
          <>
            <Text style={styles.title}>Report content</Text>
            <Text style={styles.copy}>
              Tell us what breaks community guidelines. Reports stay private to moderators.
            </Text>
            {params.targetId ? (
              <Text style={styles.meta}>
                Reporting {targetType} · {targetId}
              </Text>
            ) : (
              <Text style={styles.meta}>General report (no specific post selected).</Text>
            )}

            <Text style={styles.section}>Reason</Text>
            <View style={styles.wrap}>
              {REASONS.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  active={reason === item.key}
                  onPress={() => setReason(item.key)}
                />
              ))}
            </View>

            <Text style={styles.section}>Details (optional)</Text>
            <TextInput
              style={[styles.input, styles.area]}
              value={details}
              onChangeText={setDetails}
              placeholder="What should moderators know?"
              placeholderTextColor={colors.inkSoft}
              multiline
              textAlignVertical="top"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <PrimaryButton
              label={busy ? 'Submitting…' : 'Submit report'}
              onPress={onSubmit}
              disabled={busy}
            />
            <PrimaryButton label="Cancel" variant="ghost" onPress={() => router.back()} />
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  meta: { fontFamily: typography.bodyMedium, fontSize: 13, color: colors.inkSoft },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.ink,
  },
  area: { minHeight: 120 },
  error: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.danger },
});
