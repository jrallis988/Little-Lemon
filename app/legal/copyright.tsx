import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { ReportButton } from '@/components/trust/ReportButton';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';

export default function CopyrightScreen() {
  const bottomInset = useBottomInset();
  return (
    <StaticBackground>
      <Stack.Screen options={{ title: 'Copyright' }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.h1}>Copyright & takedown</Text>
        <Text style={styles.p}>
          If you believe material on StaticVolume infringes your copyright,
          submit a report with enough detail to locate the work (URL or artist /
          track name), your contact email, and a good-faith statement of
          ownership.
        </Text>
        <Text style={styles.p}>
          We review open reports, may disable the material while investigating,
          and keep an audit trail. Repeat infringement can lead to account
          restrictions.
        </Text>
        <Text style={styles.p}>
          Use the report control on an artist or track page, or start a general
          copyright report below.
        </Text>
        <ReportButton
          targetKind="track"
          targetId="general-copyright"
          label="Start a copyright report"
        />
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
