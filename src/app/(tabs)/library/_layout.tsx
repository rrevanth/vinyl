import { t } from '@/src/presentation/shared/i18n'
import '@/src/presentation/theme/unistyles'
import { observer } from '@legendapp/state/react'
import { Stack } from 'expo-router'
import { withUnistyles } from 'react-native-unistyles'

const ThemedStack = withUnistyles(Stack, (theme) => ({
  screenOptions: {
    headerShown: true,
    headerLargeTitle: true,
    headerTransparent: true,
    headerBackButtonDisplayMode: 'minimal' as const,
    headerTitleStyle: {
      color: theme.colors.text,
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
