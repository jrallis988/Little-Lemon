import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, PrimaryButton, StarRating } from '../../src/components';
import { defaultScores, useApp, type ContributeDraft } from '../../src/context/AppContext';
import type { EmploymentStatus, EmploymentType } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

const STEPS = ['Company', 'Ratings', 'Write', 'Tags', 'Salary'] as const;

const emptyDraft = (): ContributeDraft => ({
  companyId: '',
  role: '',
  employmentStatus: 'former',
  employmentType: 'full_time',
  scores: { ...defaultScores },
  title: '',
  body: '',
  pros: '',
  cons: '',
  isAnonymous: true,
  tagIds: [],
  includeSalary: false,
  baseAnnual: '',
  bonusAnnual: '',
  yearsExperience: '',
});

export default function ContributeScreen() {
  const router = useRouter();
  const { user, tags, searchCompanies, submitContribute, addCompany } = useApp();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ContributeDraft>(emptyDraft);
  const [companyQuery, setCompanyQuery] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const matches = useMemo(() => searchCompanies(companyQuery).slice(0, 6), [companyQuery, searchCompanies]);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.gated}>
          <Text style={styles.title}>Contribute</Text>
          <Text style={styles.copy}>Sign in to submit reviews and salary data.</Text>
          <PrimaryButton label="Sign in" onPress={() => router.push('/auth')} />
          <PrimaryButton
            label="Salary only (after sign in)"
            variant="ghost"
            onPress={() => router.push('/auth')}
          />
        </View>
      </SafeAreaView>
    );
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    const error = await submitContribute(draft);
    if (error) {
      Alert.alert('Could not post', error);
      return;
    }
    Alert.alert('Posted', 'Thanks for contributing workplace truth.', [
      {
        text: 'View employer',
        onPress: () => {
          setDraft(emptyDraft());
          setStep(0);
          router.push(`/company/${draft.companyId}`);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Contribute</Text>
        <Text style={styles.stepLabel}>
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </Text>
        <View style={styles.progress}>
          {STEPS.map((_, i) => (
            <View key={STEPS[i]} style={[styles.bar, i <= step && styles.barOn]} />
          ))}
        </View>

        {step === 0 ? (
          <View style={styles.block}>
            <Text style={styles.copy}>Select company, role, and employment status.</Text>
            <TextInput
              style={styles.input}
              placeholder="Search companies"
              placeholderTextColor={colors.inkSoft}
              value={companyQuery}
              onChangeText={setCompanyQuery}
            />
            {matches.map((company) => (
              <Pressable
                key={company.id}
                style={[styles.option, draft.companyId === company.id && styles.optionOn]}
                onPress={() => setDraft((d) => ({ ...d, companyId: company.id, companyName: company.name }))}
              >
                <Text style={[styles.optionText, draft.companyId === company.id && styles.optionTextOn]}>
                  {company.name}
                </Text>
              </Pressable>
            ))}
            <Text style={styles.sub}>Or add a new company</Text>
            <TextInput
              style={styles.input}
              placeholder="New company name"
              placeholderTextColor={colors.inkSoft}
              value={newCompanyName}
              onChangeText={setNewCompanyName}
            />
            <PrimaryButton
              label="Add New Company"
              variant="ghost"
              onPress={() => {
                if (!newCompanyName.trim()) return;
                const created = addCompany({
                  name: newCompanyName,
                  industry: 'Other',
                  location: 'Unknown',
                });
                setDraft((d) => ({
                  ...d,
                  companyId: created.id,
                  companyName: created.name,
                  isNewCompany: true,
                }));
                setCompanyQuery(created.name);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Job title"
              placeholderTextColor={colors.inkSoft}
              value={draft.role}
              onChangeText={(role) => setDraft((d) => ({ ...d, role }))}
            />
            <View style={styles.rowWrap}>
              {(
                [
                  ['current', 'Current'],
                  ['former', 'Former'],
                ] as [EmploymentStatus, string][]
              ).map(([value, label]) => (
                <Chip
                  key={value}
                  label={label}
                  active={draft.employmentStatus === value}
                  onPress={() => setDraft((d) => ({ ...d, employmentStatus: value }))}
                />
              ))}
            </View>
            <View style={styles.rowWrap}>
              {(
                [
                  ['full_time', 'Full-Time'],
                  ['part_time', 'Part-Time'],
                  ['intern', 'Intern'],
                  ['contract', 'Contract'],
                ] as [EmploymentType, string][]
              ).map(([value, label]) => (
                <Chip
                  key={value}
                  label={label}
                  active={draft.employmentType === value}
                  onPress={() => setDraft((d) => ({ ...d, employmentType: value }))}
                />
              ))}
            </View>
          </View>
        ) : null}

        {step === 1 ? (
          <View style={styles.block}>
            <Text style={styles.copy}>Rate management, balance, pay, and growth.</Text>
            {(
              [
                ['overall', 'Overall'],
                ['management', 'Management'],
                ['workLife', 'Work-life balance'],
                ['pay', 'Compensation'],
                ['careerGrowth', 'Career growth'],
                ['culture', 'Culture'],
              ] as const
            ).map(([key, label]) => (
              <StarRating
                key={key}
                label={label}
                value={draft.scores[key]}
                onChange={(value) =>
                  setDraft((d) => ({ ...d, scores: { ...d.scores, [key]: value } }))
                }
              />
            ))}
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Review title"
              placeholderTextColor={colors.inkSoft}
              value={draft.title}
              onChangeText={(title) => setDraft((d) => ({ ...d, title }))}
            />
            <TextInput
              style={[styles.input, styles.area]}
              placeholder="Pros"
              placeholderTextColor={colors.inkSoft}
              value={draft.pros}
              onChangeText={(pros) => setDraft((d) => ({ ...d, pros }))}
              multiline
            />
            <TextInput
              style={[styles.input, styles.area]}
              placeholder="Cons"
              placeholderTextColor={colors.inkSoft}
              value={draft.cons}
              onChangeText={(cons) => setDraft((d) => ({ ...d, cons }))}
              multiline
            />
            <TextInput
              style={[styles.input, styles.areaTall]}
              placeholder="Main review"
              placeholderTextColor={colors.inkSoft}
              value={draft.body}
              onChangeText={(body) => setDraft((d) => ({ ...d, body }))}
              multiline
            />
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Post anonymously</Text>
              <Switch
                value={draft.isAnonymous}
                onValueChange={(isAnonymous) => setDraft((d) => ({ ...d, isAnonymous }))}
                trackColor={{ false: colors.mist, true: colors.accentDeep }}
              />
            </View>
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.block}>
            <Text style={styles.copy}>Tap tags that fit this workplace.</Text>
            <View style={styles.rowWrap}>
              {tags.map((tag) => {
                const active = draft.tagIds.includes(tag.id);
                return (
                  <Chip
                    key={tag.id}
                    label={tag.label}
                    active={active}
                    tone={tag.sentiment === 'negative' ? 'negative' : tag.sentiment === 'positive' ? 'positive' : 'default'}
                    onPress={() =>
                      setDraft((d) => ({
                        ...d,
                        tagIds: active
                          ? d.tagIds.filter((id) => id !== tag.id)
                          : [...d.tagIds, tag.id],
                      }))
                    }
                  />
                );
              })}
            </View>
          </View>
        ) : null}

        {step === 4 ? (
          <View style={styles.block}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Add optional salary data</Text>
              <Switch
                value={draft.includeSalary}
                onValueChange={(includeSalary) => setDraft((d) => ({ ...d, includeSalary }))}
                trackColor={{ false: colors.mist, true: colors.accentDeep }}
              />
            </View>
            {draft.includeSalary ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Base salary (annual)"
                  placeholderTextColor={colors.inkSoft}
                  keyboardType="numeric"
                  value={draft.baseAnnual}
                  onChangeText={(baseAnnual) => setDraft((d) => ({ ...d, baseAnnual }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Bonus (annual)"
                  placeholderTextColor={colors.inkSoft}
                  keyboardType="numeric"
                  value={draft.bonusAnnual}
                  onChangeText={(bonusAnnual) => setDraft((d) => ({ ...d, bonusAnnual }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Years of experience"
                  placeholderTextColor={colors.inkSoft}
                  keyboardType="numeric"
                  value={draft.yearsExperience}
                  onChangeText={(yearsExperience) => setDraft((d) => ({ ...d, yearsExperience }))}
                />
              </>
            ) : (
              <Text style={styles.copy}>You can skip salary and still post the review.</Text>
            )}
            <PrimaryButton
              label="Open salary-only form"
              variant="ghost"
              onPress={() => router.push('/salary/submit')}
            />
          </View>
        ) : null}

        <View style={styles.navRow}>
          {step > 0 ? <PrimaryButton label="Back" variant="ghost" onPress={back} style={styles.half} /> : <View style={styles.half} />}
          {step < STEPS.length - 1 ? (
            <PrimaryButton
              label="Next"
              onPress={() => {
                if (step === 0 && (!draft.companyId || !draft.role.trim())) {
                  Alert.alert('Almost', 'Pick a company and enter your job title.');
                  return;
                }
                next();
              }}
              style={styles.half}
            />
          ) : (
            <PrimaryButton label="Post contribution" onPress={onSubmit} style={styles.half} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  gated: { padding: spacing.lg, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 32, color: colors.ink },
  stepLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  progress: { flexDirection: 'row', gap: 6 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  barOn: { backgroundColor: colors.ink },
  block: { gap: spacing.md },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted, lineHeight: 22 },
  sub: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
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
  area: { minHeight: 80, textAlignVertical: 'top' },
  areaTall: { minHeight: 120, textAlignVertical: 'top' },
  option: {
    padding: spacing.md,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
  },
  optionOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  optionText: { fontFamily: typography.bodyMedium, color: colors.ink },
  optionTextOn: { color: colors.accent },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  toggleLabel: { flex: 1, fontFamily: typography.bodyMedium, fontSize: 15, color: colors.ink },
  navRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  half: { flex: 1 },
});
