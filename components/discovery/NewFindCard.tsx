import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { firstTrackForArtist, isBrandNew } from '@/lib/demoData';
import type { UserProfile } from '@/types/models';

type NewFindCardProps = {
  artist: UserProfile;
};

/** Stumble-upon artist card — unsigned / brand-new friend-group energy. */
export function NewFindCard({ artist }: NewFindCardProps) {
  const track = firstTrackForArtist(artist.id);
  const brandNew = isBrandNew(artist);
  const status = artist.status ?? 'UNSIGNED';
  const href = (track ? `/track/${track.id}` : `/artist/${artist.id}`) as Href;
  const art = artist.avatarUrl || track?.artworkUrl;

  return (
    <Link href={href} asChild>
      <Pressable
        style={({ pressed }) =>
          StyleSheet.flatten([styles.card, pressed && styles.pressed])
        }
      >
        <ArtworkImage
          uri={art}
          label={artist.displayName}
          monogram={artist.displayName}
          style={styles.thumb}
        />
        <View style={styles.meta}>
          <View style={styles.badges}>
            <Text style={styles.badge}>{status}</Text>
            {brandNew ? <Text style={styles.badgeNew}>New on SV</Text> : null}
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {artist.displayName}
          </Text>
          <Text style={styles.place} numberOfLines={1}>
            {[artist.scene, artist.geography].filter(Boolean).join(' · ')}
          </Text>
          {artist.lineupNote ? (
            <Text style={styles.lineup} numberOfLines={2}>
              {artist.lineupNote}
            </Text>
          ) : null}
          {track ? (
            <Text style={styles.track} numberOfLines={1}>
              Start with “{track.title}”
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    ...portalBox,
    flexDirection: 'row',
    gap: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  pressed: {
    backgroundColor: colors.backgroundElevated,
  },
  thumb: {
    width: 72,
    height: 72,
  },
  meta: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  badgeNew: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.link,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.text,
  },
  place: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  lineup: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    marginTop: 2,
  },
  track: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.link,
    marginTop: 2,
  },
});
