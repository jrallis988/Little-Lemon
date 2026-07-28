import { StyleSheet, Text, View } from 'react-native';

import { NewFindCard } from '@/components/discovery/NewFindCard';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import type { UserProfile } from '@/types/models';

type JustFoundPanelProps = {
  artists: UserProfile[];
  title?: string;
  lede?: string;
};

/**
 * Home / Find module for unsigned & brand-new bands —
 * the “saw them on YouTube once” discovery lane.
 */
export function JustFoundPanel({
  artists,
  title = 'JUST FOUND',
  lede = 'Unsigned bands, friend groups, brand-new uploads. The ones you’d stumble on and save.',
}: JustFoundPanelProps) {
  if (artists.length === 0) {
    return null;
  }

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.lede}>{lede}</Text>
        {artists.map((artist) => (
          <NewFindCard key={artist.id} artist={artist} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
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
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  body: {
    padding: spacing.sm,
    paddingBottom: 0,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
});
