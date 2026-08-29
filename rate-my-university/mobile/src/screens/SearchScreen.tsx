import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { LayeredSearch } from '../components/LayeredSearch';
import { colors, spacing, typography } from '../constants/theme';
import type { DirectorySearchResult } from '../types';

export function SearchScreen() {
  const onSelect = (result: DirectorySearchResult) => {
    Alert.alert(result.label, `${result.kind}${result.subtitle ? ` · ${result.subtitle}` : ''}`);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Directory</Text>
      <Text style={styles.sub}>
        Drill the hierarchy: University → Department → Professor, Course, or Dorm.
      </Text>
      <LayeredSearch onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.navy,
  },
  sub: {
    ...typography.caption,
    color: colors.slate,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
});
