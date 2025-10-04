import { Stack } from 'expo-router'

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          title: 'Appearance & Display',
          headerBackTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name="providers/index"
        options={{
          title: 'Data Providers',
          headerBackTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name="providers/tmdb/index"
        options={{
          title: 'TMDB Configuration',
          headerBackTitle: 'Providers',
        }}
      />
      <Stack.Screen
        name="providers/stremio/index"
        options={{
          title: 'Stremio Configuration',
          headerBackTitle: 'Providers',
        }}
      />
      <Stack.Screen
        name="providers/stremio/[addonId]"
        options={{
          title: 'Addon Settings',
          headerBackTitle: 'Stremio',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About VNYL',
          headerBackTitle: 'Settings',
        }}
      />
    </Stack>
  )
}
