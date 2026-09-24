import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton, StarRating } from '../../../src/components';
import { useApp } from '../../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../../src/theme';

export default function ChooseWorkplaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getCompany, searchWorkplaces, getCompanyAverages } = useApp();
  const [query, setQuery] = useState('');
  const company = getCompany(id);
  const workplaces = searchWorkplaces(id, query);

  if (!company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Employer not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Workplaces · ${company.name}` }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Choose workplace</Text>
        <Text style={styles.copy}>Find a store, campus, or office for {company.name}.</Text>
        <TextInput
          style={styles.input}
          placeholder="City, state, or zip"
          placeholderTextColor={colors.inkSoft}
          value={query}
          onChangeText={setQuery}
        />
        <PrimaryButton
          label="Use my location (demo)"
          variant="secondary"
          onPress={() => setQuery('Portsmouth')}
        />

        {workplaces.map((workplace) => {
          const avg = getCompanyAverages(company.id, workplace.id);
          return (
            <Pressable
              key={workplace.id}
              style={styles.card}
              onPress={() => router.push(`/workplace/${workplace.id}`)}
            >
              <Text style={styles.name}>{workplace.name}</Text>
              <Text style={styles.meta}>
                {workplace.storeCode ? `${workplace.storeCode} · ` : ''}
                {workplace.address}, {workplace.city}, {workplace.state} {workplace.zip}
              </Text>
              <StarRating value={avg.overall} size="sm" />
              <Text style={styles.meta}>
                {avg.experienceCount ?? avg.reviewCount} experiences
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 26, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
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
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
  },
  name: { fontFamily: typography.bodySemi, fontSize: 16, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
