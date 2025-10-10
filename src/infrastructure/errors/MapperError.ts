import { InfrastructureError } from './InfrastructureError'

/**
 * Error for data mapping/transformation failures
 * Used when converting between external API data and domain entities
 *
 * @example
 * throw new MapperError('Required field missing', 'TMDBMovieMapper', 'title', originalError)
 */
export class MapperError extends InfrastructureError {
  constructor(
    message: string,
    public readonly mapperName?: string,
    public readonly field?: string,
    cause?: Error
  ) {
    super(message, cause)
    this.name = 'MapperError'
    Object.setPrototypeOf(this, MapperError.prototype)
  }
}
