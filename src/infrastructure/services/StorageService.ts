/**
 * AsyncStorage implementation of IStorageService
 *
 * Provides persistent key-value storage using React Native AsyncStorage.
 * All keys are prefixed with '@vnyl:' namespace.
 * Values are automatically serialized/deserialized as JSON.
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IStorageService } from '../../domain/services/IStorageService'
import { StorageError } from '../errors/StorageError'

export class StorageService implements IStorageService {
  private readonly KEY_PREFIX = '@vnyl:'

  /**
   * Adds namespace prefix to storage keys
   */
  private prefixKey(key: string): string {
    return `${this.KEY_PREFIX}${key}`
  }

  /**
   * Removes namespace prefix from storage keys
   */
  private unprefixKey(key: string): string {
    return key.replace(this.KEY_PREFIX, '')
  }

  /**
   * Retrieves a value by key
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const prefixedKey = this.prefixKey(key)
      const value = await AsyncStorage.getItem(prefixedKey)

      if (value === null) {
        return null
      }

      return JSON.parse(value) as T
    } catch (error) {
      throw new StorageError(
        `Failed to retrieve value for key: ${key}`,
        'read',
        key,
        error as Error
      )
    }
  }

  /**
   * Stores a value with the given key
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const prefixedKey = this.prefixKey(key)
      const serialized = JSON.stringify(value)
      await AsyncStorage.setItem(prefixedKey, serialized)
    } catch (error) {
      throw new StorageError(`Failed to store value for key: ${key}`, 'write', key, error as Error)
    }
  }

  /**
   * Removes a value by key
   */
  async remove(key: string): Promise<void> {
    try {
      const prefixedKey = this.prefixKey(key)
      await AsyncStorage.removeItem(prefixedKey)
    } catch (error) {
      throw new StorageError(
        `Failed to remove value for key: ${key}`,
        'delete',
        key,
        error as Error
      )
    }
  }

  /**
   * Clears all stored data with vnyl namespace
   */
  async clear(): Promise<void> {
    try {
      const keys = await this.getAllKeys()
      const prefixedKeys = keys.map((key) => this.prefixKey(key))
      await AsyncStorage.multiRemove(prefixedKeys)
    } catch (error) {
      throw new StorageError('Failed to clear storage', 'clear', undefined, error as Error)
    }
  }

  /**
   * Retrieves all storage keys (without namespace prefix)
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      return allKeys
        .filter((key) => key.startsWith(this.KEY_PREFIX))
        .map((key) => this.unprefixKey(key))
    } catch (error) {
      throw new StorageError('Failed to retrieve all keys', 'read', undefined, error as Error)
    }
  }
}
