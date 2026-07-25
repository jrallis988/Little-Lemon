import { StyleSheet, Text, View } from 'react-native';

import { ThumbnailCard } from '@/components/editorial/ThumbnailCard';
import { colors, spacing, typography } from '@/constants/theme';
import type { Track } from '@/types/models';

type SidebarSection = {
  title: string;
  tracks: Track[];
};

type EditorialSidebarProps = {
  sections: SidebarSection[];
};

/**
 * Secondary column: Editor's Picks / Trending / Recently Featured.
 * Stacks under the main feed on narrow viewports.
 */
export function EditorialSidebar({ sections }: EditorialSidebarProps) {
  return (
    <View style={styles.root}>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.tracks.map((track, index) => (
            <ThumbnailCard
              key={`${section.title}-${track.id}`}
              track={track}
              rank={index + 1}
              compact
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.lg,
  },
  section: {
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.phosphorDim,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.monoTiny,
    color: colors.phosphor,
    letterSpacing: 1.5,
  },
});
