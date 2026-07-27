import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import type { UserProfile } from '@/types/models';

type DirectoryArtistRowProps = {
  artist: UserProfile;
  downloadCount: number;
};

/**
 * Alphabetical directory row — genre tags + raw download metric.
 */
export function DirectoryArtistRow({
  artist,
  downloadCount,
}: DirectoryArtistRowProps) {
  const tags = artist.genreTags?.length
    ? artist.genreTags
    : artist.scene
      ? [artist.scene]
      : [];

  return (
    <Link href={`/artist/${artist.id}`} asChild>
      <Pressable
        style={({ pressed }) =>
          StyleSheet.flatten([styles.row, pressed && styles.pressed])
        }
      >
        <View style={styles.thumb}>
          <Text style={styles.thumbMark}>
            {artist.displayName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {artist.displayName}
            </Text>
            {artist.status === 'UNSIGNED' ? (
              <Text style={styles.unsigned}>UNSIGNED</Text>
            ) : artist.catalogKind === 'catalog' ? (
              <Text style={styles.catalog}>CATALOG</Text>
            ) : null}
          </View>
          <Text style={styles.origin} numberOfLines={1}>
            {artist.geography ?? 'ORIGIN: N/A'}
          </Text>
          {artist.lineupNote ? (
            <Text style={styles.lineup} numberOfLines={1}>
              {artist.lineupNote}
            </Text>
          ) : null}
          <View style={styles.tags}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>DOWNLOADS</Text>
          <Text style={styles.metricValue}>{downloadCount.toLocaleString()}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.backgroundElevated,
  },
  pressed: {
    backgroundColor: colors.toolbarActive,
  },
  thumb: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbMark: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.phosphorDim,
  },
  meta: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  unsigned: {
    fontFamily: fonts.sansBold,
    fontSize: 8,
    letterSpacing: 0.4,
    color: colors.link,
  },
  catalog: {
    fontFamily: fonts.sansBold,
    fontSize: 8,
    letterSpacing: 0.4,
    color: colors.textMuted,
  },
  origin: {
    fontFamily: fonts.sans,
    fontSize: 8,
    letterSpacing: 0.3,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  lineup: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textMuted,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  tagText: {
    fontFamily: fonts.sans,
    fontSize: 8,
    letterSpacing: 0.4,
    color: colors.phosphorDim,
    textTransform: 'uppercase',
  },
  metric: {
    alignItems: 'flex-end',
    gap: 2,
    minWidth: 64,
  },
  metricLabel: {
    fontFamily: fonts.sans,
    fontSize: 7,
    letterSpacing: 0.5,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.phosphor,
  },
});
