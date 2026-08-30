import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { LayeredSearch } from '../components/LayeredSearch';
import { colors, spacing, typography } from '../constants/theme';
import type {
  DirectorySearchResult,
  RootStackParamList,
  RootTabParamList,
} from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function SearchScreen({ navigation }: Props) {
  const onSelect = (result: DirectorySearchResult) => {
    switch (result.kind) {
      case 'university':
        navigation.navigate('UniversityDetail', {
          universityId: result.id,
          name: result.label,
        });
        break;
      case 'department':
        navigation.navigate('DepartmentDetail', {
          departmentId: result.id,
          name: result.label,
          universityId: result.university_id ?? undefined,
        });
        break;
      case 'professor':
        navigation.navigate('ProfessorDetail', {
          professorId: result.id,
          name: result.label,
        });
        break;
      case 'course':
        navigation.navigate('CourseDetail', {
          courseId: result.id,
          label: result.label,
        });
        break;
      case 'dorm':
        navigation.navigate('DormDetail', {
          dormId: result.id,
          name: result.label,
        });
        break;
    }
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
