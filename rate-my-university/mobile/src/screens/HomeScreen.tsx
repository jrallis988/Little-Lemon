import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { api } from '../api/client';
import { colors, spacing, typography } from '../constants/theme';
import type { University } from '../types';

/** Home: brand-forward campus feed — pick a school to dive into the hierarchy. */
export function HomeScreen() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.listUniversities();
        if (!cancelled) setUniversities(data.items);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load campuses');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.brand}>Rate My University</Text>
        <Text style={styles.headline}>The student utility for every layer of campus.</Text>
        <Text style={styles.sub}>
          Rate professors, advisors, courses, dorms, and the university itself — in one place.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Campuses</Text>
      {loading ? <ActivityIndicator color={colors.accent} /> : null}
      {error ? (
        <Text style={styles.error}>
          {error}
          {'\n'}Start the API (`docker compose up`) then pull to refresh.
        </Text>
      ) : null}

      <FlatList
        data={universities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.campusRow}>
            <Text style={styles.campusName}>{item.name}</Text>
            <Text style={styles.campusMeta}>
              {item.location} · {item.domain}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.empty}>No universities seeded yet.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  hero: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + 8,
    paddingBottom: spacing.lg,
  },
  brand: {
    ...typography.brand,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  headline: {
    ...typography.title,
    color: colors.accentSoft,
    marginBottom: spacing.sm,
  },
  sub: {
    ...typography.body,
    color: colors.mist,
    lineHeight: 22,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.ink,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  campusRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  campusName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.navy,
  },
  campusMeta: {
    ...typography.caption,
    color: colors.slate,
    marginTop: 4,
  },
  error: {
    ...typography.caption,
    color: colors.accent,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  empty: {
    ...typography.body,
    color: colors.slate,
  },
});
