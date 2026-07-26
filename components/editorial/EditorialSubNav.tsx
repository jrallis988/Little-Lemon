import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

export const EDITORIAL_TABS = [
  'Featured',
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
 * PureVolume secondary toolbar — full-bleed segmented tabs under the header.
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
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
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
    paddingVertical: 12,
    backgroundColor: colors.surfaceRaised,
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.backgroundElevated,
    borderTopWidth: 2,
    borderTopColor: colors.phosphor,
  },
  tabText: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.2,
    color: colors.textDim,
  },
  tabTextActive: {
    color: colors.text,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
});
