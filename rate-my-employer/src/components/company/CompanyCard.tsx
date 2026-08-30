import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { averageReviews } from '../../lib/averages';
import type { Company, Review } from '../../types';
import { colors, radii, spacing, typography } from '../../theme';
import { StarRating } from '../ui/StarRating';

type Props = {
  company: Company;
  reviews: Review[];
  subtitle?: string;
};

export function CompanyCard({ company, reviews, subtitle }: Props) {
  const router = useRouter();
  const averages = averageReviews(reviews);

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => router.push(`/company/${company.id}`)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.logo, { backgroundColor: company.logoColor ?? colors.navy }]}>
        <Text style={styles.logoText}>{company.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.meta}>{subtitle ?? `${company.industry} · ${company.location}`}</Text>
        <View style={styles.row}>
          <StarRating value={averages.overall} size="sm" />
          <Text style={styles.count}>
            {averages.reviewCount === 0
              ? 'No reviews yet'
              : `${averages.reviewCount} review${averages.reviewCount === 1 ? '' : 's'}`}
          </Text>
        </View>
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
    flexDirection: 'row',
    gap: spacing.md,
  },
  pressed: { opacity: 0.92 },
  logo: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: typography.bodyBold,
    fontSize: 20,
    color: '#FFFFFF',
  },
  body: { flex: 1, gap: 4 },
  name: {
    fontFamily: typography.displaySemi,
    fontSize: 17,
    color: colors.ink,
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontFamily: typography.bodyMedium,
    fontSize: 12,
    color: colors.inkSoft,
  },
});
