import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../src/components';
import { useApp } from '../src/context/AppContext';
import { colors, spacing, typography } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useApp();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.copy}>{user ? `Signed in as ${user.email}` : 'Not signed in'}</Text>
      <PrimaryButton
        label="Edit profile"
        variant="secondary"
        onPress={() => Alert.alert('Edit profile', 'Coming soon.')}
      />
      <PrimaryButton
        label="Change password"
        variant="secondary"
        onPress={() => Alert.alert('Password', 'Coming soon.')}
      />
      <PrimaryButton
        label="Notification preferences"
        variant="secondary"
        onPress={() => Alert.alert('Notifications', 'Coming soon.')}
      />
      <PrimaryButton
        label="Theme · System"
        variant="secondary"
        onPress={() => Alert.alert('Theme', 'System default.')}
      />
      <PrimaryButton label="Community guidelines" variant="ghost" onPress={() => router.push('/guidelines')} />
      {user ? (
        <PrimaryButton
          label="Log out"
          onPress={async () => {
            await signOut();
            router.replace('/auth');
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.surface },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted, marginBottom: spacing.sm },
});
