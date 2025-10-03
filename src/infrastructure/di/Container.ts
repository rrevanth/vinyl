// Simple Map-based DI container
export class Container {
  private services = new Map<symbol, any>()

  register<T>(token: symbol, factory: () => T): void {
    this.services.set(token, factory())
  }

  resolve<T>(token: symbol): T {
    const service = this.services.get(token)
    if (!service) {
      throw new Error(`Service not registered: ${token.toString()}`)
    }
    return service
  }

  has(token: symbol): boolean {
    return this.services.has(token)
  }
}

export const container = new Container()