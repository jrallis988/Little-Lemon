import React, { useCallback, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, typography } from '../../design-system/tokens';

export interface BarcodeScanResult {
  type: string;
  data: string;
}

interface BarcodeScannerViewProps {
  onScan: (result: BarcodeScanResult) => void;
  onPermissionDenied?: () => void;
  flashOn?: boolean;
  paused?: boolean;
  style?: object;
}

/**
 * Live barcode scanner using expo-camera (iOS/Android).
 * Web falls back to a placeholder — use manual entry or demo scan on web.
 */
export function BarcodeScannerView({
  onScan,
  onPermissionDenied,
  flashOn = false,
  paused = false,
  style,
}: BarcodeScannerViewProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);
  const lastCode = useRef<string | null>(null);

  const handleBarcode = useCallback(
    (result: { type: string; data: string }) => {
      if (paused || locked) return;
      if (lastCode.current === result.data) return;
      lastCode.current = result.data;
      setLocked(true);
      onScan({ type: result.type, data: result.data });
      setTimeout(() => {
        setLocked(false);
        lastCode.current = null;
      }, 2500);
    },
    [onScan, paused, locked],
  );

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.placeholder, style]} accessibilityLabel="Camera preview unavailable on web">
        <Ionicons name="scan-outline" size={48} color="rgba(255,255,255,0.6)" />
        <Text style={styles.placeholderText}>Camera preview available on device</Text>
        <Text style={styles.placeholderHint}>Use Scan Barcode or manual entry on web</Text>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>Checking camera permission…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.placeholder, style]}>
        <Ionicons name="camera-outline" size={40} color="#fff" />
        <Text style={styles.placeholderText}>Camera access is required to scan barcodes</Text>
        <Pressable
          onPress={async () => {
            const res = await requestPermission();
            if (!res.granted) onPermissionDenied?.();
          }}
          style={styles.permBtn}
          accessibilityRole="button"
          accessibilityLabel="Grant camera permission"
        >
          <Text style={styles.permBtnText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <CameraView
      style={[StyleSheet.absoluteFill, style]}
      facing="back"
      enableTorch={flashOn}
      onBarcodeScanned={paused || locked ? undefined : handleBarcode}
      barcodeScannerSettings={{
        barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
      }}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#1a2238',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  placeholderText: {
    color: '#fff',
    fontSize: typography.size.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  placeholderHint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: typography.size.xs,
    textAlign: 'center',
  },
  permBtn: {
    marginTop: 8,
    backgroundColor: colors.brand.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  permBtnText: { color: '#fff', fontWeight: '700' },
});
