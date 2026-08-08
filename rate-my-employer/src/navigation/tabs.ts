import type { Href } from 'expo-router';

export type TabKey = 'explore' | 'search' | 'contribute' | 'compare' | 'profile';

export type TabDefinition = {
  key: TabKey;
  title: string;
  href: Href;
  /** Ionicons glyph name */
  icon: string;
  iconFocused: string;
  /** Center “+” contribute tab gets distinct styling */
  prominent?: boolean;
};

/** Bottom tab bar: Explore, Search, Contribute/+, Compare, Profile */
export const TABS: TabDefinition[] = [
  {
    key: 'explore',
    title: 'Explore',
    href: '/(tabs)/explore',
    icon: 'compass-outline',
    iconFocused: 'compass',
  },
  {
    key: 'search',
    title: 'Search',
    href: '/(tabs)/search',
    icon: 'search-outline',
    iconFocused: 'search',
  },
  {
    key: 'contribute',
    title: 'Contribute',
    href: '/(tabs)/contribute',
    icon: 'add',
    iconFocused: 'add',
    prominent: true,
  },
  {
    key: 'compare',
    title: 'Compare',
    href: '/(tabs)/compare',
    icon: 'git-compare-outline',
    iconFocused: 'git-compare',
  },
  {
    key: 'profile',
    title: 'Profile',
    href: '/(tabs)/profile',
    icon: 'person-outline',
    iconFocused: 'person',
  },
];
