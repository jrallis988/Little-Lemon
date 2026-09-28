import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlbumCover } from '@/components/AlbumCover';
import { RatingStars } from '@/components/RatingStars';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { useLogs } from '@/context/LogsContext';
import { getAlbumById } from '@/data/seed';
import { fonts, palette, radii, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { logsForUser } = useLogs();

  if (!user) return null;

  const myLogs = logsForUser(user.id);

  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/login');
  }

  return (
    <Screen>
      <Text style={styles.brand}>Profile</Text>

      <View style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: user.avatarColor }]}>
          <Text style={styles.avatarText}>{user.displayName.slice(0, 1)}</Text>
        </View>
        <View style={styles.identityText}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.handle}>@{user.handle}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{myLogs.length}</Text>
          <Text style={styles.statLabel}>Listens</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{myLogs.filter((l) => l.review).length}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{myLogs.filter((l) => l.liked).length}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <Text style={styles.section}>Your diary</Text>
      {myLogs.length === 0 ? (
        <Text style={styles.empty}>Nothing logged yet — head to the Log tab.</Text>
      ) : (
        myLogs.map((log) => {
          const album = getAlbumById(log.albumId);
          if (!album) return null;
          return (
            <View key={log.id} style={styles.diaryRow}>
              <AlbumCover album={album} size={52} />
              <View style={styles.diaryMeta}>
                <Text style={styles.diaryTitle}>{album.title}</Text>
                <Text style={styles.diaryArtist}>
                  {album.artist} · {log.listenedOn}
                </Text>
                <RatingStars value={log.rating} />
              </View>
            </View>
          );
        })
      )}

      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [styles.signOut, pressed && { opacity: 0.7 }]}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -1,
    color: palette.ink,
    marginTop: spacing.md,
  },
  identity: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: palette.white,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    color: palette.ink,
  },
  handle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
  },
  email: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.inkFaint,
  },
  stats: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: palette.ink,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: 2,
  },
  section: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: palette.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: palette.inkMuted,
  },
  diaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(11, 31, 42, 0.12)',
  },
  diaryMeta: {
    flex: 1,
    gap: 2,
    justifyContent: 'center',
  },
  diaryTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: palette.ink,
  },
  diaryArtist: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.inkMuted,
  },
  signOut: {
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 42, 0.2)',
  },
  signOutText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.ink,
  },
});
