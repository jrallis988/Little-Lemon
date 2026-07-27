import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import type { Track } from '@/types/models';

type ListeningListProps = {
  title?: string;
  tracks: Track[];
};

/**
 * Compact “everybody’s logging” rail — social heat without a player.
 */
export function ListeningList({
  title = "EVERYBODY'S LOGGING",
  tracks,
}: ListeningListProps) {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {tracks.map((track) => (
        <Link key={track.id} href={`/track/${track.id}`} asChild>
          <Pressable
            style={({ pressed }): StyleProp<ViewStyle> =>
              StyleSheet.flatten([styles.row, pressed && styles.pressed])
            }
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarMark}>
                {track.artistName.charAt(0)}
              </Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.song} numberOfLines={1}>
                {track.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {track.artistName}
              </Text>
            </View>
          </Pressable>
        </Link>
      ))}
      <View style={styles.footer}>
        <Text style={styles.footerLink}>View more songs →</Text>
      </View>
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMark: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  meta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  song: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  footer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    backgroundColor: colors.surface,
  },
  footerLink: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.link,
  },
});
