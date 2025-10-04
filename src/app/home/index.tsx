import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VNYL</Text>
      <Text style={styles.subtitle}>Your complete media discovery platform</Text>
      <Text style={styles.description}>
        Powered by TMDB and Stremio - discover movies, TV shows, and streaming options all in one
        place.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    lineHeight: theme.fontSize.base * 1.4,
  },
}))
