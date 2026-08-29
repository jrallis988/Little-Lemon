import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, BioCrossButton, ScreenTitle } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

export default function SupportScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.body}>
        <ScreenTitle title="Help & Support" subtitle="We're here to help you use BioCross safely." />
        <Text style={styles.p}>
          For demo builds, support is limited. Production support would include in-app chat or email at
          support@biocross.app.
        </Text>
        <BioCrossButton
          label="Email support (demo)"
          variant="outline"
          onPress={() => Linking.openURL('mailto:support@biocross.app?subject=BioCross%20Support')}
        />
        <Pressable onPress={() => router.push('/legal/how-it-works')} style={styles.link}>
          <Text style={styles.linkText}>How BioCross safety checks work ›</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/legal/disclaimer')} style={styles.link}>
          <Text style={styles.linkText}>Medical disclaimer ›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  p: { color: colors.text.secondary, fontSize: typography.size.md, lineHeight: 24 },
  link: { minHeight: 44, justifyContent: 'center' },
  linkText: { color: colors.brand.blue, fontWeight: '700' },
});
