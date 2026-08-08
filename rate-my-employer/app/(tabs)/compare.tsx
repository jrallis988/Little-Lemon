import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { PrimaryButton, ScoreBars, StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function CompareScreen() {
  const router = useRouter();
  const {
    companies,
    savedCompanyIds,
    getCompany,
    getCompanyAverages,
    toggleSavedCompany,
  } = useApp();
  const saved = savedCompanyIds
    .map((id) => getCompany(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCompany>>[];

  const [leftId, setLeftId] = useState(saved[0]?.id ?? companies[0]?.id ?? '');
  const [rightId, setRightId] = useState(saved[1]?.id ?? companies[1]?.id ?? '');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const left = getCompany(leftId);
  const right = getCompany(rightId);
  const leftAvg = useMemo(() => getCompanyAverages(leftId), [getCompanyAverages, leftId]);
  const rightAvg = useMemo(() => getCompanyAverages(rightId), [getCompanyAverages, rightId]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Compare & Saved</Text>
        <Text style={styles.copy}>Bookmark employers, then stack them side by side.</Text>

        <Text style={styles.section}>Saved companies</Text>
        {saved.length === 0 ? (
          <Text style={styles.empty}>No saved employers yet. Bookmark from a company page.</Text>
        ) : (
          saved.map((company) => {
            const avg = getCompanyAverages(company.id);
            return (
              <Pressable
                key={company.id}
                style={styles.savedCard}
                onPress={() => router.push(`/company/${company.id}`)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.savedName}>{company.name}</Text>
                  <Text style={styles.meta}>{company.industry}</Text>
                  <StarRating value={avg.overall} size="sm" />
                </View>
                <PrimaryButton
                  label="Remove"
                  variant="ghost"
                  onPress={() => toggleSavedCompany(company.id)}
                  style={{ paddingVertical: 8, paddingHorizontal: 10 }}
                />
              </Pressable>
            );
          })
        )}

        <PrimaryButton
          label={drawerOpen ? 'Hide compare drawer' : 'Open compare drawer'}
          onPress={() => setDrawerOpen((v) => !v)}
        />

        {drawerOpen ? (
          <View style={styles.drawer}>
            <Text style={styles.section}>Select two companies</Text>
            <View style={styles.pickRow}>
              <Picker
                label="A"
                selectedId={leftId}
                options={companies}
                onSelect={setLeftId}
              />
              <Picker
                label="B"
                selectedId={rightId}
                options={companies}
                onSelect={setRightId}
              />
            </View>
          </View>
        ) : null}

        {left && right ? (
          <View style={styles.board}>
            <View style={styles.col}>
              <Text style={styles.colName}>{left.name}</Text>
              <StarRating value={leftAvg.overall} size="sm" />
              <ScoreBars scores={leftAvg} compact />
            </View>
            <View style={styles.divider} />
            <View style={styles.col}>
              <Text style={styles.colName}>{right.name}</Text>
              <StarRating value={rightAvg.overall} size="sm" />
              <ScoreBars scores={rightAvg} compact />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Picker({
  label,
  selectedId,
  options,
  onSelect,
}: {
  label: string;
  selectedId: string;
  options: { id: string; name: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.picker}>
      <Text style={styles.pickerLabel}>Employer {label}</Text>
      <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
        {options.map((option) => {
          const active = option.id === selectedId;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              style={[styles.pickItem, active && styles.pickItemOn]}
            >
              <Text style={[styles.pickText, active && styles.pickTextOn]}>{option.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  empty: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  savedName: { fontFamily: typography.displaySemi, fontSize: 18, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft, marginBottom: 4 },
  drawer: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  pickRow: { flexDirection: 'row', gap: spacing.sm },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.sm,
  },
  pickerLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 11,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginBottom: 6,
  },
  pickItem: { paddingVertical: 8, paddingHorizontal: 6, borderRadius: radii.sm },
  pickItemOn: { backgroundColor: colors.ink },
  pickText: { fontFamily: typography.bodyMedium, fontSize: 13, color: colors.ink },
  pickTextOn: { color: colors.accent },
  board: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  col: { flex: 1, gap: spacing.sm },
  colName: { fontFamily: typography.displaySemi, fontSize: 16, color: colors.ink },
  divider: { width: 1, backgroundColor: colors.border, marginHorizontal: spacing.sm },
});
