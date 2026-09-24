import { Link, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { RatingStars } from '@/components/social/RatingStars';
import { ReviewCard } from '@/components/social/ReviewCard';
import { SpotifyOutboundActions } from '@/components/spotify/SpotifyOutboundActions';
import { ReportButton } from '@/components/trust/ReportButton';
import { ArtworkImage } from '@/components/ui/ArtworkImage';
import { EmptyState, LoadingState } from '@/components/ui/EmptyState';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { fetchTrackById } from '@/lib/catalogQuery';
import { reviewsForTrack } from '@/lib/demoData';
import { isSupabaseConfigured } from '@/lib/supabase';
import { trackSpotifyTarget } from '@/lib/spotify';
import {
  countSignalsForTrack,
  fetchReviewsForTrack,
  upsertReview,
} from '@/lib/tasteApi';
import { useTasteStore } from '@/store/useTasteStore';
import { useUserStore } from '@/store/useUserStore';
import type { RatingValue, Review, Track, UserProfile } from '@/types/models';

const RATING_OPTIONS: RatingValue[] = [1, 2, 3, 4, 5];

/**
 * Track detail — Letterboxd log/rate/review + PureVolume download/repost.
 * No music player. Taste writes go to Supabase when configured + signed in.
 */
export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const session = useUserStore((s) => s.session);
  const [track, setTrack] = useState<Track | null>(null);
  const [artist, setArtist] = useState<UserProfile | null>(null);
  const [loadingTrack, setLoadingTrack] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoadingTrack(true);
    void fetchTrackById(id ?? '').then((res) => {
      if (cancelled) return;
      setTrack(res.track);
      setArtist(res.artist);
      setLoadingTrack(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const trackId = track?.id ?? '';
  const logged = useTasteStore((s) => Boolean(s.loggedIds[trackId]));
  const rating = useTasteStore((s) => s.ratings[trackId]);
  const downloaded = useTasteStore((s) => Boolean(s.downloadedIds[trackId]));
  const reposted = useTasteStore((s) => Boolean(s.repostedIds[trackId]));
  const tasteError = useTasteStore((s) => s.error);
  const toggleLog = useTasteStore((s) => s.toggleLog);
  const setRating = useTasteStore((s) => s.setRating);
  const downloadTrack = useTasteStore((s) => s.downloadTrack);
  const toggleRepost = useTasteStore((s) => s.toggleRepost);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);
  const [repostCount, setRepostCount] = useState(0);
  const [reviewBody, setReviewBody] = useState('');
  const [reviewBusy, setReviewBusy] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [actionHint, setActionHint] = useState<string | null>(null);

  useEffect(() => {
    if (!track) return;
    setDownloadCount(track.downloadCount);
    setRepostCount(track.repostCount);
    setReviews(reviewsForTrack(track.id));
  }, [track]);

  const refreshReviews = useCallback(async () => {
    if (!track) return;
    if (!isSupabaseConfigured) {
      setReviews(reviewsForTrack(track.id));
      return;
    }
    try {
      const remote = await fetchReviewsForTrack(track.id);
      setReviews(remote.length ? remote : reviewsForTrack(track.id));
    } catch {
      setReviews(reviewsForTrack(track.id));
    }
  }, [track]);

  const isCatalog =
    track?.catalogKind === 'catalog' || artist?.catalogKind === 'catalog';

  const refreshSignals = useCallback(async () => {
    if (!track || !isSupabaseConfigured || isCatalog) return;
    try {
      const counts = await countSignalsForTrack(track.id);
      setDownloadCount(Math.max(track.downloadCount, counts.downloads));
      setRepostCount(Math.max(track.repostCount, counts.reposts));
    } catch {
      /* keep seed counts */
    }
  }, [isCatalog, track]);

  useEffect(() => {
    void refreshReviews();
    void refreshSignals();
  }, [refreshReviews, refreshSignals]);

  if (loadingTrack) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <LoadingState label="Loading track…" />
        </View>
      </StaticBackground>
    );
  }

  if (!track) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <EmptyState
            title="Track not found"
            body="No catalog or upload row for this id."
          />
        </View>
      </StaticBackground>
    );
  }

  const spotifyTarget = trackSpotifyTarget({
    spotifyTrackId: track.spotifyTrackId,
    title: track.title,
    artistName: track.artistName,
  });

  const current = track;

  async function onDownload() {
    setActionHint(null);
    if (!session) {
      setActionHint('Sign in to download and support the artist.');
      return;
    }
    try {
      await downloadTrack(current.id);
      setDownloadCount((n) => n + (downloaded ? 0 : 1));
      if (current.downloadUrl) {
        await Linking.openURL(current.downloadUrl);
      } else {
        setActionHint(
          'Download recorded. Audio file will open here once the artist finishes uploading.',
        );
      }
    } catch (err) {
      setActionHint(err instanceof Error ? err.message : 'Download failed.');
    }
  }

  async function onRepost() {
    setActionHint(null);
    if (!session) {
      setActionHint('Sign in to repost.');
      return;
    }
    const was = reposted;
    await toggleRepost(current.id);
    setRepostCount((n) => Math.max(0, n + (was ? -1 : 1)));
  }

  async function onSubmitReview() {
    setReviewError(null);
    if (!session) {
      setReviewError('Sign in to write a review.');
      return;
    }
    if (!rating) {
      setReviewError('Pick a rating before publishing.');
      return;
    }
    setReviewBusy(true);
    try {
      await upsertReview({
        trackId: current.id,
        rating,
        body: reviewBody,
      });
      setReviewBody('');
      await refreshReviews();
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Review failed.');
    } finally {
      setReviewBusy(false);
    }
  }

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <View style={styles.hero}>
          <ArtworkImage
            uri={track.artworkUrl}
            label={track.title}
            monogram={track.artistName}
            style={styles.art}
          />
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

        {isCatalog ? (
          <View style={styles.spotifyBox}>
            <Text style={styles.sectionLabel}>Listen on Spotify</Text>
            <SpotifyOutboundActions target={spotifyTarget} showAdd />
          </View>
        ) : null}

        <View style={styles.logBox}>
          <Text style={styles.sectionLabel}>Your diary</Text>
          <Pressable
            style={[styles.ctaPrimary, logged && styles.ctaLogged]}
            onPress={() => void toggleLog(track.id)}
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
                  onPress={() => void setRating(track.id, value)}
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
          {tasteError ? <Text style={styles.error}>{tasteError}</Text> : null}
        </View>

        {!isCatalog ? (
          <>
            <View style={styles.statsBox}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {downloadCount.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Downloads</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {repostCount.toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Reposts</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={[styles.ctaSecondary, downloaded && styles.ctaOn]}
                onPress={() => void onDownload()}
              >
                <Text
                  style={[
                    styles.ctaSecondaryText,
                    downloaded && styles.ctaOnText,
                  ]}
                >
                  {downloaded ? 'Downloaded' : 'Download'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.ctaSecondary, reposted && styles.ctaOn]}
                onPress={() => void onRepost()}
              >
                <Text
                  style={[
                    styles.ctaSecondaryText,
                    reposted && styles.ctaOnText,
                  ]}
                >
                  {reposted ? 'Reposted' : 'Repost'}
                </Text>
              </Pressable>
            </View>
            {actionHint ? <Text style={styles.hint}>{actionHint}</Text> : null}
          </>
        ) : null}

        <Text style={styles.note}>
          {isCatalog
            ? 'Catalog tracks are for discovery, logging, and reviews. Listening opens in Spotify — no in-app player.'
            : 'Log and review like Letterboxd. Download and repost support the artist. Play counts stay private. No in-app player.'}
        </Text>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Write a review</Text>
          </View>
          <View style={styles.reviewForm}>
            <TextInput
              value={reviewBody}
              onChangeText={setReviewBody}
              placeholder="What stuck with you?"
              placeholderTextColor={colors.textDim}
              multiline
              style={styles.reviewInput}
            />
            <Pressable
              style={styles.ctaPrimary}
              onPress={() => void onSubmitReview()}
              disabled={reviewBusy}
            >
              <Text style={styles.ctaPrimaryText}>
                {reviewBusy ? 'Publishing…' : 'Publish review'}
              </Text>
            </Pressable>
            {reviewError ? <Text style={styles.error}>{reviewError}</Text> : null}
          </View>
        </View>

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

        <ReportButton targetKind="track" targetId={track.id} label="Report track" />
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
  spotifyBox: {
    ...portalBox,
    padding: spacing.sm,
    gap: 8,
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
  ctaOn: {
    borderColor: colors.link,
  },
  ctaOnText: {
    color: colors.link,
  },
  note: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
  error: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.danger,
    lineHeight: 16,
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
  reviewForm: {
    padding: spacing.sm,
    gap: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 96,
    padding: 10,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    textAlignVertical: 'top',
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.md,
  },
});
