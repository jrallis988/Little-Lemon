import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { colors, fonts, spacing } from '@/constants/theme';
import type { Track } from '@/types/models';

type TrackListingProps = {
  track: Track;
  /** Optional rank for chart-style lists */
  rank?: number;
};

/**
 * Discovery-focused track row — title, artist, downloads/reposts.
 * No playback controls; StaticVolume is not a music player.
 */
export function TrackListing({ track, rank }: TrackListingProps) {
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
        <ArtworkImage
          uri={track.artworkUrl}
          label={track.title}
          monogram={track.artistName}
          style={styles.thumb}
        />
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
            {track.scene ? ` · ${track.scene}` : ''}
          </Text>
        </View>
        <View style={styles.metrics}>
          <Text style={styles.metricValue}>
            {track.downloadCount.toLocaleString()}
          </Text>
          <Text style={styles.metricLabel}>Downloads</Text>
          <Text style={styles.metricSecondary}>
            {track.repostCount.toLocaleString()} reposts
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
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.surface,
  },
  pressed: {
    backgroundColor: colors.backgroundElevated,
  },
  rank: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    width: 22,
  },
  thumb: {
    width: 44,
    height: 44,
  },
  meta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  metrics: {
    alignItems: 'flex-end',
    gap: 1,
    minWidth: 72,
  },
  metricValue: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  metricLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textDim,
  },
  metricSecondary: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textMuted,
  },
});
