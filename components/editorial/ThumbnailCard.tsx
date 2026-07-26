import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';
import type { Track } from '@/types/models';

type ThumbnailCardProps = {
  track: Track;
  rank?: number;
  compact?: boolean;
};

/**
 * Compact PureVolume chart/list row — tiny square thumb + table metadata.
 */
export function ThumbnailCard({ track, rank, compact = false }: ThumbnailCardProps) {
  return (
    <Link href={`/track/${track.id}`} asChild>
      <Pressable
        style={({ pressed }) =>
          StyleSheet.flatten([styles.row, pressed && styles.pressed])
        }
      >
        {rank != null ? (
          <Text style={styles.rank}>{String(rank).padStart(2, '0')}</Text>
        ) : null}
        <View style={[styles.thumb, compact && styles.thumbCompact]}>
          <Text style={styles.thumbMark}>■</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
          </Text>
        </View>
        <View style={styles.metrics}>
          <Text style={styles.metricPrimary}>
            {track.downloadCount.toLocaleString()} DL
          </Text>
          <Text style={styles.metricSecondary}>
            {track.repostCount.toLocaleString()} RP
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundElevated,
  },
  pressed: {
    backgroundColor: colors.toolbarActive,
  },
  rank: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 0.3,
    color: colors.textDim,
    width: 16,
    textAlign: 'right',
  },
  thumb: {
    width: 28,
    height: 28,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCompact: {
    width: 24,
    height: 24,
  },
  thumbMark: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    color: colors.phosphorDim,
  },
  meta: {
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.2,
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
  metrics: {
    alignItems: 'flex-end',
    gap: 1,
  },
  metricPrimary: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.3,
    color: colors.copper,
    textTransform: 'uppercase',
  },
  metricSecondary: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.3,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
});
