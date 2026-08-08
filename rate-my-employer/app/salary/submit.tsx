import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip, PrimaryButton } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import type { EmploymentType } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function SubmitSalaryScreen() {
  const router = useRouter();
  const { user, companies, submitSalaryOnly } = useApp();
  const [companyId, setCompanyId] = useState(companies[0]?.id ?? '');
  const [role, setRole] = useState('');
  const [base, setBase] = useState('');
  const [bonus, setBonus] = useState('');
  const [equity, setEquity] = useState('');
  const [years, setYears] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('full_time');

  if (!user) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Sign in to submit salary data.</Text>
        <PrimaryButton label="Sign in" onPress={() => router.push('/auth')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Submit salary</Text>
      <Text style={styles.copy}>
        Anonymous compensation signal only — no full review required.
      </Text>

      <Text style={styles.label}>Company</Text>
      <View style={styles.wrap}>
        {companies.slice(0, 8).map((company) => (
          <Chip
            key={company.id}
            label={company.name}
            active={companyId === company.id}
            onPress={() => setCompanyId(company.id)}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Job title"
        placeholderTextColor={colors.inkSoft}
        value={role}
        onChangeText={setRole}
      />
      <View style={styles.wrap}>
        {(
          [
            ['full_time', 'Full-Time'],
            ['part_time', 'Part-Time'],
            ['contract', 'Contract'],
            ['intern', 'Intern'],
          ] as [EmploymentType, string][]
        ).map(([value, label]) => (
          <Chip
            key={value}
            label={label}
            active={employmentType === value}
            onPress={() => setEmploymentType(value)}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Base salary"
        placeholderTextColor={colors.inkSoft}
        keyboardType="numeric"
        value={base}
        onChangeText={setBase}
      />
      <TextInput
        style={styles.input}
        placeholder="Bonus"
        placeholderTextColor={colors.inkSoft}
        keyboardType="numeric"
        value={bonus}
        onChangeText={setBonus}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock / equity (annualized)"
        placeholderTextColor={colors.inkSoft}
        keyboardType="numeric"
        value={equity}
        onChangeText={setEquity}
      />
      <TextInput
        style={styles.input}
        placeholder="Years of experience"
        placeholderTextColor={colors.inkSoft}
        keyboardType="numeric"
        value={years}
        onChangeText={setYears}
      />
      <View style={styles.wrap}>
        {['USD', 'EUR', 'GBP', 'CAD'].map((code) => (
          <Chip key={code} label={code} active={currency === code} onPress={() => setCurrency(code)} />
        ))}
      </View>

      <PrimaryButton
        label="Submit salary"
        onPress={async () => {
          const error = await submitSalaryOnly({
            companyId,
            role,
            employmentType,
            baseAnnual: Number(base),
            bonusAnnual: bonus ? Number(bonus) : undefined,
            equityAnnual: equity ? Number(equity) : undefined,
            yearsExperience: years ? Number(years) : undefined,
            currency,
          });
          if (error) {
            Alert.alert('Salary', error);
            return;
          }
          Alert.alert('Thanks', 'Salary point recorded.', [
            { text: 'Done', onPress: () => router.back() },
          ]);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 30, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted, lineHeight: 22 },
  label: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
