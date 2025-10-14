import type { FC } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { LegendList } from '@legendapp/list'
import { StyleSheet } from 'react-native-unistyles'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import { ContinueWatchingCard } from './ContinueWatchingCard'
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
        <View style={styles.headerContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{t('home.continue_watching_title')}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
          <Text style={styles.subtitle}>{t('home.continue_watching_subtitle')}</Text>
        </View>

        <LegendList
          horizontal
          data={items}
          keyExtractor={(item) => String(item.playbackId)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ContinueWatchingCard
              item={item}
              variant="landscape"
              onPress={() => onPressItem?.(item)}
            />
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
  headerContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
  },
  chevron: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
}))
