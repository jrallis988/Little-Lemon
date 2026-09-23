import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActivityEntry } from '@/components/social/ActivityEntry';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_ACTIVITY } from '@/lib/demoData';
import { isSupabaseConfigured } from '@/lib/supabase';
import { fetchFollowingActivity } from '@/lib/tasteApi';
import { useUserStore } from '@/store/useUserStore';
import type { ActivityItem } from '@/types/models';

/**
 * Letterboxd-style activity feed — friends logging, reviewing, listing.
 * Chronological only. Not an artist broadcast feed. Not a player queue.
 */
export default function ActivityScreen() {
  const bottomInset = useBottomInset(spacing.tabBar);
  const session = useUserStore((s) => s.session);
  const [feed, setFeed] = useState<ActivityItem[]>(() =>
    [...DEMO_ACTIVITY].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  );
  const [source, setSource] = useState<'following' | 'demo'>('demo');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!session || !isSupabaseConfigured) {
      setFeed(
        [...DEMO_ACTIVITY].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      );
      setSource('demo');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const remote = await fetchFollowingActivity();
      if (remote.length) {
        setFeed(remote);
        setSource('following');
      } else {
        setFeed(
          [...DEMO_ACTIVITY].sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt),
          ),
        );
        setSource('demo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load activity.');
      setFeed(
        [...DEMO_ACTIVITY].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      );
      setSource('demo');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Activity</Text>
        <Text style={styles.lede}>
          People you follow logging tracks, writing reviews, downloading, and
          reposting. Chronological — no algorithmic reorder. No in-app player.
        </Text>
        <Text style={styles.source}>
          {loading
            ? 'Loading…'
            : source === 'following'
              ? 'Your following feed'
              : session
                ? 'Sample activity — follow artists to fill this feed'
                : 'Sample activity — sign in + follow to personalize'}
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {session ? (
          <Pressable onPress={() => void refresh()}>
            <Text style={styles.refresh}>Refresh</Text>
          </Pressable>
        ) : null}

        {feed.map((item) => (
          <ActivityEntry key={item.id} item={item} />
        ))}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  source: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    marginBottom: spacing.md,
  },
  refresh: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
    marginBottom: spacing.md,
  },
  error: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
});
