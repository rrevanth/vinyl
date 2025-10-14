import { t } from '@/src/presentation/shared/i18n'
import '@/src/presentation/theme/unistyles'
import { observer } from '@legendapp/state/react'
import { Stack } from 'expo-router'
import { useUnistyles } from 'react-native-unistyles'

const SearchLayout = observer(() => {
  const { theme } = useUnistyles()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLargeTitle: true,
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal' as const,
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={() => ({
          title: t('navigation.search'),
        })}
      />
    </Stack>
  )
})

export default SearchLayout
