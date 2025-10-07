import type { FC } from 'react'
import { memo } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { LegendList } from '@legendapp/list'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'

interface HeroCarouselProps {
  readonly items: Media[]
  readonly onPressItem?: (media: Media) => void
}

const HeroCarouselComponent: FC<HeroCarouselProps> = ({ items, onPressItem }) => {
  if (items.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <LegendList
        horizontal
        data={items}
        keyExtractor={(item) => item.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const backdrop = item.images.getBestBackdrop() ?? item.images.getBestPoster()
          const interactive = typeof onPressItem === 'function'

          return (
            <Pressable
              key={item.stableId}
              testID={`hero-item-${item.stableId}`}
              onPress={() => onPressItem?.(item)}
              style={styles.card}
              accessibilityRole={interactive ? 'button' : 'image'}
              accessibilityLabel={t('home.hero_card_accessibility').replace(
                '{title}',
                item.getDisplayName()
              )}
            >
              <ImageBackground
                source={backdrop ? { uri: backdrop } : undefined}
                style={styles.backdrop}
                imageStyle={styles.backdropImage}
                resizeMode="cover"
              >
                <View style={styles.overlay} />
                <View style={styles.metaContainer}>
                  <Text style={styles.heroLabel}>{t('home.hero_label')}</Text>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.year ? (
                    <Text style={styles.subtitle}>{item.year}</Text>
                  ) : null}
                </View>
              </ImageBackground>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export const HeroCarousel = memo(HeroCarouselComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.xl,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  card: {
    width: 320,
    height: 180,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropImage: {
    borderRadius: theme.borderRadius.xl,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.borderRadius.xl,
  },
  metaContainer: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  heroLabel: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize['2xl'],
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
  },
}))
