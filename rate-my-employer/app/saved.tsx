import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StarRating } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function SavedScreen() {
  const router = useRouter();
  const { savedCompanyIds, getCompany, getCompanyAverages, toggleSavedCompany } = useApp();
  const saved = savedCompanyIds
    .map((id) => getCompany(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCompany>>[];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Saved employers</Text>
      {saved.length === 0 ? (
        <Text style={styles.empty}>No saved employers yet.</Text>
      ) : (
        saved.map((company) => {
          const avg = getCompanyAverages(company.id);
          return (
            <Pressable
              key={company.id}
              style={styles.card}
              onPress={() => router.push(`/company/${company.id}`)}
            >
              <View style={[styles.logo, { backgroundColor: company.logoColor ?? colors.navy }]}>
                <Text style={styles.logoText}>{company.name.slice(0, 1)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{company.name}</Text>
                <StarRating value={avg.overall} size="sm" />
              </View>
              <Pressable onPress={() => toggleSavedCompany(company.id)}>
                <Text style={styles.remove}>Remove</Text>
              </Pressable>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { fontFamily: typography.display, fontSize: 26, color: colors.ink },
  empty: { fontFamily: typography.body, fontSize: 15, color: colors.inkSoft },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#FFF', fontFamily: typography.bodyBold, fontSize: 16 },
  name: { fontFamily: typography.bodySemi, fontSize: 16, color: colors.ink, marginBottom: 4 },
  remove: { fontFamily: typography.bodySemi, fontSize: 13, color: colors.danger },
});
