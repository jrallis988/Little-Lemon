import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { api } from '../api/client';
import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing, typography } from '../constants/theme';
import type { Course, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

export function CourseDetailScreen({ route, navigation }: Props) {
  const { courseId, label } = route.params;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getCourse(courseId);
        if (!cancelled) setCourse(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load course');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const displayLabel = course
    ? `${course.course_code} — ${course.course_name}`
    : label ?? 'Course';

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        eyebrow="Course"
        title={displayLabel}
        subtitle={
          course?.credits != null
            ? `${course.credits} credits · workload, interest, organization, grading fairness`
            : 'Workload, interest, organization, and grading fairness'
        }
        onBack={() => navigation.goBack()}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton
        label="Rate this course"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'course',
                targetId: courseId,
                targetLabel: displayLabel,
              },
            },
          })
        }
      />
      <AggregateReviews targetType="course" targetId={courseId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: spacing.xl * 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: {
    ...typography.caption,
    color: colors.accent,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
});
