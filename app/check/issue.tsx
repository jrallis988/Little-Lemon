import React from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, BioCrossButton, HealthCard, InfoCallout } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';

type IssueKind =
  | 'permission'
  | 'offline'
  | 'scan_failure'
  | 'unknown_product'
  | 'incomplete_label'
  | 'outdated_profile'
  | 'unavailable_evidence';

const COPY: Record<
  IssueKind,
  {
    title: string;
    body: string;
    icon: keyof typeof Ionicons.glyphMap;
    primary: string;
    secondary?: string;
  }
> = {
  permission: {
    title: 'Camera access needed',
    body: 'BioCross needs camera permission to scan barcodes and photograph Supplement Facts labels. You can enable access in your device settings.',
    icon: 'camera-outline',
    primary: 'Open Settings',
    secondary: 'Enter barcode manually',
  },
  offline: {
    title: 'You’re offline',
    body: 'BioCross needs a connection to look up products and evidence. Check your network and try again. Previously saved checks in History are still available.',
    icon: 'cloud-offline-outline',
    primary: 'Try again',
    secondary: 'Go to History',
  },
  scan_failure: {
    title: 'We couldn’t read that scan',
    body: 'The barcode or label wasn’t clear enough. Try better lighting, hold steadier, or use another way to find the product.',
    icon: 'scan-outline',
    primary: 'Try scanning again',
    secondary: 'Search by name',
  },
  unknown_product: {
    title: 'Product not recognized',
    body: 'BioCross couldn’t match this barcode to a known supplement. You can search by name, enter the barcode manually, or photograph the Supplement Facts panel.',
    icon: 'help-circle-outline',
    primary: 'Search by name',
    secondary: 'Enter barcode manually',
  },
  incomplete_label: {
    title: 'More label information needed',
    body: 'BioCross found a product but the formulation details are incomplete. Photograph the Supplement Facts panel so we can review ingredients before analyzing.',
    icon: 'document-text-outline',
    primary: 'Photograph the label',
    secondary: 'Search by name',
  },
  outdated_profile: {
    title: 'Your health profile may be out of date',
    body: 'Some key profile sections haven’t been reviewed recently. Updating them helps BioCross avoid missing relevant interactions — BioCross will not invent a positive safety result when information is incomplete.',
    icon: 'clipboard-outline',
    primary: 'Review health profile',
    secondary: 'Continue anyway',
  },
  unavailable_evidence: {
    title: 'Evidence temporarily unavailable',
    body: 'BioCross couldn’t retrieve supporting research sources for this finding right now. Your check result is still saved. Try viewing evidence again later.',
    icon: 'library-outline',
    primary: 'Back to result',
    secondary: 'Go Home',
  },
};

export default function CheckIssueScreen() {
  const router = useRouter();
  const { kind, supplementId, checkId } = useLocalSearchParams<{
    kind?: string;
    supplementId?: string;
    checkId?: string;
  }>();

  const issue: IssueKind =
    kind && kind in COPY ? (kind as IssueKind) : 'scan_failure';
  const copy = COPY[issue];

  const onPrimary = async () => {
    switch (issue) {
      case 'permission':
        if (Platform.OS !== 'web') {
          await Linking.openSettings();
        } else {
          router.push('/check/manual-barcode');
        }
        break;
      case 'offline':
        router.replace('/(tabs)/check');
        break;
      case 'scan_failure':
        router.replace('/(tabs)/check');
        break;
      case 'unknown_product':
        router.push('/check/search');
        break;
      case 'incomplete_label':
        router.push({
          pathname: '/check/label-review',
          params: supplementId ? { supplementId } : undefined,
        });
        break;
      case 'outdated_profile':
        router.push('/(tabs)/profile');
        break;
      case 'unavailable_evidence':
        if (checkId) router.replace(`/result/${checkId}`);
        else router.back();
        break;
    }
  };

  const onSecondary = () => {
    switch (issue) {
      case 'permission':
        router.push('/check/manual-barcode');
        break;
      case 'offline':
        router.push('/(tabs)/history');
        break;
      case 'scan_failure':
        router.push('/check/search');
        break;
      case 'unknown_product':
        router.push('/check/manual-barcode');
        break;
      case 'incomplete_label':
        router.push('/check/search');
        break;
      case 'outdated_profile':
        if (supplementId) {
          router.push({ pathname: '/check/analyzing', params: { supplementId } });
        } else {
          router.push('/(tabs)/check');
        }
        break;
      case 'unavailable_evidence':
        router.push('/(tabs)/home');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <View style={styles.content}>
        <View style={[styles.iconWrap, issue === 'outdated_profile' && styles.iconCaution]}>
          <Ionicons
            name={copy.icon}
            size={32}
            color={
              issue === 'outdated_profile' || issue === 'incomplete_label'
                ? colors.semantic.caution
                : colors.brand.blue
            }
          />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {copy.title}
        </Text>
        <Text style={styles.body}>{copy.body}</Text>

        <HealthCard style={styles.card}>
          <InfoCallout
            tone={issue === 'outdated_profile' ? 'warning' : 'info'}
            title="BioCross won’t guess"
            body="When information is missing or unclear, BioCross shows that more detail is needed instead of inventing a safety result."
          />
        </HealthCard>

        <BioCrossButton label={copy.primary} onPress={onPrimary} />
        {copy.secondary ? (
          <BioCrossButton
            label={copy.secondary}
            variant="ghost"
            onPress={onSecondary}
            style={styles.secondary}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  iconCaution: { backgroundColor: colors.semantic.cautionBg },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
    textAlign: 'center',
  },
  body: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: { marginVertical: spacing.sm },
  secondary: { marginTop: spacing.xs },
});
