import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { api } from '../api/client';
import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing, typography } from '../constants/theme';
import type { Dorm, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DormDetail'>;

export function DormDetailScreen({ route, navigation }: Props) {
  const { dormId, name } = route.params;
  const [dorm, setDorm] = useState<Dorm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getDorm(dormId);
        if (!cancelled) setDorm(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load dorm');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dormId]);

  const displayName = dorm?.building_name ?? name ?? 'Residence hall';

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
        eyebrow="Housing"
        title={displayName}
        subtitle={
          [
            dorm?.campus_zone,
            dorm?.capacity != null ? `capacity ${dorm.capacity}` : null,
            'cleanliness, location, community, value',
          ]
            .filter(Boolean)
            .join(' · ')
        }
        onBack={() => navigation.goBack()}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton
        label="Rate this dorm"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'dorm',
                targetId: dormId,
                targetLabel: displayName,
              },
            },
          })
        }
      />
      <AggregateReviews targetType="dorm" targetId={dormId} />
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
