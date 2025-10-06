import { ScrollView, Alert } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useState, useEffect, useCallback } from 'react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsInfoRow } from '../atoms/SettingsInfoRow'
import { SettingsNavigationRow } from '../atoms/SettingsNavigationRow'
import { useSettings } from '../../hooks/useSettings'
import { t } from '@/src/presentation/shared/i18n'
import type { AppInfo, CacheInfo } from '@/src/domain/use-cases/SettingsUseCase'

export const AboutSettings = observer(() => {
  const { getAppInfo, getCacheInfo, clearCache } = useSettings()
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [app, cache] = await Promise.all([getAppInfo(), getCacheInfo()])
      setAppInfo(app)
      setCacheInfo(cache)
    } catch {
      // Silently handle errors - not critical for UX
    }
  }, [getAppInfo, getCacheInfo])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleClearCache = async () => {
    Alert.alert(
      t('settings.about.clear_cache'),
      'This will clear all cached data except your settings. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCache()
              await loadData() // Refresh cache info
              Alert.alert('Success', 'Cache cleared successfully')
            } catch {
              Alert.alert('Error', 'Failed to clear cache')
            }
          },
        },
      ]
    )
  }

  const openAttributions = () => {
    // TODO: Navigate to attributions screen or show modal
    Alert.alert(
      t('settings.about.attributions'),
      'This app is powered by:\n\n• TMDB (The Movie Database)\n• Trakt.tv\n• Stremio\n• FanArt.tv\n• MDBList\n\nThank you for providing free APIs for developers!'
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* App Information */}
      <SettingsSection title={t('settings.about.version')}>
        <SettingsInfoRow
          title="Version"
          value={appInfo ? `${appInfo.version} (${appInfo.buildNumber})` : 'Loading...'}
          isLast
        />
      </SettingsSection>

      {/* Powered By */}
      <SettingsSection title={t('settings.about.powered_by')}>
        <SettingsNavigationRow
          title={t('settings.about.attributions')}
          description="View all data sources and attribution"
          onPress={openAttributions}
          isLast
        />
      </SettingsSection>

      {/* Cache Management */}
      <SettingsSection
        title="Storage"
        footer="Cache includes downloaded metadata, images, and temporary data. Your preferences and settings are preserved."
      >
        <SettingsInfoRow
          title={t('settings.about.cache_size')}
          value={cacheInfo ? cacheInfo.formattedSize : 'Calculating...'}
        />
        <SettingsNavigationRow
          title={t('settings.about.clear_cache')}
          description="Free up storage space"
          onPress={handleClearCache}
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
}))

export type {}
