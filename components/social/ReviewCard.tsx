import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/social/RatingStars';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { getTrackById } from '@/lib/demoData';
import type { Review } from '@/types/models';

type ReviewCardProps = {
  review: Review;
  showTrack?: boolean;
};

/** Written review block — social taste, not a player comment timestamp. */
export function ReviewCard({ review, showTrack = false }: ReviewCardProps) {
  const track = getTrackById(review.trackId);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{review.displayName}</Text>
        <RatingStars value={review.rating} size="md" />
      </View>

      {showTrack && track ? (
        <Link href={`/track/${track.id}`} asChild>
          <Pressable>
            <Text style={styles.trackLink}>
              {track.title} · {track.artistName}
            </Text>
          </Pressable>
        </Link>
      ) : null}

      <Text style={styles.body}>{review.body}</Text>
      <Text style={styles.meta}>
        {review.likeCount > 0 ? `${review.likeCount} liked this review` : 'Review'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...portalBox,
    padding: spacing.sm,
    gap: 6,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
  },
  trackLink: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    marginTop: 2,
  },
});
