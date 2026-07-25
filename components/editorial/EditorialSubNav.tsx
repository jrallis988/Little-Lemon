import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

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
 * Classic PureVolume portal toolbar.
 * "Browse Artists" routes to the dedicated alphabetical directory.
 */
export function EditorialSubNav({ active, onChange }: EditorialSubNavProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {EDITORIAL_TABS.map((tab, index) => {
            const isActive = tab === active;
            const isLast = index === EDITORIAL_TABS.length - 1;
            return (
              <View key={tab} style={styles.tabCell}>
                <Pressable
                  onPress={() => {
                    if (tab === 'Browse Artists') {
                      router.push('/(main)/artists');
                      return;
                    }
                    onChange(tab);
                  }}
                  style={[styles.tab, isActive && styles.tabActive]}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab.toUpperCase()}
                  </Text>
                </Pressable>
                {!isLast ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.background,
  },
  bar: {
    backgroundColor: colors.toolbar,
    borderWidth: 1,
    borderColor: colors.toolbarEdge,
    borderRadius: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tabCell: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    backgroundColor: colors.toolbar,
    borderRadius: 0,
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.toolbarActive,
    borderBottomWidth: 2,
    borderBottomColor: colors.accentLine,
  },
  tabText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 0.8,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    color: colors.accentLine,
  },
  divider: {
    width: 1,
    backgroundColor: colors.toolbarEdge,
  },
});
