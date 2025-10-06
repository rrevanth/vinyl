import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { t } from '@/src/presentation/shared/i18n'

interface StremioSummaryCardProps {
  totalInstalled: number
  activeAddons: number
  totalCatalogs: number
  workingAddons: number
}

export const StremioSummaryCard = observer<StremioSummaryCardProps>(
  ({ totalInstalled, activeAddons, totalCatalogs, workingAddons }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t('settings.stremio.summary.title')}</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="apps-outline" size={24} style={styles.icon} />
            </View>
            <Text style={styles.statValue}>{totalInstalled}</Text>
            <Text style={styles.statLabel}>{t('settings.stremio.summary.installed')}</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle-outline" size={24} style={styles.icon} />
            </View>
            <Text style={styles.statValue}>{activeAddons}</Text>
            <Text style={styles.statLabel}>{t('settings.stremio.summary.active')}</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="grid-outline" size={24} style={styles.icon} />
            </View>
            <Text style={styles.statValue}>{totalCatalogs}</Text>
            <Text style={styles.statLabel}>{t('settings.stremio.summary.catalogs')}</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="pulse-outline" size={24} style={styles.icon} />
            </View>
            <Text style={styles.statValue}>{workingAddons}</Text>
            <Text style={styles.statLabel}>{t('settings.stremio.summary.working')}</Text>
          </View>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  icon: {
    color: theme.colors.primary,
  },
  statValue: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}))
