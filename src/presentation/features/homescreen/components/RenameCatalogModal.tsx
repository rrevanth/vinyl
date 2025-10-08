import { memo, useState } from 'react'
import { Modal, Pressable, Text, TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { t } from '@/src/presentation/shared/i18n'
import type { Catalog } from '@/src/domain/entities/Catalog'

interface RenameCatalogModalProps {
  readonly catalog: Catalog | null
  readonly currentCustomName: string | undefined
  readonly visible: boolean
  onClose(): void
  onSubmit(newName: string): Promise<void>
}

export const RenameCatalogModal = memo<RenameCatalogModalProps>(
  ({ catalog, currentCustomName, visible, onClose, onSubmit }) => {
    const [newName, setNewName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
      const trimmedName = newName.trim()
      if (!trimmedName) {
        setError(t('settings.catalogs.rename_error_empty'))
        return
      }

      if (trimmedName.length > 100) {
        setError(t('settings.catalogs.rename_error_too_long'))
        return
      }

      setIsSubmitting(true)
      setError(null)

      try {
        await onSubmit(trimmedName)
        handleClose()
      } catch {
        setError(t('settings.catalogs.rename_error_failed'))
      } finally {
        setIsSubmitting(false)
      }
    }

    const handleClose = () => {
      setNewName('')
      setError(null)
      setIsSubmitting(false)
      onClose()
    }

    const handleOpen = () => {
      if (catalog) {
        setNewName(currentCustomName || catalog.name)
      }
    }

    if (!catalog) {
      return null
    }

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
        onShow={handleOpen}
        accessibilityLabel={t('settings.catalogs.rename_dialog_title')}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} accessibilityLabel={t('common.close')}>
          <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('settings.catalogs.rename_dialog_title')}</Text>
              <Text style={styles.subtitle}>
                {t('settings.catalogs.rename_dialog_subtitle').replace('{name}', catalog.name)}
              </Text>
            </View>

            <View style={styles.content}>
              <TextInput
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                placeholder={t('settings.catalogs.rename_placeholder')}
                placeholderTextColor={styles.placeholder.color}
                autoFocus
                maxLength={100}
                editable={!isSubmitting}
                accessibilityLabel={t('settings.catalogs.rename_input_accessibility')}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>

            <View style={styles.actions}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.buttonSecondary,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleClose}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel={t('settings.catalogs.rename_cancel')}
              >
                <Text style={styles.buttonTextSecondary}>{t('settings.catalogs.rename_cancel')}</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.buttonPrimary,
                  pressed && styles.buttonPressed,
                  isSubmitting && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel={t('settings.catalogs.rename_submit')}
                accessibilityState={{ disabled: isSubmitting }}
              >
                <Text style={styles.buttonTextPrimary}>
                  {isSubmitting ? t('common.saving') : t('settings.catalogs.rename_submit')}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    )
  }
)

RenameCatalogModal.displayName = 'RenameCatalogModal'

const styles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  dialog: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  content: {
    gap: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
  },
  placeholder: {
    color: theme.colors.textTertiary,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonTextSecondary: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
}))