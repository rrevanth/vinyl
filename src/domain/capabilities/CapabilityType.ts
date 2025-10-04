/**
 * Enum defining all supported provider capabilities
 * Each capability represents a specific functionality that providers can implement
 */
export enum CapabilityType {
  // Media Capabilities
  MEDIA_CATALOG = 'media_catalog',
  MEDIA_METADATA = 'media_metadata',
  MEDIA_SEARCH = 'media_search',
  MEDIA_RECOMMENDATIONS = 'media_recommendations',
  MEDIA_VIDEOS = 'media_videos',
  MEDIA_SEASONS = 'media_seasons',
  MEDIA_EXTERNAL_IDS = 'media_external_ids',
  MEDIA_IMAGES = 'media_images',
  MEDIA_RATINGS = 'media_ratings',
  MEDIA_REVIEWS = 'media_reviews',
  MEDIA_PEOPLE = 'media_people',
  MEDIA_STREAMS = 'media_streams',
  MEDIA_SUBTITLES = 'media_subtitles',
  MEDIA_LISTS = 'media_lists',
  MEDIA_LISTS_SEARCH = 'media_lists_search',

  // Stremio-specific Capabilities
  STREMIO_ADDON_CATALOG = 'stremio_addon_catalog',

  // People Capabilities
  PEOPLE_FILMOGRAPHY = 'people_filmography',
  PEOPLE_METADATA = 'people_metadata',
  PEOPLE_SEARCH = 'people_search',
  PEOPLE_EXTERNAL_IDS = 'people_external_ids',
  PEOPLE_IMAGES = 'people_images',
  PEOPLE_CATALOGS = 'people_catalogs',
}

/**
 * Helper to get all capability types as an array
 */
export const getAllCapabilityTypes = (): CapabilityType[] => {
  return Object.values(CapabilityType)
}

/**
 * Helper to check if a value is a valid capability type
 */
export const isValidCapabilityType = (value: string): value is CapabilityType => {
  return Object.values(CapabilityType).includes(value as CapabilityType)
}
