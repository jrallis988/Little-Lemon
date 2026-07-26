import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '@/constants/theme';
import { useAudioStore } from '@/store/useAudioStore';

/**
 * Sticky bottom-docked player — persists across tabs and stack routes.
 */
export function GlobalAudioBar() {
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, progress, togglePlay, skipNext } = useAudioStore();

  if (!currentTrack) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.host}>
      <View
        style={[styles.dock, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}
      >
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` as DimensionValue },
            ]}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.art}>
            <Text style={styles.artMark}>▶</Text>
          </View>
          <Link href={`/track/${currentTrack.id}`} asChild>
            <Pressable style={styles.meta}>
              <Text style={styles.title} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {currentTrack.artistName}
              </Text>
            </Pressable>
          </Link>
          <Pressable onPress={togglePlay} style={styles.control} hitSlop={10}>
            <Text style={styles.controlLabel}>{isPlaying ? '||' : '▶'}</Text>
          </Pressable>
          <Pressable onPress={skipNext} style={styles.control} hitSlop={10}>
            <Text style={styles.controlLabel}>»»</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 100,
    elevation: 24,
  },
  dock: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  progressTrack: {
    height: 2,
    backgroundColor: colors.borderSubtle,
  },
  progressFill: {
    height: 2,
    backgroundColor: colors.link,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    minHeight: spacing.audioBar - 8,
  },
  art: {
    width: 40,
    height: 40,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artMark: {
    color: colors.link,
    fontSize: 12,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.text,
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  control: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
});
