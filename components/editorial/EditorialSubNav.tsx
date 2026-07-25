import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';

export const EDITORIAL_TABS = [
  'Featured',
  'Top Songs',
  'Top Downloads',
  'Browse Artists',
] as const;

export type EditorialTab = (typeof EDITORIAL_TABS)[number];

type EditorialSubNavProps = {
  active: EditorialTab;
  onChange: (tab: EditorialTab) => void;
};

/**
 * Classic PureVolume secondary nav under the hero:
 * Featured · Top Songs · Top Downloads · Browse Artists
 */
export function EditorialSubNav({ active, onChange }: EditorialSubNavProps) {
  return (
    <View style={styles.bar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {EDITORIAL_TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <Pressable
              key={tab}
              onPress={() => onChange(tab)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.backgroundElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  row: {
    paddingHorizontal: spacing.sm,
    gap: 0,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparent,
  },
  tabActive: {
    borderBottomColor: colors.phosphor,
  },
  tabText: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 1,
  },
  tabTextActive: {
    color: colors.phosphor,
  },
});
