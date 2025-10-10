import { ValidationError } from './ValidationError'

/**
 * Error for invalid media type
 * Extends ValidationError with media type validation context
 *
 * @example
 * throw new InvalidMediaTypeError('podcast', 'error.media.invalid_type')
 */
export class InvalidMediaTypeError extends ValidationError {
  constructor(
    invalidType: string,
    code?: string
  ) {
    super(`Invalid media type: ${invalidType}`, 'type', invalidType, code)
    this.name = 'InvalidMediaTypeError'
    Object.setPrototypeOf(this, InvalidMediaTypeError.prototype)
  }
}
