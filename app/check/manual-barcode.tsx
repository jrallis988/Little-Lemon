import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  InfoCallout,
  LoadingState,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { SUPPLEMENT_CATALOG } from '../../src/domain/fixtures';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function ManualBarcodeScreen() {
  const router = useRouter();
  const { lookupBarcode } = useBioCross();
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    const code = barcode.trim();
    if (!code) return;

    setLoading(true);
    try {
      const supplement = await lookupBarcode(code);
      if (supplement) {
        router.push({
          pathname: '/check/confirm',
          params: { supplementId: supplement.id, source: 'barcode' },
        });
      } else {
        router.replace({
          pathname: '/check/issue',
          params: { kind: 'unknown_product' },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const exampleBarcode = SUPPLEMENT_CATALOG[4]?.barcode ?? '012345678943';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <View style={styles.header}>
        <Text style={styles.title}>Enter Barcode</Text>
        <Text style={styles.subtitle}>
          Type the numbers printed below the barcode on your supplement package
        </Text>
      </View>

      <View style={styles.content}>
        <HealthCard>
          <View style={styles.barcodeIcon}>
            <Ionicons name="barcode-outline" size={40} color={colors.brand.blue} />
          </View>
          <TextInput
            value={barcode}
            onChangeText={(t) => {
              setBarcode(t.replace(/[^\d]/g, ''));
            }}
            placeholder="Enter barcode numbers"
            placeholderTextColor={colors.text.tertiary}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={13}
            accessibilityLabel="Barcode number"
            accessibilityHint="Enter the digits below the barcode"
          />
          <Text style={styles.hint}>Usually 8–13 digits (e.g. {exampleBarcode})</Text>
        </HealthCard>

        <View style={styles.callout}>
          <InfoCallout
            tone="info"
            body="BioCross matches barcodes to products in our catalog. If your product isn't found, try searching by name instead."
          />
        </View>

        {loading ? (
          <LoadingState message="Looking up barcode…" />
        ) : (
          <BioCrossButton
            label="Look Up Product"
            icon="search-outline"
            disabled={barcode.trim().length < 8}
            onPress={handleLookup}
            accessibilityHint="Look up the entered barcode in the supplement catalog"
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
  content: { paddingHorizontal: spacing.xl },
  barcodeIcon: {
    alignSelf: 'center',
    marginBottom: spacing.md,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: typography.size.xl,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    paddingVertical: spacing.md,
    letterSpacing: 2,
  },
  hint: {
    textAlign: 'center',
    color: colors.text.tertiary,
    fontSize: typography.size.sm,
  },
  callout: { marginTop: spacing.lg, marginBottom: spacing.lg },
});
