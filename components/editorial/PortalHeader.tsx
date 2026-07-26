import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

const PRIMARY_NAV = ['Music', 'News', 'People', 'Charts'] as const;

/**
 * Classic PureVolume top chrome — black bar, white wordmark, search, auth.
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
              placeholderTextColor="#888"
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
    minWidth: 110,
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
