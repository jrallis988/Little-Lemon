import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  BioCrossButton,
  HealthCard,
  InfoCallout,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { BarcodeScannerView } from '../../src/features/scan/BarcodeScannerView';
import { useBioCross } from '../../src/state/BioCrossContext';

const TESTO_BARCODE = '012345678943';
const UNKNOWN_BARCODE = '000000000000';

export default function CheckScreen() {
  const router = useRouter();
  const { lookupBarcode, profile } = useBioCross();
  const [scanning, setScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [demoFailNext, setDemoFailNext] = useState(false);
  const [cameraPaused, setCameraPaused] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scanAnim]);

  const scanLineTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 148],
  });

  const maybeWarnOutdatedProfile = useCallback(
    (next: () => void) => {
      const needsAttention =
        profile?.readiness === 'needs_attention' ||
        profile?.readiness === 'getting_started' ||
        profile?.items.some((i) => i.status === 'not_reviewed' || i.status === 'pending_review');
      if (needsAttention) {
        router.push({
          pathname: '/check/issue',
          params: { kind: 'outdated_profile', supplementId: 'sup-catalog-testo' },
        });
        return;
      }
      next();
    },
    [profile, router],
  );

  const processBarcode = useCallback(
    async (barcode: string) => {
      setScanning(true);
      setCameraPaused(true);
      try {
        if (demoFailNext) {
          router.push({ pathname: '/check/issue', params: { kind: 'scan_failure' } });
          return;
        }
        const supplement = await lookupBarcode(barcode);
        if (!supplement) {
          router.push({ pathname: '/check/issue', params: { kind: 'unknown_product' } });
          return;
        }
        maybeWarnOutdatedProfile(() => {
          router.push({
            pathname: '/check/confirm',
            params: { supplementId: supplement.id, source: 'barcode' },
          });
        });
      } catch {
        router.push({ pathname: '/check/issue', params: { kind: 'offline' } });
      } finally {
        setScanning(false);
        setTimeout(() => setCameraPaused(false), 800);
      }
    },
    [demoFailNext, lookupBarcode, maybeWarnOutdatedProfile, router],
  );

  const handlePhotoLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      router.push({ pathname: '/check/issue', params: { kind: 'permission' } });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled) return;

    router.push({
      pathname: '/check/label-review',
      params: {
        supplementId: 'sup-catalog-mag',
        mode: demoFailNext ? 'incomplete' : 'complete',
      },
    });
  };

  const handleTakeLabelPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      router.push({ pathname: '/check/issue', params: { kind: 'permission' } });
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled) return;
    router.push({
      pathname: '/check/label-review',
      params: { supplementId: 'sup-catalog-mag' },
    });
  };

  const handleScanBarcode = () => processBarcode(TESTO_BARCODE);

  const handleDemoUnknown = () => processBarcode(UNKNOWN_BARCODE);

  const handleLiveScan = (result: { data: string }) => {
    processBarcode(result.data);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenTitle
        title="Scan Supplement Label"
        subtitle="Scan the barcode on your supplement to instantly check it against your health profile."
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.viewfinderWrap}>
          <Pressable
            onPress={() => router.push('/check/scanner')}
            style={styles.viewfinder}
            accessibilityRole="button"
            accessibilityLabel="Open full-screen barcode scanner"
          >
            <BarcodeScannerView
              onScan={handleLiveScan}
              onPermissionDenied={() =>
                router.push({ pathname: '/check/issue', params: { kind: 'permission' } })
              }
              flashOn={flashOn}
              paused={cameraPaused || scanning}
              style={styles.camera}
            />
            <View style={styles.overlay} pointerEvents="none">
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              <View style={styles.alignPill}>
                <Text style={styles.alignText}>Align barcode within the frame</Text>
              </View>
              <Animated.View
                style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]}
              />
            </View>
            <View style={styles.sideControls}>
              <Pressable
                onPress={() => setFlashOn((v) => !v)}
                style={[styles.sideBtn, flashOn && styles.sideBtnOn]}
                accessibilityRole="button"
                accessibilityLabel={flashOn ? 'Turn light off' : 'Turn light on'}
              >
                <Ionicons name={flashOn ? 'flash' : 'flash-outline'} size={18} color="#fff" />
                <Text style={styles.sideLabel}>Light</Text>
              </Pressable>
              <Pressable
                onPress={handlePhotoLibrary}
                style={styles.sideBtn}
                accessibilityRole="button"
                accessibilityLabel="Choose label photo from library"
              >
                <Ionicons name="images-outline" size={18} color="#fff" />
                <Text style={styles.sideLabel}>Photo</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>

        <InfoCallout
          tone="privacy"
          icon="shield-checkmark"
          title="We only scan the barcode."
          body="No personal information is captured."
        />

        <HealthCard style={styles.altCard}>
          <Text style={styles.altTitle}>Other ways to search</Text>
          <AltRow
            icon="search-outline"
            title="Search by name or ingredient"
            subtitle="Find supplements by name, brand, or ingredient."
            onPress={() => router.push('/check/search')}
          />
          <AltRow
            icon="keypad-outline"
            title="Enter barcode manually"
            subtitle="Type the barcode number from the label."
            onPress={() => router.push('/check/manual-barcode')}
          />
          <AltRow
            icon="camera-outline"
            title="Photograph Supplement Facts"
            subtitle="Capture formulation details when barcode data is incomplete."
            onPress={handleTakeLabelPhoto}
          />
        </HealthCard>

        <HealthCard style={styles.eduCard} backgroundColor={colors.brand.blueLight} borderColor={colors.brand.blueMuted}>
          <View style={styles.eduRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eduTitle}>Why scan the label?</Text>
              <Text style={styles.eduBody}>
                Scanning helps us analyze the exact product and formula so we can give you the most
                accurate results.
              </Text>
            </View>
            <Ionicons name="shield-checkmark" size={36} color={colors.brand.blue} />
          </View>
        </HealthCard>

        {Platform.OS === 'web' ? (
          <BioCrossButton
            label="Scan Barcode"
            icon="scan-outline"
            loading={scanning}
            onPress={handleScanBarcode}
            accessibilityHint="Simulates scanning a supplement barcode on web"
          />
        ) : null}

        <Pressable
          onPress={() => setDemoFailNext((v) => !v)}
          style={styles.demoToggle}
          accessibilityRole="switch"
          accessibilityState={{ checked: demoFailNext }}
          accessibilityLabel="Demo failure mode"
        >
          <Text style={styles.demoText}>
            Demo: next scan {demoFailNext ? 'will simulate failure' : 'will succeed'}
          </Text>
        </Pressable>
        {Platform.OS === 'web' ? (
          <Pressable onPress={handleDemoUnknown} style={styles.demoToggle}>
            <Text style={styles.demoText}>Demo: unknown product</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function AltRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.altRow} accessibilityRole="button" accessibilityLabel={title}>
      <View style={styles.altIcon}>
        <Ionicons name={icon} size={18} color={colors.brand.blue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.altRowTitle}>{title}</Text>
        <Text style={styles.altRowSub}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl, gap: spacing.md },
  viewfinderWrap: { borderRadius: radii.lg, overflow: 'hidden' },
  viewfinder: {
    height: 220,
    backgroundColor: '#1a2238',
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  camera: { ...StyleSheet.absoluteFill },
  overlay: { ...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center' },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#fff',
  },
  cornerTL: { top: 16, left: 16, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 16, right: 16, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 16, left: 16, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 16, right: 16, borderBottomWidth: 3, borderRightWidth: 3 },
  alignPill: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  alignText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  scanLine: {
    position: 'absolute',
    left: 40,
    right: 70,
    height: 2,
    backgroundColor: colors.brand.blue,
  },
  sideControls: { position: 'absolute', right: 12, top: 56, gap: 12, zIndex: 2 },
  sideBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBtnOn: { backgroundColor: colors.brand.blue },
  sideLabel: { color: '#fff', fontSize: 9, marginTop: 2, fontWeight: '600' },
  altCard: { paddingVertical: spacing.sm },
  altTitle: {
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontSize: typography.size.md,
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surface.border,
  },
  altIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altRowTitle: { fontWeight: '700', color: colors.text.primary },
  altRowSub: { color: colors.text.secondary, fontSize: typography.size.xs, marginTop: 2 },
  eduCard: {},
  eduRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  eduTitle: { fontWeight: '800', color: colors.text.primary, marginBottom: 4 },
  eduBody: { color: colors.text.secondary, fontSize: typography.size.sm, lineHeight: 18 },
  demoToggle: { alignItems: 'center', paddingVertical: 6 },
  demoText: { color: colors.text.tertiary, fontSize: typography.size.xs },
});
