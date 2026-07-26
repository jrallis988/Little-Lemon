import { StyleSheet, Text, View } from 'react-native';

import { ThumbnailCard } from '@/components/editorial/ThumbnailCard';
import { colors, portalBox, spacing, fonts } from '@/constants/theme';
import type { Track } from '@/types/models';

type SidebarSection = {
  title: string;
  tracks: Track[];
};

type EditorialSidebarProps = {
  sections: SidebarSection[];
};

/**
 * Tight PureVolume sidebar modules — bordered boxes, table-density lists.
 */
export function EditorialSidebar({ sections }: EditorialSidebarProps) {
  return (
    <View style={styles.root}>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <View style={styles.table}>
            {section.tracks.map((track, index) => (
              <ThumbnailCard
                key={`${section.title}-${track.id}`}
                track={track}
                rank={index + 1}
                compact
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.sm,
  },
  section: {
    ...portalBox,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.accentLine,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontFamily: fonts.sans,
    fontSize: 9,
    letterSpacing: 0.8,
    color: colors.accentLine,
    textTransform: 'uppercase',
  },
  table: {
    backgroundColor: colors.backgroundElevated,
  },
});
