import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AlbumCover } from '@/components/AlbumCover';
import { RatingStars } from '@/components/RatingStars';
import { fonts, palette, spacing } from '@/constants/theme';
import type { FeedItem } from '@/types/models';

type Props = {
  item: FeedItem;
  index?: number;
};

export function FeedCard({ item, index = 0 }: Props) {
  const { log, user, album } = item;
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);
  const scale = useSharedValue(0.98);

  useEffect(() => {
    opacity.value = withDelay(index * 70, withTiming(1, { duration: 420 }));
    translateY.value = withDelay(index * 70, withSpring(0, { damping: 18, stiffness: 120 }));
    scale.value = withDelay(index * 70, withSpring(1, { damping: 16, stiffness: 140 }));
  }, [index, opacity, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.accentPip} />

      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: user.avatarColor }]}>
          <Text style={styles.avatarText}>{user.displayName.slice(0, 1)}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.meta}>
            @{user.handle} · {formatRelative(log.createdAt)}
          </Text>
        </View>
        {log.liked ? (
          <View style={styles.likedBadge}>
            <Text style={styles.liked}>♥</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <AlbumCover album={album} size={112} />
        <View style={styles.albumMeta}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.artist}>
            {album.artist}
            {album.year ? `  ·  ${album.year}` : ''}
          </Text>
          <View style={styles.ratingRow}>
            <RatingStars value={log.rating} />
          </View>
          {log.review ? <Text style={styles.review}>{log.review}</Text> : null}
        </View>
      </View>
    </Animated.View>
  );
}

function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.lg,
    paddingLeft: spacing.sm,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: palette.rule,
  },
  accentPip: {
    position: 'absolute',
    left: 0,
    top: spacing.lg + 8,
    width: 3,
    height: 28,
    backgroundColor: palette.accent,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(214,255,58,0.35)',
  },
  avatarText: {
    fontFamily: fonts.bodyBold,
    color: palette.white,
    fontSize: 14,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: palette.ink,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: 2,
  },
  likedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,77,46,0.12)',
  },
  liked: {
    color: palette.signal,
    fontSize: 14,
  },
  body: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  albumMeta: {
    flex: 1,
    gap: 5,
    justifyContent: 'center',
  },
  albumTitle: {
    fontFamily: fonts.displayBlack,
    fontSize: 24,
    lineHeight: 28,
    color: palette.ink,
    letterSpacing: -0.6,
  },
  artist: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
  },
  ratingRow: {
    marginTop: 2,
  },
  review: {
    marginTop: spacing.sm,
    fontFamily: fonts.displayItalic,
    fontSize: 16,
    lineHeight: 23,
    color: palette.ink,
  },
});
