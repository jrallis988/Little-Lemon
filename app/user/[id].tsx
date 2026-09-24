import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ListCard } from '@/components/social/ListCard';
import { RatingStars } from '@/components/social/RatingStars';
import { EmptyState, LoadingState } from '@/components/ui/EmptyState';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import type { ProfileRow } from '@/lib/dbTypes';
import { getTrackById } from '@/lib/demoData';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { fetchDiaryForUser, fetchListsForUser } from '@/lib/tasteApi';
import type { DiaryEntry, TasteList } from '@/types/models';

/**
 * Public listener profile — diary / lists centered on musical identity.
 */
export default function ListenerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const [name, setName] = useState('Listener');
  const [bio, setBio] = useState<string | null>(null);
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [lists, setLists] = useState<TasteList[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      if (!id || !isSupabaseConfigured) {
        setMissing(true);
        setLoading(false);
        return;
      }
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (!profile) {
          if (!cancelled) setMissing(true);
          return;
        }
        const row = profile as ProfileRow;
        const [d, l] = await Promise.all([
          fetchDiaryForUser(id),
          fetchListsForUser(id),
        ]);
        if (cancelled) return;
        setName(row.display_name);
        setBio(row.bio);
        setDiary(d);
        setLists(l);
        setMissing(false);
      } catch {
        if (!cancelled) setMissing(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <LoadingState label="Loading listener profile…" />
        </View>
      </StaticBackground>
    );
  }

  if (missing) {
    return (
      <StaticBackground>
        <View style={{ padding: spacing.lg }}>
          <EmptyState
            title="Profile not found"
            body="This listener has no public profile row yet."
          />
        </View>
      </StaticBackground>
    );
  }

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>Listener</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>
            {bio ?? 'This is what they listen to and discover.'}
          </Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{diary.length}</Text>
              <Text style={styles.statLabel}>Logged</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{lists.length}</Text>
              <Text style={styles.statLabel}>Lists</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Diary</Text>
          </View>
          {diary.length === 0 ? (
            <Text style={styles.empty}>No logs yet.</Text>
          ) : (
            diary.map((entry) => {
              const track = getTrackById(entry.trackId);
              return (
                <View key={entry.id} style={styles.diaryRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.diaryDate}>{entry.loggedOn}</Text>
                    <Text style={styles.diaryTitle}>
                      {track?.title ?? entry.trackId}
                    </Text>
                    <Text style={styles.diaryArtist}>
                      {track?.artistName ?? ''}
                    </Text>
                  </View>
                  <RatingStars value={entry.rating} />
                </View>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lists</Text>
          </View>
          <View style={styles.pad}>
            {lists.length === 0 ? (
              <Text style={styles.empty}>No lists yet.</Text>
            ) : (
              lists.map((list) => <ListCard key={list.id} list={list} />)
            )}
          </View>
        </View>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    ...portalBox,
    padding: spacing.sm,
    gap: 6,
  },
  kicker: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  bio: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.sm,
  },
  stat: { flex: 1, alignItems: 'center' },
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
  section: { ...portalBox, overflow: 'hidden' },
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
  pad: { padding: spacing.sm },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.sm,
  },
  diaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
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
