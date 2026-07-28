import { StyleSheet, Text, View } from 'react-native';

import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { getTrackById } from '@/lib/demoData';
import type { TasteList } from '@/types/models';

type ListCardProps = {
  list: TasteList;
};

/** Curated track list preview — Letterboxd lists, music edition. */
export function ListCard({ list }: ListCardProps) {
  const tracks = list.trackIds
    .map((id) => getTrackById(id))
    .filter((t): t is NonNullable<typeof t> => t != null)
    .slice(0, 4);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{list.title}</Text>
      <Text style={styles.by}>
        by <Text style={styles.name}>{list.displayName}</Text>
        {list.ranked ? ' · ranked' : ''}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {list.description}
      </Text>
      <View style={styles.thumbs}>
        {tracks.map((track) => (
          <ArtworkImage
            key={track.id}
            uri={track.artworkUrl}
            label={track.title}
            monogram={track.artistName}
            style={styles.thumb}
          />
        ))}
        <Text style={styles.count}>{list.trackIds.length} tracks</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...portalBox,
    padding: spacing.sm,
    gap: 4,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.text,
  },
  by: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  name: {
    color: colors.link,
    fontFamily: fonts.sansBold,
  },
  desc: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: 2,
  },
  thumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  thumb: {
    width: 36,
    height: 36,
  },
  count: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    marginLeft: 4,
  },
});
