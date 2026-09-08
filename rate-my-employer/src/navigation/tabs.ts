import type { Href } from 'expo-router';

export type TabKey = 'home' | 'search' | 'write' | 'activity' | 'profile';

export type TabDefinition = {
  key: TabKey;
  title: string;
  href: Href;
  icon: string;
  iconFocused: string;
  prominent?: boolean;
};

/** Bottom tab bar matching refined kit: Home · Search · + · Activity · Profile */
export const TABS: TabDefinition[] = [
  {
    key: 'home',
    title: 'Home',
    href: '/(tabs)/home',
    icon: 'home-outline',
    iconFocused: 'home',
  },
  {
    key: 'search',
    title: 'Search',
    href: '/(tabs)/search',
    icon: 'search-outline',
    iconFocused: 'search',
  },
  {
    key: 'write',
    title: 'Write',
    href: '/(tabs)/write',
    icon: 'add',
    iconFocused: 'add',
    prominent: true,
  },
  {
    key: 'activity',
    title: 'Activity',
    href: '/(tabs)/activity',
    icon: 'notifications-outline',
    iconFocused: 'notifications',
  },
  {
    key: 'profile',
    title: 'Profile',
    href: '/(tabs)/profile',
    icon: 'person-outline',
    iconFocused: 'person',
  },
];
