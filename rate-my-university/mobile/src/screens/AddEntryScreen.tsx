import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { api } from '../api/client';
import { LayeredSearch } from '../components/LayeredSearch';
import { StructuredRatingForm } from '../components/StructuredRatingForm';
import { colors, spacing, typography } from '../constants/theme';
import type {
  DirectorySearchResult,
  ReviewTargetType,
  RootTabParamList,
} from '../types';

const KIND_TO_TARGET: Partial<Record<DirectorySearchResult['kind'], ReviewTargetType>> = {
  professor: 'professor',
  course: 'course',
  dorm: 'dorm',
  university: 'university',
};

async function getUserToken(): Promise<string> {
  const key = 'rmu_user_token';
  let token = await SecureStore.getItemAsync(key);
  if (!token) {
    token = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    await SecureStore.setItemAsync(key, token);
  }
  return token;
}

type Props = BottomTabScreenProps<RootTabParamList, 'AddEntry'>;

/**
 * Add Entry tab: find an existing entity or invent a new one, then rate it.
 * Detail screens can deep-link here via `prefill` route params.
 */
export function AddEntryScreen({ route }: Props) {
  const prefill = route.params?.prefill;
  const [mode, setMode] = useState<'search' | 'create' | 'rate'>(
    prefill ? 'rate' : 'search'
  );
  const [selected, setSelected] = useState<DirectorySearchResult | null>(
    prefill
      ? {
          kind:
            prefill.targetType === 'advisor' ? 'professor' : (prefill.targetType as DirectorySearchResult['kind']),
          id: prefill.targetId,
          label: prefill.targetLabel,
          subtitle: null,
          university_id: null,
          department_id: null,
        }
      : null
  );
  const [createType, setCreateType] = useState<ReviewTargetType>('professor');
  const [createName, setCreateName] = useState('');
  const [createDept, setCreateDept] = useState('');
  const [createUniversityId, setCreateUniversityId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [prefillType, setPrefillType] = useState<ReviewTargetType | null>(
    prefill?.targetType ?? null
  );

  useEffect(() => {
    if (!prefill) return;
    setPrefillType(prefill.targetType);
    setSelected({
      kind:
        prefill.targetType === 'advisor'
          ? 'professor'
          : (prefill.targetType as DirectorySearchResult['kind']),
      id: prefill.targetId,
      label: prefill.targetLabel,
      subtitle: null,
      university_id: null,
      department_id: null,
    });
    setMode('rate');
  }, [prefill]);

  const targetType: ReviewTargetType = useMemo(() => {
    if (prefillType) return prefillType;
    if (selected) return KIND_TO_TARGET[selected.kind] ?? 'professor';
    return createType;
  }, [selected, createType, prefillType]);

  const targetLabel = selected?.label ?? (createName || 'New entry');

  const startRatingExisting = (result: DirectorySearchResult) => {
    if (!KIND_TO_TARGET[result.kind]) {
      Alert.alert('Pick a rateable item', 'Departments cannot be reviewed directly.');
      return;
    }
    setSelected(result);
    setMode('rate');
  };

  const startCreateFlow = () => {
    setSelected(null);
    setMode('create');
  };

  const confirmCreate = () => {
    if (!createName.trim()) {
      Alert.alert('Name required', 'Enter a name for the new entry.');
      return;
    }
    setMode('rate');
  };

  const handleSubmit = async (payload: {
    ratings: Record<string, number>;
    comment: string;
    tags: string[];
  }) => {
    setSubmitting(true);
    try {
      const user_token = await getUserToken();
      if (selected) {
        await api.submitReview({
          target_type: targetType,
          target_id: selected.id,
          user_token,
          ratings: payload.ratings,
          qualitative_tags: payload.tags,
          comment: payload.comment || undefined,
        });
      } else {
        const body: Parameters<typeof api.submitReview>[0] = {
          target_type: createType,
          user_token,
          ratings: payload.ratings,
          qualitative_tags: payload.tags,
          comment: payload.comment || undefined,
        };
        if (createType === 'professor' || createType === 'advisor') {
          body.create_professor = {
            name: createName.trim(),
            type: createType === 'advisor' ? 'advisor' : 'professor',
            department_name: createDept.trim() || undefined,
            university_id: createUniversityId.trim() || undefined,
          };
        } else if (createType === 'course') {
          body.create_course = {
            course_code: createName.trim().split(' ')[0],
            course_name: createName.trim(),
            department_name: createDept.trim() || undefined,
            university_id: createUniversityId.trim() || undefined,
          };
        } else if (createType === 'dorm') {
          body.create_dorm = {
            building_name: createName.trim(),
            university_id: createUniversityId.trim(),
          };
        }
        await api.submitReview(body);
      }
      Alert.alert('Thanks!', 'Your review was submitted.');
      setMode('search');
      setSelected(null);
      setCreateName('');
    } catch (err) {
      Alert.alert('Submit failed', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === 'rate') {
    return (
      <View style={styles.screen}>
        <Pressable onPress={() => setMode(selected ? 'search' : 'create')}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <StructuredRatingForm
          targetType={targetType}
          targetLabel={targetLabel}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </View>
    );
  }

  if (mode === 'create') {
    return (
      <View style={styles.screenPad}>
        <Pressable onPress={() => setMode('search')}>
          <Text style={styles.back}>← Back to search</Text>
        </Pressable>
        <Text style={styles.title}>Add missing entry</Text>
        <Text style={styles.sub}>
          Auto-creates on first review when the searched entity does not exist yet.
        </Text>

        <View style={styles.typeRow}>
          {(['professor', 'advisor', 'course', 'dorm'] as ReviewTargetType[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setCreateType(t)}
              style={[styles.typeChip, createType === t && styles.typeChipActive]}
            >
              <Text
                style={[styles.typeChipText, createType === t && styles.typeChipTextActive]}
              >
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder={createType === 'course' ? 'e.g. CS-420 Algorithms' : 'Name'}
          placeholderTextColor={colors.slate}
          value={createName}
          onChangeText={setCreateName}
        />
        {(createType === 'professor' ||
          createType === 'advisor' ||
          createType === 'course') && (
          <TextInput
            style={styles.input}
            placeholder="Department name"
            placeholderTextColor={colors.slate}
            value={createDept}
            onChangeText={setCreateDept}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="University UUID"
          placeholderTextColor={colors.slate}
          value={createUniversityId}
          onChangeText={setCreateUniversityId}
          autoCapitalize="none"
        />

        <Pressable style={styles.cta} onPress={confirmCreate}>
          <Text style={styles.ctaText}>Continue to ratings</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screenPad}>
      <Text style={styles.title}>Add review</Text>
      <Text style={styles.sub}>Search first. If nothing turns up, create a new entry.</Text>
      <Pressable style={styles.secondary} onPress={startCreateFlow}>
        <Text style={styles.secondaryText}>Can’t find it? Create new entry</Text>
      </Pressable>
      <LayeredSearch onSelect={startRatingExisting} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  screenPad: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  back: {
    ...typography.caption,
    color: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.navy,
  },
  sub: {
    ...typography.caption,
    color: colors.slate,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  secondary: {
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  secondaryText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '600',
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 8,
    backgroundColor: colors.mist,
  },
  typeChipActive: {
    backgroundColor: colors.navy,
  },
  typeChipText: {
    ...typography.caption,
    color: colors.slate,
  },
  typeChipTextActive: {
    color: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
    color: colors.ink,
    ...typography.body,
  },
  cta: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '700',
  },
});
