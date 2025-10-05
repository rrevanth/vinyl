import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { DomainError } from '@/src/domain/errors'

export interface CacheInfo {
  readonly size: number
  readonly formattedSize: string
}

export interface AppInfo {
  readonly version: string
  readonly buildNumber: string
}

export class SettingsUseCase {
  async getCacheInfo(): Promise<CacheInfo> {
    try {
      const keys = await AsyncStorage.getAllKeys()
      let totalSize = 0

      for (const key of keys) {
        try {
          const value = await AsyncStorage.getItem(key)
          if (value) {
            // Estimate size: key + value length in bytes
            totalSize += key.length + value.length
          }
        } catch {
          // Skip corrupted entries
          continue
        }
      }

      return {
        size: totalSize,
        formattedSize: this.formatBytes(totalSize),
      }
    } catch {
      throw new DomainError('Failed to calculate cache size')
    }
  }

  async clearCache(): Promise<void> {
    try {
      // Get all keys first
      const keys = await AsyncStorage.getAllKeys()

      // Keep essential app state keys, clear everything else
      const essentialKeys = ['appState', 'userState', 'userPreferences']
      const keysToRemove = keys.filter((key) => !essentialKeys.includes(key))

      if (keysToRemove.length > 0) {
        await AsyncStorage.multiRemove(keysToRemove)
      }
    } catch {
      throw new DomainError('Failed to clear cache')
    }
  }

  async getAppInfo(): Promise<AppInfo> {
    try {
      const version = Constants.expoConfig?.version ?? '1.0.0'
      const buildNumber =
        Constants.expoConfig?.android?.versionCode?.toString() ??
        Constants.expoConfig?.ios?.buildNumber ??
        '1'

      return {
        version,
        buildNumber,
      }
    } catch {
      throw new DomainError('Failed to get app info')
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }
}
