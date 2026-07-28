import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/social/RatingStars';
import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { getTrackById } from '@/lib/demoData';
import type { ActivityItem } from '@/types/models';

type ActivityEntryProps = {
  item: ActivityItem;
};

function formatDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function actionLabel(item: ActivityItem): string {
  if (item.kind === 'reviewed') return 'reviewed';
  if (item.kind === 'listed') return `added to “${item.listTitle ?? 'a list'}”`;
  return 'logged';
}

/**
 * Letterboxd-style activity row — person + action + track, no playback.
 */
export function ActivityEntry({ item }: ActivityEntryProps) {
  const track = getTrackById(item.trackId);

  if (!track) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.who}>
          <Text style={styles.name}>{item.displayName}</Text>
          {' '}
          {actionLabel(item)}
        </Text>
        <Text style={styles.when}>{formatDay(item.createdAt)}</Text>
      </View>

      <Link href={`/track/${track.id}`} asChild>
        <Pressable
          style={({ pressed }) =>
            StyleSheet.flatten([styles.trackRow, pressed && styles.pressed])
          }
        >
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
            </Text>
            <RatingStars value={item.rating} />
          </View>
        </Pressable>
      </Link>

      {item.excerpt ? (
        <Text style={styles.excerpt} numberOfLines={3}>
          {item.excerpt}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...portalBox,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  who: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    flex: 1,
  },
  name: {
    fontFamily: fonts.sansBold,
    color: colors.link,
  },
  when: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  trackRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  thumb: {
    width: 48,
    height: 48,
  },
  meta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.text,
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  excerpt: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 8,
  },
});
