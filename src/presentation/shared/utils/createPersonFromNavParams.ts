/**
 * Create Person entity from navigation parameters
 * Reconstructs minimal Person entity for instant rendering
 */
import { Person, PersonImages } from '@/src/domain/entities/Person'
import { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { PersonNavParams } from './navigationParams'

export const createPersonFromNavParams = (params: PersonNavParams): Person => {
  const externalIds = ExternalIds.fromJSON(params.externalIds)

  const images = new PersonImages({
    profile: params.profileUrl,
    profileThumbnail: params.profileUrl,
  })

  return new Person({
    externalIds,
    name: params.name,
    images,
    knownForDepartment: params.knownForDepartment,
  })
}
