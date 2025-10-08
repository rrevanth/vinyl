import { memo } from 'react'
import { Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { t } from '@/src/presentation/shared/i18n'
import type { Catalog } from '@/src/domain/entities/Catalog'

interface CatalogSettingsRowProps {
  readonly catalog: Catalog
  readonly customName: string | undefined
  readonly isSelected: boolean
  onToggle(): void
}

export const CatalogSettingsRow = memo<CatalogSettingsRowProps>(
  ({ catalog, customName, isSelected, onToggle }) => {
    const displayName = customName || catalog.name
    const isCustomNamed = Boolean(customName)

    // Show original Stremio catalog type if available, otherwise use normalized type
    const displayType = catalog.sourceInfo?.catalogDefinition?.type || catalog.type

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.meta}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {displayName}
              </Text>
              {isCustomNamed ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t('settings.catalogs.custom_name_badge')}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle} numberOfLines={1}>
                {displayType}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Switch
              value={isSelected}
              onValueChange={onToggle}
              accessibilityLabel={t('settings.catalogs.catalog_toggle_accessibility').replace(
                '{name}',
                displayName
              )}
            />
          </View>
        </View>
      </View>
    )
  }
)

CatalogSettingsRow.displayName = 'CatalogSettingsRow'

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  meta: {
    flex: 1,
    marginRight: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    flexShrink: 1,
  },
  badge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
}))