import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessorDetail'>;

export function ProfessorDetailScreen({ route, navigation }: Props) {
  const { professorId, name } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        eyebrow="Professor / advisor"
        title={name ?? 'Faculty member'}
        subtitle="Multi-metric ratings from students who took their classes or advising"
        onBack={() => navigation.goBack()}
      />
      <PrimaryButton
        label="Write a review"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'professor',
                targetId: professorId,
                targetLabel: name ?? 'Professor',
              },
            },
          } as never)
        }
      />
      <AggregateReviews targetType="professor" targetId={professorId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: spacing.xl * 2 },
});
