import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlbumCover } from '@/components/AlbumCover';
import { RatingStars } from '@/components/RatingStars';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { useLogs } from '@/context/LogsContext';
import { fonts, palette, radii, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { logsForUser, clearUserLogs } = useLogs();
  const { getAlbum, clearExtras } = useCatalog();
  const [resetting, setResetting] = useState(false);

  if (!user) return null;

  const myLogs = logsForUser(user.id);

  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/login');
  }

  async function handleResetLocalData() {
    setResetting(true);
    try {
      await clearUserLogs();
      await clearExtras();
    } finally {
      setResetting(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.brand}>Profile</Text>
      <View style={styles.brandRule} />

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
          const album = getAlbum(log.albumId);
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
        testID="reset-local-data"
        onPress={handleResetLocalData}
        disabled={resetting}
        style={({ pressed }) => [styles.reset, pressed && { opacity: 0.7 }]}>
        <Text style={styles.resetText}>
          {resetting ? 'Clearing…' : 'Clear local listens'}
        </Text>
      </Pressable>

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
    fontFamily: fonts.displayBlack,
    fontSize: 40,
    letterSpacing: -1.4,
    color: palette.ink,
    marginTop: spacing.md,
    lineHeight: 44,
  },
  brandRule: {
    width: 48,
    height: 4,
    backgroundColor: palette.accent,
    marginTop: spacing.sm,
    borderRadius: 2,
  },
  identity: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.accent,
  },
  avatarText: {
    fontFamily: fonts.displayBlack,
    fontSize: 30,
    color: palette.white,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: palette.ink,
    letterSpacing: -0.4,
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
    gap: spacing.sm,
  },
  stat: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: palette.rule,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  statValue: {
    fontFamily: fonts.displayBlack,
    fontSize: 28,
    color: palette.ink,
  },
  statLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: palette.inkMuted,
    marginTop: 2,
  },
  section: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: palette.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  empty: {
    fontFamily: fonts.displayItalic,
    fontSize: 16,
    color: palette.inkMuted,
  },
  diaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.rule,
  },
  diaryMeta: {
    flex: 1,
    gap: 2,
    justifyContent: 'center',
  },
  diaryTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: palette.ink,
  },
  diaryArtist: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.inkMuted,
  },
  signOut: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: 'rgba(7, 21, 28, 0.2)',
  },
  signOutText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.ink,
  },
  reset: {
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(7, 21, 28, 0.06)',
  },
  resetText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
  },
});
