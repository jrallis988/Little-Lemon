import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, portalBox, spacing } from '@/constants/theme';
import { getArtistById } from '@/lib/demoData';
import type { Track } from '@/types/models';

type RecentlyFeaturedListProps = {
  tracks: Track[];
};

/**
 * PureVolume right-rail "Recently Featured" thumbnail stack.
 */
export function RecentlyFeaturedList({ tracks }: RecentlyFeaturedListProps) {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RECENTLY FEATURED</Text>
      </View>
      {tracks.map((track) => {
        const artist = getArtistById(track.artistId);
        return (
          <Link key={track.id} href={`/artist/${track.artistId}`} asChild>
            <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
              <View style={styles.thumb}>
                <Text style={styles.thumbMark}>
                  {track.artistName.charAt(0)}
                </Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.name} numberOfLines={1}>
                  {track.artistName}
                </Text>
                <Text style={styles.sub} numberOfLines={1}>
                  From {artist?.geography ?? track.geography ?? 'Unknown'}
                </Text>
              </View>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...portalBox,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  headerText: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.text,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  pressed: {
    backgroundColor: colors.toolbarActive,
  },
  thumb: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbMark: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    color: colors.phosphorDim,
  },
  meta: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  name: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
  },
  sub: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: colors.textMuted,
  },
});
