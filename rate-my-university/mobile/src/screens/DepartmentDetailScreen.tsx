import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { api } from '../api/client';
import { ListRow } from '../components/ListRow';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing, typography } from '../constants/theme';
import type { Course, Professor, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DepartmentDetail'>;

export function DepartmentDetailScreen({ route, navigation }: Props) {
  const { departmentId, name } = route.params;
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [people, classes] = await Promise.all([
          api.listProfessors({ departmentId }),
          api.listCourses({ departmentId }),
        ]);
        if (cancelled) return;
        setProfessors(people.items);
        setCourses(classes.items);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load department');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [departmentId]);

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
        eyebrow="Department"
        title={name ?? 'Department'}
        subtitle="Professors, advisors, and courses in this department"
        onBack={() => navigation.goBack()}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.section}>People</Text>
      {professors.length === 0 ? (
        <Text style={styles.empty}>No professors listed yet.</Text>
      ) : (
        professors.map((person) => (
          <ListRow
            key={person.id}
            title={person.name}
            subtitle={person.title ?? person.type}
            meta={person.type}
            onPress={() =>
              navigation.navigate('ProfessorDetail', {
                professorId: person.id,
                name: person.name,
              })
            }
          />
        ))
      )}

      <Text style={styles.section}>Courses</Text>
      {courses.length === 0 ? (
        <Text style={styles.empty}>No courses listed yet.</Text>
      ) : (
        courses.map((course) => (
          <ListRow
            key={course.id}
            title={`${course.course_code} — ${course.course_name}`}
            subtitle={course.credits != null ? `${course.credits} credits` : null}
            onPress={() =>
              navigation.navigate('CourseDetail', {
                courseId: course.id,
                label: `${course.course_code} — ${course.course_name}`,
              })
            }
          />
        ))
      )}
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
  },
  section: {
    ...typography.body,
    fontWeight: '700',
    color: colors.ink,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  empty: {
    ...typography.caption,
    color: colors.slate,
    paddingHorizontal: spacing.lg,
  },
});
