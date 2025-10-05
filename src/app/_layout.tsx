import '@/src/presentation/theme/unistyles'
import '@/src/infrastructure/di/initializeContainer'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const RootLayout = observer(() => {
  return (
    <NativeTabs>
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
    </NativeTabs>
  )
})

export default RootLayout
