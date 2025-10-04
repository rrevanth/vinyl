/**
 * TMDB API module exports
 *
 * Main entry point for all TMDB API functionality including
 * the unified client, specialized clients, types, and utilities.
 */

// Main unified client
export { TMDBClient } from './TMDBClient'

// Base client (for advanced usage)
export { TMDBBaseClient } from './TMDBBaseClient'

// Specialized clients (for direct usage if needed)
export { TMDBMovieClient } from './clients/TMDBMovieClient'
export { TMDBTVClient } from './clients/TMDBTVClient'
export { TMDBSearchClient } from './clients/TMDBSearchClient'
export { TMDBPersonClient } from './clients/TMDBPersonClient'
export { TMDBDiscoverClient } from './clients/TMDBDiscoverClient'
export { TMDBConfigurationClient } from './clients/TMDBConfigurationClient'
export { TMDBImageClient } from './clients/TMDBImageClient'

// Configuration factory
export { TMDBConfigFactory } from '../../factories/TMDBConfigFactory'
export type { EffectiveTMDBConfig } from '../../factories/TMDBConfigFactory'

// All types
export * from './types'
