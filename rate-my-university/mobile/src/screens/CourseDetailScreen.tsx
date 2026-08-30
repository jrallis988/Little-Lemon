import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

export function CourseDetailScreen({ route, navigation }: Props) {
  const { courseId, label } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        eyebrow="Course"
        title={label ?? 'Course'}
        subtitle="Workload, interest, organization, and grading fairness"
        onBack={() => navigation.goBack()}
      />
      <PrimaryButton
        label="Rate this course"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'course',
                targetId: courseId,
                targetLabel: label ?? 'Course',
              },
            },
          } as never)
        }
      />
      <AggregateReviews targetType="course" targetId={courseId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: spacing.xl * 2 },
});
