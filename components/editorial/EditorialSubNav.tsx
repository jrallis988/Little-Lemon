import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

export const EDITORIAL_TABS = [
  'Featured',
  'New Artists',
  'Top Songs',
  'Top Downloads',
  'Browse Artists',
  'Past Features',
  'Albums',
] as const;

export type EditorialTab = (typeof EDITORIAL_TABS)[number];

type EditorialSubNavProps = {
  active: EditorialTab;
  onChange: (tab: EditorialTab) => void;
};

/**
 * PureVolume secondary toolbar — light gray segmented tabs under black header.
 */
export function EditorialSubNav({ active, onChange }: EditorialSubNavProps) {
  return (
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
                  if (tab === 'New Artists') {
                    router.push('/(main)/explore');
                    return;
                  }
                  if (tab === 'Past Features' || tab === 'Albums') {
                    onChange('Featured');
                    return;
                  }
                  onChange(tab);
                }}
                style={[styles.tab, isActive && styles.tabActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
              {!isLast ? <View style={styles.divider} /> : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.toolbarEdge,
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
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: colors.toolbar,
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.toolbarActive,
    borderTopWidth: 2,
    borderTopColor: colors.link,
  },
  tabText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.text,
    fontFamily: fonts.sansBold,
  },
  divider: {
    width: 1,
    backgroundColor: colors.toolbarEdge,
  },
});
