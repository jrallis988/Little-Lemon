import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { averageReviews } from '../lib/averages';
import type { Company, Review } from '../types';
import { colors, radii, spacing } from '../theme';
import { StarRating } from './StarRating';

type Props = {
  company: Company;
  reviews: Review[];
  index?: number;
};

export function CompanyCard({ company, reviews }: Props) {
  const averages = averageReviews(reviews);

  return (
    <Link href={`/company/${company.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
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
    </Link>
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
