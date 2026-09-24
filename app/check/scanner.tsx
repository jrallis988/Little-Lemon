import React, { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { AppHeader, BioCrossButton } from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { BarcodeScannerView } from '../../src/features/scan/BarcodeScannerView';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function ScannerScreen() {
  const router = useRouter();
  const { lookupBarcode, profile } = useBioCross();
  const [flashOn, setFlashOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lastCode, setLastCode] = useState<string | null>(null);

  const processBarcode = useCallback(
    async (code: string) => {
      if (busy) return;
      setBusy(true);
      setLastCode(code);
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      try {
        const supplement = await lookupBarcode(code);
        if (!supplement) {
          router.replace({ pathname: '/check/issue', params: { kind: 'unknown_product' } });
          return;
        }
        const needsAttention =
          profile?.readiness === 'needs_attention' ||
          profile?.readiness === 'getting_started' ||
          profile?.items.some((i) => i.status === 'not_reviewed' || i.status === 'pending_review');
        if (needsAttention) {
          router.replace({
            pathname: '/check/issue',
            params: { kind: 'outdated_profile', supplementId: supplement.id },
          });
          return;
        }
        router.replace({
          pathname: '/check/confirm',
          params: { supplementId: supplement.id, source: 'barcode' },
        });
      } catch {
        router.replace({ pathname: '/check/issue', params: { kind: 'offline' } });
      } finally {
        setBusy(false);
      }
    },
    [busy, lookupBarcode, profile, router],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />
      <View style={styles.viewfinder}>
        <BarcodeScannerView
          onScan={(r) => processBarcode(r.data)}
          onPermissionDenied={() =>
            router.replace({ pathname: '/check/issue', params: { kind: 'permission' } })
          }
          flashOn={flashOn}
          paused={busy}
        />
        <View style={styles.frame} pointerEvents="none">
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
        <Pressable
          onPress={() => setFlashOn((v) => !v)}
          style={[styles.flash, flashOn && styles.flashOn]}
          accessibilityRole="button"
          accessibilityLabel={flashOn ? 'Turn flash off' : 'Turn flash on'}
        >
          <Ionicons name={flashOn ? 'flash' : 'flash-outline'} size={22} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text style={styles.hint}>Align the barcode within the frame</Text>
        {lastCode ? <Text style={styles.code}>Last scan: {lastCode}</Text> : null}
        <BioCrossButton
          label="Enter barcode manually"
          variant="outline"
          onPress={() => router.push('/check/manual-barcode')}
        />
      </View>
    </SafeAreaView>
  );
}

const cornerBase = {
  position: 'absolute' as const,
  width: 32,
  height: 32,
  borderColor: '#fff',
};
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D1117' },
  viewfinder: { flex: 1, margin: spacing.md, borderRadius: radii.lg, overflow: 'hidden' },
  frame: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center' },
  corner: cornerBase,
  tl: { top: 40, left: 40, borderTopWidth: 3, borderLeftWidth: 3 },
  tr: { top: 40, right: 40, borderTopWidth: 3, borderRightWidth: 3 },
  bl: { bottom: 40, left: 40, borderBottomWidth: 3, borderLeftWidth: 3 },
  br: { bottom: 40, right: 40, borderBottomWidth: 3, borderRightWidth: 3 },
  flash: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashOn: { backgroundColor: colors.brand.blue },
  footer: { padding: spacing.xl, gap: spacing.sm },
  hint: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  code: { color: colors.text.tertiary, textAlign: 'center', fontSize: typography.size.xs },
});
