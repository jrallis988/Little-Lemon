import { Link, Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';

const SECTIONS = [
  {
    title: 'Terms of Service',
    href: '/legal/terms' as const,
    body: 'Account rules, acceptable use, and how StaticVolume is not a streaming service.',
  },
  {
    title: 'Privacy Policy',
    href: '/legal/privacy' as const,
    body: 'What we collect, how taste data is used, and your controls.',
  },
  {
    title: 'Upload terms',
    href: '/legal/uploads' as const,
    body: 'What artists affirm when uploading audio and artwork.',
  },
  {
    title: 'Copyright & takedown',
    href: '/legal/copyright' as const,
    body: 'How to request removal of infringing material.',
  },
];

/**
 * Trust center — policies for a real upload + discovery community.
 */
export default function LegalIndexScreen() {
  const bottomInset = useBottomInset();

  return (
    <StaticBackground>
      <Stack.Screen options={{ title: 'Policies' }} />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Trust & policies</Text>
        <Text style={styles.lede}>
          StaticVolume is for discovering and supporting artists — not hosting
          a Spotify clone. Uploads can be disabled without destroying history.
        </Text>
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} asChild>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardBody}>{section.body}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  card: {
    ...portalBox,
    padding: spacing.sm,
    gap: 4,
  },
  cardTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.link,
  },
  cardBody: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
