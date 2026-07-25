import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/constants/theme';
import type { Track } from '@/types/models';

type ThumbnailCardProps = {
  track: Track;
  rank?: number;
  compact?: boolean;
};

/**
 * Dense PureVolume-style chart / pick row — small media frame + meta.
 * Not a floating card; hairline dividers only.
 */
export function ThumbnailCard({ track, rank, compact = false }: ThumbnailCardProps) {
  return (
    <Link href={`/track/${track.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        {rank != null ? <Text style={styles.rank}>{rank}</Text> : null}
        <View style={[styles.thumb, compact && styles.thumbCompact]}>
          <Text style={styles.thumbMark}>SV</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
          </Text>
          <Text style={styles.stat}>
            {track.downloadCount.toLocaleString()} dl · {track.repostCount.toLocaleString()} rp
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
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  pressed: {
    opacity: 0.8,
  },
  rank: {
    ...typography.monoTiny,
    color: colors.phosphorDim,
    width: 18,
    textAlign: 'right',
  },
  thumb: {
    width: 44,
    height: 44,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.media,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCompact: {
    width: 36,
    height: 36,
  },
  thumbMark: {
    ...typography.monoTiny,
    color: colors.phosphorDim,
    fontSize: 8,
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
  stat: {
    ...typography.monoTiny,
    color: colors.copper,
    fontSize: 9,
  },
});
