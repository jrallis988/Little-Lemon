import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '../../lib/averages';
import type { FeedItem } from '../../types';
import { colors, radii, spacing, typography } from '../../theme';
import { StarRating } from '../ui/StarRating';

type Props = { item: FeedItem };

export function FeedTicket({ item }: Props) {
  const router = useRouter();

  if (item.kind === 'salary') {
    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/company/${item.company.id}`)}
      >
        <Text style={styles.kicker}>Salary drop</Text>
        <Text style={styles.title}>{item.company.name}</Text>
        <Text style={styles.meta}>
          {item.salary.role} · {item.salary.yearsExperience ?? '—'} yrs
        </Text>
        <Text style={styles.salary}>
          {formatMoney(item.salary.baseAnnual, item.salary.currency)}
          {item.salary.bonusAnnual
            ? ` + ${formatMoney(item.salary.bonusAnnual, item.salary.currency)} bonus`
            : ''}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/review/${item.review.id}`)}>
      <Text style={styles.kicker}>Community review</Text>
      <Text style={styles.title}>{item.company.name}</Text>
      <Text style={styles.reviewTitle}>{item.review.title}</Text>
      <View style={styles.row}>
        <StarRating value={item.review.scores.overall} size="sm" />
        <Text style={styles.meta}>{item.review.role}</Text>
      </View>
      <Text style={styles.body} numberOfLines={2}>
        {item.review.body}
      </Text>
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
    gap: 6,
  },
  kicker: {
    fontFamily: typography.bodySemi,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkSoft,
  },
  title: {
    fontFamily: typography.displaySemi,
    fontSize: 20,
    color: colors.ink,
  },
  reviewTitle: {
    fontFamily: typography.bodySemi,
    fontSize: 15,
    color: colors.inkMuted,
  },
  meta: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  salary: {
    fontFamily: typography.bodyBold,
    fontSize: 18,
    color: colors.ink,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
  },
});
