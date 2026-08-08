import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import type { Company } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function CompareScreen() {
  const { companies, getCompanyAverages } = useApp();
  const [leftId, setLeftId] = useState(companies[0]?.id ?? '');
  const [rightId, setRightId] = useState(companies[1]?.id ?? '');

  const left = companies.find((c) => c.id === leftId);
  const right = companies.find((c) => c.id === rightId);
  const leftAvg = useMemo(() => getCompanyAverages(leftId), [getCompanyAverages, leftId]);
  const rightAvg = useMemo(() => getCompanyAverages(rightId), [getCompanyAverages, rightId]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Compare</Text>
        <Text style={styles.copy}>Pick two employers and scan scores side by side.</Text>

        <View style={styles.row}>
          <Picker
            label="Employer A"
            selectedId={leftId}
            companies={companies}
            onSelect={setLeftId}
          />
          <Picker
            label="Employer B"
            selectedId={rightId}
            companies={companies}
            onSelect={setRightId}
          />
        </View>

        {left && right ? (
          <View style={styles.board}>
            <CompareColumn company={left} overall={leftAvg.overall} recommend={leftAvg.recommendPercent} reviews={leftAvg.reviewCount} />
            <View style={styles.divider} />
            <CompareColumn company={right} overall={rightAvg.overall} recommend={rightAvg.recommendPercent} reviews={rightAvg.reviewCount} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Picker({
  label,
  selectedId,
  companies,
  onSelect,
}: {
  label: string;
  selectedId: string;
  companies: Company[];
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.picker}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <ScrollView style={styles.pickerList} nestedScrollEnabled>
        {companies.map((company) => {
          const active = company.id === selectedId;
          return (
            <Pressable
              key={company.id}
              onPress={() => onSelect(company.id)}
              style={[styles.pickerItem, active && styles.pickerItemActive]}
            >
              <Text style={[styles.pickerText, active && styles.pickerTextActive]}>
                {company.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function CompareColumn({
  company,
  overall,
  recommend,
  reviews,
}: {
  company: Company;
  overall: number;
  recommend: number;
  reviews: number;
}) {
  return (
    <View style={styles.column}>
      <Text style={styles.companyName}>{company.name}</Text>
      <Text style={styles.meta}>{company.industry}</Text>
      <StarRating value={overall} size="md" />
      <Text style={styles.stat}>{recommend}% recommend</Text>
      <Text style={styles.stat}>{reviews} reviews</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: {
    fontFamily: typography.display,
    fontSize: 32,
    color: colors.ink,
  },
  copy: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkMuted,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  picker: {
    flex: 1,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    maxHeight: 220,
  },
  pickerLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.inkSoft,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  pickerList: { flexGrow: 0 },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: radii.sm,
  },
  pickerItemActive: { backgroundColor: colors.ink },
  pickerText: {
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    color: colors.ink,
  },
  pickerTextActive: { color: colors.accent },
  board: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  column: { flex: 1, gap: spacing.sm },
  companyName: {
    fontFamily: typography.displaySemi,
    fontSize: 18,
    color: colors.ink,
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  stat: {
    fontFamily: typography.bodyMedium,
    fontSize: 13,
    color: colors.inkMuted,
  },
});
