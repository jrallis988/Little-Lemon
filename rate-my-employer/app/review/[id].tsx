import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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

import { StarRating } from '../../src/components/StarRating';
import { useApp } from '../../src/context/AppContext';
import type { ReviewScores } from '../../src/types';
import { colors, radii, spacing } from '../../src/theme';

const defaultScores: ReviewScores = {
  overall: 3,
  culture: 3,
  pay: 3,
  management: 3,
  workLife: 3,
};

export default function ReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getCompany, user, submitReview } = useApp();
  const company = getCompany(id);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [role, setRole] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState<'current' | 'former'>('former');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [scores, setScores] = useState<ReviewScores>(defaultScores);
  const [submitting, setSubmitting] = useState(false);

  if (!company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Employer not found.</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Sign in to write a review.</Text>
        <Pressable style={styles.submit} onPress={() => router.push('/auth')}>
          <Text style={styles.submitText}>Go to sign in</Text>
        </Pressable>
      </View>
    );
  }

  const setScore = (key: keyof ReviewScores, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const error = await submitReview({
      companyId: company.id,
      title,
      body,
      role,
      employmentStatus,
      wouldRecommend,
      scores,
    });
    setSubmitting(false);

    if (error) {
      Alert.alert('Could not post review', error);
      return;
    }

    router.replace(`/company/${company.id}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: `Review ${company.name}` }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>
          Rate your experience at {company.name}. Be specific — titles and scores help others
          decide.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Review title"
          placeholderTextColor={colors.inkSoft}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Your role / title"
          placeholderTextColor={colors.inkSoft}
          value={role}
          onChangeText={setRole}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="What was it really like?"
          placeholderTextColor={colors.inkSoft}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>I currently work here</Text>
          <Switch
            value={employmentStatus === 'current'}
            onValueChange={(on) => setEmploymentStatus(on ? 'current' : 'former')}
            trackColor={{ false: colors.mist, true: colors.accentDeep }}
            thumbColor={colors.surfaceRaised}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>I would recommend this employer</Text>
          <Switch
            value={wouldRecommend}
            onValueChange={setWouldRecommend}
            trackColor={{ false: colors.mist, true: colors.accentDeep }}
            thumbColor={colors.surfaceRaised}
          />
        </View>

        <View style={styles.scores}>
          <StarRating
            label="Overall"
            value={scores.overall}
            onChange={(value) => setScore('overall', value)}
          />
          <StarRating
            label="Culture"
            value={scores.culture}
            onChange={(value) => setScore('culture', value)}
          />
          <StarRating
            label="Pay & benefits"
            value={scores.pay}
            onChange={(value) => setScore('pay', value)}
          />
          <StarRating
            label="Management"
            value={scores.management}
            onChange={(value) => setScore('management', value)}
          />
          <StarRating
            label="Work-life balance"
            value={scores.workLife}
            onChange={(value) => setScore('workLife', value)}
          />
        </View>

        <Pressable
          style={[styles.submit, submitting && styles.submitDisabled]}
          onPress={onSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>{submitting ? 'Posting…' : 'Post review'}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  intro: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: colors.ink,
  },
  textarea: {
    minHeight: 140,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  toggleLabel: {
    flex: 1,
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    color: colors.ink,
  },
  scores: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  submit: {
    backgroundColor: colors.ink,
    borderRadius: radii.sm,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: colors.accent,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  missingText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: colors.inkMuted,
  },
});
