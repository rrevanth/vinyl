import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { router } from 'expo-router'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { t } from '@/src/presentation/shared/i18n'

const SettingsScreen = observer(() => {
  const navigateToAppearance = () => {
    router.push('/settings/appearance')
  }

  const navigateToDisplay = () => {
    router.push('/settings/display')
  }

  const navigateToAccounts = () => {
    router.push('/settings/accounts')
  }

  const navigateToHomescreen = () => {
    router.push('/settings/homescreen')
  }

  const navigateToCatalogs = () => {
    router.push('/settings/catalogs')
  }

  const navigateToStremio = () => {
    router.push('/settings/stremio')
  }

  const navigateToAbout = () => {
    router.push('/settings/about')
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SettingsSection title={t('settings.title')}>
        <SettingsNavigationRow
          iconName="color-palette-outline"
          title={t('settings.appearance.title')}
          description="Theme and visual preferences"
          onPress={navigateToAppearance}
        />
        <SettingsNavigationRow
          iconName="phone-portrait-outline"
          title={t('settings.display.title')}
          description="Language, content, and layout options"
          onPress={navigateToDisplay}
        />
        <SettingsNavigationRow
          iconName="person-circle-outline"
          title={t('settings.accounts.title')}
          description="Manage external service connections"
          onPress={navigateToAccounts}
        />
        <SettingsNavigationRow
          iconName="home-outline"
          title={t('settings.homescreen.title')}
          description={t('settings.homescreen.subtitle')}
          onPress={navigateToHomescreen}
        />
        <SettingsNavigationRow
          iconName="albums-outline"
          title={t('settings.catalogs.title')}
          description={t('settings.catalogs.subtitle')}
          onPress={navigateToCatalogs}
        />
        <SettingsNavigationRow
          iconName="extension-puzzle-outline"
          title={t('settings.stremio.title')}
          description={t('settings.stremio.description')}
          onPress={navigateToStremio}
        />
        <SettingsNavigationRow
          iconName="information-circle-outline"
          title={t('settings.about.title')}
          description="App information and cache management"
          onPress={navigateToAbout}
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

export default SettingsScreen

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
}))
