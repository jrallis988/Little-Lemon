import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RatingStars } from '@/components/social/RatingStars';
import { ReviewCard } from '@/components/social/ReviewCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_TRACKS, reviewsForTrack } from '@/lib/demoData';
import { useTasteStore } from '@/store/useTasteStore';
import type { RatingValue } from '@/types/models';

const RATING_OPTIONS: RatingValue[] = [1, 2, 3, 4, 5];

/**
 * Track detail — Letterboxd log/rate/review + PureVolume download/repost.
 * No music player.
 */
export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const track = DEMO_TRACKS.find((t) => t.id === id) ?? DEMO_TRACKS[0];
  const reviews = reviewsForTrack(track.id);

  const logged = useTasteStore((s) => Boolean(s.loggedIds[track.id]));
  const rating = useTasteStore((s) => s.ratings[track.id]);
  const toggleLog = useTasteStore((s) => s.toggleLog);
  const setRating = useTasteStore((s) => s.setRating);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <View style={styles.hero}>
          <View style={styles.art}>
            <Text style={styles.artMark}>{track.artistName.charAt(0)}</Text>
          </View>
          <View style={styles.heroMeta}>
            <Text style={styles.title}>{track.title}</Text>
            <Link href={`/artist/${track.artistId}`}>
              <Text style={styles.artist}>{track.artistName}</Text>
            </Link>
            <Text style={styles.scene}>
              {[track.scene, track.geography].filter(Boolean).join(' · ')}
            </Text>
            {rating ? <RatingStars value={rating} size="md" /> : null}
          </View>
        </View>

        <View style={styles.logBox}>
          <Text style={styles.sectionLabel}>Your diary</Text>
          <Pressable
            style={[styles.ctaPrimary, logged && styles.ctaLogged]}
            onPress={() => toggleLog(track.id)}
          >
            <Text
              style={[styles.ctaPrimaryText, logged && styles.ctaLoggedText]}
            >
              {logged ? 'Logged' : 'Log this track'}
            </Text>
          </Pressable>
          <Text style={styles.rateHint}>Rate</Text>
          <View style={styles.rateRow}>
            {RATING_OPTIONS.map((value) => {
              const active = rating === value;
              return (
                <Pressable
                  key={value}
                  style={[styles.rateChip, active && styles.rateChipActive]}
                  onPress={() => setRating(track.id, value)}
                >
                  <Text
                    style={[
                      styles.rateChipText,
                      active && styles.rateChipTextActive,
                    ]}
                  >
                    {value}★
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.statsBox}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {track.downloadCount.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {track.repostCount.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Reposts</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.ctaSecondary}>
            <Text style={styles.ctaSecondaryText}>Download</Text>
          </Pressable>
          <Pressable style={styles.ctaSecondary}>
            <Text style={styles.ctaSecondaryText}>Repost</Text>
          </Pressable>
        </View>

        <Text style={styles.note}>
          Log and review like Letterboxd. Download and repost support the
          artist. Play counts stay private. No in-app player.
        </Text>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Reviews</Text>
          </View>
          {reviews.length === 0 ? (
            <Text style={styles.empty}>No reviews yet. Be the first.</Text>
          ) : (
            <View style={styles.panelBody}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  hero: {
    ...portalBox,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.sm,
  },
  art: {
    width: 112,
    height: 112,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artMark: {
    fontFamily: fonts.condensedBold,
    fontSize: 36,
    color: colors.textDim,
  },
  heroMeta: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  artist: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.link,
  },
  scene: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  logBox: {
    ...portalBox,
    padding: spacing.sm,
    gap: 8,
  },
  sectionLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  rateHint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  rateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  rateChip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  rateChipActive: {
    borderColor: colors.link,
    backgroundColor: colors.link,
  },
  rateChipText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.text,
  },
  rateChipTextActive: {
    color: '#FFFFFF',
  },
  statsBox: {
    ...portalBox,
    flexDirection: 'row',
    paddingVertical: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ctaPrimary: {
    backgroundColor: colors.link,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaPrimaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  ctaLogged: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.link,
  },
  ctaLoggedText: {
    color: colors.link,
  },
  ctaSecondary: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaSecondaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  note: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  panel: {
    ...portalBox,
    overflow: 'hidden',
  },
  panelHeader: {
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  panelTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  panelBody: {
    padding: spacing.sm,
    paddingBottom: 0,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.md,
  },
});
