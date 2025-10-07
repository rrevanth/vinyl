import { Person, PersonImages } from '@/src/domain/entities/Person'
import { ExternalIds, ExternalId } from '@/src/domain/entities/ExternalIds'
import type { TraktPerson, TraktIds, TraktImages } from '@/src/infrastructure/api/trakt/types'

/**
 * Mapper for converting Trakt People API objects to domain entities
 *
 * Handles both minimal and extended Trakt person responses
 */
export class TraktPeopleMapper {
  /**
   * Convert Trakt IDs to ExternalIds entity
   */
  private static mapExternalIds(traktIds: TraktIds): ExternalIds {
    return new ExternalIds({
      trakt: new ExternalId(traktIds.trakt.toString(), 'trakt', `https://trakt.tv/people/${traktIds.slug}`),
      tmdb: traktIds.tmdb
        ? new ExternalId(
            traktIds.tmdb.toString(),
            'tmdb',
            `https://www.themoviedb.org/person/${traktIds.tmdb}`
          )
        : undefined,
      imdb: traktIds.imdb
        ? new ExternalId(traktIds.imdb, 'imdb', `https://www.imdb.com/name/${traktIds.imdb}/`)
        : undefined,
      tvdb: traktIds.tvdb
        ? new ExternalId(traktIds.tvdb.toString(), 'tvdb', `https://www.thetvdb.com/?id=${traktIds.tvdb}`)
        : undefined,
    })
  }

  /**
   * Convert Trakt images to PersonImages entity
   * Trakt person images use 'headshot' array
   */
  private static mapImages(traktImages?: TraktImages): PersonImages {
    if (!traktImages) {
      return new PersonImages()
    }

    // Extract first headshot as profile
    const profile = traktImages.headshot?.[0]
      ? traktImages.headshot[0].startsWith('http')
        ? traktImages.headshot[0]
        : `https://${traktImages.headshot[0]}`
      : undefined

    const headshot = profile // Same as profile for Trakt

    // Use remaining headshots as alternatives
    const profileAlternatives = traktImages.headshot
      ?.slice(1)
      .map((img) => (img.startsWith('http') ? img : `https://${img}`))

    return new PersonImages({
      profile,
      headshot,
      profileAlternatives,
      profileQuality: 'high',
    })
  }

  /**
   * Convert Trakt person to minimal Person entity
   */
  static toPerson(traktPerson: TraktPerson): Person {
    return new Person({
      externalIds: this.mapExternalIds(traktPerson.ids),
      name: traktPerson.name,
      images: this.mapImages(traktPerson.images),
      // Trakt doesn't provide knownForDepartment in basic response
      // This can be enhanced later from filmography data
    })
  }

  /**
   * Enhanced person with biography and additional details
   * Used when extended=full is requested
   */
  static toEnrichedPerson(traktPerson: TraktPerson): {
    person: Person
    biography?: string
    birthday?: Date
    deathday?: Date
    birthplace?: string
    homepage?: string
  } {
    const person = this.toPerson(traktPerson)

    return {
      person,
      biography: traktPerson.biography,
      birthday: traktPerson.birthday ? new Date(traktPerson.birthday) : undefined,
      deathday: traktPerson.death ? new Date(traktPerson.death) : undefined,
      birthplace: traktPerson.birthplace,
      homepage: traktPerson.homepage,
    }
  }
}
