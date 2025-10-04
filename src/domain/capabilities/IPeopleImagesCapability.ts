import type { Person } from '../entities/Person'

/**
 * People Images Capability - Provides profile photos and headshots
 */
export interface IPeopleImagesCapability {
  /**
   * Get images for a person (profile photos, headshots)
   * @param person - The person to get images for
   * @returns Array of person images
   */
  getImages(person: Person): Promise<PersonImage[]>
}

/**
 * Represents an image of a person
 */
export interface PersonImage {
  aspectRatio: number
  height: number
  width: number
  language?: string
  filePath: string
  voteAverage: number
  voteCount: number
  imageType: PersonImageType
}

export enum PersonImageType {
  PROFILE = 'profile',
  HEADSHOT = 'headshot',
  CANDID = 'candid',
  EVENT = 'event',
}
