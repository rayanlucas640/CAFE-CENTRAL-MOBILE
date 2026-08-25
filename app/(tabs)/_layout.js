import React from 'react';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentTheme = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.tint,
        tabBarButton: HapticTab,
      }}
    >
      {/* =========================
          ABA INÍCIO
          ========================= */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',

          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />

      {/* =========================
          ABA EXPLORE
          ========================= */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',

          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="paperplane.fill"
              color={color}
            />
          ),
        }}
      />

      {/* =========================
          ROTAS INTERNAS
          Não aparecem na barra
          ========================= */}

      <Tabs.Screen
        name="login"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="cardapio"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="contato"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="detalhesCardapio"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}