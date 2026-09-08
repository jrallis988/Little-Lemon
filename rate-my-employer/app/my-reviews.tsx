import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton, ReviewCard, StarRating } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function MyReviewsScreen() {
  const router = useRouter();
  const { user, getMyReviews, getCompany, getWorkplace, interviews, deleteReview } = useApp();
  const myReviews = getMyReviews();
  const myInterviews = user
    ? interviews.filter((item) => item.userId === user.id)
    : [];

  if (!user) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Sign in to manage your reviews.</Text>
        <PrimaryButton label="Sign in" onPress={() => router.push('/auth')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.lead}>
        Edit or remove experiences you have shared. Edits stay tied to the same employer and
        workplace.
      </Text>

      <Text style={styles.section}>Work reviews ({myReviews.length})</Text>
      {myReviews.length === 0 ? (
        <Text style={styles.empty}>No work reviews yet.</Text>
      ) : (
        myReviews.map((review) => {
          const company = getCompany(review.companyId);
          const workplace = review.workplaceId ? getWorkplace(review.workplaceId) : undefined;
          return (
            <View key={review.id} style={styles.block}>
              <Pressable onPress={() => router.push(`/review/${review.id}`)}>
                <Text style={styles.company}>{company?.name ?? 'Employer'}</Text>
                {workplace ? <Text style={styles.meta}>{workplace.name}</Text> : null}
                <ReviewCard review={review} />
              </Pressable>
              <View style={styles.row}>
                <PrimaryButton
                  label="Edit"
                  variant="secondary"
                  style={{ flex: 1 }}
                  onPress={() => router.push(`/review/edit/${review.id}`)}
                />
                <PrimaryButton
                  label="Delete"
                  variant="ghost"
                  style={{ flex: 1 }}
                  onPress={() =>
                    Alert.alert('Delete review?', 'This cannot be undone.', [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => deleteReview(review.id),
                      },
                    ])
                  }
                />
              </View>
            </View>
          );
        })
      )}

      <Text style={styles.section}>Interviews ({myInterviews.length})</Text>
      {myInterviews.length === 0 ? (
        <Text style={styles.empty}>No interview posts yet.</Text>
      ) : (
        myInterviews.map((item) => {
          const company = getCompany(item.companyId);
          return (
            <Pressable
              key={item.id}
              style={styles.block}
              onPress={() => router.push(`/interview/${item.id}`)}
            >
              <Text style={styles.company}>{company?.name ?? 'Employer'}</Text>
              <Text style={styles.interviewTitle}>{item.role}</Text>
              <StarRating value={item.rating} />
              <Text style={styles.meta} numberOfLines={2}>
                {item.body}
              </Text>
            </Pressable>
          );
        })
      )}

      <PrimaryButton label="Write a new experience" onPress={() => router.push('/(tabs)/write')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  lead: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  empty: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  block: {
    gap: spacing.sm,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  company: { fontFamily: typography.bodySemi, fontSize: 14, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  interviewTitle: { fontFamily: typography.bodyBold, fontSize: 16, color: colors.ink },
  row: { flexDirection: 'row', gap: spacing.sm },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  missingText: { fontFamily: typography.bodyMedium, fontSize: 16, color: colors.inkMuted },
});
