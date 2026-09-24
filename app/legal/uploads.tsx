import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';

export default function UploadTermsScreen() {
  const bottomInset = useBottomInset();
  return (
    <StaticBackground>
      <Stack.Screen options={{ title: 'Upload terms' }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.h1}>Upload terms</Text>
        <Text style={styles.p}>
          By uploading audio, artwork, or profile media you confirm you own the
          rights or have permission to distribute that material on StaticVolume.
        </Text>
        <Text style={styles.p}>
          File limits and allowed types are enforced in Studio. You may delete
          your own uploads. Moderators may set disabled_at on material that
          violates policy without destroying related social records.
        </Text>
        <Text style={styles.p}>
          Do not upload Spotify or other third-party streams. Catalog music is
          metadata for discovery only; listening happens on outbound services.
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
