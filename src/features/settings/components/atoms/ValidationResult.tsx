import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface ValidationResultProps {
  success: boolean
  message: string
  onDismiss?: () => void
}

export const ValidationResult = observer<ValidationResultProps>(({
  success,
  message,
  onDismiss,
}) => {
  const iconName = success ? 'checkmark-circle' : 'close-circle'
  const backgroundColor = success ? '#10B981' : '#EF4444' // green-500 or red-500

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.mainRow}>
        <Ionicons name={iconName} size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
        {onDismiss && (
          <Pressable
            onPress={onDismiss}
            style={styles.dismissButton}
            accessibilityRole="button"
            accessibilityLabel="Dismiss validation result"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: theme.fontSize.base,
    color: '#FFFFFF',
    fontWeight: theme.fontWeight.medium,
  },
  dismissButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
}))

export type { ValidationResultProps }
