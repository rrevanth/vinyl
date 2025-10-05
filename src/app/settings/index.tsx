import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { router } from 'expo-router'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsRow } from '@/src/features/settings/components/atoms/SettingsRow'
import { t } from '@/src/presentation/shared/i18n'

const SettingsScreen = observer(() => {
  const navigateToAppearance = () => {
    router.push('/settings/appearance')
  }

  const navigateToDisplay = () => {
    router.push('/settings/display')
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
        <SettingsRow
          title={t('settings.appearance.title')}
          description="Theme and visual preferences"
          onPress={navigateToAppearance}
        />
        <SettingsRow
          title={t('settings.display.title')}
          description="Language, content, and layout options"
          onPress={navigateToDisplay}
        />
        <SettingsRow
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
