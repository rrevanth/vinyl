import { memo, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer, useSelector } from '@legendapp/state/react'
import DraggableFlatList, {
  ScaleDecorator,
  type RenderItemParams,
} from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCatalogManagement } from '@/src/presentation/features/homescreen/hooks/useCatalogManagement'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { t } from '@/src/presentation/shared/i18n'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { ManageCatalogUseCase } from '@/src/domain/use-cases/homescreen/ManageCatalogUseCase'

interface CatalogWithOrder {
  catalog: Catalog
  customName?: string
  orderIndex: number
}

const CatalogsReorderScreen = observer(() => {
  const { catalogs, selectedIds, isLoading } = useCatalogManagement()
  const catalogCustomNames = useSelector(() => userPreferences$.homescreen.catalogCustomNames.get())
  const catalogOrder = useSelector(() => userPreferences$.homescreen.catalogOrder.get())
  const manageCatalogUseCase = useService<ManageCatalogUseCase>(TOKENS.ManageCatalogUseCase)

  const [isSaving, setIsSaving] = useState(false)
  const [localOrder, setLocalOrder] = useState<string[]>([])

  // Build complete list of ALL selected catalogs (not just ordered ones)
  const orderedCatalogs = useMemo(() => {
    const selectedSet = new Set(selectedIds)
    const enabledCatalogs = catalogs.filter((cat) => selectedSet.has(cat.stableId))

    // Use local order if available, otherwise use stored order
    const currentOrder = localOrder.length > 0 ? localOrder : catalogOrder

    // Create a map of all selected IDs with their order
    const orderedMap = new Map<string, number>()
    currentOrder.forEach((id, index) => {
      if (selectedSet.has(id)) {
        orderedMap.set(id, index)
      }
    })

    // Add any selected catalogs not yet in order to the end
    let nextIndex = currentOrder.length
    const sorted = enabledCatalogs.map((catalog) => {
      let orderIndex = orderedMap.get(catalog.stableId)
      if (orderIndex === undefined) {
        orderIndex = nextIndex++
      }
      return {
        catalog,
        customName: catalogCustomNames[catalog.stableId],
        orderIndex,
      }
    })

    sorted.sort((a, b) => a.orderIndex - b.orderIndex)
    return sorted
  }, [catalogs, selectedIds, catalogCustomNames, catalogOrder, localOrder])

  const handleReorder = useCallback(
    async (data: CatalogWithOrder[]) => {
      // Create newOrder from ALL selected catalogs
      const newOrder = data.map((item) => item.catalog.stableId)

      setLocalOrder(newOrder)
      setIsSaving(true)

      try {
        await manageCatalogUseCase.execute({
          operation: 'reorder',
          newOrder, // This now includes ALL selected IDs
        })
      } catch (error) {
        console.error('Failed to reorder catalog', error)
        setLocalOrder([])
      } finally {
        setIsSaving(false)
      }
    },
    [manageCatalogUseCase]
  )

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<CatalogWithOrder>) => {
      // Get provider name from addon name if available, otherwise use providerId
      const providerName = item.catalog.sourceInfo?.addonName || item.catalog.providerId.toUpperCase()

      // Format display name: use custom name if set, otherwise "Provider - Catalog Name"
      const displayName = item.customName || `${providerName} - ${item.catalog.name}`

      return (
        <ScaleDecorator>
          <View
            style={[styles.card, isActive && styles.cardActive]}
            accessibilityRole="button"
            accessibilityLabel={t('settings.catalogs.drag_to_reorder_accessibility').replace(
              '{name}',
              displayName
            )}
          >
            <View style={styles.dragHandle} onTouchStart={drag}>
              <Text style={styles.dragIcon}>≡</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.orderNumber}>{item.orderIndex + 1}</Text>
              <View style={styles.catalogInfo}>
                <Text style={styles.catalogName} numberOfLines={1}>
                  {displayName}
                </Text>
                <Text style={styles.catalogType} numberOfLines={1}>
                  {item.catalog.type}
                </Text>
              </View>
            </View>
          </View>
        </ScaleDecorator>
      )
    },
    []
  )

  const renderListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.catalogs.reorder_title')}</Text>
        <Text style={styles.subtitle}>{t('settings.catalogs.reorder_subtitle')}</Text>
      </View>

      {isSaving ? (
        <View style={styles.savingBanner}>
          <ActivityIndicator size="small" color={styles.spinner.color} />
          <Text style={styles.savingText}>{t('common.saving')}</Text>
        </View>
      ) : null}
    </>
  )

  const renderListEmpty = () =>
    !isLoading && orderedCatalogs.length === 0 ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{t('settings.catalogs.reorder_empty_title')}</Text>
        <Text style={styles.emptySubtitle}>{t('settings.catalogs.reorder_empty_subtitle')}</Text>
      </View>
    ) : isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.spinner.color} />
        <Text style={styles.loadingLabel}>{t('settings.catalogs.loading')}</Text>
      </View>
    ) : null

  return (
    <GestureHandlerRootView style={styles.container}>
      {renderListHeader()}
      <DraggableFlatList
        data={orderedCatalogs}
        onDragEnd={({ data }) => {
          void handleReorder(data)
        }}
        keyExtractor={(item) => item.catalog.stableId}
        renderItem={renderItem}
        containerStyle={styles.content}
        ListEmptyComponent={renderListEmpty}
        activationDistance={10}
      />
    </GestureHandlerRootView>
  )
})

export default memo(CatalogsReorderScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 80, // Extra space for tab bar
  },
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
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
  savingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
  },
  spinner: {
    color: theme.colors.primary,
  },
  savingText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActive: {
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: theme.colors.surfaceElevated,
  },
  dragHandle: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  dragIcon: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.md,
  },
  orderNumber: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    minWidth: 32,
    textAlign: 'center',
  },
  catalogInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  catalogName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  catalogType: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  emptySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  loadingLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
}))
