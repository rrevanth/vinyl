import type { FC } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { MediaBadge } from '@/src/domain/entities/Media'

interface HeroBadgeProps {
  readonly badge: MediaBadge
}

const HeroBadgeComponent: FC<HeroBadgeProps> = ({ badge }) => {
  const variant = badge.variant || 'default'
  
  return (
    <View style={[styles.container, styles[`container_${variant}`]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]} numberOfLines={1}>
        {badge.text}
      </Text>
    </View>
  )
}

export const HeroBadge = memo(HeroBadgeComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  container_default: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  container_success: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.6)',
  },
  container_warning: {
    backgroundColor: 'rgba(255, 193, 7, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.6)',
  },
  container_info: {
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.6)',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  text_default: {
    color: '#FFFFFF',
  },
  text_success: {
    color: '#E8F5E9',
  },
  text_warning: {
    color: '#FFF9C4',
  },
  text_info: {
    color: '#E3F2FD',
  },
}))
