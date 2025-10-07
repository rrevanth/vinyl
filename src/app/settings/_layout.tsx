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
    },
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
}))

const SettingsLayout = observer(() => {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          title: t('navigation.settings'),
        }}
      />
      <Stack.Screen
        name="appearance"
        options={() => ({
          title: t('settings.appearance.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="display"
        options={() => ({
          title: t('settings.display.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="accounts/index"
        options={() => ({
          title: t('settings.accounts.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="accounts/tmdb"
        options={() => ({
          title: t('settings.accounts.tmdb.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="accounts/trakt"
        options={() => ({
          title: t('settings.accounts.trakt.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="stremio/index"
        options={() => ({
          title: t('settings.stremio.title'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="stremio/browse"
        options={() => ({
          title: t('settings.stremio.browse_addons'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="stremio/install"
        options={() => ({
          title: t('settings.stremio.install_addon'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="stremio/addon/[addonId]"
        options={() => ({
          title: t('settings.stremio.addon_details'),
          headerLargeTitle: false,
        })}
      />
      <Stack.Screen
        name="about"
        options={() => ({
          title: t('settings.about.title'),
          headerLargeTitle: false,
        })}
      />
    </ThemedStack>
  )
})

export default SettingsLayout
