import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { LegendList } from '@legendapp/list'
import { StyleSheet } from 'react-native-unistyles'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { MediaPosterCard } from './MediaPosterCard'
import { t } from '@/src/presentation/shared/i18n'

interface CatalogRowProps {
  readonly catalog: Catalog
  readonly onPressItem?: (media: Media) => void
}

const CatalogRowComponent: FC<CatalogRowProps> = ({ catalog, onPressItem }) => {
  const mediaItems = catalog.items
    .map((item) => item.media)
    .filter((media): media is Media => !!media)

  if (mediaItems.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {catalog.name}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('home.catalog_customize_accessibility').replace(
            '{name}',
            catalog.name
          )}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionLabel}>{t('home.catalog_customize')}</Text>
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={mediaItems}
        keyExtractor={(media) => media.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MediaPosterCard
            media={item}
            size="standard"
            onPress={onPressItem}
            testID={`catalog-${catalog.stableId}-${item.stableId}`}
          />
        )}
      />
    </View>
  )
}

export const CatalogRow = memo(CatalogRowComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.xl,
  },
  headerRow: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  actionButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
  },
  actionPressed: {
    opacity: 0.85,
  },
  actionLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))
