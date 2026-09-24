import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
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
import { defaultScores, useApp } from '../../../src/context/AppContext';
import type { EmploymentStatus, EmploymentType, ReviewScores } from '../../../src/types';
import { colors, radii, spacing, typography } from '../../../src/theme';

export default function EditReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getReview, getCompany, getWorkplace, tags, updateReview } = useApp();
  const review = getReview(id);
  const company = review ? getCompany(review.companyId) : undefined;
  const workplace = review?.workplaceId ? getWorkplace(review.workplaceId) : undefined;

  const [title, setTitle] = useState(review?.title ?? '');
  const [body, setBody] = useState(review?.body ?? '');
  const [pros, setPros] = useState(review?.pros ?? '');
  const [cons, setCons] = useState(review?.cons ?? '');
  const [role, setRole] = useState(review?.role ?? '');
  const [overall, setOverall] = useState(review?.scores.overall ?? 0);
  const [scores, setScores] = useState<ReviewScores>(review?.scores ?? { ...defaultScores });
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>(
    review?.employmentStatus ?? 'former',
  );
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    review?.employmentType ?? 'full_time',
  );
  const [tagIds, setTagIds] = useState<string[]>(review?.tagIds ?? []);
  const [isAnonymous, setIsAnonymous] = useState(Boolean(review?.isAnonymous));
  const [saving, setSaving] = useState(false);

  const scoreFields = useMemo(
    () =>
      [
        ['culture', 'Culture'],
        ['pay', 'Pay & Benefits'],
        ['management', 'Management'],
        ['workLife', 'Work-Life'],
        ['careerGrowth', 'Career Growth'],
      ] as const,
    [],
  );

  if (!review || !company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Review not found.</Text>
      </View>
    );
  }

  const toggleTag = (tagId: string) => {
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((item) => item !== tagId) : [...prev, tagId],
    );
  };

  const onSave = async () => {
    setSaving(true);
    const error = await updateReview(review.id, {
      title,
      body,
      pros,
      cons,
      role,
      overall,
      scores: { ...scores, overall },
      employmentStatus,
      employmentType,
      tagIds,
      isAnonymous,
    });
    setSaving(false);
    if (error) {
      Alert.alert('Could not save', error);
      return;
    }
    router.replace(`/review/${review.id}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Edit review' }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.company}>{company.name}</Text>
        {workplace ? <Text style={styles.meta}>{workplace.name}</Text> : null}

        <Text style={styles.label}>Overall</Text>
        <StarRating
          value={overall}
          size="lg"
          onChange={(value) => {
            setOverall(value);
            setScores((prev) => ({ ...prev, overall: value }));
          }}
        />

        {scoreFields.map(([key, label]) => (
          <View key={key} style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>{label}</Text>
            <StarRating
              value={scores[key]}
              onChange={(value) => setScores((prev) => ({ ...prev, [key]: value }))}
            />
          </View>
        ))}

        <Text style={styles.label}>Role</Text>
        <TextInput style={styles.input} value={role} onChangeText={setRole} />

        <Text style={styles.label}>Employment status</Text>
        <View style={styles.wrap}>
          {(
            [
              ['current', 'Current'],
              ['former', 'Former'],
            ] as [EmploymentStatus, string][]
          ).map(([value, label]) => (
            <Chip
              key={value}
              label={label}
              active={employmentStatus === value}
              onPress={() => setEmploymentStatus(value)}
            />
          ))}
        </View>

        <Text style={styles.label}>Employment type</Text>
        <View style={styles.wrap}>
          {(
            [
              ['full_time', 'Full-time'],
              ['part_time', 'Part-time'],
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

        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Review</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Pros</Text>
        <TextInput
          style={[styles.input, styles.multilineShort]}
          value={pros}
          onChangeText={setPros}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Cons</Text>
        <TextInput
          style={[styles.input, styles.multilineShort]}
          value={cons}
          onChangeText={setCons}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Tags</Text>
        <View style={styles.wrap}>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              active={tagIds.includes(tag.id)}
              onPress={() => toggleTag(tag.id)}
            />
          ))}
        </View>

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
  multiline: { minHeight: 140 },
  multilineShort: { minHeight: 80 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  scoreRow: { gap: 4 },
  scoreLabel: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.inkMuted },
  anonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
