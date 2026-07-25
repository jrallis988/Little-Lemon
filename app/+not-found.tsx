import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'NO SIGNAL' }} />
      <StaticBackground>
        <View style={styles.container}>
          <Text style={styles.title}>STATIC // 404</Text>
          <Text style={styles.body}>This frequency does not exist.</Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Return to editorial →</Text>
          </Link>
        </View>
      </StaticBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.headline,
    color: colors.phosphor,
  },
  body: {
    ...typography.body,
    color: colors.textMuted,
  },
  link: {
    marginTop: spacing.md,
  },
  linkText: {
    ...typography.caption,
    color: colors.copper,
  },
});
