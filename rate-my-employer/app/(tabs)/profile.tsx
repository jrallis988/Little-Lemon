import { useRouter } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ReviewCard } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, getMyReviews, getCompany, deleteReview, signOut } = useApp();
  const myReviews = getMyReviews();

  if (!user) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Sign in to manage your reviews.</Text>
        <Pressable style={styles.primary} onPress={() => router.push('/auth')}>
          <Text style={styles.primaryText}>Sign in</Text>
        </Pressable>
      </View>
    );
  }

  const onDelete = (reviewId: string) => {
    Alert.alert('Delete review?', 'This cannot be undone on this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const error = await deleteReview(reviewId);
          if (error) Alert.alert('Error', error);
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Pressable
          style={styles.secondary}
          onPress={async () => {
            await signOut();
          }}
        >
          <Text style={styles.secondaryText}>Sign out</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Your reviews</Text>
      {myReviews.length === 0 ? (
        <Text style={styles.empty}>
          You have not posted a review yet. Use Search or Contribute to get started.
        </Text>
      ) : (
        myReviews.map((review) => {
          const company = getCompany(review.companyId);
          return (
            <View key={review.id} style={styles.block}>
              <Text style={styles.company}>{company?.name ?? 'Employer'}</Text>
              <ReviewCard review={review} />
              <View style={styles.row}>
                <Pressable
                  style={styles.linkBtn}
                  onPress={() => router.push(`/company/${review.companyId}`)}
                >
                  <Text style={styles.linkText}>View employer</Text>
                </Pressable>
                <Pressable style={styles.dangerBtn} onPress={() => onDelete(review.id)}>
                  <Text style={styles.dangerText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  header: {
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  name: {
    fontFamily: typography.display,
    fontSize: 28,
    color: colors.surface,
  },
  email: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.mist,
    marginBottom: spacing.sm,
  },
  secondary: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  secondaryText: {
    fontFamily: typography.bodyBold,
    fontSize: 13,
    color: colors.ink,
  },
  section: {
    marginTop: spacing.sm,
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  empty: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.inkSoft,
  },
  block: { gap: spacing.sm },
  company: {
    fontFamily: typography.bodySemi,
    fontSize: 14,
    color: colors.inkMuted,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  linkBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    backgroundColor: colors.mist,
  },
  linkText: {
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.ink,
  },
  dangerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    backgroundColor: '#F7E4E1',
  },
  dangerText: {
    fontFamily: typography.bodySemi,
    fontSize: 13,
    color: colors.danger,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  missingText: {
    fontFamily: typography.bodyMedium,
    fontSize: 16,
    color: colors.inkMuted,
  },
  primary: {
    backgroundColor: colors.accent,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  primaryText: {
    fontFamily: typography.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
});
