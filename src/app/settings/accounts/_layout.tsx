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

const AccountsLayout = observer(() => {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          title: t('settings.accounts.title'),
        }}
      />
      <Stack.Screen
        name="tmdb"
        options={{
          title: t('settings.accounts.tmdb.title'),
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="trakt"
        options={{
          title: t('settings.accounts.trakt.title'),
          headerLargeTitle: false,
        }}
      />
    </ThemedStack>
  )
})

export default AccountsLayout
