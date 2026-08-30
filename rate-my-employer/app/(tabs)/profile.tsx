import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton, ReviewCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isGuest, getMyReviews, getCompany, interviews, deleteReview, signOut } = useApp();
  const myReviews = getMyReviews();
  const myInterviews = user
    ? interviews.filter((item) => item.userId === user.id)
    : [];

  if (!user) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>
          {isGuest ? 'Browsing as guest.' : 'Sign in to manage your activity.'}
        </Text>
        <PrimaryButton label="Sign in / Register" onPress={() => router.push('/auth')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>
          {user.username ? `@${user.username} · ` : ''}
          {user.email}
        </Text>
      </View>

      <View style={styles.stats}>
        <Stat label="Reviews" value={String(myReviews.length)} />
        <Stat label="Interviews" value={String(myInterviews.length)} />
      </View>

      <PrimaryButton label="My Reviews" variant="secondary" onPress={() => {}} />
      <PrimaryButton label="Saved Employers" variant="secondary" onPress={() => router.push('/saved')} />
      <PrimaryButton label="Account Settings" variant="secondary" onPress={() => router.push('/settings')} />
      <PrimaryButton label="Community Guidelines" variant="ghost" onPress={() => router.push('/guidelines')} />

      <Text style={styles.section}>Recent reviews</Text>
      {myReviews.length === 0 ? (
        <Text style={styles.empty}>No reviews yet.</Text>
      ) : (
        myReviews.slice(0, 3).map((review) => (
          <View key={review.id} style={styles.block}>
            <Text style={styles.company}>{getCompany(review.companyId)?.name}</Text>
            <ReviewCard review={review} />
            <PrimaryButton
              label="Delete"
              variant="ghost"
              onPress={() =>
                Alert.alert('Delete review?', undefined, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => deleteReview(review.id) },
                ])
              }
            />
          </View>
        ))
      )}

      <PrimaryButton
        label="Log out"
        variant="primary"
        onPress={async () => {
          await signOut();
          router.replace('/auth');
        }}
      />
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  header: {
    backgroundColor: colors.navy,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: 4,
  },
  name: { fontFamily: typography.display, fontSize: 26, color: '#FFFFFF' },
  email: { fontFamily: typography.body, fontSize: 14, color: '#B8C7E0' },
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: { fontFamily: typography.display, fontSize: 24, color: colors.ink },
  statLabel: { fontFamily: typography.body, fontSize: 12, color: colors.inkSoft },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  empty: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  block: { gap: spacing.sm },
  company: { fontFamily: typography.bodySemi, fontSize: 14, color: colors.inkMuted },
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
