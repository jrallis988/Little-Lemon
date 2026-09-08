import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';
import type { UploadProgress } from '@/lib/artistUploads';

type UploadProgressBarProps = {
  progress: UploadProgress | null;
  error?: string | null;
};

export function UploadProgressBar({ progress, error }: UploadProgressBarProps) {
  if (!progress && !error) return null;

  const percent = progress?.percent;
  const busy =
    progress != null &&
    progress.phase !== 'idle' &&
    progress.phase !== 'done' &&
    progress.phase !== 'error';

  return (
    <View style={styles.wrap}>
      {busy ? (
        <View style={styles.row}>
          <ActivityIndicator color={colors.link} />
          <Text style={styles.message}>{progress?.message}</Text>
        </View>
      ) : null}
      {progress?.phase === 'done' ? (
        <Text style={styles.done}>{progress.message}</Text>
      ) : null}
      {typeof percent === 'number' ? (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.max(4, percent)}%` }]} />
        </View>
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  message: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    flex: 1,
  },
  done: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.success,
  },
  track: {
    height: 6,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.link,
  },
  error: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.danger,
    lineHeight: 18,
  },
});
