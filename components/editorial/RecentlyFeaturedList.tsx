import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
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
            <Pressable
              style={({ pressed }): StyleProp<ViewStyle> =>
                StyleSheet.flatten([styles.row, pressed && styles.pressed])
              }
            >
              <ArtworkImage
                uri={track.artworkUrl}
                label={track.title}
                monogram={track.artistName}
                style={styles.thumb}
              />
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
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: colors.surface,
  },
  pressed: {
    backgroundColor: colors.backgroundElevated,
  },
  thumb: {
    width: 40,
    height: 40,
  },
  meta: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
});
