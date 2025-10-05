// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Now safe to import DI container and other dependencies
import '@/src/infrastructure/di/initializeContainer'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { withUnistyles } from 'react-native-unistyles'

// Theme the native tabs with Unistyles
const ThemedNativeTabs = withUnistyles(NativeTabs, (theme) => ({
  tintColor: theme.colors.primary,
}))

const RootLayout = observer(() => {
  return (
    <ThemedNativeTabs>
      <NativeTabs.Trigger name="home">
        <Icon sf="house.fill" drawable="home" />
        <Label>{t('navigation.home')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Icon sf="magnifyingglass" drawable="search" />
        <Label>{t('navigation.search')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="library">
        <Icon sf="square.stack.fill" drawable="library" />
        <Label>{t('navigation.library')}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Icon sf="gear" drawable="settings" />
        <Label>{t('navigation.settings')}</Label>
      </NativeTabs.Trigger>
    </ThemedNativeTabs>
  )
})

export default RootLayout
