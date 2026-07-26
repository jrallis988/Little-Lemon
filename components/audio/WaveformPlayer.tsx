import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, spacing, fonts } from '@/constants/theme';
import { useAudioStore } from '@/store/useAudioStore';
import type { Track, WaveformComment } from '@/types/models';

type WaveformPlayerProps = {
  track: Track;
  comments?: WaveformComment[];
  onCommentPress?: (comment: WaveformComment) => void;
  onSeek?: (positionMs: number) => void;
};

/** Seeded pseudo-random for stable analog-looking waveforms per track */
function seededNoise(seed: string, length: number): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  const values: number[] = [];
  for (let i = 0; i < length; i += 1) {
    h = (Math.imul(h ^ (h >>> 13), 0x5bd1e995) + i) | 0;
    const n = ((h >>> 0) % 1000) / 1000;
    const envelope = Math.sin((i / length) * Math.PI) * 0.7 + 0.3;
    values.push(0.15 + n * 0.85 * envelope);
  }
  return values;
}

function buildAnalogPath(samples: number[], width: number, height: number): string {
  const mid = height / 2;
  const step = width / Math.max(samples.length - 1, 1);
  let d = `M 0 ${mid}`;
  samples.forEach((amp, i) => {
    const x = i * step;
    const y = mid - amp * (height * 0.42);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  for (let i = samples.length - 1; i >= 0; i -= 1) {
    const x = i * step;
    const y = mid + samples[i] * (height * 0.38);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  d += ' Z';
  return d;
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Analog-signal waveform with timestamped comment markers (SoundCloud-style).
 */
export function WaveformPlayer({
  track,
  comments = [],
  onCommentPress,
  onSeek,
}: WaveformPlayerProps) {
  const { currentTrack, isPlaying, progress, positionMs, togglePlay, setTrack, seek } =
    useAudioStore();

  const isActive = currentTrack?.id === track.id;
  const width = 320;
  const height = 64;

  const samples = useMemo(() => seededNoise(track.id, 64), [track.id]);
  const path = useMemo(
    () => buildAnalogPath(samples, width, height),
    [samples],
  );

  const handlePlay = () => {
    if (!isActive) {
      setTrack(track);
      return;
    }
    togglePlay();
  };

  const handleSeek = (locationX: number) => {
    const ratio = Math.max(0, Math.min(1, locationX / width));
    const next = ratio * track.durationMs;
    onSeek?.(next);
    seek(next);
  };

  const playedWidth = `${(isActive ? progress : 0) * 100}%` as DimensionValue;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={handlePlay} style={styles.playBtn} hitSlop={8}>
          <Text style={styles.playLabel}>{isActive && isPlaying ? '||' : '▶'}</Text>
        </Pressable>
        <View style={styles.titles}>
          <Text style={styles.title} numberOfLines={1}>
            {track.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track.artistName}
          </Text>
        </View>
        <Text style={styles.time}>
          {formatTime(isActive ? positionMs : 0)} / {formatTime(track.durationMs)}
        </Text>
      </View>

      <Pressable
        style={styles.waveWrap}
        onPress={(e) => handleSeek(e.nativeEvent.locationX)}
      >
        <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <Path
            d={path}
            fill={colors.surfaceRaised}
            stroke={colors.phosphorDim}
            strokeWidth={1}
          />
        </Svg>
        <View style={[styles.playedMask, { width: playedWidth }]} pointerEvents="none">
          <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Path
              d={path}
              fill={colors.phosphor}
              fillOpacity={0.35}
              stroke={colors.phosphor}
              strokeWidth={1.25}
            />
          </Svg>
        </View>
        <View
          pointerEvents="none"
          style={[styles.playhead, { left: playedWidth }]}
        />
        {comments.map((comment) => {
          const left =
            `${(comment.timestampMs / track.durationMs) * 100}%` as DimensionValue;
          return (
            <Pressable
              key={comment.id}
              style={[styles.commentMark, { left }]}
              onPress={() => onCommentPress?.(comment)}
              hitSlop={6}
            >
              <View style={styles.commentDot} />
            </Pressable>
          );
        })}
      </Pressable>

      <View style={styles.engagement}>
        <Text style={styles.stat}>{track.downloadCount.toLocaleString()} downloads</Text>
        <Text style={styles.statMuted}>{track.repostCount.toLocaleString()} reposts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  playBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accentLine,
    backgroundColor: colors.surface,
    borderRadius: 0,
  },
  playLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.link,
  },
  titles: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  time: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  waveWrap: {
    height: 64,
    justifyContent: 'center',
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    overflow: 'hidden',
  },
  playedMask: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  playhead: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    marginLeft: -1,
    backgroundColor: colors.accentLine,
    opacity: 0.95,
  },
  commentMark: {
    position: 'absolute',
    top: 4,
    marginLeft: -4,
  },
  commentDot: {
    width: 7,
    height: 7,
    borderRadius: 0,
    backgroundColor: colors.copper,
    borderWidth: 1,
    borderColor: colors.text,
  },
  engagement: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    color: colors.text,
  },
  statMuted: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
  },
});

