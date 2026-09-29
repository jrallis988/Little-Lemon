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
  | 'network'
  | 'scan_failure'
  | 'unknown_product'
  | 'incomplete_label'
  | 'label_partial'
  | 'formulation_uncertain'
  | 'outdated_profile'
  | 'unavailable_evidence'
  | 'research_unavailable'
  | 'analysis_failed'
  | 'upload_failed'
  | 'unsupported_file';

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
    title: "You're offline",
    body: 'BioCross needs a connection to look up products and evidence. Check your network and try again. Previously saved checks in History are still available.',
    icon: 'cloud-offline-outline',
    primary: 'Try again',
    secondary: 'Go to History',
  },
  network: {
    title: "You're offline",
    body: 'BioCross needs a connection to look up products and evidence. Check your network and try again. Previously saved checks in History are still available.',
    icon: 'cloud-offline-outline',
    primary: 'Try again',
    secondary: 'Go to History',
  },
  scan_failure: {
    title: "We couldn't read that scan",
    body: "The barcode or label wasn't clear enough. Try better lighting, hold steadier, or use another way to find the product.",
    icon: 'scan-outline',
    primary: 'Try scanning again',
    secondary: 'Search by name',
  },
  unknown_product: {
    title: 'Product not recognized',
    body: "BioCross couldn't match this barcode to a known supplement. You can search by name, enter the barcode manually, or photograph the Supplement Facts panel.",
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
  label_partial: {
    title: 'Label only partially readable',
    body: 'Some Supplement Facts lines were unclear. A clearer photo helps BioCross verify ingredients before analyzing.',
    icon: 'document-text-outline',
    primary: 'Photograph the label again',
    secondary: 'Search by name',
  },
  formulation_uncertain: {
    title: 'Formulation could not be verified',
    body: 'BioCross could not confidently match this product to a complete ingredient list. Review the label or search by name before analyzing.',
    icon: 'flask-outline',
    primary: 'Review supplement label',
    secondary: 'Search by name',
  },
  outdated_profile: {
    title: 'Your health profile may be out of date',
    body: "Some key profile sections haven't been reviewed recently. Updating them helps BioCross avoid missing relevant interactions. BioCross will not invent a positive safety result when information is incomplete.",
    icon: 'clipboard-outline',
    primary: 'Review health profile',
    secondary: 'Continue anyway',
  },
  unavailable_evidence: {
    title: 'Evidence temporarily unavailable',
    body: "BioCross couldn't retrieve supporting research sources for this finding right now. Your check result is still saved. Try viewing evidence again later.",
    icon: 'library-outline',
    primary: 'Back to result',
    secondary: 'Go Home',
  },
  research_unavailable: {
    title: 'Research sources unavailable',
    body: "BioCross couldn't load supporting research for this check right now. Your saved result is still available. Try again when you're back online.",
    icon: 'library-outline',
    primary: 'Try again',
    secondary: 'Go to History',
  },
  analysis_failed: {
    title: 'Analysis could not be completed',
    body: 'Something went wrong while checking this supplement. Your health profile was not changed. Try again or confirm the product details.',
    icon: 'alert-circle-outline',
    primary: 'Try again',
    secondary: 'Confirm product',
  },
  upload_failed: {
    title: 'Upload failed',
    body: 'Your health record could not be uploaded. Check your connection and file size, then try again.',
    icon: 'cloud-upload-outline',
    primary: 'Try upload again',
    secondary: 'Enter information manually',
  },
  unsupported_file: {
    title: 'File type not supported',
    body: 'BioCross supports PDF, JPG, and PNG health records up to 25MB. Choose a different file or enter information manually.',
    icon: 'document-outline',
    primary: 'Choose another file',
    secondary: 'Enter information manually',
  },
};

function resolveIssueKind(kind?: string): IssueKind {
  if (kind && kind in COPY) return kind as IssueKind;
  return 'scan_failure';
}

export default function CheckIssueScreen() {
  const router = useRouter();
  const { kind, supplementId, checkId } = useLocalSearchParams<{
    kind?: string;
    supplementId?: string;
    checkId?: string;
  }>();

  const issue = resolveIssueKind(kind);
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
      case 'network':
        router.replace('/(tabs)/check');
        break;
      case 'scan_failure':
        router.replace('/(tabs)/check');
        break;
      case 'unknown_product':
        router.push('/check/search');
        break;
      case 'incomplete_label':
      case 'label_partial':
        router.push({
          pathname: '/check/label-review',
          params: supplementId ? { supplementId } : undefined,
        });
        break;
      case 'formulation_uncertain':
        router.push({
          pathname: '/check/label-review',
          params: supplementId ? { supplementId } : undefined,
        });
        break;
      case 'outdated_profile':
        router.push('/(tabs)/profile');
        break;
      case 'unavailable_evidence':
      case 'research_unavailable':
        if (checkId) router.replace(`/result/${checkId}`);
        else router.back();
        break;
      case 'analysis_failed':
        if (supplementId) {
          router.replace({ pathname: '/check/confirm', params: { supplementId } });
        } else {
          router.replace('/(tabs)/check');
        }
        break;
      case 'upload_failed':
      case 'unsupported_file':
        router.push('/onboarding/health-profile');
        break;
    }
  };

  const onSecondary = () => {
    switch (issue) {
      case 'permission':
        router.push('/check/manual-barcode');
        break;
      case 'offline':
      case 'network':
        router.push('/(tabs)/history');
        break;
      case 'scan_failure':
        router.push('/check/search');
        break;
      case 'unknown_product':
        router.push('/check/manual-barcode');
        break;
      case 'incomplete_label':
      case 'label_partial':
      case 'formulation_uncertain':
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
      case 'research_unavailable':
        router.push('/(tabs)/history');
        break;
      case 'analysis_failed':
        router.push('/check/search');
        break;
      case 'upload_failed':
      case 'unsupported_file':
        router.push('/onboarding/health-profile');
        break;
    }
  };

  const cautionIcon =
    issue === 'outdated_profile' ||
    issue === 'incomplete_label' ||
    issue === 'label_partial' ||
    issue === 'formulation_uncertain';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} />
      <View style={styles.content}>
        <View style={[styles.iconWrap, cautionIcon && styles.iconCaution]}>
          <Ionicons
            name={copy.icon}
            size={32}
            color={cautionIcon ? colors.semantic.caution : colors.brand.blue}
          />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {copy.title}
        </Text>
        <Text style={styles.body}>{copy.body}</Text>

        <HealthCard style={styles.card}>
          <InfoCallout
            tone={issue === 'outdated_profile' ? 'warning' : 'info'}
            title="BioCross won't guess"
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
