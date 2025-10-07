import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { LegendList } from '@legendapp/list'
import { StyleSheet } from 'react-native-unistyles'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import { MediaPosterCard } from './MediaPosterCard'
import { t } from '@/src/presentation/shared/i18n'

interface ContinueWatchingRailProps {
  readonly items: ContinueWatchingItem[]
  readonly onPressItem?: (item: ContinueWatchingItem) => void
}

const ContinueWatchingRailComponent: FC<ContinueWatchingRailProps> = ({ items, onPressItem }) => {
  if (items.length === 0) {
    return null
  }

    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{t('home.continue_watching_title')}</Text>
          <Text style={styles.subtitle}>{t('home.continue_watching_subtitle')}</Text>
        </View>

        <LegendList
          horizontal
          data={items}
          keyExtractor={(item) => String(item.playbackId)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <MediaPosterCard
                media={item.media}
                size="standard"
                onPress={() => onPressItem?.(item)}
                testID={`continue-${item.media.stableId}`}
              />
              <Pressable
                onPress={() => onPressItem?.(item)}
                style={({ pressed }) => [styles.metaContainer, pressed && styles.metaPressed]}
                accessibilityRole={onPressItem ? 'button' : 'summary'}
                accessibilityLabel={t('home.continue_watching_accessibility').replace(
                  '{title}',
                  item.media.getDisplayName()
                )}
              >
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.media.title}
                </Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                </View>
                <Text style={styles.progressLabel}>
                  {t('home.continue_watching_progress').replace(
                    '{progress}',
                    String(item.progress)
                  )}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    )
}

export const ContinueWatchingRail = memo(ContinueWatchingRailComponent)

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
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  itemCard: {
    width: 200,
  },
  metaContainer: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  metaPressed: {
    opacity: 0.8,
  },
  itemTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.xs,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.surfaceElevated,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
}))
