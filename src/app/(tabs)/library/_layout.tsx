import '@/src/presentation/theme/unistyles'
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

const LibraryLayout = observer(() => {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={() => ({
          title: t('navigation.library'),
        })}
      />
    </ThemedStack>
  )
})

export default LibraryLayout
