/**
 * Create a minimal Media entity from navigation params
 * Used for instant rendering while full data loads from enrichment queries
 * 
 * This allows us to show the media detail screen immediately with basic info
 * while the full enrichments load in the background.
 */
import { Media, MediaImages } from '@/src/domain/entities/Media'
import { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { MediaNavParams } from './navigationParams'

export const createMediaFromNavParams = (params: MediaNavParams): Media => {
  // Create a minimal Media entity from nav params
  // The full enrichment will be loaded by the detail screen
  return new Media({
    externalIds: ExternalIds.fromJSON(params.externalIds),
    type: params.type,
    title: params.title,
    year: params.year,
    images: new MediaImages({
      poster: params.posterUrl,
      backdrop: params.backdropUrl,
    }),
  })
}
