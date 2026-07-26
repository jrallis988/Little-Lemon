import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, spacing } from '@/constants/theme';

const PRIMARY_NAV = ['Music', 'News', 'People', 'Charts'] as const;

/**
 * Classic PureVolume top chrome — dark bar, brand, primary links, search, auth.
 */
export function PortalHeader() {
  const { width } = useWindowDimensions();
  const showNav = width >= 700;

  return (
    <View style={styles.bar}>
      <View style={styles.left}>
        <Text style={styles.logo}>staticvolume</Text>
        {showNav ? (
          <View style={styles.nav}>
            {PRIMARY_NAV.map((item) => (
              <Text key={item} style={styles.navItem}>
                {item}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.right}>
        {width >= 420 ? (
          <View style={styles.search}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.textDim}
              editable={false}
            />
          </View>
        ) : null}
        <Link href="/(auth)/signup" asChild>
          <Pressable style={styles.authBtn}>
            <Text style={styles.authText}>Sign Up</Text>
          </Pressable>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Pressable style={[styles.authBtn, styles.authBtnGhost]}>
            <Text style={styles.authTextGhost}>Log In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    fontFamily: 'SpaceMono',
    fontSize: 16,
    letterSpacing: 0.5,
    color: colors.text,
    textTransform: 'lowercase',
  },
  nav: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  navItem: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: colors.textMuted,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: 4,
  },
  searchInput: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: colors.text,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 110,
  },
  authBtn: {
    backgroundColor: colors.phosphor,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  authBtnGhost: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  authText: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: colors.background,
    textTransform: 'uppercase',
  },
  authTextGhost: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    color: colors.text,
    textTransform: 'uppercase',
  },
});
