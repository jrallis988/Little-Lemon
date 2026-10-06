import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Chip, PrimaryButton, StarRating } from '../../../src/components';
import { useApp } from '../../../src/context/AppContext';
import type { InterviewDifficulty, InterviewOffer } from '../../../src/types';
import { colors, radii, spacing, typography } from '../../../src/theme';

const DIFFICULTIES: { key: InterviewDifficulty; label: string }[] = [
  { key: 'easy', label: 'Easy' },
  { key: 'average', label: 'Average' },
  { key: 'difficult', label: 'Difficult' },
];

const OFFERS: { key: InterviewOffer; label: string }[] = [
  { key: 'accepted', label: 'Accepted offer' },
  { key: 'declined', label: 'Declined offer' },
  { key: 'no_offer', label: 'No offer' },
  { key: 'pending', label: 'Pending' },
];

const PROCESS_LENGTHS = ['Under 1 week', '1–2 weeks', '3–4 weeks', '1–2 months', '2+ months'];

export default function EditInterviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getInterview, getCompany, getWorkplace, updateInterview } = useApp();
  const interview = getInterview(id);
  const company = interview ? getCompany(interview.companyId) : undefined;
  const workplace = interview?.workplaceId ? getWorkplace(interview.workplaceId) : undefined;

  const [role, setRole] = useState(interview?.role ?? '');
  const [rating, setRating] = useState(interview?.rating ?? 0);
  const [outcome, setOutcome] = useState(interview?.outcome ?? 'neutral');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>(
    interview?.difficulty ?? 'average',
  );
  const [offerResult, setOfferResult] = useState<InterviewOffer>(
    interview?.offerResult ?? 'pending',
  );
  const [processLength, setProcessLength] = useState(interview?.processLength ?? '');
  const [body, setBody] = useState(interview?.body ?? '');
  const [questions, setQuestions] = useState((interview?.questions ?? []).join('\n'));
  const [isAnonymous, setIsAnonymous] = useState(Boolean(interview?.isAnonymous));
  const [saving, setSaving] = useState(false);

  if (!interview || !company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Interview not found.</Text>
      </View>
    );
  }

  const onSave = async () => {
    setSaving(true);
    const error = await updateInterview(interview.id, {
      role,
      rating,
      outcome,
      difficulty,
      offerResult,
      processLength,
      body,
      questions: questions.split('\n'),
      isAnonymous,
    });
    setSaving(false);
    if (error) {
      Alert.alert('Could not save', error);
      return;
    }
    router.replace(`/interview/${interview.id}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Edit interview' }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.company}>{company.name}</Text>
        {workplace ? <Text style={styles.meta}>{workplace.name}</Text> : null}

        <Text style={styles.label}>Overall</Text>
        <StarRating value={rating} size="lg" onChange={setRating} />

        <Text style={styles.label}>Experience</Text>
        <View style={styles.wrap}>
          {(['positive', 'neutral', 'negative'] as const).map((value) => (
            <Chip
              key={value}
              label={value}
              active={outcome === value}
              onPress={() => setOutcome(value)}
            />
          ))}
        </View>

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.wrap}>
          {DIFFICULTIES.map((item) => (
            <Chip
              key={item.key}
              label={item.label}
              active={difficulty === item.key}
              onPress={() => setDifficulty(item.key)}
            />
          ))}
        </View>

        <Text style={styles.label}>Offer result</Text>
        <View style={styles.wrap}>
          {OFFERS.map((item) => (
            <Chip
              key={item.key}
              label={item.label}
              active={offerResult === item.key}
              onPress={() => setOfferResult(item.key)}
            />
          ))}
        </View>

        <Text style={styles.label}>Process length</Text>
        <View style={styles.wrap}>
          {PROCESS_LENGTHS.map((item) => (
            <Chip
              key={item}
              label={item}
              active={processLength === item}
              onPress={() => setProcessLength(item)}
            />
          ))}
        </View>

        <Text style={styles.label}>Role</Text>
        <TextInput style={styles.input} value={role} onChangeText={setRole} />

        <Text style={styles.label}>Story</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Questions (one per line)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={questions}
          onChangeText={setQuestions}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.anonRow}>
          <Text style={styles.label}>Post anonymously</Text>
          <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
        </View>

        <PrimaryButton label={saving ? 'Saving…' : 'Save changes'} onPress={onSave} disabled={saving} />
        <PrimaryButton label="Cancel" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  company: { fontFamily: typography.display, fontSize: 22, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft, marginBottom: spacing.sm },
  label: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.ink,
  },
  multiline: { minHeight: 120 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  anonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
