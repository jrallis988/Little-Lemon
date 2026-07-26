import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { DEMO_COMMENTS, DEMO_TRACKS } from '@/lib/demoData';

function formatStamp(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Track detail — download/repost focused discovery page (no player).
 */
export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useBottomInset();
  const track = DEMO_TRACKS.find((t) => t.id === id) ?? DEMO_TRACKS[0];
  const comments = DEMO_COMMENTS.filter((c) => c.trackId === track.id);

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
          <Pressable style={styles.ctaPrimary}>
            <Text style={styles.ctaPrimaryText}>Download</Text>
          </Pressable>
          <Pressable style={styles.ctaSecondary}>
            <Text style={styles.ctaSecondaryText}>Repost</Text>
          </Pressable>
        </View>

        <Text style={styles.note}>
          Play counts stay private to the artist. No likes. Downloads are the
          public signal.
        </Text>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Comments</Text>
          </View>
          {comments.length === 0 ? (
            <Text style={styles.empty}>No comments yet.</Text>
          ) : (
            comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Text style={styles.commentMeta}>
                  {comment.displayName}
                  {comment.timestampMs > 0
                    ? ` · ${formatStamp(comment.timestampMs)}`
                    : ''}
                </Text>
                <Text style={styles.commentBody}>{comment.body}</Text>
              </View>
            ))
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
    flex: 1,
    backgroundColor: colors.link,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaPrimaryText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: '#FFFFFF',
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
  empty: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textDim,
    padding: spacing.md,
  },
  comment: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    gap: 4,
  },
  commentMeta: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.link,
  },
  commentBody: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
