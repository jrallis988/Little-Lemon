import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography, fonts } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import { DEMO_COMMENTS, DEMO_TRACKS } from '@/lib/demoData';

/**
 * Track detail with waveform-anchored public comments.
 * Play counts stay private to the artist — only downloads / reposts surface here.
 */
export default function TrackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomInset = useAudioBarInset();
  const track = DEMO_TRACKS.find((t) => t.id === id) ?? DEMO_TRACKS[0];
  const comments = DEMO_COMMENTS.filter((c) => c.trackId === track.id);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.kicker}>PHYSICAL MEDIA FRAME</Text>
        <View style={styles.heroArt}>
          <Text style={styles.heroMark}>STATICVOLUME</Text>
          <Text style={styles.heroTitle}>{track.title}</Text>
        </View>

        <WaveformPlayer track={track} comments={comments} />

        <View style={styles.actions}>
          <View style={styles.action}>
            <Text style={styles.actionValue}>{track.downloadCount.toLocaleString()}</Text>
            <Text style={styles.actionLabel}>DOWNLOADS</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.actionValue}>{track.repostCount.toLocaleString()}</Text>
            <Text style={styles.actionLabel}>REPOSTS</Text>
          </View>
        </View>
        <Text style={styles.privateNote}>
          Play counts remain private to the artist. No likes. No hearts.
        </Text>

        <Text style={styles.section}>WAVEFORM COMMENTS</Text>
        {comments.length === 0 ? (
          <Text style={styles.empty}>No comments pinned to this signal yet.</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentMeta}>
                {comment.displayName} · {formatStamp(comment.timestampMs)}
              </Text>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </StaticBackground>
  );
}

function formatStamp(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  kicker: {
    ...typography.monoTiny,
    color: colors.copper,
  },
  heroArt: {
    height: 200,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  heroMark: {
    ...typography.monoTiny,
    color: colors.phosphorDim,
    letterSpacing: 3,
  },
  heroTitle: {
    ...typography.headline,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.sm,
  },
  action: {
    gap: 2,
  },
  actionValue: {
    ...typography.headline,
    color: colors.copper,
  },
  actionLabel: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  privateNote: {
    ...typography.caption,
    color: colors.textMuted,
  },
  section: {
    ...typography.monoTiny,
    color: colors.textDim,
    letterSpacing: 2,
    marginTop: spacing.lg,
  },
  empty: {
    ...typography.body,
    color: colors.textDim,
  },
  comment: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
    gap: 4,
  },
  commentMeta: {
    ...typography.monoTiny,
    color: colors.phosphorDim,
  },
  commentBody: {
    ...typography.body,
    color: colors.text,
  },
});
