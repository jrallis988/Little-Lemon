import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { colors } from '../constants/theme';
import type { RootStackParamList, RootTabParamList } from '../types';
import { AddEntryScreen } from '../screens/AddEntryScreen';
import { CourseDetailScreen } from '../screens/CourseDetailScreen';
import { DepartmentDetailScreen } from '../screens/DepartmentDetailScreen';
import { DormDetailScreen } from '../screens/DormDetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfessorDetailScreen } from '../screens/ProfessorDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { UniversityDetailScreen } from '../screens/UniversityDetailScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.paper,
    primary: colors.accent,
    card: colors.white,
    text: colors.ink,
    border: colors.border,
  },
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: focused ? '700' : '500',
        color: focused ? colors.accent : colors.slate,
      }}
    >
      {label}
    </Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.slate,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.white,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="⌂" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Directory',
          tabBarIcon: ({ focused }) => <TabIcon label="⌕" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AddEntry"
        component={AddEntryScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <TabIcon label="＋" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="◎" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root navigator:
 *   Tabs (Home / Directory / Add / Profile)
 *   + stack screens for hierarchy drill-down
 *     University → Department → Professor / Course
 *     University → Dorm
 */
export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="UniversityDetail" component={UniversityDetailScreen} />
        <Stack.Screen name="DepartmentDetail" component={DepartmentDetailScreen} />
        <Stack.Screen name="ProfessorDetail" component={ProfessorDetailScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <Stack.Screen name="DormDetail" component={DormDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/** @deprecated use RootNavigator */
export const RootTabs = RootNavigator;
