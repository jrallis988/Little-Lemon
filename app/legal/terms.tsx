import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';

export default function TermsScreen() {
  const bottomInset = useBottomInset();
  return (
    <StaticBackground>
      <Stack.Screen options={{ title: 'Terms of Service' }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.h1}>Terms of Service</Text>
        <Text style={styles.p}>
          StaticVolume is a music discovery and taste-logging community. It is
          not a streaming service. Catalog listening is handed off to outbound
          services such as Spotify. Independent artists may offer downloads
          according to their upload settings.
        </Text>
        <Text style={styles.p}>
          You agree not to upload content you do not own or lack rights to
          distribute; not to scrape or proxy copyrighted audio; and not to use
          the service to harass others. We may disable content or accounts that
          violate these terms without deleting associated diary or review
          history needed for transparency.
        </Text>
        <Text style={styles.p}>
          Featured and Just Found placements are human-curated. Following feeds
          are chronological. Public artist-support signals are Downloads and
          Reposts — not track likes or public play counts.
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
