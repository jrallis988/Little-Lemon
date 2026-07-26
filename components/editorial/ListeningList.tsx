import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, portalBox, spacing } from '@/constants/theme';
import type { Track } from '@/types/models';

type ListeningListProps = {
  title?: string;
  tracks: Track[];
};

/**
 * PureVolume "Everybody's Listening" / chart-style compact list.
 */
export function ListeningList({
  title = "EVERYBODY'S LISTENING",
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
    fontFamily: 'SpaceMono',
    fontSize: 12,
    color: colors.phosphor,
  },
  meta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  song: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: colors.phosphor,
  },
  artist: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: colors.textMuted,
  },
  footer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  footerLink: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: colors.phosphorDim,
  },
});
