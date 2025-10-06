import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import type { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

interface CapabilityBadgeProps {
  capability: CapabilityType
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Icon mapping for each capability type (monochrome Ionicons)
 */
const CAPABILITY_ICONS: Record<CapabilityType, keyof typeof Ionicons.glyphMap> = {
  // Media Capabilities
  media_metadata: 'information-circle-outline',
  media_catalog: 'grid-outline',
  media_search: 'search-outline',
  media_streams: 'play-outline',
  media_subtitles: 'chatbox-outline',
  media_recommendations: 'star-outline',
  media_videos: 'videocam-outline',
  media_seasons: 'list-outline',
  media_external_ids: 'link-outline',
  media_images: 'image-outline',
  media_ratings: 'heart-outline',
  media_reviews: 'chatbubble-outline',
  media_people: 'people-outline',
  media_lists: 'albums-outline',
  media_lists_search: 'search-outline',

  // Stremio-specific Capabilities
  stremio_addon_catalog: 'apps-outline',

  // People Capabilities
  people_filmography: 'film-outline',
  people_metadata: 'person-outline',
  people_search: 'search-outline',
  people_external_ids: 'link-outline',
  people_images: 'image-outline',
  people_catalogs: 'albums-outline',
}

/**
 * Label mapping for each capability type
 */
const CAPABILITY_LABELS: Record<CapabilityType, string> = {
  // Media Capabilities
  media_metadata: 'meta',
  media_catalog: 'catalog',
  media_search: 'search',
  media_streams: 'stream',
  media_subtitles: 'subtitles',
  media_recommendations: 'recommend',
  media_videos: 'videos',
  media_seasons: 'seasons',
  media_external_ids: 'ids',
  media_images: 'images',
  media_ratings: 'ratings',
  media_reviews: 'reviews',
  media_people: 'people',
  media_lists: 'lists',
  media_lists_search: 'list_search',

  // Stremio-specific Capabilities
  stremio_addon_catalog: 'addon_catalog',

  // People Capabilities
  people_filmography: 'filmography',
  people_metadata: 'people_meta',
  people_search: 'people_search',
  people_external_ids: 'people_ids',
  people_images: 'people_images',
  people_catalogs: 'people_catalogs',
}

/**
 * Monochrome badge component displaying a capability with icon + label
 */
export const CapabilityBadge = observer<CapabilityBadgeProps>(
  ({ capability, size = 'md' }) => {
    const iconName = CAPABILITY_ICONS[capability]
    const label = CAPABILITY_LABELS[capability]

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16
    const dynamicStyles = styles(size)

    return (
      <View
        style={dynamicStyles.container}
        accessibilityRole="text"
        accessibilityLabel={`Capability: ${label}`}
      >
        <Ionicons name={iconName} size={iconSize} style={dynamicStyles.icon} />
        <Text style={dynamicStyles.label}>{label}</Text>
      </View>
    )
  }
)

const styles = (size: 'sm' | 'md' | 'lg') =>
  StyleSheet.create((theme) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: size === 'sm' ? theme.spacing.xs : theme.spacing.sm,
      paddingVertical: size === 'sm' ? 2 : size === 'lg' ? theme.spacing.xs : 4,
      gap: size === 'sm' ? 4 : size === 'lg' ? 8 : 6,
    },
    icon: {
      color: theme.colors.textSecondary,
    },
    label: {
      fontSize: size === 'sm' ? theme.fontSize.xs : size === 'lg' ? theme.fontSize.sm : 12,
      fontWeight: theme.fontWeight.medium,
      color: theme.colors.textSecondary,
    },
  }))

export type { CapabilityBadgeProps }
