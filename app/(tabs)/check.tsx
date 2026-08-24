import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
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
import { useBioCross } from '../../src/state/BioCrossContext';

const TESTO_BARCODE = '012345678943';
const TESTO_SUPPLEMENT_ID = 'sup-catalog-testo';

export default function CheckScreen() {
  const router = useRouter();
  const { lookupBarcode } = useBioCross();
  const [scanning, setScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
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

  const handlePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      // Mock: treat photo selection as barcode scan success
      router.push({
        pathname: '/check/confirm',
        params: { supplementId: TESTO_SUPPLEMENT_ID },
      });
    }
  };

  const handleScanBarcode = async () => {
    setScanning(true);
    try {
      const supplement = await lookupBarcode(TESTO_BARCODE);
      if (supplement) {
        router.push({
          pathname: '/check/confirm',
          params: { supplementId: supplement.id },
        });
      }
    } finally {
      setScanning(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenTitle
        title="Scan Supplement Label"
        subtitle="Point your camera at the barcode on the supplement bottle or package"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.viewfinderWrap}>
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]}
            />
            <Text style={styles.alignText}>Align barcode within the frame</Text>
          </View>

          <View style={styles.cameraControls}>
            <Pressable
              onPress={() => setFlashOn((v) => !v)}
              accessibilityRole="button"
              accessibilityLabel={flashOn ? 'Turn flash off' : 'Turn flash on'}
              style={styles.controlBtn}
            >
              <Ionicons
                name={flashOn ? 'flash' : 'flash-outline'}
                size={20}
                color={colors.text.primary}
              />
              <Text style={styles.controlLabel}>Light</Text>
            </Pressable>
            <Pressable
              onPress={handlePhoto}
              accessibilityRole="button"
              accessibilityLabel="Take or choose photo of label"
              style={styles.controlBtn}
            >
              <Ionicons name="camera-outline" size={20} color={colors.text.primary} />
              <Text style={styles.controlLabel}>Photo</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <InfoCallout
            tone="privacy"
            icon="lock-closed-outline"
            title="Your privacy matters"
            body="We only scan the barcode. No personal information is captured."
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.altTitle}>Other ways to search</Text>
          <Pressable
            onPress={() => router.push('/check/search')}
            accessibilityRole="button"
            accessibilityLabel="Search by supplement name"
          >
            <HealthCard>
              <View style={styles.altRow}>
                <View style={styles.altIcon}>
                  <Ionicons name="search-outline" size={20} color={colors.brand.blue} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.altLabel}>Search by name</Text>
                  <Text style={styles.altSub}>Find a supplement in our catalog</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
              </View>
            </HealthCard>
          </Pressable>

          <Pressable
            onPress={() => router.push('/check/manual-barcode')}
            accessibilityRole="button"
            accessibilityLabel="Enter barcode manually"
            style={{ marginTop: spacing.sm }}
          >
            <HealthCard>
              <View style={styles.altRow}>
                <View style={styles.altIcon}>
                  <Ionicons name="barcode-outline" size={20} color={colors.brand.blue} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.altLabel}>Enter barcode manually</Text>
                  <Text style={styles.altSub}>Type the numbers under the barcode</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
              </View>
            </HealthCard>
          </Pressable>
        </View>

        <View style={styles.section}>
          <HealthCard backgroundColor={colors.brand.blueLight} borderColor={colors.brand.blueMuted}>
            <View style={styles.whyRow}>
              <Ionicons name="help-circle-outline" size={22} color={colors.brand.blue} />
              <View style={{ flex: 1 }}>
                <Text style={styles.whyTitle}>Why scan?</Text>
                <Text style={styles.whyBody}>
                  Barcodes help BioCross identify the exact product and formulation so your safety
                  check matches what you actually have — not a similar product with different
                  ingredients.
                </Text>
              </View>
            </View>
          </HealthCard>
        </View>

        <View style={styles.section}>
          <BioCrossButton
            label="Scan Barcode"
            icon="scan-outline"
            loading={scanning}
            onPress={handleScanBarcode}
            accessibilityHint="Simulates scanning TestoMax barcode and opens product confirmation"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CORNER_SIZE = 28;
const CORNER_THICK = 4;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingBottom: spacing.xxxl },
  viewfinderWrap: { marginHorizontal: spacing.xl },
  viewfinder: {
    height: 200,
    backgroundColor: '#1a2332',
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: colors.brand.blue,
  },
  cornerTL: {
    top: 16,
    left: 16,
    borderTopWidth: CORNER_THICK,
    borderLeftWidth: CORNER_THICK,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: 16,
    right: 16,
    borderTopWidth: CORNER_THICK,
    borderRightWidth: CORNER_THICK,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: 16,
    left: 16,
    borderBottomWidth: CORNER_THICK,
    borderLeftWidth: CORNER_THICK,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: 16,
    right: 16,
    borderBottomWidth: CORNER_THICK,
    borderRightWidth: CORNER_THICK,
    borderBottomRightRadius: 4,
  },
  scanLine: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 2,
    backgroundColor: colors.brand.blue,
    opacity: 0.85,
  },
  alignText: {
    color: colors.text.inverse,
    fontSize: typography.size.sm,
    opacity: 0.9,
    marginTop: spacing.xl,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  controlBtn: {
    alignItems: 'center',
    gap: 4,
    minWidth: 64,
    minHeight: 44,
    justifyContent: 'center',
  },
  controlLabel: {
    fontSize: typography.size.xs,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  section: { marginHorizontal: spacing.xl, marginTop: spacing.lg },
  altTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
    marginBottom: spacing.sm,
  },
  altRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  altIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altLabel: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  altSub: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  whyRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  whyTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  whyBody: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
});
