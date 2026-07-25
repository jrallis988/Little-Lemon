import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAudioStore } from '@/store/useAudioStore';
import { colors, spacing } from '@/constants/theme';
import type { Track } from '@/types/models';

type TrackChartRowProps = {
  track: Track;
  rank: number;
  metric: 'downloads' | 'reposts';
};

/** Ranked chart row — sharp portal table cells */
export function TrackChartRow({ track, rank, metric }: TrackChartRowProps) {
  const setTrack = useAudioStore((s) => s.setTrack);
  const value =
    metric === 'downloads' ? track.downloadCount : track.repostCount;
  const label = metric === 'downloads' ? 'DL' : 'RP';

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
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.border,
    backgroundColor: colors.backgroundElevated,
  },
  rank: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.3,
    color: colors.phosphorDim,
    width: 22,
  },
  play: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 0,
  },
  playLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    color: colors.accentLine,
  },
  meta: {
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'uppercase',
  },
  artist: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.2,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  metric: {
    alignItems: 'flex-end',
    gap: 1,
    minWidth: 48,
  },
  metricValue: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.2,
    color: colors.copper,
  },
  metricLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
});
