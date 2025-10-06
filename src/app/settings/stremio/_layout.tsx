import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Stack } from 'expo-router'
import { withUnistyles } from 'react-native-unistyles'

const ThemedStack = withUnistyles(Stack, (theme) => ({
  screenOptions: {
    headerShown: true,
    headerLargeTitle: false,
    headerTransparent: false,
    headerBackButtonDisplayMode: 'minimal' as const,
    headerTitleStyle: {
      color: theme.colors.text,
      fontWeight: theme.fontWeight.bold,
      fontsize: theme.fontSize['3xl']
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
}))

const StremioLayout = observer(() => {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          title: t('settings.stremio.title'),
        }}
      />
      <Stack.Screen
        name="browse"
        options={{
          title: t('settings.stremio.browse_addons'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="install"
        options={{
          title: t('settings.stremio.install_addon'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="addon/[addonId]"
        options={{
          title: t('settings.stremio.addon_details'),
          headerLargeTitle: false,
        }}
      />
    </ThemedStack>
  )
})

export default StremioLayout
