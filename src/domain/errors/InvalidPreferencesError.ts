import { ValidationError } from './ValidationError'

/**
 * Error for invalid user preferences
 * Extends ValidationError with preferences validation context
 *
 * @example
 * throw new InvalidPreferencesError('theme', 'invalid_theme', 'error.preferences.invalid')
 */
export class InvalidPreferencesError extends ValidationError {
  constructor(
    field: string,
    value: any,
    code?: string
  ) {
    super(`Invalid preference value for ${field}`, field, value, code)
    this.name = 'InvalidPreferencesError'
    Object.setPrototypeOf(this, InvalidPreferencesError.prototype)
  }
}
