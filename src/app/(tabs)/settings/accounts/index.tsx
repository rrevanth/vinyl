import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { router } from 'expo-router'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { useTraktAccount } from '@/src/features/settings/hooks/useTraktAccount'
import { t } from '@/src/presentation/shared/i18n'

const AccountsScreen = observer(() => {
  const { isConnected, account } = useTraktAccount()

  const navigateToTMDB = () => {
    router.push('/settings/accounts/tmdb')
  }

  const navigateToTrakt = () => {
    router.push('/settings/accounts/trakt')
  }

  const traktDescription = isConnected ? `Connected as @${account?.username}` : 'Not connected'

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SettingsSection title={t('settings.accounts.title')}>
        <SettingsNavigationRow
          iconName="film-outline"
          title={t('settings.accounts.tmdb.title')}
          description={t('settings.accounts.tmdb.description')}
          onPress={navigateToTMDB}
        />
        <SettingsNavigationRow
          iconName="analytics-outline"
          title={t('settings.accounts.trakt.title')}
          description={traktDescription}
          onPress={navigateToTrakt}
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

export default AccountsScreen

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
