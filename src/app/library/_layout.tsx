import { Stack } from 'expo-router'
import { useUnistyles } from 'react-native-unistyles'

export default function LibraryLayout() {
  const { theme } = useUnistyles()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Library',
          headerLargeTitle: true,
        }}
      />
    </Stack>
  )
}
