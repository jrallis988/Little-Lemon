import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/constants/theme';
import { useAudioStore } from '@/store/useAudioStore';

/**
 * Bottom-docked persistent player. Sits above the tab bar when a track is loaded.
 */
export function GlobalAudioBar() {
  const insets = useSafeAreaInsets();
  const { currentTrack, isPlaying, progress, togglePlay, skipNext } = useAudioStore();

  if (!currentTrack) {
    return null;
  }

  return (
    <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
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
          <Text style={styles.artMark}>◆</Text>
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
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.backgroundElevated,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    zIndex: 20,
  },
  progressTrack: {
    height: 2,
    backgroundColor: colors.borderSubtle,
  },
  progressFill: {
    height: 2,
    backgroundColor: colors.phosphor,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artMark: {
    color: colors.phosphorDim,
    fontSize: 12,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.caption,
    color: colors.text,
  },
  artist: {
    ...typography.monoTiny,
    color: colors.textMuted,
  },
  control: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabel: {
    ...typography.caption,
    color: colors.phosphor,
  },
});
