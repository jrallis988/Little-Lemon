import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { StarRating } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function InterviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getInterview, getCompany, getWorkplace } = useApp();
  const interview = getInterview(id);
  const company = interview ? getCompany(interview.companyId) : undefined;
  const workplace = interview?.workplaceId
    ? getWorkplace(interview.workplaceId)
    : undefined;

  if (!interview || !company) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Interview not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Interview' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.company}>{company.name}</Text>
        {workplace ? <Text style={styles.meta}>{workplace.name}</Text> : null}
        <Text style={styles.title}>{interview.role} interview</Text>
        <StarRating value={interview.rating} size="lg" />
        <View style={styles.outcome}>
          <Text style={styles.outcomeText}>{interview.outcome} experience</Text>
        </View>
        <Text style={styles.body}>{interview.body}</Text>
        <Text style={styles.section}>Questions asked</Text>
        {interview.questions.map((question) => (
          <View key={question} style={styles.q}>
            <Text style={styles.qText}>{question}</Text>
          </View>
        ))}
        <Text style={styles.meta}>Helpful · {interview.helpfulCount ?? 0}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  company: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    color: colors.blue,
    textTransform: 'uppercase',
  },
  title: { fontFamily: typography.display, fontSize: 26, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  outcome: {
    alignSelf: 'flex-start',
    backgroundColor: colors.blueSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  outcomeText: {
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.blue,
  },
  body: { fontFamily: typography.body, fontSize: 16, lineHeight: 24, color: colors.inkMuted },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  q: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  qText: { fontFamily: typography.body, fontSize: 15, color: colors.ink },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { fontFamily: typography.bodyMedium, color: colors.inkMuted },
});
