import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, radii, spacing, typography } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const {
    user,
    notificationPrefs,
    updateProfile,
    changePassword,
    updateNotificationPrefs,
    signOut,
  } = useApp();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [username, setUsername] = useState(user?.username ?? '');
  const [headline, setHeadline] = useState(user?.headline ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [busyProfile, setBusyProfile] = useState(false);
  const [busyPassword, setBusyPassword] = useState(false);

  if (!user) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.copy}>Sign in to manage your account.</Text>
        <PrimaryButton label="Sign in" onPress={() => router.push('/auth')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.copy}>Signed in as {user.email}</Text>

      <Text style={styles.section}>Profile</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Display name"
        placeholderTextColor={colors.inkSoft}
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={colors.inkSoft}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={headline}
        onChangeText={setHeadline}
        placeholder="Headline (optional)"
        placeholderTextColor={colors.inkSoft}
      />
      {profileError ? <Text style={styles.error}>{profileError}</Text> : null}
      {profileMessage ? <Text style={styles.success}>{profileMessage}</Text> : null}
      <PrimaryButton
        label={busyProfile ? 'Saving…' : 'Save profile'}
        variant="secondary"
        disabled={busyProfile}
        onPress={async () => {
          setBusyProfile(true);
          setProfileError(null);
          setProfileMessage(null);
          const error = await updateProfile({ displayName, username, headline });
          setBusyProfile(false);
          if (error) {
            setProfileError(error);
            return;
          }
          setProfileMessage('Profile updated.');
        }}
      />

      <Text style={styles.section}>Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current password"
        placeholderTextColor={colors.inkSoft}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={nextPassword}
        onChangeText={setNextPassword}
        placeholder="New password"
        placeholderTextColor={colors.inkSoft}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {passwordMessage ? <Text style={styles.success}>{passwordMessage}</Text> : null}
      <PrimaryButton
        label={busyPassword ? 'Updating…' : 'Change password'}
        variant="secondary"
        disabled={busyPassword}
        onPress={async () => {
          setBusyPassword(true);
          setPasswordError(null);
          setPasswordMessage(null);
          const error = await changePassword({ currentPassword, nextPassword });
          setBusyPassword(false);
          if (error) {
            setPasswordError(error);
            return;
          }
          setCurrentPassword('');
          setNextPassword('');
          setPasswordMessage('Password updated.');
        }}
      />

      <Text style={styles.section}>Notifications</Text>
      <PrefRow
        label="Employer replies"
        value={notificationPrefs.replies}
        onChange={(replies) => updateNotificationPrefs({ replies })}
      />
      <PrefRow
        label="Helpful votes on my posts"
        value={notificationPrefs.helpfulVotes}
        onChange={(helpfulVotes) => updateNotificationPrefs({ helpfulVotes })}
      />
      <PrefRow
        label="Product updates"
        value={notificationPrefs.productUpdates}
        onChange={(productUpdates) => updateNotificationPrefs({ productUpdates })}
      />

      <PrimaryButton
        label="Community guidelines"
        variant="ghost"
        onPress={() => router.push('/guidelines')}
      />
      <PrimaryButton
        label="Report content"
        variant="ghost"
        onPress={() => router.push('/report')}
      />
      <PrimaryButton
        label="Log out"
        onPress={async () => {
          await signOut();
          router.replace('/auth');
        }}
      />
    </ScrollView>
  );
}

function PrefRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.prefRow}>
      <Text style={styles.prefLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.mist, true: colors.blue }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md, backgroundColor: colors.surface },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
  section: {
    fontFamily: typography.bodySemi,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.inkSoft,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.ink,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  prefLabel: { flex: 1, fontFamily: typography.bodyMedium, fontSize: 15, color: colors.ink },
  error: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.danger },
  success: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.success },
});
