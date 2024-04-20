import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true)
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarShowLabel: false,
          headerShown: false,
          headerStatusBarHeight: 0,
          tabBarStyle: { display: 'none'}
        }}
        
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tela dois',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerStyle: { display: 'none' },
          headerShown: false,
          tabBarStyle: { display: 'none'}
        }}
      />
       <Tabs.Screen
        name="details"
        options={{
          title: 'Tela de detalhes',
        }}
      />
    </Tabs>
  );
}
