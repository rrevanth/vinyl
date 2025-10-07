import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

interface CapabilityBadgeProps {
  capability: CapabilityType
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Icon mapping for each capability type (monochrome Ionicons)
 */
const CAPABILITY_ICONS: Record<CapabilityType, keyof typeof Ionicons.glyphMap> = {
  // Media Capabilities
  [CapabilityType.MEDIA_METADATA]: 'information-circle-outline',
  [CapabilityType.MEDIA_CATALOG]: 'grid-outline',
  [CapabilityType.MEDIA_SEARCH]: 'search-outline',
  [CapabilityType.MEDIA_STREAMS]: 'play-outline',
  [CapabilityType.MEDIA_SUBTITLES]: 'chatbox-outline',
  [CapabilityType.MEDIA_RECOMMENDATIONS]: 'star-outline',
  [CapabilityType.MEDIA_VIDEOS]: 'videocam-outline',
  [CapabilityType.MEDIA_SEASONS]: 'list-outline',
  [CapabilityType.MEDIA_EXTERNAL_IDS]: 'link-outline',
  [CapabilityType.MEDIA_IMAGES]: 'image-outline',
  [CapabilityType.MEDIA_RATINGS]: 'heart-outline',
  [CapabilityType.MEDIA_REVIEWS]: 'chatbubble-outline',
  [CapabilityType.MEDIA_PEOPLE]: 'people-outline',
  [CapabilityType.MEDIA_LISTS]: 'albums-outline',
  [CapabilityType.MEDIA_LISTS_SEARCH]: 'search-outline',

  // Trakt auth-gated Capabilities
  [CapabilityType.MEDIA_CONTINUE_WATCHING]: 'time-outline',
  [CapabilityType.MEDIA_WATCH_PROGRESS]: 'checkmark-circle-outline',
  [CapabilityType.MEDIA_WATCHLIST]: 'bookmark-outline',
  [CapabilityType.MEDIA_SCROBBLING]: 'sync-outline',

  // Stremio-specific Capabilities
  [CapabilityType.STREMIO_ADDON_CATALOG]: 'apps-outline',

  // People Capabilities
  [CapabilityType.PEOPLE_FILMOGRAPHY]: 'film-outline',
  [CapabilityType.PEOPLE_METADATA]: 'person-outline',
  [CapabilityType.PEOPLE_SEARCH]: 'search-outline',
  [CapabilityType.PEOPLE_EXTERNAL_IDS]: 'link-outline',
  [CapabilityType.PEOPLE_IMAGES]: 'image-outline',
  [CapabilityType.PEOPLE_CATALOGS]: 'albums-outline',
}

/**
 * Label mapping for each capability type
 */
const CAPABILITY_LABELS: Record<CapabilityType, string> = {
  // Media Capabilities
  [CapabilityType.MEDIA_METADATA]: 'meta',
  [CapabilityType.MEDIA_CATALOG]: 'catalog',
  [CapabilityType.MEDIA_SEARCH]: 'search',
  [CapabilityType.MEDIA_STREAMS]: 'stream',
  [CapabilityType.MEDIA_SUBTITLES]: 'subtitles',
  [CapabilityType.MEDIA_RECOMMENDATIONS]: 'recommend',
  [CapabilityType.MEDIA_VIDEOS]: 'videos',
  [CapabilityType.MEDIA_SEASONS]: 'seasons',
  [CapabilityType.MEDIA_EXTERNAL_IDS]: 'ids',
  [CapabilityType.MEDIA_IMAGES]: 'images',
  [CapabilityType.MEDIA_RATINGS]: 'ratings',
  [CapabilityType.MEDIA_REVIEWS]: 'reviews',
  [CapabilityType.MEDIA_PEOPLE]: 'people',
  [CapabilityType.MEDIA_LISTS]: 'lists',
  [CapabilityType.MEDIA_LISTS_SEARCH]: 'list_search',

  // Trakt auth-gated Capabilities
  [CapabilityType.MEDIA_CONTINUE_WATCHING]: 'continue',
  [CapabilityType.MEDIA_WATCH_PROGRESS]: 'progress',
  [CapabilityType.MEDIA_WATCHLIST]: 'watchlist',
  [CapabilityType.MEDIA_SCROBBLING]: 'scrobble',

  // Stremio-specific Capabilities
  [CapabilityType.STREMIO_ADDON_CATALOG]: 'addon_catalog',

  // People Capabilities
  [CapabilityType.PEOPLE_FILMOGRAPHY]: 'filmography',
  [CapabilityType.PEOPLE_METADATA]: 'people_meta',
  [CapabilityType.PEOPLE_SEARCH]: 'people_search',
  [CapabilityType.PEOPLE_EXTERNAL_IDS]: 'people_ids',
  [CapabilityType.PEOPLE_IMAGES]: 'people_images',
  [CapabilityType.PEOPLE_CATALOGS]: 'people_catalogs',
}

/**
 * Monochrome badge component displaying a capability with icon + label
 */
const CapabilityBadgeComponent = observer<CapabilityBadgeProps>(
  ({ capability, size = 'md' }) => {
    const iconName = CAPABILITY_ICONS[capability]
    const label = CAPABILITY_LABELS[capability]
    const dynamicStyles = styles(size)

    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16

    // Fallback to text initials if icon doesn't exist
    const renderIcon = () => {
      try {
        return (
          <Ionicons
            name={iconName as keyof typeof Ionicons.glyphMap}
            size={iconSize}
            color={dynamicStyles.icon.color}
          />
        )
      } catch {
        // Fallback: Show first 2 letters of label
        return (
          <Text style={[dynamicStyles.icon, { fontSize: iconSize }]}>
            {label.substring(0, 2).toUpperCase()}
          </Text>
        )
      }
    }

    return (
      <View
        style={dynamicStyles.container}
        accessibilityRole="text"
        accessibilityLabel={`Capability: ${label}`}
      >
        {renderIcon()}
        <Text style={dynamicStyles.label}>{label}</Text>
      </View>
    )
  }
)

export const CapabilityBadge = React.memo(CapabilityBadgeComponent, (prevProps, nextProps) => {
  return prevProps.capability === nextProps.capability && prevProps.size === nextProps.size
})

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
