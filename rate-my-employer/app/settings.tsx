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
      <Text style={styles.copy}>
        {user ? `Signed in as ${user.email}` : 'Not signed in'}
      </Text>

      <PrimaryButton
        label="Notification preferences"
        variant="ghost"
        onPress={() => Alert.alert('Notifications', 'Push preferences will live here.')}
      />
      <PrimaryButton
        label="Terms of service"
        variant="ghost"
        onPress={() => Alert.alert('Terms', 'Terms & conditions placeholder.')}
      />
      <PrimaryButton
        label="Privacy policy"
        variant="ghost"
        onPress={() => Alert.alert('Privacy', 'Privacy policy placeholder.')}
      />
      <PrimaryButton
        label="Verify work email"
        variant="ghost"
        onPress={() => router.push('/verify-work')}
      />
      {user ? (
        <PrimaryButton
          label="Log out"
          variant="ink"
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
  title: { fontFamily: typography.display, fontSize: 30, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted, marginBottom: spacing.sm },
});
