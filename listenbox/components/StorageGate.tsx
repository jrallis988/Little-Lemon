import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';

import { useCatalog } from '@/context/CatalogContext';
import { useLogs } from '@/context/LogsContext';
import { palette } from '@/constants/theme';

/** Wait for AsyncStorage hydration before rendering app routes. */
export function StorageGate({ children }: { children: ReactNode }) {
  const { isReady: catalogReady } = useCatalog();
  const { isReady: logsReady } = useLogs();

  if (!catalogReady || !logsReady) {
    return (
      <View style={styles.boot} testID="storage-gate">
        <ActivityIndicator color={palette.ink} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.paper,
  },
});
