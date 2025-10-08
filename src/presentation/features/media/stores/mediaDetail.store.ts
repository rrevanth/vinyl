import { observable } from '@legendapp/state'
import type { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { WatchProgress } from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'

/**
 * Media detail store for progressive loading and UI state
 * Follows CLEAN architecture - Domain entities only, no Infrastructure dependencies
 */
export interface MediaDetailState {
  // Core data
  media: Media | null
  externalIds: ExternalIds | null
  enrichedData: EnrichedMedia | null
  watchProgress: WatchProgress | null
  seasons: Season[]

  // UI state
  selectedSeason: number
  isResolvingIds: boolean
  isLoadingMetadata: boolean
  isLoadingVideos: boolean
  isLoadingCast: boolean
  isLoadingSeasons: boolean
  isLoadingProgress: boolean
  error: string | null
}

const createDefaultState = (): MediaDetailState => ({
  media: null,
  externalIds: null,
  enrichedData: null,
  watchProgress: null,
  seasons: [],
  selectedSeason: 1,
  isResolvingIds: false,
  isLoadingMetadata: false,
  isLoadingVideos: false,
  isLoadingCast: false,
  isLoadingSeasons: false,
  isLoadingProgress: false,
  error: null,
})

/**
 * Observable store for media detail screen state
 * Non-persisted - fresh data on each navigation
 */
export const mediaDetail$ = observable<MediaDetailState>(createDefaultState())

/**
 * Clear media detail state
 * Call when navigating away from media detail screen
 */
export const clearMediaDetail = (): void => {
  mediaDetail$.set(createDefaultState())
}

/**
 * Set media and reset dependent state
 * Call when navigating to a new media detail screen
 */
export const setMedia = (media: Media): void => {
  mediaDetail$.set({
    ...createDefaultState(),
    media,
    externalIds: media.externalIds,
  })
}

/**
 * Set external IDs after resolution
 */
export const setExternalIds = (externalIds: ExternalIds): void => {
  mediaDetail$.externalIds.set(externalIds)
}

/**
 * Set enriched metadata
 */
export const setEnrichedData = (enrichedData: EnrichedMedia): void => {
  mediaDetail$.enrichedData.set(enrichedData)
}

/**
 * Set watch progress
 */
export const setWatchProgress = (watchProgress: WatchProgress): void => {
  mediaDetail$.watchProgress.set(watchProgress)
}

/**
 * Set seasons data
 */
export const setSeasons = (seasons: Season[]): void => {
  mediaDetail$.seasons.set(seasons)
}

/**
 * Change selected season
 */
export const setSelectedSeason = (seasonNumber: number): void => {
  mediaDetail$.selectedSeason.set(seasonNumber)
}

/**
 * Set loading state for a specific operation
 */
export const setLoadingState = (
  operation:
    | 'isResolvingIds'
    | 'isLoadingMetadata'
    | 'isLoadingVideos'
    | 'isLoadingCast'
    | 'isLoadingSeasons'
    | 'isLoadingProgress',
  isLoading: boolean
): void => {
  mediaDetail$[operation].set(isLoading)
}

/**
 * Set error state
 */
export const setError = (error: string | null): void => {
  mediaDetail$.error.set(error)
}