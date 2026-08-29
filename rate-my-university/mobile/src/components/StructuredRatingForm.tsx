import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { RATING_METRICS, colors, spacing, typography } from '../constants/theme';
import type { ReviewTargetType } from '../types';
import { RatingSlider } from './RatingSlider';

interface StructuredRatingFormProps {
  targetType: ReviewTargetType;
  targetLabel: string;
  onSubmit: (payload: {
    ratings: Record<string, number>;
    comment: string;
    tags: string[];
  }) => void;
  submitting?: boolean;
}

export function StructuredRatingForm({
  targetType,
  targetLabel,
  onSubmit,
  submitting = false,
}: StructuredRatingFormProps) {
  const metrics = RATING_METRICS[targetType] ?? [];
  const initial = useMemo(
    () => Object.fromEntries(metrics.map((m) => [m.key, 3])),
    [metrics]
  );
  const [ratings, setRatings] = useState<Record<string, number>>(initial);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const suggestedTags = useMemo(() => {
    const map: Record<ReviewTargetType, string[]> = {
      professor: ['engaging', 'tough-grader', 'caring', 'clear-lectures'],
      advisor: ['responsive', 'knowledgeable', 'supportive', 'flexible'],
      course: ['project-based', 'group-work', 'practical', 'reading-heavy'],
      dorm: ['quiet', 'social', 'good-location', 'great-amenities'],
      university: ['strong-stem', 'beautiful-campus', 'career-support', 'diverse'],
    };
    return map[targetType];
  }, [targetType]);

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>{targetType}</Text>
      <Text style={styles.title}>{targetLabel}</Text>
      <Text style={styles.hint}>Rate each dimension from 1 (low) to 5 (high).</Text>

      {metrics.map((metric) => (
        <RatingSlider
          key={metric.key}
          label={metric.label}
          value={ratings[metric.key] ?? 3}
          onChange={(value) =>
            setRatings((prev) => ({ ...prev, [metric.key]: value }))
          }
        />
      ))}

      <Text style={styles.section}>Tags</Text>
      <View style={styles.tagRow}>
        {suggestedTags.map((tag) => {
          const active = tags.includes(tag);
          return (
            <Pressable
              key={tag}
              onPress={() =>
                setTags((prev) =>
                  active ? prev.filter((t) => t !== tag) : [...prev, tag]
                )
              }
              style={[styles.tag, active && styles.tagActive]}
            >
              <Text style={[styles.tagText, active && styles.tagTextActive]}>{tag}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>Comment</Text>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="What should other students know?"
        placeholderTextColor={colors.slate}
        multiline
        maxLength={2000}
        style={styles.comment}
      />

      <Pressable
        style={[styles.submit, submitting && styles.submitDisabled]}
        disabled={submitting}
        onPress={() => onSubmit({ ratings, comment, tags })}
      >
        <Text style={styles.submitText}>
          {submitting ? 'Submitting…' : 'Submit review'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  eyebrow: {
    ...typography.caption,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.navy,
    marginBottom: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.slate,
    marginBottom: spacing.lg,
  },
  section: {
    ...typography.body,
    fontWeight: '700',
    color: colors.ink,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    backgroundColor: colors.white,
  },
  tagActive: {
    borderColor: colors.navy,
    backgroundColor: colors.navy,
  },
  tagText: {
    ...typography.caption,
    color: colors.slate,
  },
  tagTextActive: {
    color: colors.white,
  },
  comment: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    color: colors.ink,
    ...typography.body,
  },
  submit: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '700',
  },
});
