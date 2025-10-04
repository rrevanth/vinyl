// Main Trakt client
export { TraktClient } from './TraktClient'
export { TraktBaseClient } from './TraktBaseClient'

// Specialized clients
export { TraktMoviesClient } from './clients/TraktMoviesClient'
export { TraktShowsClient } from './clients/TraktShowsClient'
export { TraktCalendarClient } from './clients/TraktCalendarClient'
export { TraktSearchClient } from './clients/TraktSearchClient'
export { TraktUsersClient } from './clients/TraktUsersClient'
export { TraktSyncClient } from './clients/TraktSyncClient'

// Types
export * from './types'

// Factory
export { TraktConfigFactory } from '../../factories/TraktConfigFactory'
export type { EffectiveTraktConfig } from '../../factories/TraktConfigFactory'
