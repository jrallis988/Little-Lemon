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
import { AggregateReviews } from '../components/AggregateReviews';
import { ListRow } from '../components/ListRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing, typography } from '../constants/theme';
import type {
  Department,
  Dorm,
  RootStackParamList,
  University,
} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'UniversityDetail'>;

export function UniversityDetailScreen({ route, navigation }: Props) {
  const { universityId, name } = route.params;
  const [university, setUniversity] = useState<University | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [dorms, setDorms] = useState<Dorm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [uni, depts, housing] = await Promise.all([
          api.getUniversity(universityId),
          api.listDepartments(universityId),
          api.listDorms(universityId),
        ]);
        if (cancelled) return;
        setUniversity(uni);
        setDepartments(depts.items);
        setDorms(housing.items);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load campus');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [universityId]);

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
        eyebrow="University"
        title={university?.name ?? name ?? 'Campus'}
        subtitle={
          university
            ? `${university.location} · ${university.domain}`
            : undefined
        }
        onBack={() => navigation.goBack()}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton
        label="Rate this university"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'university',
                targetId: universityId,
                targetLabel: university?.name ?? 'University',
              },
            },
          } as never)
        }
      />

      <AggregateReviews targetType="university" targetId={universityId} />

      <Text style={styles.section}>Departments</Text>
      {departments.map((dept) => (
        <ListRow
          key={dept.id}
          title={dept.name}
          subtitle={dept.code}
          onPress={() =>
            navigation.navigate('DepartmentDetail', {
              departmentId: dept.id,
              name: dept.name,
              universityId,
            })
          }
        />
      ))}

      <Text style={styles.section}>Housing</Text>
      {dorms.length === 0 ? (
        <Text style={styles.empty}>No dorms listed yet.</Text>
      ) : (
        dorms.map((dorm) => (
          <ListRow
            key={dorm.id}
            title={dorm.building_name}
            subtitle={dorm.campus_zone}
            onPress={() =>
              navigation.navigate('DormDetail', {
                dormId: dorm.id,
                name: dorm.building_name,
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
