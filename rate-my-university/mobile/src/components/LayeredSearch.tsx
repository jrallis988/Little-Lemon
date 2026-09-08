import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { api } from '../api/client';
import { colors, spacing, typography } from '../constants/theme';
import type { DirectorySearchResult } from '../types';

type Layer = 'all' | 'university' | 'department' | 'professor' | 'course' | 'dorm';

const LAYERS: { key: Layer; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'university', label: 'Schools' },
  { key: 'department', label: 'Depts' },
  { key: 'professor', label: 'People' },
  { key: 'course', label: 'Courses' },
  { key: 'dorm', label: 'Housing' },
];

interface LayeredSearchProps {
  universityId?: string;
  onSelect: (result: DirectorySearchResult) => void;
  placeholder?: string;
}

/**
 * Multi-layer directory search: typeahead across the hierarchy with layer chips.
 */
export function LayeredSearch({
  universityId,
  onSelect,
  placeholder = 'Search universities, courses, professors…',
}: LayeredSearchProps) {
  const [query, setQuery] = useState('');
  const [layer, setLayer] = useState<Layer>('all');
  const [results, setResults] = useState<DirectorySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim());
  const universityIdRef = useRef(universityId);
  universityIdRef.current = universityId;

  useEffect(() => {
    let cancelled = false;
    const handle = setTimeout(async () => {
      if (deferredQuery.length < 1) {
        setResults([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await api.searchDirectory(deferredQuery, universityIdRef.current);
        if (cancelled) return;
        setResults(
          layer === 'all' ? data : data.filter((item) => item.kind === layer)
        );
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [deferredQuery, layer]);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={colors.slate}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <View style={styles.layers}>
        {LAYERS.map((item) => {
          const active = item.key === layer;
          return (
            <Pressable
              key={item.key}
              onPress={() => setLayer(item.key)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.kind}-${item.id}`}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => onSelect(item)}>
            <Text style={styles.kind}>{item.kind}</Text>
            <View style={styles.rowBody}>
              <Text style={styles.label}>{item.label}</Text>
              {item.subtitle ? (
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              ) : null}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          deferredQuery.length > 0 && !loading ? (
            <Text style={styles.empty}>No matches. Try another layer or spelling.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    ...typography.body,
    color: colors.ink,
  },
  layers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 999,
    backgroundColor: colors.mist,
  },
  chipActive: {
    backgroundColor: colors.navy,
  },
  chipText: {
    ...typography.caption,
    color: colors.slate,
  },
  chipTextActive: {
    color: colors.white,
  },
  loader: {
    marginVertical: spacing.sm,
  },
  error: {
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  kind: {
    ...typography.caption,
    textTransform: 'uppercase',
    color: colors.accent,
    width: 72,
    marginTop: 2,
  },
  rowBody: {
    flex: 1,
  },
  label: {
    ...typography.body,
    color: colors.ink,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.caption,
    color: colors.slate,
    marginTop: 2,
  },
  empty: {
    ...typography.body,
    color: colors.slate,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
