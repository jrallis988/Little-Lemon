import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AggregateReviews } from '../components/AggregateReviews';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DormDetail'>;

export function DormDetailScreen({ route, navigation }: Props) {
  const { dormId, name } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        eyebrow="Housing"
        title={name ?? 'Residence hall'}
        subtitle="Cleanliness, location, community, and value"
        onBack={() => navigation.goBack()}
      />
      <PrimaryButton
        label="Rate this dorm"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: 'AddEntry',
            params: {
              prefill: {
                targetType: 'dorm',
                targetId: dormId,
                targetLabel: name ?? 'Dorm',
              },
            },
          } as never)
        }
      />
      <AggregateReviews targetType="dorm" targetId={dormId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: spacing.xl * 2 },
});
