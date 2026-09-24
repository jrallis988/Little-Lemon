import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';

export default function PrivacyScreen() {
  const bottomInset = useBottomInset();
  return (
    <StaticBackground>
      <Stack.Screen options={{ title: 'Privacy Policy' }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.h1}>Privacy Policy</Text>
        <Text style={styles.p}>
          We store account identity, artist profiles, uploads you choose to
          publish, and taste actions (logs, ratings, reviews, lists, follows,
          downloads, reposts) so the community layer works across devices.
        </Text>
        <Text style={styles.p}>
          Play/stream analytics for independent uploads, when available, stay
          private to the artist. We do not sell listening graphs as an
          engagement marketplace.
        </Text>
        <Text style={styles.p}>
          Contact us to export or delete your account data. Soft-disabled
          content may remain in internal moderation records as required for
          copyright and safety.
        </Text>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.sm },
  h1: { fontFamily: fonts.sansBold, fontSize: 22, color: colors.text },
  p: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
});
