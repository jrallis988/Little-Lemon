import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
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
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withDelay(index * 60, withTiming(1, { duration: 380 }));
    translateY.value = withDelay(index * 60, withTiming(0, { duration: 380 }));
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: user.avatarColor }]}>
          <Text style={styles.avatarText}>{user.displayName.slice(0, 1)}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.meta}>
            @{user.handle} · logged {formatRelative(log.createdAt)}
          </Text>
        </View>
        {log.liked ? <Text style={styles.liked}>♥</Text> : null}
      </View>

      <View style={styles.body}>
        <AlbumCover album={album} size={88} />
        <View style={styles.albumMeta}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.artist}>
            {album.artist} · {album.year}
          </Text>
          <RatingStars value={log.rating} />
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(11, 31, 42, 0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  liked: {
    color: palette.danger,
    fontSize: 16,
  },
  body: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  albumMeta: {
    flex: 1,
    gap: 4,
  },
  albumTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: palette.ink,
    letterSpacing: -0.3,
  },
  artist: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
  },
  review: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: palette.ink,
  },
});
