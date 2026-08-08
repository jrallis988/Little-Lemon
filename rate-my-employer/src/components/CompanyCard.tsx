import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { averageReviews } from '../lib/averages';
import type { Company, Review } from '../types';
import { colors, radii, spacing } from '../theme';
import { StarRating } from './StarRating';

type Props = {
  company: Company;
  reviews: Review[];
};

export function CompanyCard({ company, reviews }: Props) {
  const router = useRouter();
  const averages = averageReviews(reviews);

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => router.push(`/company/${company.id}`)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.meta}>
          {company.industry} · {company.location}
        </Text>
      </View>
      <View style={styles.bottom}>
        <StarRating value={averages.overall} size="sm" />
        <Text style={styles.count}>
          {averages.reviewCount === 0
            ? 'No reviews yet'
            : `${averages.reviewCount} review${averages.reviewCount === 1 ? '' : 's'}`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as object) : null),
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    borderColor: colors.ink,
  },
  top: {
    gap: 4,
  },
  name: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 22,
    color: colors.ink,
  },
  meta: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: colors.inkSoft,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: colors.inkMuted,
  },
});
