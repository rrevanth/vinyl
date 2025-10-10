import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SymbolView } from 'expo-symbols'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'

interface ActionButtonRowProps {
  readonly media: Media
  readonly onPlay?: () => void
  readonly onAddToLibrary?: () => void
  readonly onShare?: () => void
  readonly testID?: string
}

const ActionButtonRowComponent: FC<ActionButtonRowProps> = ({
  media,
  onPlay,
  onAddToLibrary,
  onShare,
  testID,
}) => {
  return (
    <View testID={testID} style={styles.container}>
      {/* Primary Play Button */}
      {onPlay && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('media.actions.play')}
          accessibilityHint={t('media.actions.play_hint')}
          onPress={onPlay}
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <SymbolView name="play.fill" size={20} tintColor="#FFFFFF" />
          <Text style={styles.primaryButtonText}>{t('media.actions.play')}</Text>
        </Pressable>
      )}

      {/* Secondary Buttons Row */}
      <View style={styles.secondaryRow}>
        {onAddToLibrary && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('media.actions.add_to_library')}
            accessibilityHint={t('media.actions.add_to_library_hint')}
            onPress={onAddToLibrary}
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <SymbolView name="plus" size={18} tintColor={styles.secondaryButtonText.color} />
            <Text style={styles.secondaryButtonText}>{t('media.actions.add_to_library')}</Text>
          </Pressable>
        )}

        {onShare && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('media.actions.share')}
            accessibilityHint={t('media.actions.share_hint')}
            onPress={onShare}
            style={({ pressed }) => [
              styles.button,
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <SymbolView
              name="square.and.arrow.up"
              size={18}
              tintColor={styles.secondaryButtonText.color}
            />
            <Text style={styles.secondaryButtonText}>{t('media.actions.share')}</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export const ActionButtonRow = memo(ActionButtonRowComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    minHeight: 48, // Accessibility: minimum touch target
  },
  buttonPressed: {
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    fontFamily: theme.fontFamily.primary,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.primary,
  },
}))