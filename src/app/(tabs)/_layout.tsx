// Ensure Unistyles theme configuration runs before any style sheets in this scope
import '@/src/presentation/theme/unistyles'

import { t } from '@/src/presentation/shared/i18n'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { withUnistyles } from 'react-native-unistyles'

// Theme the native tabs with Unistyles for dynamic tinting
const ThemedNativeTabs = withUnistyles(NativeTabs, (theme) => ({
  tintColor: theme.colors.primary,
}))

const TabsLayout = () => {
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
}

export default TabsLayout
