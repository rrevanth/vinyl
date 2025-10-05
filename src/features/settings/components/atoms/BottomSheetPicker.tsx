import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface BottomSheetPickerProps {
  visible: boolean
  title: string
  options: { label: string; value: string }[]
  selectedValue: string
  onSelect: (value: string) => void
  onClose: () => void
}

export const BottomSheetPicker = observer<BottomSheetPickerProps>(
  ({ visible, title, options, selectedValue, onSelect, onClose }) => {
    const animationValue = useSharedValue(0)

    useEffect(() => {
      animationValue.value = withTiming(visible ? 1 : 0, { duration: 200 })
    }, [visible, animationValue])

    const overlayStyle = useAnimatedStyle(() => ({
      opacity: interpolate(animationValue.value, [0, 1], [0, 1]),
    }))

    const modalStyle = useAnimatedStyle(() => ({
      opacity: interpolate(animationValue.value, [0, 1], [0, 1]),
      transform: [
        {
          scale: interpolate(animationValue.value, [0, 1], [0.95, 1]),
        },
      ],
    }))

    const handleSelect = (value: string) => {
      onSelect(value)
      onClose()
    }

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View style={styles.container}>
          {/* Overlay */}
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <Pressable style={styles.overlayPressable} onPress={onClose} />
          </Animated.View>

          {/* Modal Card - positioned absolutely */}
          <Animated.View style={[styles.modalCard, modalStyle]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close picker"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            {/* Options Wrapper */}
            <View style={styles.optionsWrapper}>
              <ScrollView
                contentContainerStyle={styles.optionsContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {options.map((option, index) => {
                  const isSelected = option.value === selectedValue
                  const isLast = index === options.length - 1

                  return (
                    <Pressable
                      key={option.value}
                      style={({ pressed }) => [
                        styles.option,
                        pressed && styles.optionPressed,
                        !isLast && styles.optionSeparator,
                      ]}
                      onPress={() => handleSelect(option.value)}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: isSelected }}
                      accessibilityLabel={option.label}
                    >
                      <View style={styles.optionContent}>
                        <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                          {option.label}
                        </Text>
                        {isSelected && (
                          <View style={styles.radioButton}>
                            <View style={styles.radioButtonInner} />
                          </View>
                        )}
                      </View>
                    </Pressable>
                  )
                })}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </Modal>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  overlayPressable: {
    flex: 1,
  },
  modalCard: {
    position: 'absolute',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    maxWidth: 400,
    width: '90%',
    maxHeight: '70%',
    overflow: 'hidden',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  closeButtonText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  optionsWrapper: {
    flex: 1,
    minHeight: 150,
  },
  optionsContent: {
    paddingVertical: theme.spacing.sm,
  },
  option: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  optionPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  optionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    flex: 1,
  },
  optionLabelSelected: {
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
}))

export type { BottomSheetPickerProps }