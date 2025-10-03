/**
 * Generic key-value storage interface
 *
 * Provides abstraction for persistent storage operations.
 * Implementation can use AsyncStorage, MMKV, or any other storage mechanism.
 */
export interface IStorageService {
  /**
   * Retrieves a value by key
   * @param key Storage key
   * @returns Promise resolving to the stored value or null if not found
   */
  get<T>(key: string): Promise<T | null>

  /**
   * Stores a value with the given key
   * @param key Storage key
   * @param value Value to store (will be serialized)
   */
  set<T>(key: string, value: T): Promise<void>

  /**
   * Removes a value by key
   * @param key Storage key to remove
   */
  remove(key: string): Promise<void>

  /**
   * Clears all stored data
   */
  clear(): Promise<void>

  /**
   * Retrieves all storage keys
   * @returns Promise resolving to array of all keys
   */
  getAllKeys(): Promise<string[]>
}