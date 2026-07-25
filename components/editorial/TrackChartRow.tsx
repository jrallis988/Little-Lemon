import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAudioStore } from '@/store/useAudioStore';
import { colors, spacing, typography } from '@/constants/theme';
import type { Track } from '@/types/models';

type TrackChartRowProps = {
  track: Track;
  rank: number;
  metric: 'downloads' | 'reposts';
};

/** Ranked chart row for Top Songs / Top Downloads tabs */
export function TrackChartRow({ track, rank, metric }: TrackChartRowProps) {
  const setTrack = useAudioStore((s) => s.setTrack);
  const value =
    metric === 'downloads' ? track.downloadCount : track.repostCount;
  const label = metric === 'downloads' ? 'DOWNLOADS' : 'REPOSTS';

  return (
    <View style={styles.row}>
      <Text style={styles.rank}>{String(rank).padStart(2, '0')}</Text>
      <Pressable style={styles.play} onPress={() => setTrack(track)} hitSlop={8}>
        <Text style={styles.playLabel}>▶</Text>
      </Pressable>
      <Link href={`/track/${track.id}`} asChild>
        <Pressable style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName} · {track.scene}
          </Text>
        </Pressable>
      </Link>
      <View style={styles.metric}>
        <Text style={styles.metricValue}>{value.toLocaleString()}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  rank: {
    ...typography.caption,
    color: colors.phosphorDim,
    width: 28,
  },
  play: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  playLabel: {
    ...typography.monoTiny,
    color: colors.phosphor,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.caption,
    color: colors.text,
  },
  artist: {
    ...typography.monoTiny,
    color: colors.textMuted,
  },
  metric: {
    alignItems: 'flex-end',
    gap: 2,
  },
  metricValue: {
    ...typography.caption,
    color: colors.copper,
  },
  metricLabel: {
    ...typography.monoTiny,
    color: colors.textDim,
    fontSize: 8,
  },
});
