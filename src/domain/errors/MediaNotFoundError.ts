import { NotFoundError } from './NotFoundError'

/**
 * Specialized error for media not found
 * Extends NotFoundError with media-specific context
 *
 * @example
 * throw new MediaNotFoundError('Movie', 'tt1234567', 'error.media.not_found')
 */
export class MediaNotFoundError extends NotFoundError {
  constructor(
    public readonly mediaType: string,
    id: string,
    code?: string
  ) {
    super(`${mediaType} not found`, 'media', id, code)
    this.name = 'MediaNotFoundError'
    Object.setPrototypeOf(this, MediaNotFoundError.prototype)
  }
}
