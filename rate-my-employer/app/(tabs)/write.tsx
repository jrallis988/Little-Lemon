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
import { defaultScores, useApp, type WriteDraft } from '../../src/context/AppContext';
import { POPULAR_ROLES } from '../../src/types';
import type { ExperienceType } from '../../src/types';
import { colors, radii, spacing, typography } from '../../src/theme';

const STEPS = [
  'Type',
  'Employer',
  'Workplace',
  'Role',
  'Rate',
  'Write',
  'Preview',
] as const;

const emptyDraft = (): WriteDraft => ({
  experienceType: 'work',
  companyId: '',
  workplaceId: null,
  role: '',
  employmentStatus: 'former',
  employmentType: 'full_time',
  overall: 0,
  scores: { ...defaultScores },
  title: '',
  body: '',
  tagIds: [],
  isAnonymous: true,
  interviewQuestions: '',
  interviewOutcome: 'positive',
});

export default function WriteScreen() {
  const router = useRouter();
  const {
    user,
    tags,
    searchCompanies,
    getCompany,
    getWorkplace,
    searchWorkplaces,
    submitWorkReview,
    submitInterview,
  } = useApp();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<WriteDraft>(emptyDraft);
  const [companyQuery, setCompanyQuery] = useState('');
  const [workplaceQuery, setWorkplaceQuery] = useState('');

  const matches = useMemo(
    () => searchCompanies(companyQuery).slice(0, 8),
    [companyQuery, searchCompanies],
  );
  const workplaces = useMemo(
    () => (draft.companyId ? searchWorkplaces(draft.companyId, workplaceQuery) : []),
    [draft.companyId, workplaceQuery, searchWorkplaces],
  );
  const company = getCompany(draft.companyId);
  const workplace = draft.workplaceId ? getWorkplace(draft.workplaceId) : undefined;

  if (!user) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.gated}>
          <Text style={styles.title}>Write</Text>
          <Text style={styles.copy}>Sign in to share a work or interview experience.</Text>
          <PrimaryButton label="Sign in" onPress={() => router.push('/auth')} />
        </View>
      </SafeAreaView>
    );
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async () => {
    const error =
      draft.experienceType === 'work'
        ? await submitWorkReview(draft)
        : await submitInterview(draft);
    if (error) {
      Alert.alert('Could not submit', error);
      return;
    }
    Alert.alert('Submitted', 'Thanks for sharing your experience.', [
      {
        text: 'Done',
        onPress: () => {
          const target = draft.workplaceId
            ? `/workplace/${draft.workplaceId}`
            : `/company/${draft.companyId}`;
          setDraft(emptyDraft());
          setStep(0);
          router.push(target as never);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Write</Text>
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
            <Text style={styles.copy}>What would you like to share?</Text>
            {(
              [
                ['work', 'Work Experience', 'Share your experience as a current or past employee.'],
                ['interview', 'Interview Experience', 'Describe the hiring process and questions asked.'],
              ] as [ExperienceType, string, string][]
            ).map(([value, label, desc]) => (
              <Pressable
                key={value}
                style={[styles.option, draft.experienceType === value && styles.optionOn]}
                onPress={() => setDraft((d) => ({ ...d, experienceType: value }))}
              >
                <Text style={[styles.optionTitle, draft.experienceType === value && styles.optionTitleOn]}>
                  {label}
                </Text>
                <Text style={styles.optionDesc}>{desc}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {step === 1 ? (
          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Find employer"
              placeholderTextColor={colors.inkSoft}
              value={companyQuery}
              onChangeText={setCompanyQuery}
            />
            {matches.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.option, draft.companyId === item.id && styles.optionOn]}
                onPress={() => {
                  setDraft((d) => ({ ...d, companyId: item.id, workplaceId: null }));
                  setCompanyQuery(item.name);
                }}
              >
                <Text style={[styles.optionTitle, draft.companyId === item.id && styles.optionTitleOn]}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.block}>
            <Text style={styles.copy}>Select a workplace for {company?.name ?? 'this employer'}.</Text>
            <TextInput
              style={styles.input}
              placeholder="City, zip, or store #"
              placeholderTextColor={colors.inkSoft}
              value={workplaceQuery}
              onChangeText={setWorkplaceQuery}
            />
            <Pressable
              style={[styles.option, draft.workplaceId === null && styles.optionOn]}
              onPress={() => setDraft((d) => ({ ...d, workplaceId: null }))}
            >
              <Text style={[styles.optionTitle, draft.workplaceId === null && styles.optionTitleOn]}>
                Not location specific (Corporate / Remote)
              </Text>
            </Pressable>
            {workplaces.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.option, draft.workplaceId === item.id && styles.optionOn]}
                onPress={() => setDraft((d) => ({ ...d, workplaceId: item.id }))}
              >
                <Text style={[styles.optionTitle, draft.workplaceId === item.id && styles.optionTitleOn]}>
                  {item.name}
                </Text>
                <Text style={styles.optionDesc}>
                  {item.storeCode ? `${item.storeCode} · ` : ''}
                  {item.address}, {item.city}, {item.state}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Your role / job title"
              placeholderTextColor={colors.inkSoft}
              value={draft.role}
              onChangeText={(role) => setDraft((d) => ({ ...d, role }))}
            />
            <Text style={styles.sub}>Popular roles</Text>
            <View style={styles.wrap}>
              {POPULAR_ROLES.map((role) => (
                <Chip
                  key={role}
                  label={role}
                  active={draft.role === role}
                  onPress={() => setDraft((d) => ({ ...d, role }))}
                />
              ))}
            </View>
            {draft.experienceType === 'work' ? (
              <View style={styles.wrap}>
                <Chip
                  label="Current"
                  active={draft.employmentStatus === 'current'}
                  onPress={() => setDraft((d) => ({ ...d, employmentStatus: 'current' }))}
                />
                <Chip
                  label="Former"
                  active={draft.employmentStatus === 'former'}
                  onPress={() => setDraft((d) => ({ ...d, employmentStatus: 'former' }))}
                />
              </View>
            ) : null}
          </View>
        ) : null}

        {step === 4 ? (
          <View style={styles.block}>
            <Text style={styles.copy}>Overall, how would you rate your experience?</Text>
            <StarRating
              value={draft.overall}
              size="lg"
              onChange={(overall) => setDraft((d) => ({ ...d, overall }))}
            />
            {draft.experienceType === 'work' ? (
              <>
                <StarRating
                  label="Management"
                  value={draft.scores.management}
                  onChange={(management) =>
                    setDraft((d) => ({ ...d, scores: { ...d.scores, management } }))
                  }
                />
                <StarRating
                  label="Work-Life Balance"
                  value={draft.scores.workLife}
                  onChange={(workLife) =>
                    setDraft((d) => ({ ...d, scores: { ...d.scores, workLife } }))
                  }
                />
                <StarRating
                  label="Comp & Benefits"
                  value={draft.scores.pay}
                  onChange={(pay) => setDraft((d) => ({ ...d, scores: { ...d.scores, pay } }))}
                />
                <StarRating
                  label="Culture"
                  value={draft.scores.culture}
                  onChange={(culture) =>
                    setDraft((d) => ({ ...d, scores: { ...d.scores, culture } }))
                  }
                />
                <StarRating
                  label="Career Growth"
                  value={draft.scores.careerGrowth}
                  onChange={(careerGrowth) =>
                    setDraft((d) => ({ ...d, scores: { ...d.scores, careerGrowth } }))
                  }
                />
              </>
            ) : (
              <View style={styles.wrap}>
                {(['positive', 'neutral', 'negative'] as const).map((outcome) => (
                  <Chip
                    key={outcome}
                    label={outcome}
                    active={draft.interviewOutcome === outcome}
                    onPress={() => setDraft((d) => ({ ...d, interviewOutcome: outcome }))}
                  />
                ))}
              </View>
            )}
          </View>
        ) : null}

        {step === 5 ? (
          <View style={styles.block}>
            <TextInput
              style={styles.input}
              placeholder="Review title (optional)"
              placeholderTextColor={colors.inkSoft}
              value={draft.title}
              onChangeText={(title) => setDraft((d) => ({ ...d, title }))}
            />
            <TextInput
              style={[styles.input, styles.area]}
              placeholder={
                draft.experienceType === 'work'
                  ? 'Your review'
                  : 'Describe the interview experience'
              }
              placeholderTextColor={colors.inkSoft}
              value={draft.body}
              onChangeText={(body) => setDraft((d) => ({ ...d, body }))}
              multiline
              textAlignVertical="top"
            />
            {draft.experienceType === 'interview' ? (
              <TextInput
                style={[styles.input, styles.area]}
                placeholder="Interview questions (one per line)"
                placeholderTextColor={colors.inkSoft}
                value={draft.interviewQuestions}
                onChangeText={(interviewQuestions) =>
                  setDraft((d) => ({ ...d, interviewQuestions }))
                }
                multiline
                textAlignVertical="top"
              />
            ) : (
              <View style={styles.wrap}>
                {tags.map((tag) => {
                  const active = draft.tagIds.includes(tag.id);
                  return (
                    <Chip
                      key={tag.id}
                      label={tag.label}
                      active={active}
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
            )}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Keep my review anonymous</Text>
              <Switch
                value={draft.isAnonymous}
                onValueChange={(isAnonymous) => setDraft((d) => ({ ...d, isAnonymous }))}
                trackColor={{ false: colors.mist, true: colors.blue }}
              />
            </View>
          </View>
        ) : null}

        {step === 6 ? (
          <View style={styles.preview}>
            <Text style={styles.sub}>Preview</Text>
            <Text style={styles.previewCompany}>{company?.name}</Text>
            <Text style={styles.meta}>
              {workplace?.name ?? 'Corporate / Remote'} · {draft.role || 'Role'}
            </Text>
            <StarRating value={draft.overall} size="md" />
            <Text style={styles.previewTitle}>
              {draft.title.trim() || `${draft.role || 'Experience'} review`}
            </Text>
            <Text style={styles.previewBody}>{draft.body || 'Your review text will appear here.'}</Text>
            <Text style={styles.meta}>
              Posted as {draft.isAnonymous ? 'Anonymous' : user.displayName}
            </Text>
          </View>
        ) : null}

        <View style={styles.navRow}>
          {step > 0 ? (
            <PrimaryButton label="Back" variant="ghost" onPress={back} style={styles.half} />
          ) : (
            <View style={styles.half} />
          )}
          {step < STEPS.length - 1 ? (
            <PrimaryButton
              label="Next"
              style={styles.half}
              onPress={() => {
                if (step === 1 && !draft.companyId) {
                  Alert.alert('Pick an employer');
                  return;
                }
                if (step === 3 && !draft.role.trim()) {
                  Alert.alert('Add your role');
                  return;
                }
                if (step === 4 && !draft.overall) {
                  Alert.alert('Add an overall rating');
                  return;
                }
                if (step === 5 && !draft.body.trim()) {
                  Alert.alert('Write your experience');
                  return;
                }
                next();
              }}
            />
          ) : (
            <PrimaryButton label="Submit Review" onPress={onSubmit} style={styles.half} />
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
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  stepLabel: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  progress: { flexDirection: 'row', gap: 4 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  barOn: { backgroundColor: colors.blue },
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
  area: { minHeight: 120 },
  option: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    gap: 4,
  },
  optionOn: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  optionTitle: { fontFamily: typography.bodySemi, fontSize: 15, color: colors.ink },
  optionTitleOn: { color: colors.blue },
  optionDesc: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  toggleLabel: { flex: 1, fontFamily: typography.bodyMedium, fontSize: 15, color: colors.ink },
  preview: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  previewCompany: { fontFamily: typography.displaySemi, fontSize: 18, color: colors.ink },
  previewTitle: { fontFamily: typography.bodyBold, fontSize: 16, color: colors.ink },
  previewBody: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  navRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  half: { flex: 1 },
});
