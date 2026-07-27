import { Link, router } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

const PRIMARY_NAV = [
  { label: 'Music', href: '/(main)' as const },
  { label: 'Find', href: '/(main)/explore' as const },
  { label: 'People', href: '/(main)/artists' as const },
  { label: 'History', href: '/(main)/history' as const },
] as const;

/**
 * Classic PureVolume top chrome — black bar, white wordmark, search, auth.
 * Search opens the multi-facet catalog (artist / song / genre).
 */
export function PortalHeader() {
  const { width } = useWindowDimensions();
  const showNav = width >= 700;
  const showInlineSearch = width >= 420;

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        <Pressable onPress={() => router.push('/(main)')}>
          <Text style={styles.logo}>staticvolume</Text>
        </Pressable>
        {showNav ? (
          <View style={styles.nav}>
            {PRIMARY_NAV.map((item) => (
              <Pressable key={item.label} onPress={() => router.push(item.href)}>
                <Text style={styles.navItem}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Pressable onPress={() => router.push('/(main)/history')} hitSlop={6}>
            <Text style={styles.navItem}>History</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.right}>
        {showInlineSearch ? (
          <Pressable
            style={styles.search}
            onPress={() => router.push('/(main)/search')}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search artists, songs, genres"
              placeholderTextColor="#888"
              editable={false}
              pointerEvents="none"
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.searchIconBtn}
            onPress={() => router.push('/(main)/search')}
            hitSlop={8}
          >
            <Text style={styles.searchIconText}>Search</Text>
          </Pressable>
        )}
        <Link href="/(auth)/signup" asChild>
          <Pressable style={styles.authBtn}>
            <Text style={styles.authText}>Sign Up</Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Pressable
            style={StyleSheet.flatten([styles.authBtn, styles.authBtnGhost])}
          >
            <Text style={styles.authTextGhost}>Log In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flexShrink: 1,
  },
  logo: {
    fontFamily: fonts.condensedBold,
    fontSize: 20,
    letterSpacing: 0.5,
    color: colors.headerText,
    textTransform: 'lowercase',
  },
  nav: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  navItem: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: '#DDDDDD',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  search: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  searchInput: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.text,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 180,
  },
  searchIconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 2,
  },
  searchIconText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.headerText,
  },
  authBtn: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BBBBBB',
  },
  authBtnGhost: {
    backgroundColor: '#2A2A2A',
    borderColor: '#444',
  },
  authText: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.text,
  },
  authTextGhost: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    color: colors.headerText,
  },
});
