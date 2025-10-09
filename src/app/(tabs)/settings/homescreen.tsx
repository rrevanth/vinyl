import { memo, useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { useSelector } from '@legendapp/state/react'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { t } from '@/src/presentation/shared/i18n'
import type { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'

const HomescreenSettingsScreen = () => {
  const updatePreferences = useService<UpdateHomescreenPreferencesUseCase>(
    TOKENS.UpdateHomescreenPreferencesUseCase
  )

  const preferences = useSelector(() => userPreferences$.homescreen.get())
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (
    updates: Parameters<UpdateHomescreenPreferencesUseCase['execute']>[0]
  ) => {
    try {
      setIsUpdating(true)
      await updatePreferences.execute(updates)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.homescreen.title')}</Text>
        <Text style={styles.subtitle}>{t('settings.homescreen.subtitle')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.homescreen.hero_section_title')}</Text>
        <Text style={styles.sectionDescription}>
          {t('settings.homescreen.hero_section_description')}
        </Text>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{t('settings.homescreen.hero_enabled_label')}</Text>
          </View>
          <Switch
            value={preferences.heroEnabled}
            onValueChange={(value) => {
              void handleUpdate({ hero: { enabled: value } })
            }}
            disabled={isUpdating}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{t('settings.homescreen.hero_auto_rotate_label')}</Text>
            <Text style={styles.rowSubtitle}>{t('settings.homescreen.hero_auto_rotate_hint')}</Text>
          </View>
          <Switch
            value={preferences.heroAutoRotate}
            onValueChange={(value) => {
              void handleUpdate({ hero: { autoRotate: value } })
            }}
            disabled={isUpdating || !preferences.heroEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.homescreen.layout_section_title')}</Text>
        <Text style={styles.sectionDescription}>
          {t('settings.homescreen.layout_section_description')}
        </Text>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>
              {t('settings.homescreen.show_continue_watching_label')}
            </Text>
          </View>
          <Switch
            value={preferences.showContinueWatching}
            onValueChange={(value) => {
              void handleUpdate({ layout: { showContinueWatching: value } })
            }}
            disabled={isUpdating}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{t('settings.homescreen.compact_mode_label')}</Text>
            <Text style={styles.rowSubtitle}>{t('settings.homescreen.compact_mode_hint')}</Text>
          </View>
          <Switch
            value={preferences.compactMode}
            onValueChange={(value) => {
              void handleUpdate({ layout: { compactMode: value } })
            }}
            disabled={isUpdating}
          />
        </View>
      </View>
    </View>
  )
}

export default memo(HomescreenSettingsScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  section: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  sectionDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowText: {
    flex: 1,
    gap: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },
  rowTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  rowSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
}))
