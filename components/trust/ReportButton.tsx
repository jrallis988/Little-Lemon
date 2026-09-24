import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import {
  REPORT_REASONS,
  submitContentReport,
  type ReportReason,
  type ReportTargetKind,
} from '@/lib/reportsApi';

type ReportButtonProps = {
  targetKind: ReportTargetKind;
  targetId: string;
  label?: string;
};

/**
 * Lightweight report / takedown request control.
 */
export function ReportButton({
  targetKind,
  targetId,
  label = 'Report',
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>('copyright');
  const [details, setDetails] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await submitContentReport({
        targetKind,
        targetId,
        reason,
        details,
      });
      setMessage('Report submitted. Our team will review it.');
      setDetails('');
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit report.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => setOpen((v) => !v)}>
        <Text style={styles.link}>{open ? 'Cancel report' : label}</Text>
      </Pressable>
      {message ? <Text style={styles.ok}>{message}</Text> : null}
      {open ? (
        <View style={styles.form}>
          <Text style={styles.label}>Reason</Text>
          <View style={styles.reasons}>
            {REPORT_REASONS.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.chip, reason === item.id && styles.chipOn]}
                onPress={() => setReason(item.id)}
              >
                <Text
                  style={[styles.chipText, reason === item.id && styles.chipTextOn]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            value={details}
            onChangeText={setDetails}
            placeholder="Details (required for copyright / other)"
            placeholderTextColor={colors.textDim}
            multiline
            style={styles.input}
          />
          <Pressable style={styles.submit} onPress={() => void onSubmit()} disabled={busy}>
            <Text style={styles.submitText}>
              {busy ? 'Sending…' : 'Submit report'}
            </Text>
          </Pressable>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  link: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.textDim,
    textDecorationLine: 'underline',
  },
  ok: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.success,
  },
  form: {
    ...portalBox,
    padding: spacing.sm,
    gap: 8,
  },
  label: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  reasons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  chipOn: {
    borderColor: colors.link,
    backgroundColor: colors.link,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.text,
  },
  chipTextOn: {
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 72,
    padding: 8,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.text,
    textAlignVertical: 'top',
  },
  submit: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  error: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.danger,
  },
});
