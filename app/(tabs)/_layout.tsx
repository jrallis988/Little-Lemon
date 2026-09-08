import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import { BottomNavigation, type TabKey } from '../../src/design-system';
import { useBioCross } from '../../src/state/BioCrossContext';

const TAB_BAR_HEIGHT = 88;

function resolveActiveTab(pathname: string): TabKey {
  if (pathname.includes('/history')) return 'history';
  if (pathname.includes('/check')) return 'check';
  if (pathname.includes('/updates')) return 'updates';
  if (pathname.includes('/profile')) return 'profile';
  return 'home';
}

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { alerts } = useBioCross();
  const active = resolveActiveTab(pathname);
  const updatesBadge = alerts.filter((a) => !a.isRead).length;

  const handleTabChange = (tab: TabKey) => {
    router.push(`/(tabs)/${tab}` as const);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.nav} pointerEvents="box-none">
        <BottomNavigation active={active} updatesBadge={updatesBadge} onChange={handleTabChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingBottom: TAB_BAR_HEIGHT },
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
