import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { api } from '../api/client';
import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing, typography } from '../constants/theme';
import type { Professor, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessorDetail'>;

export function ProfessorDetailScreen({ route, navigation }: Props) {
  const { professorId, name } = route.params;
  const [person, setPerson] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getProfessor(professorId);
        if (!cancelled) setPerson(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load person');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [professorId]);

  const displayName = person?.name ?? name ?? 'Faculty member';
  const targetType =
    person?.type === 'advisor' ? ('advisor' as const) : ('professor' as const);

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
        eyebrow={person?.type ?? 'Professor / advisor'}
        title={displayName}
        subtitle={
          person?.title
            ? `${person.title}${person.is_verified ? '' : ' · unverified listing'}`
            : 'Multi-metric ratings from students who took their classes or advising'
        }
        onBack={() => navigation.goBack()}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton
        label="Write a review"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType,
                targetId: professorId,
                targetLabel: displayName,
              },
            },
          })
        }
      />
      <AggregateReviews targetType={targetType} targetId={professorId} />
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
