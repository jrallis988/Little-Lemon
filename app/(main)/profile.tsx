import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography, fonts } from '@/constants/theme';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';

/**
 * User / artist account details. Followers visible here only — no global rankings.
 */
export default function ProfileScreen() {
  const { profile, session, signOut, isLoading } = useUserStore();

  if (!session || !profile) {
    return (
      <StaticBackground>
        <View style={styles.container}>
          <Text style={styles.brand}>STATICVOLUME</Text>
          <Text style={styles.lede}>
            Sign in to manage your identity. Artists and listeners share one auth system —
            roles live on the profile.
          </Text>
          {!isSupabaseConfigured ? (
            <Text style={styles.warn}>
              Supabase env keys missing. Add EXPO_PUBLIC_SUPABASE_URL and
              EXPO_PUBLIC_SUPABASE_ANON_KEY to enable auth.
            </Text>
          ) : null}
          <Link href="/(auth)/login" asChild>
            <Pressable style={styles.cta}>
              <Text style={styles.ctaText}>SIGN IN</Text>
            </Pressable>
          </Link>
          <Link href="/(auth)/signup" asChild>
            <Pressable style={styles.secondary}>
              <Text style={styles.secondaryText}>CREATE ACCOUNT</Text>
            </Pressable>
          </Link>
        </View>
      </StaticBackground>
    );
  }

  return (
    <StaticBackground>
      <View style={styles.container}>
        <Text style={styles.kicker}>{profile.role.toUpperCase()}</Text>
        <Text style={styles.name}>{profile.displayName}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        <View style={styles.stats}>
          <Text style={styles.statLabel}>FOLLOWERS</Text>
          <Text style={styles.statValue}>{profile.followerCount ?? 0}</Text>
          <Text style={styles.note}>
            Visible on profile only. No platform rankings. No verified badges.
          </Text>
        </View>

        {profile.role === 'artist' ? (
          <Link href={`/artist/${profile.id}`} asChild>
            <Pressable style={styles.secondary}>
              <Text style={styles.secondaryText}>VIEW ARTIST PAGE</Text>
            </Pressable>
          </Link>
        ) : null}

        <Pressable
          style={styles.signOut}
          onPress={() => void signOut()}
          disabled={isLoading}
        >
          <Text style={styles.signOutText}>SIGN OUT</Text>
        </Pressable>
      </View>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  brand: {
    ...typography.brand,
    color: colors.phosphor,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  warn: {
    ...typography.caption,
    color: colors.copper,
    marginBottom: spacing.md,
  },
  cta: {
    backgroundColor: colors.phosphor,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  ctaText: {
    ...typography.caption,
    color: colors.background,
    letterSpacing: 2,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  secondaryText: {
    ...typography.caption,
    color: colors.phosphor,
    letterSpacing: 2,
  },
  kicker: {
    ...typography.monoTiny,
    color: colors.copper,
  },
  name: {
    ...typography.headline,
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.textMuted,
  },
  stats: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    gap: spacing.xs,
  },
  statLabel: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  statValue: {
    ...typography.headline,
    color: colors.text,
  },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  signOut: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  signOutText: {
    ...typography.caption,
    color: colors.danger,
    letterSpacing: 2,
  },
});
