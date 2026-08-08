import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton, ReviewCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { formatMoney } from '../../src/lib/averages';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const {
    user,
    isGuest,
    getMyReviews,
    getMySalaries,
    getCompany,
    deleteReview,
    signOut,
  } = useApp();
  const myReviews = getMyReviews();
  const mySalaries = getMySalaries();
  const upvotes = myReviews.reduce((sum, review) => sum + (review.helpfulCount ?? 0), 0);

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
        <Text style={styles.email}>{user.email}</Text>
        {user.isVerifiedEmployee ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Verified Employee · {user.workEmailDomain}
            </Text>
          </View>
        ) : (
          <Pressable onPress={() => router.push('/verify-work')}>
            <Text style={styles.verifyLink}>Get Verified Employee badge</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.stats}>
        <Stat label="Reviews" value={String(myReviews.length)} />
        <Stat label="Salaries" value={String(mySalaries.length)} />
        <Stat label="Upvotes" value={String(upvotes)} />
      </View>

      <Text style={styles.section}>My reviews</Text>
      {myReviews.length === 0 ? (
        <Text style={styles.empty}>No reviews yet.</Text>
      ) : (
        myReviews.map((review) => (
          <View key={review.id} style={styles.block}>
            <Text style={styles.company}>{getCompany(review.companyId)?.name}</Text>
            <ReviewCard review={review} />
            <View style={styles.row}>
              <PrimaryButton
                label="Open"
                variant="ghost"
                style={styles.smallBtn}
                onPress={() => router.push(`/review/${review.id}`)}
              />
              <PrimaryButton
                label="Delete"
                variant="ghost"
                style={styles.smallBtn}
                onPress={() =>
                  Alert.alert('Delete review?', undefined, [
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
        ))
      )}

      <Text style={styles.section}>My salaries</Text>
      {mySalaries.length === 0 ? (
        <Text style={styles.empty}>No salary points yet.</Text>
      ) : (
        mySalaries.map((salary) => (
          <View key={salary.id} style={styles.salaryCard}>
            <Text style={styles.company}>{getCompany(salary.companyId)?.name}</Text>
            <Text style={styles.salaryRole}>{salary.role}</Text>
            <Text style={styles.salaryAmt}>{formatMoney(salary.baseAnnual, salary.currency)}</Text>
          </View>
        ))
      )}

      <PrimaryButton label="Account settings" variant="ghost" onPress={() => router.push('/settings')} />
      <PrimaryButton
        label="Log out"
        variant="ink"
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
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: 4,
  },
  name: { fontFamily: typography.display, fontSize: 28, color: colors.surface },
  email: { fontFamily: typography.body, fontSize: 14, color: colors.mist },
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  badgeText: {
    fontFamily: typography.bodyBold,
    fontSize: 12,
    color: colors.ink,
  },
  verifyLink: {
    marginTop: 8,
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.accent,
  },
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
  row: { flexDirection: 'row', gap: spacing.sm },
  smallBtn: { flex: 1, paddingVertical: 10 },
  salaryCard: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  salaryRole: { fontFamily: typography.body, fontSize: 14, color: colors.inkSoft },
  salaryAmt: { fontFamily: typography.bodyBold, fontSize: 18, color: colors.ink },
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
