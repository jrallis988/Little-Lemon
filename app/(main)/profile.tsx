import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ListCard } from '@/components/social/ListCard';
import { RatingStars } from '@/components/social/RatingStars';
import { ReviewCard } from '@/components/social/ReviewCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import {
  DEMO_LISTS,
  DEMO_LISTENERS,
  DEMO_REVIEWS,
  diaryForUser,
  getTrackById,
  listsForUser,
} from '@/lib/demoData';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';

/**
 * Taste archive — Letterboxd-style profile: diary, reviews, lists.
 * Signed-out users see a sample member profile so the product pitch is clear.
 */
export default function ProfileScreen() {
  const { profile, session, signOut, isLoading } = useUserStore();
  const bottomInset = useBottomInset(spacing.tabBar);

  const sample = DEMO_LISTENERS[0];
  const showDemo = !session || !profile;
  const diary = diaryForUser(sample.id);
  const lists = showDemo ? listsForUser(sample.id) : DEMO_LISTS.slice(0, 2);
  const reviews = DEMO_REVIEWS.filter((r) => r.userId === sample.id);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        {showDemo ? (
          <View style={styles.pitch}>
            <Text style={styles.brand}>staticvolume</Text>
            <Text style={styles.lede}>
              The music version of Letterboxd — and a place to actually find
              unsigned bands and brand-new friend groups. Log tracks, write
              reviews, keep lists. Artists get downloads and reposts. Nobody
              gets a music player.
            </Text>
            {!isSupabaseConfigured ? (
              <Text style={styles.warn}>
                Supabase env keys missing. Add EXPO_PUBLIC_SUPABASE_URL and
                EXPO_PUBLIC_SUPABASE_ANON_KEY to enable auth.
              </Text>
            ) : null}
            <Link href="/(auth)/login" asChild>
              <Pressable style={styles.cta}>
                <Text style={styles.ctaText}>Sign in</Text>
              </Pressable>
            </Link>
            <Link href="/(auth)/signup" asChild>
              <Pressable style={styles.secondary}>
                <Text style={styles.secondaryText}>Create account</Text>
              </Pressable>
            </Link>
            <Text style={styles.sampleLabel}>Sample member profile</Text>
          </View>
        ) : (
          <View style={styles.identity}>
            <Text style={styles.kicker}>{profile.role}</Text>
            <Text style={styles.name}>{profile.displayName}</Text>
            <Text style={styles.email}>{profile.email}</Text>
            {profile.role === 'artist' ? (
              <Link href={`/artist/${profile.id}`} asChild>
                <Pressable style={styles.secondary}>
                  <Text style={styles.secondaryText}>View artist page</Text>
                </Pressable>
              </Link>
            ) : null}
            <Pressable
              style={styles.signOut}
              onPress={() => void signOut()}
              disabled={isLoading}
            >
              <Text style={styles.signOutText}>Sign out</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.headerBox}>
          <Text style={styles.memberName}>
            {showDemo ? sample.displayName : profile!.displayName}
          </Text>
          <Text style={styles.bio}>
            {showDemo
              ? sample.bio
              : profile!.bio ?? 'Build your diary, reviews, and lists.'}
          </Text>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{diary.length}</Text>
              <Text style={styles.statLabel}>Logged</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{reviews.length}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{lists.length}</Text>
              <Text style={styles.statLabel}>Lists</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {(showDemo
                  ? sample.followerCount
                  : profile!.followerCount) ?? 0}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Diary</Text>
          </View>
          {diary.map((entry) => {
            const track = getTrackById(entry.trackId);
            if (!track) return null;
            return (
              <Link key={entry.id} href={`/track/${track.id}`} asChild>
                <Pressable style={styles.diaryRow}>
                  <View style={styles.diaryMeta}>
                    <Text style={styles.diaryDate}>{entry.loggedOn}</Text>
                    <Text style={styles.diaryTitle} numberOfLines={1}>
                      {track.title}
                    </Text>
                    <Text style={styles.diaryArtist} numberOfLines={1}>
                      {track.artistName}
                    </Text>
                  </View>
                  <RatingStars value={entry.rating} />
                </Pressable>
              </Link>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
          </View>
          <View style={styles.sectionPad}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showTrack />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lists</Text>
          </View>
          <View style={styles.sectionPad}>
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </View>
        </View>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  pitch: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  brand: {
    fontFamily: fonts.condensedBold,
    fontSize: 28,
    color: colors.text,
    textTransform: 'lowercase',
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  warn: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.danger,
  },
  cta: {
    backgroundColor: colors.link,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  secondaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
  sampleLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginTop: spacing.sm,
  },
  identity: {
    gap: 4,
    marginBottom: spacing.sm,
  },
  kicker: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  email: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  signOut: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  signOutText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.danger,
  },
  headerBox: {
    ...portalBox,
    padding: spacing.sm,
    gap: 6,
  },
  memberName: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    color: colors.text,
  },
  bio: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  statRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.sm,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontFamily: fonts.sansBold,
    fontSize: 18,
    color: colors.text,
  },
  statLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  section: {
    ...portalBox,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  sectionPad: {
    padding: spacing.sm,
    paddingBottom: 0,
  },
  diaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  diaryMeta: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  diaryDate: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  diaryTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
  diaryArtist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
});
