import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows, spacing, typography } from '../tokens';

export type TabKey = 'home' | 'history' | 'check' | 'updates' | 'profile';

export function BottomNavigation({
  active,
  onChange,
  updatesBadge = 0,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  updatesBadge?: number;
}) {
  const insets = useSafeAreaInsets();

  const items: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap; primary?: boolean }[] = [
    { key: 'home', label: 'Home', icon: 'home-outline' },
    { key: 'history', label: 'History', icon: 'time-outline' },
    { key: 'check', label: 'Scan / Check', icon: 'scan-outline', primary: true },
    { key: 'updates', label: 'Updates', icon: 'newspaper-outline' },
    { key: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View
      style={[styles.bar, shadows.nav, { paddingBottom: Math.max(insets.bottom, 8) }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const isActive = active === item.key;
        if (item.primary) {
          return (
            <Pressable
              key={item.key}
              onPress={() => onChange(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel="Scan or Check a supplement"
              style={styles.primaryWrap}
            >
              <View style={styles.primaryBtn}>
                <Ionicons name="scan" size={26} color={colors.text.inverse} />
              </View>
              <Text style={[styles.primaryLabel, isActive && styles.activeLabel]}>{item.label}</Text>
            </Pressable>
          );
        }
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={item.label}
            style={styles.item}
          >
            <View>
              <Ionicons
                name={isActive ? (item.icon.replace('-outline', '') as keyof typeof Ionicons.glyphMap) : item.icon}
                size={22}
                color={isActive ? colors.brand.blue : colors.text.tertiary}
              />
              {item.key === 'updates' && updatesBadge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{updatesBadge > 9 ? '9+' : updatesBadge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    paddingTop: 8,
    paddingHorizontal: spacing.xs,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    minHeight: 48,
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: colors.text.tertiary,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.brand.blue,
  },
  primaryWrap: {
    flex: 1.2,
    alignItems: 'center',
    marginTop: -22,
  },
  primaryBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.brand.blue,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },
  primaryLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '700',
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.brand.blue,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
});
