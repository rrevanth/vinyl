// Base error for infrastructure layer failures
export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = 'InfrastructureError'
    Object.setPrototypeOf(this, InfrastructureError.prototype)
  }
}